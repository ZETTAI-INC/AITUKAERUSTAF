import React, { useState } from 'react';
import {
  Card,
  Descriptions,
  Tag,
  Typography,
  Table,
  Button,
  Space,
  Progress,
  Row,
  Col,
  Statistic,
  Divider,
  Timeline,
  Steps,
  Alert,
  Tooltip,
  Badge,
  Modal,
  Result,
  Popconfirm,
  message,
  Tabs,
  List,
  Avatar,
  Skeleton,
  Empty,
  Segmented,
} from 'antd';
import {
  CheckCircleOutlined,
  DownloadOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CrownOutlined,
  SafetyCertificateOutlined,
  RocketOutlined,
  GiftOutlined,
  HistoryOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  ArrowUpOutlined,
  StarOutlined,
  ThunderboltOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { mockContract, mockUsageStats } from '../mock/data';
import type { BillingRecord } from '../types';

const { Title, Text, Paragraph } = Typography;

const Contract: React.FC = () => {
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const usedPercentage = (mockUsageStats.usedHours / mockUsageStats.totalHours) * 100;

  const daysUntilRenewal = Math.ceil(
    (new Date(mockContract.renewalDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const billingColumns: ColumnsType<BillingRecord> = [
    {
      title: '請求日',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString('ja-JP'),
    },
    {
      title: '金額',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <Text strong>¥{amount.toLocaleString()}</Text>
      ),
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge
          status={status === 'paid' ? 'success' : status === 'pending' ? 'warning' : 'error'}
          text={
            <Tag
              color={status === 'paid' ? 'success' : status === 'pending' ? 'warning' : 'error'}
              icon={status === 'paid' ? <CheckCircleOutlined /> : undefined}
            >
              {status === 'paid' ? '支払済み' : status === 'pending' ? '未払い' : '失敗'}
            </Tag>
          }
        />
      ),
    },
    {
      title: '',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Tooltip title="請求書をダウンロード">
          <Button
            type="link"
            icon={<DownloadOutlined />}
            size="small"
          >
            請求書
          </Button>
        </Tooltip>
      ),
    },
  ];

  // Plan features
  const planFeatures = [
    { label: '月間稼働時間', standard: '30時間', premium: '60時間' },
    { label: '同時依頼数', standard: '3件', premium: '無制限' },
    { label: '優先対応', standard: '-', premium: '対応' },
    { label: '専任担当者', standard: '-', premium: '対応' },
    { label: 'レポート', standard: '月次', premium: '週次' },
    { label: 'サポート', standard: 'メール', premium: '電話・メール' },
  ];

  // Contract timeline
  const contractTimeline = [
    {
      color: 'green',
      dot: <CheckCircleOutlined />,
      children: (
        <div>
          <Text strong>契約開始</Text>
          <br />
          <Text type="secondary">{new Date(mockContract.startDate).toLocaleDateString('ja-JP')}</Text>
        </div>
      ),
    },
    {
      color: 'blue',
      dot: <ClockCircleOutlined />,
      children: (
        <div>
          <Text strong>現在</Text>
          <br />
          <Text type="secondary">サービス利用中</Text>
        </div>
      ),
    },
    {
      color: 'gray',
      children: (
        <div>
          <Text strong>次回更新</Text>
          <br />
          <Text type="secondary">{new Date(mockContract.renewalDate).toLocaleDateString('ja-JP')}</Text>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>契約情報</Title>
        <Space>
          <Button icon={<HistoryOutlined />}>契約履歴</Button>
          <Button type="primary" icon={<CrownOutlined />} onClick={() => setUpgradeModalOpen(true)}>
            プランをアップグレード
          </Button>
        </Space>
      </div>

      {/* アップグレード促進アラート */}
      {usedPercentage > 80 && (
        <Alert
          message="稼働時間の残りが少なくなっています"
          description={
            <Space>
              <span>今月の稼働時間を{Math.round(usedPercentage)}%使用しました。プレミアムプランへのアップグレードをご検討ください。</span>
              <Button type="link" onClick={() => setUpgradeModalOpen(true)}>
                詳細を見る
              </Button>
            </Space>
          }
          type="warning"
          showIcon
          icon={<ExclamationCircleOutlined />}
          closable
          style={{ marginBottom: 24, borderRadius: 8 }}
        />
      )}

      {/* アップグレードモーダル */}
      <Modal
        title={
          <Space>
            <CrownOutlined style={{ color: '#faad14' }} />
            <span>プランのアップグレード</span>
          </Space>
        }
        open={upgradeModalOpen}
        onCancel={() => setUpgradeModalOpen(false)}
        width={700}
        footer={[
          <Button key="cancel" onClick={() => setUpgradeModalOpen(false)}>
            キャンセル
          </Button>,
          <Button
            key="upgrade"
            type="primary"
            icon={<RocketOutlined />}
            onClick={() => {
              message.success('アップグレードリクエストを送信しました');
              setUpgradeModalOpen(false);
            }}
          >
            プレミアムにアップグレード
          </Button>,
        ]}
      >
        <Result
          icon={<CrownOutlined style={{ color: '#faad14' }} />}
          title="プレミアムプランでさらに業務効率化"
          subTitle="月額50万円で稼働時間2倍、優先対応、専任担当者付き"
        />
        <Table
          dataSource={planFeatures}
          columns={[
            { title: '機能', dataIndex: 'label', key: 'label' },
            {
              title: (
                <Space>
                  <span>スタンダード</span>
                  <Tag color="blue">現在のプラン</Tag>
                </Space>
              ),
              dataIndex: 'standard',
              key: 'standard',
            },
            {
              title: (
                <Space>
                  <CrownOutlined style={{ color: '#faad14' }} />
                  <span>プレミアム</span>
                </Space>
              ),
              dataIndex: 'premium',
              key: 'premium',
              render: (text) => <Text strong style={{ color: '#003366' }}>{text}</Text>,
            },
          ]}
          pagination={false}
          size="small"
          rowKey="label"
        />
      </Modal>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          {/* 契約プラン */}
          <Card
            style={{ marginBottom: 16, borderRadius: 12 }}
            styles={{ body: { padding: 0 } }}
          >
            <div
              style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #001529 0%, #003366 100%)',
                borderRadius: '12px 12px 0 0',
              }}
            >
              <Row align="middle" justify="space-between">
                <Col>
                  <Space align="center">
                    <Avatar
                      size={56}
                      icon={<SafetyCertificateOutlined />}
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Title level={4} style={{ margin: 0, color: '#fff' }}>
                          {mockContract.planName}
                        </Title>
                        <Tag color="green" icon={<CheckCircleOutlined />}>
                          有効
                        </Tag>
                      </div>
                      <Text style={{ color: 'rgba(255,255,255,0.7)' }}>
                        契約ID: CTR-2024-001
                      </Text>
                    </div>
                  </Space>
                </Col>
                <Col>
                  <Statistic
                    title={<span style={{ color: 'rgba(255,255,255,0.7)' }}>月額料金</span>}
                    value={mockContract.monthlyFee}
                    prefix="¥"
                    suffix={<span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>（税別）</span>}
                    valueStyle={{ color: '#fff', fontWeight: 700 }}
                    formatter={(value) => `${Number(value).toLocaleString()}`}
                  />
                </Col>
              </Row>
            </div>

            <div style={{ padding: '24px' }}>
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                  {
                    key: 'overview',
                    label: (
                      <span>
                        <InfoCircleOutlined /> 概要
                      </span>
                    ),
                    children: (
                      <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
                        <Descriptions.Item label="月間稼働時間">
                          <Space>
                            <ClockCircleOutlined style={{ color: '#003366' }} />
                            <Text strong>{mockContract.includedHours}時間</Text>
                          </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="支払い方法">
                          <Space>
                            <CreditCardOutlined />
                            {mockContract.paymentMethod}
                          </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="契約開始日">
                          {new Date(mockContract.startDate).toLocaleDateString('ja-JP')}
                        </Descriptions.Item>
                        <Descriptions.Item label="次回更新日">
                          <Space>
                            <CalendarOutlined />
                            {new Date(mockContract.renewalDate).toLocaleDateString('ja-JP')}
                            <Tag color="blue">{daysUntilRenewal}日後</Tag>
                          </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="契約タイプ" span={2}>
                          <Tag color="blue">年間契約</Tag>
                          <Text type="secondary" style={{ marginLeft: 8 }}>自動更新</Text>
                        </Descriptions.Item>
                      </Descriptions>
                    ),
                  },
                  {
                    key: 'features',
                    label: (
                      <span>
                        <StarOutlined /> プラン内容
                      </span>
                    ),
                    children: (
                      <List
                        dataSource={[
                          { icon: <ClockCircleOutlined />, text: '月間30時間の稼働時間', status: 'active' },
                          { icon: <ThunderboltOutlined />, text: '同時3件まで依頼可能', status: 'active' },
                          { icon: <FileTextOutlined />, text: '月次レポート提供', status: 'active' },
                          { icon: <CustomerServiceOutlined />, text: 'メールサポート', status: 'active' },
                          { icon: <CrownOutlined />, text: '優先対応', status: 'premium' },
                          { icon: <SafetyCertificateOutlined />, text: '専任担当者', status: 'premium' },
                        ]}
                        renderItem={(item) => (
                          <List.Item>
                            <Space>
                              {item.status === 'active' ? (
                                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                              ) : (
                                <Badge count="Premium" style={{ backgroundColor: '#faad14' }} />
                              )}
                              <span style={{ color: item.status === 'premium' ? '#999' : 'inherit' }}>
                                {item.icon} {item.text}
                              </span>
                            </Space>
                          </List.Item>
                        )}
                      />
                    ),
                  },
                  {
                    key: 'timeline',
                    label: (
                      <span>
                        <HistoryOutlined /> 契約履歴
                      </span>
                    ),
                    children: (
                      <Timeline items={contractTimeline} />
                    ),
                  },
                ]}
              />

              <Divider />

              <Space>
                <Popconfirm
                  title="プランを変更しますか？"
                  description="担当者より連絡させていただきます"
                  onConfirm={() => message.info('プラン変更のリクエストを受け付けました')}
                  okText="はい"
                  cancelText="いいえ"
                >
                  <Button icon={<CrownOutlined />}>プランを変更</Button>
                </Popconfirm>
                <Button icon={<CreditCardOutlined />}>支払い方法を変更</Button>
                <Tooltip title="契約書のPDFをダウンロード">
                  <Button icon={<DownloadOutlined />}>契約書</Button>
                </Tooltip>
              </Space>
            </div>
          </Card>

          {/* 請求履歴 */}
          <Card
            title={
              <Space>
                <FileTextOutlined />
                <span>請求履歴</span>
              </Space>
            }
            extra={
              <Segmented
                options={['すべて', '支払済み', '未払い']}
                size="small"
              />
            }
            style={{ borderRadius: 12 }}
          >
            <Table
              columns={billingColumns}
              dataSource={mockContract.billingHistory}
              rowKey="id"
              pagination={{
                pageSize: 5,
                showSizeChanger: true,
                showTotal: (total) => `全 ${total} 件`,
              }}
              size="small"
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* 今月の利用状況 */}
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <Progress
                type="dashboard"
                percent={Math.round(usedPercentage)}
                strokeColor={{
                  '0%': '#003366',
                  '100%': usedPercentage > 80 ? '#ff4d4f' : '#0066cc',
                }}
                format={(percent) => (
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#003366' }}>{percent}%</div>
                    <div style={{ fontSize: 12, color: '#999' }}>使用済み</div>
                  </div>
                )}
              />
            </div>
            <Statistic
              title={
                <Space>
                  <ClockCircleOutlined style={{ color: '#003366' }} />
                  <span>今月の稼働時間</span>
                </Space>
              }
              value={mockUsageStats.usedHours}
              suffix={`/ ${mockUsageStats.totalHours}時間`}
              style={{ textAlign: 'center' }}
            />
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="使用済み"
                  value={mockUsageStats.usedHours}
                  suffix="時間"
                  valueStyle={{ fontSize: 18 }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="残り"
                  value={mockUsageStats.remainingHours}
                  suffix="時間"
                  valueStyle={{ fontSize: 18, color: '#52c41a' }}
                />
              </Col>
            </Row>
            {usedPercentage > 80 && (
              <Alert
                message="残り時間が少なくなっています"
                type="warning"
                showIcon
                style={{ marginTop: 16, borderRadius: 8 }}
              />
            )}
          </Card>

          {/* 契約期間カウントダウン */}
          <Card style={{ marginBottom: 16, borderRadius: 12 }}>
            <div style={{ textAlign: 'center' }}>
              <Avatar
                size={64}
                icon={<CalendarOutlined />}
                style={{
                  backgroundColor: '#e6f0ff',
                  color: '#003366',
                  marginBottom: 16,
                }}
              />
              <div>
                <Text type="secondary">次回更新まで</Text>
              </div>
              <Title level={2} style={{ margin: '8px 0', color: '#003366' }}>
                {daysUntilRenewal}
                <span style={{ fontSize: 16, fontWeight: 'normal' }}>日</span>
              </Title>
              <Tag icon={<CheckCircleOutlined />} color="success">
                自動更新
              </Tag>
              <Paragraph type="secondary" style={{ marginTop: 12, fontSize: 12 }}>
                {new Date(mockContract.renewalDate).toLocaleDateString('ja-JP')}に自動更新されます
              </Paragraph>
            </div>
            <Steps
              direction="vertical"
              size="small"
              current={1}
              items={[
                {
                  title: '契約開始',
                  description: new Date(mockContract.startDate).toLocaleDateString('ja-JP'),
                  status: 'finish',
                },
                {
                  title: '利用中',
                  description: '現在',
                  status: 'process',
                },
                {
                  title: '更新',
                  description: new Date(mockContract.renewalDate).toLocaleDateString('ja-JP'),
                  status: 'wait',
                },
              ]}
            />
          </Card>

          {/* サポート */}
          <Card
            title={
              <Space>
                <CustomerServiceOutlined />
                <span>サポート</span>
              </Space>
            }
            style={{ borderRadius: 12 }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Paragraph type="secondary">
                契約に関するご質問やお困りごとがございましたら、お気軽にお問い合わせください。
              </Paragraph>
              <Button
                type="primary"
                block
                icon={<CustomerServiceOutlined />}
                style={{ background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)' }}
              >
                サポートに問い合わせ
              </Button>
              <Button block icon={<FileTextOutlined />}>
                よくある質問
              </Button>
            </Space>
          </Card>

          {/* アップグレード促進カード */}
          <Card
            style={{
              marginTop: 16,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%)',
              border: '1px solid #ffd591',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <GiftOutlined style={{ fontSize: 32, color: '#fa8c16', marginBottom: 12 }} />
              <Title level={5} style={{ margin: 0 }}>プレミアムプラン</Title>
              <Paragraph type="secondary" style={{ marginTop: 8 }}>
                稼働時間2倍、優先対応で
                <br />
                さらに業務効率化
              </Paragraph>
              <Button
                type="primary"
                icon={<ArrowUpOutlined />}
                onClick={() => setUpgradeModalOpen(true)}
                style={{ background: '#fa8c16', borderColor: '#fa8c16' }}
              >
                アップグレード
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Contract;
