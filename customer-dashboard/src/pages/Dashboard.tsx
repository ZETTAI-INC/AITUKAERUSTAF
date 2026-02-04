import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Progress,
  List,
  Tag,
  Typography,
  Button,
  Space,
  Avatar,
  Tooltip,
  Badge,
  Segmented,
  Steps,
  Alert,
  Skeleton,
  Descriptions,
  Timeline,
  Divider,
  FloatButton,
  notification,
  Modal,
  Rate,
} from 'antd';
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
  BellOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  PlusOutlined,
  FireOutlined,
  CrownOutlined,
  GiftOutlined,
  LineChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import {
  mockUsageStats,
  mockRequests,
  mockNewsReports,
  mockUser,
  categoryLabels,
  statusLabels,
  mockDepartments,
  mockDepartmentStats,
  getDepartmentById,
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

const COLORS = ['#52c41a', '#1890ff', '#faad14', '#e8e8e8'];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<string | number>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const departmentChartData = mockDepartmentStats.slice(0, 5).map(stat => {
    const dept = getDepartmentById(stat.departmentId);
    return {
      name: dept?.name?.slice(0, 4) || '',
      依頼数: stat.requestCount,
      稼働時間: stat.usedHours,
    };
  });

  const recentRequests = [...mockRequests]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  const unreadNews = mockNewsReports.filter(n => !n.isRead).slice(0, 3);

  const today = new Date();
  const greeting = today.getHours() < 12 ? 'おはようございます' : today.getHours() < 18 ? 'こんにちは' : 'こんばんは';

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Show welcome notification on first load
  useEffect(() => {
    const hasShownWelcome = sessionStorage.getItem('welcomeShown');
    if (!hasShownWelcome) {
      setTimeout(() => {
        notification.success({
          message: 'ようこそ OTASUKE AI へ',
          description: '本日も業務効率化のお手伝いをいたします。新しい依頼をお待ちしております。',
          icon: <RocketOutlined style={{ color: '#003366' }} />,
          placement: 'topRight',
          duration: 5,
        });
        sessionStorage.setItem('welcomeShown', 'true');
      }, 1000);
    }
  }, []);

  // Steps for onboarding
  const onboardingSteps = [
    {
      title: '依頼作成',
      description: '業務内容を登録',
    },
    {
      title: 'AI対応',
      description: '専門チームが作業',
    },
    {
      title: 'レビュー',
      description: '成果物を確認',
    },
    {
      title: '完了',
      description: '業務効率化達成',
    },
  ];

  const currentStep = completedRequests > 0 ? 3 : inProgressRequests > 0 ? 1 : pendingRequests > 0 ? 0 : 0;

  return (
    <div>
      {/* 新機能アラート */}
      <Alert
        message="新機能のお知らせ"
        description={
          <Space>
            <span>部門別の依頼管理機能が追加されました。チームごとに効率的に依頼を管理できます。</span>
            <Button type="link" size="small" onClick={() => navigate('/requests')}>
              詳細を見る
            </Button>
          </Space>
        }
        type="info"
        showIcon
        icon={<GiftOutlined />}
        closable
        style={{ marginBottom: 24, borderRadius: 8 }}
      />

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
        styles={{ body: { padding: 0 } }}
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
                <Badge status="success" />
                <Tag color="gold" icon={<CrownOutlined />} style={{ borderRadius: 12 }}>
                  スタンダードプラン
                </Tag>
                <Rate disabled defaultValue={5} style={{ fontSize: 12 }} />
              </Space>
              <Title level={3} style={{ color: '#fff', margin: '8px 0 16px' }}>
                {greeting}、{mockUser.name}さん
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, marginBottom: 24, maxWidth: 500 }}>
                今月の稼働時間は残り <Text strong style={{ color: '#fff', fontSize: 18 }}>{mockUsageStats.remainingHours}時間</Text> です。
                新しい依頼を作成して、業務効率化を進めましょう。
              </Paragraph>
              <Space size="middle">
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
                    height: 48,
                    paddingLeft: 28,
                    paddingRight: 28,
                    borderRadius: 8,
                  }}
                >
                  新しい依頼を作成
                </Button>
                <Button
                  size="large"
                  ghost
                  onClick={() => navigate('/requests')}
                  style={{ height: 48, borderColor: 'rgba(255,255,255,0.5)', color: '#fff', borderRadius: 8 }}
                >
                  依頼一覧
                </Button>
                <Button
                  size="large"
                  ghost
                  icon={<QuestionCircleOutlined />}
                  onClick={() => setIsModalOpen(true)}
                  style={{ height: 48, borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)', borderRadius: 8 }}
                >
                  使い方
                </Button>
              </Space>
            </div>
          </Col>
          <Col xs={0} md={8}>
            <div style={{ padding: '24px 40px 24px 0', textAlign: 'center' }}>
              <Tooltip title={`使用済み: ${mockUsageStats.usedHours}時間 / 残り: ${mockUsageStats.remainingHours}時間`}>
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
              </Tooltip>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 使い方モーダル */}
      <Modal
        title={
          <Space>
            <RocketOutlined style={{ color: '#003366' }} />
            <span>OTASUKE AI の使い方</span>
          </Space>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsModalOpen(false)}>
            閉じる
          </Button>,
        ]}
        width={600}
      >
        <Steps
          direction="vertical"
          current={-1}
          items={[
            {
              title: 'STEP 1: 依頼を作成',
              description: '「新しい依頼を作成」から業務内容を登録します。カテゴリ、詳細、期限を設定してください。',
              icon: <FileTextOutlined />,
            },
            {
              title: 'STEP 2: AIチームが対応',
              description: '専門のAIスタッフが依頼内容を確認し、作業を開始します。進捗はリアルタイムで確認できます。',
              icon: <TeamOutlined />,
            },
            {
              title: 'STEP 3: 成果物をレビュー',
              description: '完成した成果物をご確認ください。修正が必要な場合はメッセージでやり取りできます。',
              icon: <CheckCircleOutlined />,
            },
            {
              title: 'STEP 4: 完了',
              description: '問題なければ完了となります。稼働時間は自動で計算されます。',
              icon: <TrophyOutlined />,
            },
          ]}
        />
        <Divider />
        <Alert
          message="サポートが必要ですか？"
          description="ご不明な点がございましたら、サイドバーの「サポートに連絡」からお問い合わせください。"
          type="info"
          showIcon
        />
      </Modal>

      {/* 進捗ステップ */}
      <Card style={{ marginBottom: 24, borderRadius: 12 }}>
        <Skeleton loading={loading} active paragraph={{ rows: 1 }}>
          <div style={{ marginBottom: 16 }}>
            <Space>
              <FireOutlined style={{ color: '#ff4d4f' }} />
              <Text strong>現在の進捗状況</Text>
            </Space>
          </div>
          <Steps
            current={currentStep}
            items={onboardingSteps}
            style={{ maxWidth: 800, margin: '0 auto' }}
          />
        </Skeleton>
      </Card>

      {/* 表示切替 */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Segmented
          options={[
            { label: '概要', value: 'overview', icon: <LineChartOutlined /> },
            { label: '部門別', value: 'department', icon: <TeamOutlined /> },
          ]}
          value={viewMode}
          onChange={setViewMode}
          size="large"
        />
        <Space>
          <Badge count={pendingRequests} size="small">
            <Tag icon={<BellOutlined />} color="orange">未処理</Tag>
          </Badge>
          <Badge count={unreadNews.length} size="small">
            <Tag icon={<BulbOutlined />} color="blue">未読ニュース</Tag>
          </Badge>
        </Space>
      </div>

      {/* 統計カード */}
      <Skeleton loading={loading} active>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              style={{ borderRadius: 12, cursor: 'default' }}
              styles={{ body: { padding: 20 } }}
            >
              <Statistic
                title={
                  <Space>
                    <ClockCircleOutlined style={{ color: '#003366' }} />
                    <span>残り稼働時間</span>
                  </Space>
                }
                value={mockUsageStats.remainingHours}
                suffix="/ 30時間"
                valueStyle={{ color: '#003366', fontWeight: 700 }}
              />
              <Progress
                percent={usedPercentage}
                strokeColor={{ '0%': '#003366', '100%': '#0066cc' }}
                showInfo={false}
                size="small"
                style={{ marginTop: 12 }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              style={{ borderRadius: 12, cursor: 'pointer' }}
              styles={{ body: { padding: 20 } }}
              onClick={() => navigate('/requests?status=pending')}
            >
              <Statistic
                title={
                  <Space>
                    <FileTextOutlined style={{ color: '#faad14' }} />
                    <span>受付中の依頼</span>
                  </Space>
                }
                value={pendingRequests}
                suffix="件"
                valueStyle={{ color: '#faad14', fontWeight: 700 }}
              />
              <div style={{ marginTop: 12 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  クリックして確認 <RightOutlined />
                </Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              style={{ borderRadius: 12, cursor: 'pointer' }}
              styles={{ body: { padding: 20 } }}
              onClick={() => navigate('/requests?status=in_progress')}
            >
              <Statistic
                title={
                  <Space>
                    <ThunderboltOutlined style={{ color: '#1890ff' }} />
                    <span>進行中の依頼</span>
                  </Space>
                }
                value={inProgressRequests}
                suffix="件"
                valueStyle={{ color: '#1890ff', fontWeight: 700 }}
                prefix={<SyncOutlined spin style={{ fontSize: 16, marginRight: 4 }} />}
              />
              <div style={{ marginTop: 12 }}>
                <Badge status="processing" text={<Text type="secondary" style={{ fontSize: 12 }}>作業中</Text>} />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              style={{ borderRadius: 12, cursor: 'pointer' }}
              styles={{ body: { padding: 20 } }}
              onClick={() => navigate('/requests?status=completed')}
            >
              <Statistic
                title={
                  <Space>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <span>完了した依頼</span>
                  </Space>
                }
                value={completedRequests}
                suffix="件"
                valueStyle={{ color: '#52c41a', fontWeight: 700 }}
              />
              <div style={{ marginTop: 12 }}>
                <Space>
                  <TrophyOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                  <Text type="secondary" style={{ fontSize: 12 }}>今月の実績</Text>
                </Space>
              </div>
            </Card>
          </Col>
        </Row>
      </Skeleton>

      {/* グラフセクション */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <Space>
                <CalendarOutlined />
                <span>{viewMode === 'overview' ? '稼働時間推移' : '部門別利用状況'}</span>
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
            <Skeleton loading={loading} active paragraph={{ rows: 8 }}>
              {viewMode === 'overview' ? (
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
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={departmentChartData}>
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
                    <Bar dataKey="依頼数" fill="#003366" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="稼働時間" fill="#0066cc" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="クイックアクション" style={{ borderRadius: 12, height: '100%' }}>
            <Skeleton loading={loading} active>
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
                  icon={<MessageOutlined />}
                  block
                  size="large"
                  onClick={() => navigate('/messages')}
                  style={{ height: 48, borderRadius: 8 }}
                >
                  <Badge count={2} size="small" offset={[10, 0]}>
                    メッセージ
                  </Badge>
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

              <Divider style={{ margin: '20px 0' }} />

              <div style={{ padding: 16, background: '#f8f9fa', borderRadius: 8 }}>
                <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>依頼状況</Text>
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
                      <Text style={{ fontSize: 11 }}>{item.name}: {item.value}</Text>
                    </Space>
                  ))}
                </div>
              </div>
            </Skeleton>
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
                <Badge count={recentRequests.length} style={{ backgroundColor: '#003366' }} />
              </Space>
            }
            extra={
              <Button type="link" onClick={() => navigate('/requests')} style={{ padding: 0 }}>
                すべて見る <RightOutlined />
              </Button>
            }
            style={{ borderRadius: 12 }}
          >
            <Skeleton loading={loading} active avatar paragraph={{ rows: 3 }}>
              <List
                dataSource={recentRequests}
                renderItem={(item: ServiceRequest) => {
                  const dept = getDepartmentById(item.departmentId);
                  return (
                    <List.Item
                      style={{
                        cursor: 'pointer',
                        padding: '16px 8px',
                        borderRadius: 8,
                        transition: 'background 0.2s',
                      }}
                      onClick={() => navigate(`/requests/${item.id}`)}
                      actions={[
                        <Badge status={statusColors[item.status] as any} text={statusLabels[item.status]} />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{
                              backgroundColor: dept?.color || '#003366',
                            }}
                          >
                            {dept?.name[0] || item.title[0]}
                          </Avatar>
                        }
                        title={<Text strong>{item.title}</Text>}
                        description={
                          <Space wrap>
                            <Tag style={{ borderRadius: 4 }}>{categoryLabels[item.category]}</Tag>
                            {dept && <Tag color={dept.color}>{dept.name}</Tag>}
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {new Date(item.updatedAt).toLocaleDateString('ja-JP')}
                            </Text>
                          </Space>
                        }
                      />
                    </List.Item>
                  );
                }}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card
            title={
              <Space>
                <BulbOutlined />
                <span>AIニュースレポート</span>
                {unreadNews.length > 0 && (
                  <Badge count={`${unreadNews.length}件未読`} style={{ backgroundColor: '#ff4d4f' }} />
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
            <Skeleton loading={loading} active avatar paragraph={{ rows: 2 }}>
              <Timeline
                items={unreadNews.map((item) => ({
                  color: item.isRead ? 'gray' : 'blue',
                  dot: item.isRead ? undefined : <BulbOutlined style={{ fontSize: 16 }} />,
                  children: (
                    <div
                      style={{ cursor: 'pointer', padding: '4px 0' }}
                      onClick={() => navigate(`/news/${item.id}`)}
                    >
                      <Text strong={!item.isRead}>{item.title}</Text>
                      <Paragraph
                        ellipsis={{ rows: 2 }}
                        style={{ marginBottom: 0, fontSize: 12, color: '#8c8c8c', marginTop: 4 }}
                      >
                        {item.summary}
                      </Paragraph>
                      <Space style={{ marginTop: 8 }}>
                        {item.tags.slice(0, 2).map(tag => (
                          <Tag key={tag} color="blue" style={{ fontSize: 10 }}>{tag}</Tag>
                        ))}
                      </Space>
                    </div>
                  ),
                }))}
              />
            </Skeleton>
          </Card>
        </Col>
      </Row>

      {/* フローティングボタン */}
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 24, bottom: 24 }}
        icon={<PlusOutlined />}
      >
        <FloatButton
          icon={<RocketOutlined />}
          tooltip="新しい依頼"
          onClick={() => navigate('/requests/new')}
        />
        <FloatButton
          icon={<MessageOutlined />}
          tooltip="メッセージ"
          onClick={() => navigate('/messages')}
        />
        <FloatButton
          icon={<CustomerServiceOutlined />}
          tooltip="サポート"
        />
      </FloatButton.Group>
    </div>
  );
};

export default Dashboard;
