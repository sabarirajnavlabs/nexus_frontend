'use client';

import React from 'react';
import { Tabs } from 'antd';
import OrganizationManagement from '../../components/admin/OrganizationManagement';
import UserInvitation from '../../components/admin/UserInvitation';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

const AdminDashboard: React.FC = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) return;
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Check for admin or super_admin role in user's memberships
        if (data && data.id) {
          // Optionally, fetch memberships or roles if not included in /users/me
          // For now, assume isAdmin if user exists (customize as needed)
          setIsAdmin(data.role === 'admin' || data.role === 'super_admin');
        }
      }
    };
    checkRole();
  }, [user, getToken]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Switch to admin button */}
        {/* {isAdmin && (
          <div className="mb-4 flex justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => window.location.href = '/nexus-admin/dashboard'}
            >
              Switch to admin
            </button>
          </div>
        )} */}
        <Tabs
          defaultActiveKey="organizations"
          items={[
            {
              key: 'organizations',
              label: 'Organizations',
              children: <OrganizationManagement />,
            },
            {
              key: 'invites',
              label: 'User Invitations',
              children: <UserInvitation />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminDashboard; 