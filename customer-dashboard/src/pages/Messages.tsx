import React, { useState } from 'react';
import {
  Card,
  List,
  Avatar,
  Typography,
  Badge,
  Input,
  Button,
  Space,
  Tag,
  Row,
  Col,
  Divider,
} from 'antd';
import {
  SendOutlined,
  PaperClipOutlined,
  UserOutlined,
  RobotOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { mockRequests, mockMessages, statusLabels } from '../mock/data';
import type { Message } from '../types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const Messages: React.FC = () => {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(mockRequests[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');
  const [searchText, setSearchText] = useState('');

  const activeRequests = mockRequests.filter(r => r.status !== 'completed' && r.status !== 'cancelled');

  const filteredRequests = activeRequests.filter(r =>
    r.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const selectedRequest = mockRequests.find(r => r.id === selectedRequestId);
  const messages = mockMessages.filter(m => m.requestId === selectedRequestId);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    console.log('Send message:', newMessage);
    setNewMessage('');
  };

  return (
    <div>
      <Title level={4} style={{ marginBottom: 24 }}>メッセージ</Title>

      <Row gutter={16} style={{ height: 'calc(100vh - 200px)', minHeight: 500 }}>
        {/* 依頼リスト */}
        <Col xs={24} md={8} lg={6}>
          <Card
            style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, overflow: 'auto', padding: 0 }}
            title={
              <Input
                placeholder="検索..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
                size="small"
              />
            }
          >
            <List
              dataSource={filteredRequests}
              renderItem={(item) => {
                const hasUnread = mockMessages
                  .filter(m => m.requestId === item.id)
                  .some(m => m.senderType === 'staff');

                return (
                  <List.Item
                    style={{
                      cursor: 'pointer',
                      padding: '12px 16px',
                      background: selectedRequestId === item.id ? '#e6f4ff' : 'transparent',
                      borderLeft: selectedRequestId === item.id ? '3px solid #003366' : '3px solid transparent',
                    }}
                    onClick={() => setSelectedRequestId(item.id)}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge dot={hasUnread}>
                          <Avatar style={{ backgroundColor: '#003366' }}>
                            {item.title[0]}
                          </Avatar>
                        </Badge>
                      }
                      title={
                        <Text
                          ellipsis
                          strong={hasUnread}
                          style={{ maxWidth: 150 }}
                        >
                          {item.title}
                        </Text>
                      }
                      description={
                        <Tag size="small">
                          {statusLabels[item.status]}
                        </Tag>
                      }
                    />
                  </List.Item>
                );
              }}
              locale={{ emptyText: '進行中の依頼はありません' }}
            />
          </Card>
        </Col>

        {/* メッセージエリア */}
        <Col xs={24} md={16} lg={18}>
          <Card
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            title={
              selectedRequest ? (
                <Space>
                  <Text strong>{selectedRequest.title}</Text>
                  <Tag>{statusLabels[selectedRequest.status]}</Tag>
                </Space>
              ) : (
                '依頼を選択してください'
              )
            }
          >
            {selectedRequest ? (
              <>
                {/* メッセージリスト */}
                <div style={{ flex: 1, overflow: 'auto', marginBottom: 16 }}>
                  {messages.length > 0 ? (
                    <List
                      dataSource={messages}
                      renderItem={(msg: Message) => (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: msg.senderType === 'customer' ? 'flex-end' : 'flex-start',
                            marginBottom: 16,
                          }}
                        >
                          <div
                            style={{
                              maxWidth: '70%',
                              display: 'flex',
                              flexDirection: msg.senderType === 'customer' ? 'row-reverse' : 'row',
                              gap: 8,
                            }}
                          >
                            <Avatar
                              icon={msg.senderType === 'customer' ? <UserOutlined /> : <RobotOutlined />}
                              style={{
                                backgroundColor: msg.senderType === 'customer' ? '#52c41a' : '#003366',
                                flexShrink: 0,
                              }}
                            />
                            <div>
                              <div
                                style={{
                                  background: msg.senderType === 'customer' ? '#e6f7ff' : '#f5f5f5',
                                  padding: '12px 16px',
                                  borderRadius: 12,
                                  borderTopLeftRadius: msg.senderType === 'customer' ? 12 : 0,
                                  borderTopRightRadius: msg.senderType === 'customer' ? 0 : 12,
                                }}
                              >
                                <Text strong style={{ display: 'block', marginBottom: 4 }}>
                                  {msg.senderName}
                                </Text>
                                <Paragraph style={{ marginBottom: 0 }}>
                                  {msg.content}
                                </Paragraph>
                              </div>
                              <Text
                                type="secondary"
                                style={{
                                  fontSize: 11,
                                  display: 'block',
                                  textAlign: msg.senderType === 'customer' ? 'right' : 'left',
                                  marginTop: 4,
                                }}
                              >
                                {new Date(msg.createdAt).toLocaleString('ja-JP')}
                              </Text>
                            </div>
                          </div>
                        </div>
                      )}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                      <Text type="secondary">メッセージはまだありません</Text>
                    </div>
                  )}
                </div>

                <Divider style={{ margin: '8px 0' }} />

                {/* 入力エリア */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <TextArea
                    placeholder="メッセージを入力..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    style={{ flex: 1 }}
                    onPressEnter={(e) => {
                      if (e.ctrlKey || e.metaKey) {
                        handleSendMessage();
                      }
                    }}
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
                <Text type="secondary" style={{ fontSize: 11, marginTop: 4 }}>
                  Ctrl + Enter で送信
                </Text>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text type="secondary">左のリストから依頼を選択してください</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Messages;
