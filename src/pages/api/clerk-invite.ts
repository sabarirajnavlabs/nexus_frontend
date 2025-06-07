import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
} 