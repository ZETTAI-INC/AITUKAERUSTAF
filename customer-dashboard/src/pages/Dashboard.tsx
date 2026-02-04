import React from 'react';
import { Row, Col, Card, Statistic, Progress, List, Tag, Typography, Button, Space, Avatar, Tooltip } from 'antd';
import {
  ClockCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  RightOutlined,
  BulbOutlined,
  RocketOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  CalendarOutlined,
  ArrowUpOutlined,
  StarFilled,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, PieChart, Pie, Cell } from 'recharts';
import {
  mockUsageStats,
  mockRequests,
  mockNewsReports,
  mockUser,
  categoryLabels,
  statusLabels,
} from '../mock/data';
import type { ServiceRequest } from '../types';

const { Title, Text, Paragraph } = Typography;

const statusColors: Record<string, string> = {
  pending: 'default',
  in_progress: 'processing',
  review: 'warning',
  completed: 'success',
  cancelled: 'error',
};

const COLORS = ['#003366', '#0066cc', '#00a0e9', '#e8e8e8'];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const usedPercentage = (mockUsageStats.usedHours / mockUsageStats.totalHours) * 100;

  const pendingRequests = mockRequests.filter(r => r.status === 'pending').length;
  const inProgressRequests = mockRequests.filter(r => r.status === 'in_progress' || r.status === 'review').length;
  const completedRequests = mockRequests.filter(r => r.status === 'completed').length;

  const chartData = mockUsageStats.monthlyBreakdown.map(item => ({
    name: item.month.split('-')[1] + '月',
    稼働時間: item.hours,
    依頼数: item.requests,
  }));

  const pieData = [
    { name: '完了', value: completedRequests },
    { name: '進行中', value: inProgressRequests },
    { name: '受付中', value: pendingRequests },
  ];

  const recentRequests = [...mockRequests]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  const unreadNews = mockNewsReports.filter(n => !n.isRead).slice(0, 3);

  const today = new Date();
  const greeting = today.getHours() < 12 ? 'おはようございます' : today.getHours() < 18 ? 'こんにちは' : 'こんばんは';

  return (
    <div>
      {/* ウェルカムバナー */}
      <Card
        style={{
          marginBottom: 24,
          background: 'linear-gradient(135deg, #001529 0%, #003366 50%, #0066cc 100%)',
          border: 'none',
          borderRadius: 16,
          overflow: 'hidden',
          position: 'relative',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            right: 100,
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
          }}
        />
        <Row align="middle">
          <Col xs={24} md={16}>
            <div style={{ padding: '32px 40px' }}>
              <Space align="center" style={{ marginBottom: 8 }}>
                <StarFilled style={{ color: '#ffd700', fontSize: 20 }} />
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
                  スタンダードプランをご利用中
                </Text>
              </Space>
              <Title level={3} style={{ color: '#fff', margin: '8px 0 16px' }}>
                {greeting}、{mockUser.name}さん
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, marginBottom: 24, maxWidth: 500 }}>
                今月の稼働時間は残り <Text strong style={{ color: '#fff', fontSize: 18 }}>{mockUsageStats.remainingHours}時間</Text> です。
                新しい依頼を作成して、業務効率化を進めましょう。
              </Paragraph>
              <Space>
                <Button
                  type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  onClick={() => navigate('/requests/new')}
                  style={{
                    background: '#fff',
                    color: '#003366',
                    border: 'none',
                    fontWeight: 600,
                    height: 44,
                    paddingLeft: 24,
                    paddingRight: 24,
                  }}
                >
                  新しい依頼を作成
                </Button>
                <Button
                  size="large"
                  ghost
                  onClick={() => navigate('/requests')}
                  style={{ height: 44, borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}
                >
                  依頼一覧
                </Button>
              </Space>
            </div>
          </Col>
          <Col xs={0} md={8}>
            <div style={{ padding: '24px 40px 24px 0', textAlign: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Progress
                  type="circle"
                  percent={Math.round(usedPercentage)}
                  size={160}
                  strokeColor={{
                    '0%': '#00d4ff',
                    '100%': '#0099ff',
                  }}
                  trailColor="rgba(255,255,255,0.15)"
                  format={(percent) => (
                    <div style={{ color: '#fff' }}>
                      <div style={{ fontSize: 32, fontWeight: 700 }}>{percent}%</div>
                      <div style={{ fontSize: 12, opacity: 0.8 }}>使用済み</div>
                    </div>
                  )}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 統計カード */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{ borderRadius: 12, cursor: 'default' }}
            bodyStyle={{ padding: 20 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 13 }}>残り稼働時間</Text>
                <div style={{ marginTop: 8 }}>
                  <Text style={{ fontSize: 32, fontWeight: 700, color: '#003366' }}>
                    {mockUsageStats.remainingHours}
                  </Text>
                  <Text type="secondary"> / 30時間</Text>
                </div>
                <Progress
                  percent={usedPercentage}
                  strokeColor={{ '0%': '#003366', '100%': '#0066cc' }}
                  showInfo={false}
                  size="small"
                  style={{ marginTop: 12 }}
                />
              </div>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #e6f0ff 0%, #cce0ff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ClockCircleOutlined style={{ fontSize: 24, color: '#003366' }} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{ borderRadius: 12, cursor: 'pointer' }}
            bodyStyle={{ padding: 20 }}
            onClick={() => navigate('/requests')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 13 }}>受付中の依頼</Text>
                <div style={{ marginTop: 8 }}>
                  <Text style={{ fontSize: 32, fontWeight: 700, color: '#faad14' }}>
                    {pendingRequests}
                  </Text>
                  <Text type="secondary"> 件</Text>
                </div>
                <Text type="secondary" style={{ fontSize: 12, marginTop: 12, display: 'block' }}>
                  クリックして確認 →
                </Text>
              </div>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileTextOutlined style={{ fontSize: 24, color: '#faad14' }} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{ borderRadius: 12, cursor: 'pointer' }}
            bodyStyle={{ padding: 20 }}
            onClick={() => navigate('/requests')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 13 }}>進行中の依頼</Text>
                <div style={{ marginTop: 8 }}>
                  <Text style={{ fontSize: 32, fontWeight: 700, color: '#1890ff' }}>
                    {inProgressRequests}
                  </Text>
                  <Text type="secondary"> 件</Text>
                </div>
                <Space style={{ marginTop: 12 }}>
                  <SyncOutlined spin style={{ color: '#1890ff', fontSize: 12 }} />
                  <Text type="secondary" style={{ fontSize: 12 }}>作業中</Text>
                </Space>
              </div>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ThunderboltOutlined style={{ fontSize: 24, color: '#1890ff' }} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            hoverable
            style={{ borderRadius: 12, cursor: 'pointer' }}
            bodyStyle={{ padding: 20 }}
            onClick={() => navigate('/requests')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 13 }}>完了した依頼</Text>
                <div style={{ marginTop: 8 }}>
                  <Text style={{ fontSize: 32, fontWeight: 700, color: '#52c41a' }}>
                    {completedRequests}
                  </Text>
                  <Text type="secondary"> 件</Text>
                </div>
                <Space style={{ marginTop: 12 }}>
                  <TrophyOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                  <Text type="secondary" style={{ fontSize: 12 }}>今月の実績</Text>
                </Space>
              </div>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a' }} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* グラフセクション */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <Space>
                <CalendarOutlined />
                <span>稼働時間推移</span>
              </Space>
            }
            extra={
              <Space>
                <Tag color="blue">過去6ヶ月</Tag>
                <Tooltip title="前月比 +5%">
                  <Space style={{ color: '#52c41a' }}>
                    <ArrowUpOutlined />
                    <Text style={{ color: '#52c41a', fontSize: 12 }}>5%</Text>
                  </Space>
                </Tooltip>
              </Space>
            }
            style={{ borderRadius: 12 }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003366" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#003366" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#8c8c8c', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#8c8c8c', fontSize: 12 }}
                />
                <RechartsTooltip
                  contentStyle={{
                    background: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="稼働時間"
                  stroke="#003366"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorHours)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="クイックアクション" style={{ borderRadius: 12, height: '100%' }}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <Button
                type="primary"
                icon={<RocketOutlined />}
                block
                size="large"
                onClick={() => navigate('/requests/new')}
                style={{
                  background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)',
                  height: 48,
                  borderRadius: 8,
                }}
              >
                新しい依頼を作成
              </Button>
              <Button
                icon={<FileTextOutlined />}
                block
                size="large"
                onClick={() => navigate('/requests')}
                style={{ height: 48, borderRadius: 8 }}
              >
                依頼一覧を見る
              </Button>
              <Button
                icon={<BulbOutlined />}
                block
                size="large"
                onClick={() => navigate('/news')}
                style={{ height: 48, borderRadius: 8 }}
              >
                AIニュースを読む
              </Button>
            </Space>

            <div style={{ marginTop: 24, padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>依頼状況</Text>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
                <PieChart width={120} height={120}>
                  <Pie
                    data={pieData}
                    cx={55}
                    cy={55}
                    innerRadius={35}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
                {pieData.map((item, index) => (
                  <Space key={item.name} size={4}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[index] }} />
                    <Text style={{ fontSize: 11 }}>{item.name}</Text>
                  </Space>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 最近の依頼と未読ニュース */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={14}>
          <Card
            title={
              <Space>
                <FileTextOutlined />
                <span>最近の依頼</span>
              </Space>
            }
            extra={
              <Button type="link" onClick={() => navigate('/requests')} style={{ padding: 0 }}>
                すべて見る <RightOutlined />
              </Button>
            }
            style={{ borderRadius: 12 }}
          >
            <List
              dataSource={recentRequests}
              renderItem={(item: ServiceRequest) => (
                <List.Item
                  style={{
                    cursor: 'pointer',
                    padding: '16px 0',
                    borderRadius: 8,
                    transition: 'background 0.2s',
                  }}
                  onClick={() => navigate(`/requests/${item.id}`)}
                  actions={[
                    <Tag color={statusColors[item.status]} style={{ borderRadius: 4 }}>
                      {statusLabels[item.status]}
                    </Tag>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)',
                        }}
                      >
                        {item.title[0]}
                      </Avatar>
                    }
                    title={<Text strong>{item.title}</Text>}
                    description={
                      <Space>
                        <Tag style={{ borderRadius: 4 }}>{categoryLabels[item.category]}</Tag>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {new Date(item.updatedAt).toLocaleDateString('ja-JP')}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card
            title={
              <Space>
                <BulbOutlined />
                <span>AIニュースレポート</span>
                {unreadNews.length > 0 && (
                  <Tag color="red" style={{ borderRadius: 10 }}>{unreadNews.length}件未読</Tag>
                )}
              </Space>
            }
            extra={
              <Button type="link" onClick={() => navigate('/news')} style={{ padding: 0 }}>
                すべて見る <RightOutlined />
              </Button>
            }
            style={{ borderRadius: 12 }}
          >
            <List
              dataSource={unreadNews}
              renderItem={(item) => (
                <List.Item
                  style={{
                    cursor: 'pointer',
                    padding: '12px 0',
                  }}
                  onClick={() => navigate(`/news/${item.id}`)}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<BulbOutlined />}
                        style={{
                          background: item.isRead
                            ? '#f0f0f0'
                            : 'linear-gradient(135deg, #003366 0%, #0066cc 100%)',
                        }}
                      />
                    }
                    title={
                      <Text strong={!item.isRead}>{item.title}</Text>
                    }
                    description={
                      <Paragraph
                        ellipsis={{ rows: 2 }}
                        style={{ marginBottom: 0, fontSize: 12, color: '#8c8c8c' }}
                      >
                        {item.summary}
                      </Paragraph>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
