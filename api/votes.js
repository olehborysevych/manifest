// API endpoint to get current vote count
// Works with Redis via direct connection

import Redis from 'ioredis';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    let redis;
    try {
        // Connect to Redis using KV_REDIS_URL
        redis = new Redis(process.env.KV_REDIS_URL);

        const count = await redis.get('vote_count') || 0;

        return res.status(200).json({
            success: true,
            count: parseInt(count)
        });
    } catch (error) {
        console.error('Error fetching vote count:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch vote count',
            count: 0
        });
    } finally {
        // Close Redis connection
        if (redis) {
            redis.disconnect();
        }
    }
}
