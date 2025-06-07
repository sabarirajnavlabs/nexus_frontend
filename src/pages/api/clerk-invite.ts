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

    try {
      // First, check if user exists and delete if found
      const userResponse = await fetch('https://api.clerk.com/v1/users', {
        headers: {
          'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (userResponse.ok) {
        const users = await userResponse.json();
        const existingUser = users.find((u: any) => u.email_addresses.some((e: any) => e.email_address === email));
        
        if (existingUser) {
          console.log(`Deleting existing user for ${email}`);
          await fetch(`https://api.clerk.com/v1/users/${existingUser.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
              'Content-Type': 'application/json',
            },
          });
        }
      }

      // Then, get and delete any existing allowlist entries
      const allowlistResponse = await fetch('https://api.clerk.com/v1/allowlist_identifiers', {
        headers: {
          'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (allowlistResponse.ok) {
        const allowlistData = await allowlistResponse.json();
        const existingIdentifiers = allowlistData.filter((item: any) => item.identifier === email);
        
        // Delete all matching allowlist entries
        for (const identifier of existingIdentifiers) {
          console.log(`Deleting allowlist identifier for ${email}`);
          await fetch(`https://api.clerk.com/v1/allowlist_identifiers/${identifier.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
              'Content-Type': 'application/json',
            },
          });
        }
      }

      // Wait a moment to ensure all deletions are processed
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Now add the new allowlist identifier
      console.log(`Adding new allowlist identifier for ${email}`);
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
    } catch (error) {
      console.error('Error in clerk-invite:', error);
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to process invite' });
    }
  } else if (req.method === 'DELETE') {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
    if (!CLERK_SECRET_KEY) {
      return res.status(500).json({ error: 'Clerk secret key not set' });
    }

    try {
      // Find user by email
      const userResponse = await fetch('https://api.clerk.com/v1/users', {
        headers: {
          'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      const users = await userResponse.json();
      const user = users.find((u: any) => u.email_addresses.some((e: any) => e.email_address === email));

      if (user) {
        // Delete user from Clerk
        const deleteResponse = await fetch(`https://api.clerk.com/v1/users/${user.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        if (!deleteResponse.ok) {
          throw new Error('Failed to delete user from Clerk');
        }
      }

      // Also remove from allowlist
      const allowlistResponse = await fetch('https://api.clerk.com/v1/allowlist_identifiers', {
        headers: {
          'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (allowlistResponse.ok) {
        const allowlistData = await allowlistResponse.json();
        const existingIdentifiers = allowlistData.filter((item: any) => item.identifier === email);
        
        // Delete all matching allowlist entries
        for (const identifier of existingIdentifiers) {
          await fetch(`https://api.clerk.com/v1/allowlist_identifiers/${identifier.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
              'Content-Type': 'application/json',
            },
          });
        }
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error in clerk-invite DELETE:', error);
      return res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to delete user' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
} 