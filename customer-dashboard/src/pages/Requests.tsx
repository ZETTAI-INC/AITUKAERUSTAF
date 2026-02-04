import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Select,
  Typography,
  Badge,
  Tooltip,
  Dropdown,
  Avatar,
  Row,
  Col,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  MoreOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { mockRequests, categoryLabels, statusLabels, mockDepartments, getDepartmentById, mockDepartmentStats } from '../mock/data';
import type { ServiceRequest, RequestStatus, RequestCategory } from '../types';

const { Title, Text } = Typography;

const statusColors: Record<RequestStatus, string> = {
  pending: 'default',
  in_progress: 'processing',
  review: 'warning',
  completed: 'success',
  cancelled: 'error',
};

const priorityColors: Record<string, string> = {
  low: 'default',
  medium: 'blue',
  high: 'red',
};

const priorityLabels: Record<string, string> = {
  low: '低',
  medium: '中',
  high: '高',
};

const Requests: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<RequestCategory | 'all'>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || request.category === categoryFilter;
    const matchesDepartment = departmentFilter === 'all' || request.departmentId === departmentFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesDepartment;
  });

  const getActionMenu = (record: ServiceRequest): MenuProps['items'] => [
    {
      key: 'view',
      label: '詳細を見る',
      icon: <EyeOutlined />,
      onClick: () => navigate(`/requests/${record.id}`),
    },
  ];

  const columns: ColumnsType<ServiceRequest> = [
    {
      title: '依頼内容',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <Text strong style={{ cursor: 'pointer' }} onClick={() => navigate(`/requests/${record.id}`)}>
            {text}
          </Text>
          <div style={{ marginTop: 4 }}>
            <Tag style={{ marginRight: 4 }}>{categoryLabels[record.category]}</Tag>
          </div>
        </div>
      ),
    },
    {
      title: '部門',
      dataIndex: 'departmentId',
      key: 'department',
      width: 150,
      render: (departmentId: string, record) => {
        const dept = getDepartmentById(departmentId);
        return dept ? (
          <Space>
            <Avatar
              size="small"
              style={{ backgroundColor: dept.color }}
            >
              {dept.name[0]}
            </Avatar>
            <div>
              <Text style={{ fontSize: 13 }}>{dept.name}</Text>
              {record.requesterName && (
                <div>
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    <UserOutlined style={{ marginRight: 4 }} />
                    {record.requesterName}
                  </Text>
                </div>
              )}
            </div>
          </Space>
        ) : '-';
      },
      filters: mockDepartments.map(dept => ({ text: dept.name, value: dept.id })),
      onFilter: (value, record) => record.departmentId === value,
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: RequestStatus) => (
        <Badge status={statusColors[status] as any} text={statusLabels[status]} />
      ),
    },
    {
      title: '優先度',
      dataIndex: 'priority',
      key: 'priority',
      width: 80,
      render: (priority: string) => (
        <Tag color={priorityColors[priority]}>{priorityLabels[priority]}</Tag>
      ),
    },
    {
      title: '稼働時間',
      key: 'hours',
      width: 120,
      render: (_, record) => (
        <Tooltip title={`見積: ${record.estimatedHours}時間`}>
          <Space>
            <ClockCircleOutlined />
            <Text>
              {record.actualHours ?? '-'} / {record.estimatedHours}h
            </Text>
          </Space>
        </Tooltip>
      ),
    },
    {
      title: '期限',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 110,
      render: (date: string | undefined) => (
        date ? (
          <Text type={new Date(date) < new Date() ? 'danger' : undefined}>
            {new Date(date).toLocaleDateString('ja-JP')}
          </Text>
        ) : '-'
      ),
    },
    {
      title: '更新日',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 110,
      render: (date: string) => new Date(date).toLocaleDateString('ja-JP'),
      sorter: (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      defaultSortOrder: 'ascend',
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: (_, record) => (
        <Dropdown menu={{ items: getActionMenu(record) }} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>依頼管理</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/requests/new')}
          style={{ background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)' }}
        >
          新しい依頼を作成
        </Button>
      </div>

      {/* 部門別サマリー */}
      <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
        {mockDepartmentStats.slice(0, 6).map((stat) => {
          const dept = getDepartmentById(stat.departmentId);
          const isSelected = departmentFilter === stat.departmentId;
          return (
            <Col xs={12} sm={8} md={4} key={stat.departmentId}>
              <Card
                size="small"
                hoverable
                onClick={() => setDepartmentFilter(isSelected ? 'all' : stat.departmentId)}
                style={{
                  borderRadius: 8,
                  border: isSelected ? `2px solid ${dept?.color}` : '1px solid #f0f0f0',
                  background: isSelected ? `${dept?.color}10` : '#fff',
                }}
                bodyStyle={{ padding: '12px 16px' }}
              >
                <Space>
                  <Avatar
                    size={32}
                    style={{ backgroundColor: dept?.color }}
                  >
                    {dept?.name[0]}
                  </Avatar>
                  <div>
                    <Text style={{ fontSize: 12, display: 'block' }}>{dept?.name}</Text>
                    <Text strong style={{ fontSize: 16 }}>{stat.requestCount}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}> 件</Text>
                  </div>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Card style={{ borderRadius: 12 }}>
        {/* フィルター */}
        <Space wrap style={{ marginBottom: 16 }}>
          <Input
            placeholder="依頼内容を検索..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            allowClear
          />
          <Select
            value={departmentFilter}
            onChange={setDepartmentFilter}
            style={{ width: 160 }}
            suffixIcon={<TeamOutlined />}
            options={[
              { value: 'all', label: 'すべての部門' },
              ...mockDepartments.map(dept => ({
                value: dept.id,
                label: (
                  <Space>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: dept.color,
                      }}
                    />
                    {dept.name}
                  </Space>
                ),
              })),
            ]}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150 }}
            options={[
              { value: 'all', label: 'すべてのステータス' },
              { value: 'pending', label: '受付中' },
              { value: 'in_progress', label: '作業中' },
              { value: 'review', label: 'レビュー待ち' },
              { value: 'completed', label: '完了' },
              { value: 'cancelled', label: 'キャンセル' },
            ]}
          />
          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: 200 }}
            options={[
              { value: 'all', label: 'すべてのカテゴリ' },
              ...Object.entries(categoryLabels).map(([value, label]) => ({
                value,
                label,
              })),
            ]}
          />
          {(departmentFilter !== 'all' || statusFilter !== 'all' || categoryFilter !== 'all' || searchText) && (
            <Button
              type="link"
              onClick={() => {
                setDepartmentFilter('all');
                setStatusFilter('all');
                setCategoryFilter('all');
                setSearchText('');
              }}
            >
              フィルタをクリア
            </Button>
          )}
        </Space>

        {/* テーブル */}
        <Table
          columns={columns}
          dataSource={filteredRequests}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `全 ${total} 件`,
          }}
          onRow={(record) => ({
            onClick: () => navigate(`/requests/${record.id}`),
            style: { cursor: 'pointer' },
          })}
        />
      </Card>
    </div>
  );
};

export default Requests;
