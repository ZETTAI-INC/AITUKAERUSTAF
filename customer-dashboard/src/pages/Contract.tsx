import React from 'react';
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
} from 'antd';
import {
  CheckCircleOutlined,
  DownloadOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { mockContract, mockUsageStats } from '../mock/data';
import type { BillingRecord } from '../types';

const { Title, Text } = Typography;

const Contract: React.FC = () => {
  const usedPercentage = (mockUsageStats.usedHours / mockUsageStats.totalHours) * 100;

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
      render: (amount: number) => `¥${amount.toLocaleString()}（税込）`,
    },
    {
      title: 'ステータス',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={status === 'paid' ? 'success' : status === 'pending' ? 'warning' : 'error'}
          icon={status === 'paid' ? <CheckCircleOutlined /> : undefined}
        >
          {status === 'paid' ? '支払済み' : status === 'pending' ? '未払い' : '失敗'}
        </Tag>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Button
          type="link"
          icon={<DownloadOutlined />}
          size="small"
        >
          請求書
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={4} style={{ marginBottom: 24 }}>契約情報</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          {/* 契約プラン */}
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Space>
                <Title level={5} style={{ margin: 0 }}>{mockContract.planName}</Title>
                <Tag color="green" icon={<CheckCircleOutlined />}>
                  {mockContract.status === 'active' ? '有効' : '無効'}
                </Tag>
              </Space>
            </div>

            <Descriptions column={{ xs: 1, sm: 2 }} size="small">
              <Descriptions.Item label="月額料金">
                <Text strong style={{ fontSize: 18 }}>
                  ¥{mockContract.monthlyFee.toLocaleString()}
                </Text>
                <Text type="secondary">（税別）</Text>
              </Descriptions.Item>
              <Descriptions.Item label="月間稼働時間">
                <Text strong>{mockContract.includedHours}時間</Text>
              </Descriptions.Item>
              <Descriptions.Item label="契約開始日">
                {new Date(mockContract.startDate).toLocaleDateString('ja-JP')}
              </Descriptions.Item>
              <Descriptions.Item label="次回更新日">
                {new Date(mockContract.renewalDate).toLocaleDateString('ja-JP')}
              </Descriptions.Item>
              <Descriptions.Item label="支払い方法" span={2}>
                <Space>
                  <CreditCardOutlined />
                  {mockContract.paymentMethod}
                </Space>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Space>
              <Button>プランを変更</Button>
              <Button>支払い方法を変更</Button>
            </Space>
          </Card>

          {/* 請求履歴 */}
          <Card title="請求履歴">
            <Table
              columns={billingColumns}
              dataSource={mockContract.billingHistory}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              size="small"
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* 今月の利用状況 */}
          <Card style={{ marginBottom: 16 }}>
            <Statistic
              title="今月の稼働時間"
              value={mockUsageStats.usedHours}
              suffix={`/ ${mockUsageStats.totalHours}時間`}
              prefix={<ClockCircleOutlined style={{ color: '#003366' }} />}
            />
            <Progress
              percent={usedPercentage}
              strokeColor={{
                '0%': '#003366',
                '100%': '#0066cc',
              }}
              style={{ marginTop: 16 }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                残り {mockUsageStats.remainingHours}時間
              </Text>
            </div>
          </Card>

          {/* 契約期間 */}
          <Card>
            <div style={{ textAlign: 'center' }}>
              <CalendarOutlined style={{ fontSize: 32, color: '#003366', marginBottom: 16 }} />
              <div>
                <Text type="secondary">次回更新まで</Text>
              </div>
              <Title level={3} style={{ margin: '8px 0' }}>
                {Math.ceil(
                  (new Date(mockContract.renewalDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )}日
              </Title>
              <Text type="secondary">
                {new Date(mockContract.renewalDate).toLocaleDateString('ja-JP')}に自動更新
              </Text>
            </div>
          </Card>

          {/* サポート */}
          <Card title="サポート" style={{ marginTop: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>契約に関するご質問は</Text>
              <Button type="primary" block style={{ background: '#003366' }}>
                サポートに問い合わせ
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Contract;
