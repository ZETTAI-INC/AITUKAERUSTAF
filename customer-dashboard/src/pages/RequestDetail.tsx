import React, { useState } from 'react';
import {
  Card,
  Descriptions,
  Tag,
  Typography,
  Button,
  Space,
  Timeline,
  Input,
  Avatar,
  List,
  Divider,
  Badge,
  Row,
  Col,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  SendOutlined,
  UserOutlined,
  RobotOutlined,
  PaperClipOutlined,
  ClockCircleOutlined,
  EditOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { mockRequests, mockMessages, categoryLabels, statusLabels, getDepartmentById } from '../mock/data';
import type { Message } from '../types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const statusColors: Record<string, string> = {
  pending: 'default',
  in_progress: 'processing',
  review: 'warning',
  completed: 'success',
  cancelled: 'error',
};

const priorityLabels: Record<string, string> = {
  low: '低',
  medium: '中',
  high: '高',
};

const RequestDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [newMessage, setNewMessage] = useState('');

  const request = mockRequests.find(r => r.id === id);
  const messages = mockMessages.filter(m => m.requestId === id);
  const department = request ? getDepartmentById(request.departmentId) : undefined;

  if (!request) {
    return (
      <Card>
        <Text>依頼が見つかりませんでした。</Text>
        <Button type="link" onClick={() => navigate('/requests')}>
          一覧に戻る
        </Button>
      </Card>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    message.success('メッセージを送信しました');
    setNewMessage('');
  };

  const timelineItems = [
    {
      color: 'green',
      children: (
        <div>
          <Text strong>依頼を作成</Text>
          <br />
          <Text type="secondary">{new Date(request.createdAt).toLocaleString('ja-JP')}</Text>
        </div>
      ),
    },
    ...(request.status !== 'pending' ? [{
      color: 'blue',
      children: (
        <div>
          <Text strong>作業開始</Text>
          <br />
          <Text type="secondary">作業を開始しました</Text>
        </div>
      ),
    }] : []),
    ...(request.status === 'review' || request.status === 'completed' ? [{
      color: 'orange',
      children: (
        <div>
          <Text strong>レビュー待ち</Text>
          <br />
          <Text type="secondary">成果物のレビューをお願いします</Text>
        </div>
      ),
    }] : []),
    ...(request.status === 'completed' ? [{
      color: 'green',
      children: (
        <div>
          <Text strong>完了</Text>
          <br />
          <Text type="secondary">{new Date(request.updatedAt).toLocaleString('ja-JP')}</Text>
        </div>
      ),
    }] : []),
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/requests')}
        >
          一覧に戻る
        </Button>
      </Space>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          {/* 依頼詳細 */}
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <Title level={4} style={{ margin: 0 }}>{request.title}</Title>
                <Space style={{ marginTop: 8 }} wrap>
                  <Tag>{categoryLabels[request.category]}</Tag>
                  <Badge status={statusColors[request.status] as any} text={statusLabels[request.status]} />
                </Space>
              </div>
              {request.status !== 'completed' && (
                <Button icon={<EditOutlined />}>編集</Button>
              )}
            </div>

            {/* 部門情報 */}
            {department && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: `${department.color}10`,
                  borderRadius: 8,
                  marginBottom: 16,
                  borderLeft: `3px solid ${department.color}`,
                }}
              >
                <Avatar
                  size={40}
                  style={{ backgroundColor: department.color, marginRight: 12 }}
                >
                  {department.name[0]}
                </Avatar>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TeamOutlined style={{ color: department.color }} />
                    <Text strong>{department.name}</Text>
                  </div>
                  {request.requesterName && (
                    <div style={{ fontSize: 12, color: '#666' }}>
                      <UserOutlined style={{ marginRight: 4 }} />
                      依頼者: {request.requesterName}
                    </div>
                  )}
                </div>
              </div>
            )}

            <Descriptions column={2} size="small">
              <Descriptions.Item label="優先度">
                <Tag color={request.priority === 'high' ? 'red' : request.priority === 'medium' ? 'blue' : 'default'}>
                  {priorityLabels[request.priority]}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="期限">
                {request.dueDate ? new Date(request.dueDate).toLocaleDateString('ja-JP') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="見積時間">
                {request.estimatedHours}時間
              </Descriptions.Item>
              <Descriptions.Item label="実績時間">
                {request.actualHours ?? '-'}時間
              </Descriptions.Item>
              <Descriptions.Item label="作成日" span={2}>
                {new Date(request.createdAt).toLocaleString('ja-JP')}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={5}>依頼内容</Title>
            <Paragraph>{request.description}</Paragraph>
          </Card>

          {/* メッセージ */}
          <Card title="メッセージ" style={{ marginBottom: 16, borderRadius: 12 }}>
            <List
              dataSource={messages}
              renderItem={(msg: Message) => (
                <List.Item
                  style={{
                    background: msg.senderType === 'customer' ? '#f6ffed' : '#f0f5ff',
                    padding: 16,
                    marginBottom: 8,
                    borderRadius: 8,
                    border: 'none',
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={msg.senderType === 'customer' ? <UserOutlined /> : <RobotOutlined />}
                        style={{
                          backgroundColor: msg.senderType === 'customer' ? '#52c41a' : '#003366',
                        }}
                      />
                    }
                    title={
                      <Space>
                        <Text strong>{msg.senderName}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {new Date(msg.createdAt).toLocaleString('ja-JP')}
                        </Text>
                      </Space>
                    }
                    description={
                      <Paragraph style={{ marginBottom: 0, marginTop: 8 }}>
                        {msg.content}
                      </Paragraph>
                    }
                  />
                </List.Item>
              )}
              locale={{ emptyText: 'メッセージはまだありません' }}
            />

            <Divider />

            <div style={{ display: 'flex', gap: 8 }}>
              <TextArea
                placeholder="メッセージを入力..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                autoSize={{ minRows: 2, maxRows: 4 }}
                style={{ flex: 1 }}
              />
              <Space direction="vertical">
                <Button icon={<PaperClipOutlined />} />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  style={{ background: '#003366' }}
                />
              </Space>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* 部門情報カード */}
          {department && (
            <Card
              title={
                <Space>
                  <TeamOutlined />
                  <span>部門情報</span>
                </Space>
              }
              style={{ marginBottom: 16, borderRadius: 12 }}
            >
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <Avatar
                  size={64}
                  style={{ backgroundColor: department.color, marginBottom: 12 }}
                >
                  <span style={{ fontSize: 24 }}>{department.name[0]}</span>
                </Avatar>
                <div>
                  <Text strong style={{ fontSize: 16 }}>{department.name}</Text>
                </div>
                <Text type="secondary">{department.code}</Text>
                {department.managerName && (
                  <div style={{ marginTop: 12 }}>
                    <Text type="secondary">部門長: {department.managerName}</Text>
                  </div>
                )}
              </div>
              {request.requesterName && (
                <>
                  <Divider style={{ margin: '12px 0' }} />
                  <div style={{ textAlign: 'center' }}>
                    <Text type="secondary">依頼者</Text>
                    <div>
                      <Avatar size={32} icon={<UserOutlined />} style={{ marginRight: 8 }} />
                      <Text strong>{request.requesterName}</Text>
                    </div>
                  </div>
                </>
              )}
            </Card>
          )}

          {/* 進捗タイムライン */}
          <Card title="進捗状況" style={{ marginBottom: 16, borderRadius: 12 }}>
            <Timeline items={timelineItems} />
          </Card>

          {/* 稼働時間 */}
          <Card title="稼働時間" style={{ borderRadius: 12 }}>
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <ClockCircleOutlined style={{ fontSize: 32, color: '#003366', marginBottom: 8 }} />
              <div>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                  {request.actualHours ?? 0}
                </Text>
                <Text type="secondary"> / {request.estimatedHours}時間</Text>
              </div>
              <Text type="secondary">使用済み / 見積</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RequestDetail;
