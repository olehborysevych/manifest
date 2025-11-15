// API endpoint to submit a vote with hCaptcha verification
// Works with Redis via direct connection

import Redis from 'ioredis';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { captcha } = req.body;

        if (!captcha) {
            return res.status(400).json({
                success: false,
                error: 'Captcha is required'
            });
        }

        // Verify hCaptcha
        const hcaptchaSecret = process.env.HCAPTCHA_SECRET_KEY;

        if (!hcaptchaSecret) {
            console.error('HCAPTCHA_SECRET_KEY not configured');
            return res.status(500).json({
                success: false,
                error: 'Server configuration error'
            });
        }

        const verifyUrl = 'https://hcaptcha.com/siteverify';
        const verifyResponse = await fetch(verifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${hcaptchaSecret}&response=${captcha}`
        });

        const verifyData = await verifyResponse.json();

        if (!verifyData.success) {
            return res.status(400).json({
                success: false,
                error: 'Captcha verification failed'
            });
        }

        // Get user's IP address
        const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
                   req.headers['x-real-ip'] ||
                   req.socket.remoteAddress ||
                   'unknown';

        // Captcha verified, check IP and increment vote count
        // Using Redis for persistent vote storage
        const redis = new Redis(process.env.KV_REDIS_URL);

        try {
            // Check if this IP has already voted (within 24 hours)
            const ipKey = `voted_ip:${ip}`;
            const hasVoted = await redis.get(ipKey);

            if (hasVoted) {
                return res.status(429).json({
                    success: false,
                    error: 'You have already voted. Please try again later.'
                });
            }

            // Increment vote count
            const newCount = await redis.incr('vote_count');

            // Mark this IP as voted (expires in 24 hours = 86400 seconds)
            await redis.setex(ipKey, 86400, Date.now().toString());

            return res.status(200).json({
                success: true,
                count: newCount,
                message: 'Vote recorded successfully'
            });
        } finally {
            // Close Redis connection
            redis.disconnect();
        }
    } catch (error) {
        console.error('Error processing vote:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to process vote'
        });
    }
}
