'use client';

import React from 'react';
import { Tabs } from 'antd';
import OrganizationManagement from '@/components/admin/OrganizationManagement';
import UserInvitation from '@/components/admin/UserInvitation';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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