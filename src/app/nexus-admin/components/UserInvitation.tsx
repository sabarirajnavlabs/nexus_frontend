'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, message, Upload, Select, Tabs, Popconfirm, Spin, Space } from 'antd';
import { UploadOutlined, MailOutlined, ReloadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import * as XLSX from 'xlsx';
import { useUser, useAuth, useClerk } from '@clerk/clerk-react';

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

interface UserInvitationProps {
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

const UserInvitation: React.FC<UserInvitationProps> = ({ setLoading, loading }) => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [orgsLoaded, setOrgsLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [email, setEmail] = useState('');
  const [bulkEmails, setBulkEmails] = useState<string[]>([]);
  const { user } = useUser();
  const { getToken } = useAuth();
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'revoked'>('all');
  const { client } = useClerk();

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
      setLoading(true);
      setOrgsLoaded(false);
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
        window.location.href = '/dashboard';
        return;
      }
      const data = await response.json();
      setOrganizations(data);
      setOrgsLoaded(true);
    } catch (error) {
      window.location.href = '/dashboard';
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedOrg) {
      fetchInvites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrg]);

  async function inviteUser(email: string) {
    try {
      const res = await fetch('/api/clerk-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to invite');
      }
      message.success(`Clerk invite sent to ${email}!`);
    } catch (err: any) {
      message.error('Failed to send Clerk invite: ' + (err.message || err));
    }
  }

  const handleInvite = async () => {
    if (!selectedOrg || !user?.id) return;
    try {
      setLoading(true);
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
      await inviteUser(email);
      setIsModalVisible(false);
      setEmail('');
      fetchInvites();
    } catch (error) {
      console.error('Error sending invite:', error);
      message.error(error instanceof Error ? error.message : 'Failed to send invite');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkInvite = async () => {
    if (!selectedOrg || !user?.id) return;
    try {
      setLoading(true);
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
      for (const email of bulkEmails) {
        await inviteUser(email);
      }
      setIsModalVisible(false);
      setBulkEmails([]);
      fetchInvites();
    } catch (error) {
      console.error('Error sending bulk invites:', error);
      message.error(error instanceof Error ? error.message : 'Failed to send bulk invites');
    } finally {
      setLoading(false);
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
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][];
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
      // Call clerk-invite.ts DELETE endpoint to delete from Clerk
      const clerkResponse = await fetch('/api/clerk-invite', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: invite.email }),
      });
      if (!clerkResponse.ok) {
        throw new Error('Failed to delete user from Clerk');
      }
      // Call backend to update status
      const token = await getToken();
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

  const handleResendMail = async (invite: Invite) => {
    if (!invite.email) return;
    try {
      setLoading(true);
      const response = await fetch('/api/clerk-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: invite.email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to resend invite');
      }
      message.success('Invite email resent successfully');
    } catch (error) {
      console.error('Error resending invite:', error);
      message.error(error instanceof Error ? error.message : 'Failed to resend invite');
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
        <Space>
          {invite.status === 'pending' && (
            <Button
              type="primary"
              size="small"
              onClick={() => handleResendMail(invite)}
              loading={loading}
            >
              Resend Mail
            </Button>
          )}
          {invite.status === 'accepted' && (
            <Popconfirm
              title="Are you sure to revoke this user's access?"
              onConfirm={() => handleRevoke(invite)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger size="small">Revoke</Button>
            </Popconfirm>
          )}
          {invite.status === 'revoked' && (
            <span className="text-gray-400">Revoked</span>
          )}
        </Space>
      ),
    },
  ];

  const filteredInvites = invites.filter(invite => {
    if (statusFilter === 'all') return true;
    return invite.status === statusFilter;
  });

  if (!orgsLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

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
          value={selectedOrg}
          onChange={setSelectedOrg}
          options={organizations.map(org => ({ value: org.id, label: org.full_name }))}
          placeholder="Select Organization"
          style={{ width: '100%' }}
        />
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