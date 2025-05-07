export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await fetch('http://localhost:3001/users/update-config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update configuration');
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error updating configuration:', error);
        res.status(500).json({ error: error.message });
    }
} 