// API endpoint to get current vote count
// Works with Vercel KV (Redis) - simple and free tier available

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Using Vercel KV (Redis) for persistent vote storage
        const { kv } = await import('@vercel/kv');
        const count = await kv.get('vote_count') || 0;

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
    }
}
