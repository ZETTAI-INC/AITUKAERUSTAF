import React, { useState, useRef, useEffect } from 'react';
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
  Tooltip,
  Dropdown,
  Empty,
  Skeleton,
  message,
  Upload,
  Popover,
  Segmented,
} from 'antd';
import {
  SendOutlined,
  PaperClipOutlined,
  UserOutlined,
  RobotOutlined,
  SearchOutlined,
  SmileOutlined,
  PictureOutlined,
  CheckCircleOutlined,
  StarOutlined,
  PushpinOutlined,
  DeleteOutlined,
  CopyOutlined,
  DownloadOutlined,
  SoundOutlined,
  EllipsisOutlined,
  ReloadOutlined,
  MessageOutlined,
  BellOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { mockRequests, mockMessages, statusLabels, getDepartmentById } from '../mock/data';
import type { Message } from '../types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// 絵文字リスト
const emojiList = ['👍', '👏', '🎉', '😊', '🙏', '💪', '✨', '🔥', '💡', '📝', '✅', '❤️'];

const Messages: React.FC = () => {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(mockRequests[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [filterType, setFilterType] = useState<string | number>('all');
  const [pinnedRequests, setPinnedRequests] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeRequests = mockRequests.filter(r => r.status !== 'completed' && r.status !== 'cancelled');

  const filteredRequests = activeRequests.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchText.toLowerCase());
    if (filterType === 'unread') {
      return matchesSearch && mockMessages.filter(m => m.requestId === r.id).some(m => m.senderType === 'staff');
    }
    if (filterType === 'pinned') {
      return matchesSearch && pinnedRequests.includes(r.id);
    }
    return matchesSearch;
  });

  // ピン留めされたものを上に
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    const aPinned = pinnedRequests.includes(a.id);
    const bPinned = pinnedRequests.includes(b.id);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return 0;
  });

  const selectedRequest = mockRequests.find(r => r.id === selectedRequestId);
  const messages = mockMessages.filter(m => m.requestId === selectedRequestId);
  const department = selectedRequest ? getDepartmentById(selectedRequest.departmentId) : null;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setSending(true);

    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 500));

    message.success('メッセージを送信しました');
    setNewMessage('');
    setSending(false);

    // Simulate typing response
    setTyping(true);
    setTimeout(() => setTyping(false), 2000);
  };

  const togglePin = (requestId: string) => {
    setPinnedRequests(prev =>
      prev.includes(requestId)
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  const getMessageActions = () => [
    { key: 'copy', label: 'コピー', icon: <CopyOutlined /> },
    { key: 'star', label: 'スター', icon: <StarOutlined /> },
    { key: 'delete', label: '削除', icon: <DeleteOutlined />, danger: true },
  ];

  const unreadCount = mockMessages.filter(m => m.senderType === 'staff').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            <MessageOutlined style={{ marginRight: 8 }} />
            メッセージ
          </Title>
          <Badge count={unreadCount} style={{ backgroundColor: '#003366' }}>
            <Tag icon={<BellOutlined />}>未読</Tag>
          </Badge>
        </Space>
        <Space>
          <Tooltip title="更新">
            <Button icon={<ReloadOutlined />} onClick={() => message.info('更新しました')} />
          </Tooltip>
          <Tooltip title="通知設定">
            <Button icon={<SoundOutlined />} />
          </Tooltip>
        </Space>
      </div>

      <Row gutter={16} style={{ height: 'calc(100vh - 200px)', minHeight: 600 }}>
        {/* 依頼リスト */}
        <Col xs={24} md={8} lg={7}>
          <Card
            style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: 12 }}
            styles={{ body: { flex: 1, overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' } }}
          >
            {/* ヘッダー */}
            <div style={{ padding: '16px 16px 0' }}>
              <Input
                placeholder="会話を検索..."
                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
                style={{ marginBottom: 12, borderRadius: 8 }}
              />
              <Segmented
                block
                options={[
                  { label: 'すべて', value: 'all' },
                  { label: '未読', value: 'unread', icon: <Badge dot /> },
                  { label: 'ピン留め', value: 'pinned', icon: <PushpinOutlined /> },
                ]}
                value={filterType}
                onChange={setFilterType}
                style={{ marginBottom: 12 }}
              />
            </div>

            {/* リスト */}
            <div style={{ flex: 1, overflow: 'auto' }}>
              <Skeleton loading={loading} active avatar paragraph={{ rows: 2 }}>
                {sortedRequests.length > 0 ? (
                  <List
                    dataSource={sortedRequests}
                    renderItem={(item) => {
                      const hasUnread = mockMessages
                        .filter(m => m.requestId === item.id)
                        .some(m => m.senderType === 'staff');
                      const lastMessage = mockMessages
                        .filter(m => m.requestId === item.id)
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
                      const isPinned = pinnedRequests.includes(item.id);
                      const dept = getDepartmentById(item.departmentId);

                      return (
                        <List.Item
                          style={{
                            cursor: 'pointer',
                            padding: '12px 16px',
                            background: selectedRequestId === item.id
                              ? 'linear-gradient(135deg, #e6f4ff 0%, #f0f7ff 100%)'
                              : 'transparent',
                            borderLeft: selectedRequestId === item.id
                              ? '3px solid #003366'
                              : '3px solid transparent',
                            transition: 'all 0.2s',
                          }}
                          onClick={() => setSelectedRequestId(item.id)}
                          actions={[
                            <Tooltip title={isPinned ? 'ピン解除' : 'ピン留め'}>
                              <Button
                                type="text"
                                size="small"
                                icon={isPinned ? <PushpinOutlined style={{ color: '#003366' }} /> : <PushpinOutlined />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePin(item.id);
                                }}
                              />
                            </Tooltip>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <Badge dot={hasUnread} offset={[-4, 4]}>
                                <Avatar
                                  style={{ backgroundColor: dept?.color || '#003366' }}
                                >
                                  {dept?.name[0] || item.title[0]}
                                </Avatar>
                              </Badge>
                            }
                            title={
                              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                                <Text
                                  ellipsis
                                  strong={hasUnread}
                                  style={{ maxWidth: 120 }}
                                >
                                  {item.title}
                                </Text>
                                {isPinned && <PushpinOutlined style={{ color: '#003366', fontSize: 12 }} />}
                              </Space>
                            }
                            description={
                              <div>
                                <Text
                                  type="secondary"
                                  ellipsis
                                  style={{ fontSize: 12, maxWidth: 150, display: 'block' }}
                                >
                                  {lastMessage?.content || 'メッセージなし'}
                                </Text>
                                <Space size={4} style={{ marginTop: 4 }}>
                                  <Tag color={dept?.color} style={{ fontSize: 11 }}>{dept?.name}</Tag>
                                  <Text type="secondary" style={{ fontSize: 10 }}>
                                    {lastMessage && new Date(lastMessage.createdAt).toLocaleDateString('ja-JP')}
                                  </Text>
                                </Space>
                              </div>
                            }
                          />
                        </List.Item>
                      );
                    }}
                  />
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="該当する会話がありません"
                    style={{ padding: 40 }}
                  />
                )}
              </Skeleton>
            </div>
          </Card>
        </Col>

        {/* メッセージエリア */}
        <Col xs={24} md={16} lg={17}>
          <Card
            style={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 12 }}
            styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 } }}
          >
            {selectedRequest ? (
              <>
                {/* ヘッダー */}
                <div
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #f0f0f0',
                    background: 'linear-gradient(180deg, #fafafa 0%, #fff 100%)',
                  }}
                >
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Space>
                        <Avatar
                          size={40}
                          style={{ backgroundColor: department?.color || '#003366' }}
                        >
                          {department?.name[0] || selectedRequest.title[0]}
                        </Avatar>
                        <div>
                          <div>
                            <Text strong>{selectedRequest.title}</Text>
                            <Tag
                              color={
                                selectedRequest.status === 'in_progress' ? 'processing' :
                                selectedRequest.status === 'review' ? 'warning' : 'default'
                              }
                              style={{ marginLeft: 8 }}
                            >
                              {statusLabels[selectedRequest.status]}
                            </Tag>
                          </div>
                          <Space size={4}>
                            <Tag color={department?.color} style={{ fontSize: 11 }}>{department?.name}</Tag>
                            {selectedRequest.requesterName && (
                              <Text type="secondary" style={{ fontSize: 12 }}>
                                <UserOutlined style={{ marginRight: 4 }} />
                                {selectedRequest.requesterName}
                              </Text>
                            )}
                          </Space>
                        </div>
                      </Space>
                    </Col>
                    <Col>
                      <Space>
                        <Tooltip title="音声通話">
                          <Button icon={<PhoneOutlined />} shape="circle" />
                        </Tooltip>
                        <Tooltip title="ビデオ通話">
                          <Button icon={<VideoCameraOutlined />} shape="circle" />
                        </Tooltip>
                        <Tooltip title="依頼詳細">
                          <Button icon={<InfoCircleOutlined />} shape="circle" />
                        </Tooltip>
                        <Dropdown
                          menu={{
                            items: [
                              { key: 'mute', label: '通知をミュート', icon: <SoundOutlined /> },
                              { key: 'pin', label: 'ピン留め', icon: <PushpinOutlined /> },
                              { key: 'export', label: '会話をエクスポート', icon: <DownloadOutlined /> },
                            ],
                          }}
                        >
                          <Button icon={<EllipsisOutlined />} shape="circle" />
                        </Dropdown>
                      </Space>
                    </Col>
                  </Row>
                </div>

                {/* メッセージリスト */}
                <div
                  style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: '20px',
                    background: '#f8f9fa',
                  }}
                >
                  <Skeleton loading={loading} active avatar paragraph={{ rows: 3 }}>
                    {messages.length > 0 ? (
                      <>
                        {/* 日付区切り */}
                        <div style={{ textAlign: 'center', marginBottom: 20 }}>
                          <Tag style={{ borderRadius: 12 }}>
                            {new Date(messages[0].createdAt).toLocaleDateString('ja-JP', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </Tag>
                        </div>

                        {messages.map((msg: Message) => (
                          <div
                            key={msg.id}
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
                              <Tooltip title={msg.senderName}>
                                <Avatar
                                  icon={msg.senderType === 'customer' ? <UserOutlined /> : <RobotOutlined />}
                                  style={{
                                    backgroundColor: msg.senderType === 'customer' ? '#52c41a' : '#003366',
                                    flexShrink: 0,
                                    cursor: 'pointer',
                                  }}
                                />
                              </Tooltip>
                              <div>
                                <Dropdown
                                  menu={{ items: getMessageActions() }}
                                  trigger={['contextMenu']}
                                >
                                  <div
                                    style={{
                                      background: msg.senderType === 'customer'
                                        ? 'linear-gradient(135deg, #003366 0%, #0055aa 100%)'
                                        : '#fff',
                                      color: msg.senderType === 'customer' ? '#fff' : 'inherit',
                                      padding: '12px 16px',
                                      borderRadius: 16,
                                      borderTopLeftRadius: msg.senderType === 'customer' ? 16 : 4,
                                      borderTopRightRadius: msg.senderType === 'customer' ? 4 : 16,
                                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <Paragraph
                                      style={{
                                        marginBottom: 0,
                                        color: msg.senderType === 'customer' ? '#fff' : 'inherit',
                                      }}
                                    >
                                      {msg.content}
                                    </Paragraph>
                                  </div>
                                </Dropdown>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4,
                                    marginTop: 4,
                                    justifyContent: msg.senderType === 'customer' ? 'flex-end' : 'flex-start',
                                  }}
                                >
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: 11 }}
                                  >
                                    {new Date(msg.createdAt).toLocaleTimeString('ja-JP', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </Text>
                                  {msg.senderType === 'customer' && (
                                    <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* タイピング表示 */}
                        {typing && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                            <Avatar
                              size="small"
                              icon={<RobotOutlined />}
                              style={{ backgroundColor: '#003366' }}
                            />
                            <div
                              style={{
                                background: '#fff',
                                padding: '8px 16px',
                                borderRadius: 16,
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                              }}
                            >
                              <Space>
                                <div className="typing-indicator">
                                  <span></span>
                                  <span></span>
                                  <span></span>
                                </div>
                                <Text type="secondary" style={{ fontSize: 12 }}>入力中...</Text>
                              </Space>
                            </div>
                          </div>
                        )}

                        <div ref={messagesEndRef} />
                      </>
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                          <div>
                            <Text type="secondary">メッセージはまだありません</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              最初のメッセージを送信しましょう
                            </Text>
                          </div>
                        }
                        style={{ padding: 60 }}
                      />
                    )}
                  </Skeleton>
                </div>

                {/* 入力エリア */}
                <div
                  style={{
                    padding: '16px 20px',
                    borderTop: '1px solid #f0f0f0',
                    background: '#fff',
                  }}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                    <Space>
                      <Tooltip title="ファイルを添付">
                        <Upload showUploadList={false}>
                          <Button icon={<PaperClipOutlined />} shape="circle" />
                        </Upload>
                      </Tooltip>
                      <Tooltip title="画像を添付">
                        <Button icon={<PictureOutlined />} shape="circle" />
                      </Tooltip>
                      <Popover
                        content={
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 200 }}>
                            {emojiList.map(emoji => (
                              <Button
                                key={emoji}
                                type="text"
                                style={{ fontSize: 20, padding: 4 }}
                                onClick={() => setNewMessage(prev => prev + emoji)}
                              >
                                {emoji}
                              </Button>
                            ))}
                          </div>
                        }
                        trigger="click"
                        placement="topLeft"
                      >
                        <Tooltip title="絵文字">
                          <Button icon={<SmileOutlined />} shape="circle" />
                        </Tooltip>
                      </Popover>
                    </Space>

                    <TextArea
                      placeholder="メッセージを入力... (Ctrl+Enter で送信)"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      autoSize={{ minRows: 1, maxRows: 4 }}
                      style={{ flex: 1, borderRadius: 20, paddingLeft: 16, paddingRight: 16 }}
                      onPressEnter={(e) => {
                        if (e.ctrlKey || e.metaKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />

                    <Tooltip title="送信 (Ctrl+Enter)">
                      <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleSendMessage}
                        loading={sending}
                        disabled={!newMessage.trim()}
                        style={{
                          background: newMessage.trim()
                            ? 'linear-gradient(135deg, #003366 0%, #0066cc 100%)'
                            : undefined,
                          borderRadius: 20,
                          height: 40,
                          width: 40,
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              </>
            ) : (
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f8f9fa',
                }}
              >
                <Avatar
                  size={80}
                  icon={<MessageOutlined />}
                  style={{ backgroundColor: '#e6f0ff', color: '#003366', marginBottom: 24 }}
                />
                <Title level={4} style={{ color: '#8c8c8c', marginBottom: 8 }}>
                  会話を選択
                </Title>
                <Text type="secondary">
                  左のリストから依頼を選択してメッセージを開始してください
                </Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* CSS for typing indicator */}
      <style>{`
        .typing-indicator {
          display: flex;
          gap: 4px;
        }
        .typing-indicator span {
          width: 6px;
          height: 6px;
          background: #003366;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Messages;
