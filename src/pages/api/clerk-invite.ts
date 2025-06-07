import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
    if (!CLERK_SECRET_KEY) {
      return res.status(500).json({ error: 'Clerk secret key not set' });
    }

    const response = await fetch('https://api.clerk.com/v1/allowlist_identifiers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        notify: true,
      }),
    });

    const responseBody = await response.text();
    console.log('Clerk API response:', response.status, responseBody);

    if (!response.ok) {
      return res.status(response.status).json({ error: responseBody || 'Failed to invite' });
    }

    return res.status(200).json({ success: true });
  } else if (req.method === 'DELETE') {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
    if (!CLERK_SECRET_KEY) {
      return res.status(500).json({ error: 'Clerk secret key not set' });
    }

    // Find user by email
    const userResponse = await fetch('https://api.clerk.com/v1/users', {
      headers: {
        'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const users = await userResponse.json();
    const user = users.find((u: any) => u.email_addresses.some((e: any) => e.email_address === email));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user from Clerk
    const deleteResponse = await fetch(`https://api.clerk.com/v1/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!deleteResponse.ok) {
      return res.status(deleteResponse.status).json({ error: 'Failed to delete user from Clerk' });
    }

    return res.status(200).json({ success: true });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
} 