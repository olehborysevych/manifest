// API endpoint to submit a vote with hCaptcha verification
// Works with Vercel KV (Redis) for vote storage

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

        // Captcha verified, increment vote count
        // Using Vercel KV (Redis) for persistent vote storage
        const { kv } = await import('@vercel/kv');
        const newCount = await kv.incr('vote_count');

        return res.status(200).json({
            success: true,
            count: newCount,
            message: 'Vote recorded successfully'
        });
    } catch (error) {
        console.error('Error processing vote:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to process vote'
        });
    }
}
