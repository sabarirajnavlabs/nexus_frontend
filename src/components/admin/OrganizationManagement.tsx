'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useUser, useAuth } from '@clerk/clerk-react';

interface Organization {
  id: number;
  full_name: string;
  created_at: string;
  updated_at: string;
}

const OrganizationManagement: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOrganizations(data);
    } catch (error) {
      message.error('Failed to fetch organizations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleCreateOrg = async () => {
    if (!newOrgName || !user?.primaryEmailAddress?.emailAddress) {
      message.error('Please enter org name and ensure you are logged in.');
      return;
    }
    try {
      const adminEmail = user.primaryEmailAddress.emailAddress;
      const fullName = newOrgName;
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName, adminEmail }),
      });
      if (!response.ok) {
        throw new Error('Failed to create organization');
      }
      message.success('Organization created successfully');
      setIsModalVisible(false);
      setNewOrgName('');
      fetchOrganizations();
    } catch (error) {
      message.error('Failed to create organization');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Create Organization
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={organizations}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title="Create Organization"
        open={isModalVisible}
        onOk={handleCreateOrg}
        onCancel={() => {
          setIsModalVisible(false);
          setNewOrgName('');
        }}
      >
        <Input
          placeholder="Organization Name"
          value={newOrgName}
          onChange={(e) => setNewOrgName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default OrganizationManagement; 