'use client';

import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal, message, Form, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useUser, useAuth } from '@clerk/clerk-react';

interface Organization {
  id: number;
  full_name: string;
  status?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

interface OrganizationManagementProps {
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

const OrganizationManagement: React.FC<OrganizationManagementProps> = ({ setLoading, loading }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [newOrgName, setNewOrgName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [role, setRole] = useState('admin');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateOrg = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ fullName: values.fullName, adminEmail: values.adminEmail, role: values.role }),
      });
      if (!response.ok) {
        throw new Error('Failed to create organization');
      }
      message.success('Organization created successfully');
      setIsModalVisible(false);
      form.resetFields();
      fetchOrganizations();
    } catch (error) {
      message.error('Failed to create organization');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (status: string) => status ? status.charAt(0).toUpperCase() + status.slice(1) : 'N/A',
    // },
    // {
    //   title: 'Created By',
    //   dataIndex: 'created_by',
    //   key: 'created_by',
    //   render: (created_by: string) => created_by || 'N/A',
    // },
    // {
    //   title: 'Created At',
    //   dataIndex: 'created_at',
    //   key: 'created_at',
    //   render: (date: string) => new Date(date).toLocaleString(),
    // },
    // {
    //   title: 'Updated At',
    //   dataIndex: 'updated_at',
    //   key: 'updated_at',
    //   render: (date: string) => new Date(date).toLocaleString(),
    // },
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
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="fullName"
            label="Organization Name"
            rules={[{ required: true, message: 'Please enter organization name' }]}
          >
            <Input placeholder="Organization Name" />
          </Form.Item>
          <Form.Item
            name="adminEmail"
            label="Admin Email"
            rules={[
              { required: true, message: 'Please enter admin email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="Admin Email" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            initialValue="admin"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="super_admin">Super Admin</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrganizationManagement; 