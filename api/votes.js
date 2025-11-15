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
        // Option 1: Using Vercel KV (recommended for production)
        // Uncomment this block after setting up Vercel KV
        /*
        const { kv } = await import('@vercel/kv');
        const count = await kv.get('vote_count') || 0;
        */

        // Option 2: Simple in-memory storage (for testing only - resets on each deployment)
        // This is a placeholder - in production use Vercel KV or a database
        const count = process.env.VOTE_COUNT || 0;

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
