'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, message, Upload, Select, Tabs, Popconfirm } from 'antd';
import { UploadOutlined, MailOutlined, ReloadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import * as XLSX from 'xlsx';
import { useUser, useAuth } from '@clerk/clerk-react';

interface Invite {
  email: string;
  organization_id: string;
  status: string;
  invited_at: string;
}

interface Organization {
  id: number;
  full_name: string;
}

const UserInvitation: React.FC = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [email, setEmail] = useState('');
  const [bulkEmails, setBulkEmails] = useState<string[]>([]);
  const { user } = useUser();
  const { getToken } = useAuth();
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'revoked'>('all');

  const fetchInvites = async () => {
    if (!selectedOrg) return;
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations/${selectedOrg}/invites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        mode: 'cors',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch invites');
      }
      const data = await response.json();
      setInvites(data.invites || []);
    } catch (error) {
      console.error('Error fetching invites:', error);
      message.error(error instanceof Error ? error.message : 'Failed to fetch invites');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        mode: 'cors',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch organizations');
      }
      const data = await response.json();
      setOrganizations(data);
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to fetch organizations');
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (selectedOrg) {
      fetchInvites();
    }
  }, [selectedOrg]);

  const handleInvite = async () => {
    if (!selectedOrg || !user?.id) return;
    try {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations/${selectedOrg}/invites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        mode: 'cors',
        body: JSON.stringify({
          emails: [email],
          invited_by: user.id,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send invite');
      }
      message.success('Invite sent successfully');
      setIsModalVisible(false);
      setEmail('');
      fetchInvites();
    } catch (error) {
      console.error('Error sending invite:', error);
      message.error(error instanceof Error ? error.message : 'Failed to send invite');
    }
  };

  const handleBulkInvite = async () => {
    if (!selectedOrg || !user?.id) return;
    try {
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations/${selectedOrg}/invites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        mode: 'cors',
        body: JSON.stringify({
          emails: bulkEmails,
          invited_by: user.id,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send bulk invites');
      }
      message.success('Bulk invites sent successfully');
      setIsModalVisible(false);
      setBulkEmails([]);
      fetchInvites();
    } catch (error) {
      console.error('Error sending bulk invites:', error);
      message.error(error instanceof Error ? error.message : 'Failed to send bulk invites');
    }
  };

  const handleFileUpload: UploadProps['customRequest'] = async ({ file }) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const emails = jsonData.flat().filter((email): email is string => 
          typeof email === 'string' && email.includes('@')
        );
        setBulkEmails(emails);
      };
      reader.readAsBinaryString(file as Blob);
    } catch (error) {
      message.error('Failed to process file');
    }
  };

  const handleRevoke = async (invite: Invite) => {
    if (!selectedOrg || !invite.email) return;
    try {
      setLoading(true);
      const token = await getToken();
      // Call Clerk API to delete the user
      const clerkResponse = await fetch('https://api.clerk.com/v1/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      const clerkData = await clerkResponse.json();
      const user = clerkData.find((u: any) => u.email_addresses.some((e: any) => e.email_address === invite.email));
      if (user) {
        await fetch(`https://api.clerk.com/v1/users/${user.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CLERK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        });
      }
      // Call backend to update status
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations/${selectedOrg}/invites/${encodeURIComponent(invite.email)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        mode: 'cors',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to revoke invite');
      }
      message.success('User access revoked');
      fetchInvites();
    } catch (error) {
      console.error('Error revoking invite:', error);
      message.error(error instanceof Error ? error.message : 'Failed to revoke invite');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Organization',
      dataIndex: 'organization_id',
      key: 'organization_id',
      render: (orgId: string) => {
        const org = organizations.find((o) => o.id.toString() === orgId);
        return org?.full_name || orgId;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={`capitalize ${status === 'pending' ? 'text-yellow-500' : status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Invited At',
      dataIndex: 'invited_at',
      key: 'invited_at',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, invite: Invite) => (
        invite.status !== 'revoked' ? (
          <Popconfirm
            title="Are you sure to revoke this user's access?"
            onConfirm={() => handleRevoke(invite)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small">Revoke</Button>
          </Popconfirm>
        ) : <span className="text-gray-400">Revoked</span>
      ),
    },
  ];

  const filteredInvites = invites.filter(invite => {
    if (statusFilter === 'all') return true;
    return invite.status === statusFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Invitations</h1>
        <div className="space-x-2">
          <Button
            type="primary"
            icon={<MailOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Invite User
          </Button>
          <Upload
            accept=".xlsx,.xls"
            showUploadList={false}
            customRequest={handleFileUpload}
          >
            <Button icon={<UploadOutlined />}>Bulk Invite</Button>
          </Upload>
        </div>
      </div>

      <div className="mb-4">
        <Select
          placeholder="Select Organization"
          className="w-full"
          value={selectedOrg}
          onChange={setSelectedOrg}
        >
          {organizations.map((org) => (
            <Select.Option key={org.id} value={org.id.toString()}>
              {org.full_name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <Tabs
        activeKey={statusFilter}
        onChange={key => setStatusFilter(key as 'all' | 'pending' | 'accepted' | 'revoked')}
        items={[
          { key: 'all', label: 'All', children: null },
          { key: 'pending', label: 'Pending', children: null },
          { key: 'accepted', label: 'Accepted', children: null },
          { key: 'revoked', label: 'Revoked', children: null },
        ]}
      />

      <Table
        columns={columns}
        dataSource={filteredInvites}
        loading={loading}
        rowKey="email"
      />

      <Modal
        title="Invite User"
        open={isModalVisible}
        onOk={bulkEmails.length > 0 ? handleBulkInvite : handleInvite}
        onCancel={() => {
          setIsModalVisible(false);
          setEmail('');
          setBulkEmails([]);
        }}
      >
        <div className="space-y-4">
          {bulkEmails.length > 0 ? (
            <div>
              <p className="mb-2">Emails to invite:</p>
              <div className="max-h-40 overflow-y-auto">
                {bulkEmails.map((email, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {email}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserInvitation; 