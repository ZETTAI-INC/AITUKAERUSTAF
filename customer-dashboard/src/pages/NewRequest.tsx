import React from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Typography,
  Upload,
  message,
  Row,
  Col,
  Avatar,
  Divider,
} from 'antd';
import {
  ArrowLeftOutlined,
  UploadOutlined,
  SendOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { categoryLabels, mockDepartments, getDepartmentById, mockDepartmentStats } from '../mock/data';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const NewRequest: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    message.success('依頼を送信しました');
    navigate('/requests');
  };

  const categoryDescriptions: Record<string, string> = {
    document: '営業提案書、事業企画書、プレゼン資料などの作成を代行します。',
    data_analysis: '売上データ、アクセス解析などの収集・分析・レポート作成をワンストップで対応します。',
    market_research: '競合他社の情報収集から比較分析、営業戦略に役立つ情報を提供します。',
    content: 'ブログ記事、SNS投稿、画像生成、動画素材制作などを行います。',
    ai_news: '最新AI動向、新ツールリリース情報に関する特別レポートを作成します。',
    consulting: '業務フロー分析、AI活用戦略立案、ツール導入サポートを行います。',
  };

  const selectedCategory = Form.useWatch('category', form);
  const selectedDepartment = Form.useWatch('departmentId', form);

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

      <Title level={4} style={{ marginBottom: 24 }}>新しい依頼を作成</Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card style={{ borderRadius: 12 }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                priority: 'medium',
              }}
            >
              {/* 部門選択セクション */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <TeamOutlined style={{ fontSize: 18, color: '#003366', marginRight: 8 }} />
                  <Text strong style={{ fontSize: 16 }}>依頼元部門</Text>
                </div>
                <Form.Item
                  name="departmentId"
                  rules={[{ required: true, message: '部門を選択してください' }]}
                  style={{ marginBottom: 0 }}
                >
                  <Select
                    placeholder="依頼する部門を選択してください"
                    size="large"
                    optionLabelProp="label"
                  >
                    {mockDepartments.map(dept => {
                      const stats = mockDepartmentStats.find(s => s.departmentId === dept.id);
                      return (
                        <Select.Option key={dept.id} value={dept.id} label={dept.name}>
                          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
                            <Avatar
                              size={36}
                              style={{ backgroundColor: dept.color, marginRight: 12 }}
                            >
                              {dept.name[0]}
                            </Avatar>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 500 }}>{dept.name}</div>
                              <div style={{ fontSize: 12, color: '#888' }}>
                                {dept.managerName && `担当: ${dept.managerName}`}
                                {stats && ` | 今月 ${stats.requestCount}件の依頼`}
                              </div>
                            </div>
                          </div>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                {selectedDepartment && (
                  <div
                    style={{
                      marginTop: 12,
                      padding: 12,
                      background: `${getDepartmentById(selectedDepartment)?.color}10`,
                      borderRadius: 8,
                      borderLeft: `3px solid ${getDepartmentById(selectedDepartment)?.color}`,
                    }}
                  >
                    <Space>
                      <Avatar
                        size={24}
                        style={{ backgroundColor: getDepartmentById(selectedDepartment)?.color }}
                      >
                        {getDepartmentById(selectedDepartment)?.name[0]}
                      </Avatar>
                      <Text>
                        <Text strong>{getDepartmentById(selectedDepartment)?.name}</Text>
                        からの依頼として登録されます
                      </Text>
                    </Space>
                  </div>
                )}
              </div>

              {/* 依頼者名 */}
              <Form.Item
                name="requesterName"
                label={
                  <Space>
                    <UserOutlined />
                    <span>依頼者名</span>
                  </Space>
                }
                rules={[{ required: true, message: '依頼者名を入力してください' }]}
              >
                <Input placeholder="例: 山田 太郎" size="large" />
              </Form.Item>

              <Divider />

              <Form.Item
                name="category"
                label="サービスカテゴリ"
                rules={[{ required: true, message: 'カテゴリを選択してください' }]}
              >
                <Select
                  placeholder="カテゴリを選択"
                  size="large"
                  options={Object.entries(categoryLabels).map(([value, label]) => ({
                    value,
                    label,
                  }))}
                />
              </Form.Item>

              {selectedCategory && (
                <div
                  style={{
                    background: '#f0f5ff',
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 24,
                  }}
                >
                  <Text type="secondary">{categoryDescriptions[selectedCategory]}</Text>
                </div>
              )}

              <Form.Item
                name="title"
                label="依頼タイトル"
                rules={[{ required: true, message: '依頼タイトルを入力してください' }]}
              >
                <Input placeholder="例: 2024年度事業計画書の作成" size="large" />
              </Form.Item>

              <Form.Item
                name="description"
                label="依頼内容"
                rules={[{ required: true, message: '依頼内容を入力してください' }]}
              >
                <TextArea
                  placeholder="依頼の詳細を記入してください。目的、要望、参考情報などを含めていただくと、より正確な成果物を作成できます。"
                  rows={6}
                />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="priority"
                    label="優先度"
                  >
                    <Select
                      options={[
                        { value: 'low', label: '低 - 急ぎではない' },
                        { value: 'medium', label: '中 - 通常対応' },
                        { value: 'high', label: '高 - 優先対応希望' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="dueDate"
                    label="希望納期"
                  >
                    <DatePicker
                      placeholder="日付を選択"
                      style={{ width: '100%' }}
                      format="YYYY年M月D日"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="attachments"
                label="添付ファイル（任意）"
              >
                <Upload.Dragger
                  multiple
                  maxCount={5}
                  beforeUpload={() => false}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined style={{ color: '#003366' }} />
                  </p>
                  <p className="ant-upload-text">
                    クリックまたはドラッグしてファイルをアップロード
                  </p>
                  <p className="ant-upload-hint">
                    参考資料、既存データなど（最大5ファイル、各10MBまで）
                  </p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SendOutlined />}
                    size="large"
                    style={{ background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)' }}
                  >
                    依頼を送信
                  </Button>
                  <Button size="large" onClick={() => navigate('/requests')}>
                    キャンセル
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* 部門一覧カード */}
          <Card title="部門一覧" style={{ marginBottom: 16, borderRadius: 12 }}>
            <Space direction="vertical" style={{ width: '100%' }} size={8}>
              {mockDepartments.map(dept => {
                const stats = mockDepartmentStats.find(s => s.departmentId === dept.id);
                return (
                  <div
                    key={dept.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: selectedDepartment === dept.id ? `${dept.color}15` : '#fafafa',
                      border: selectedDepartment === dept.id ? `1px solid ${dept.color}` : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onClick={() => form.setFieldValue('departmentId', dept.id)}
                  >
                    <Avatar
                      size={32}
                      style={{ backgroundColor: dept.color, marginRight: 12 }}
                    >
                      {dept.name[0]}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <Text strong style={{ fontSize: 13 }}>{dept.name}</Text>
                      <div style={{ fontSize: 11, color: '#888' }}>
                        今月 {stats?.requestCount || 0}件
                      </div>
                    </div>
                  </div>
                );
              })}
            </Space>
          </Card>

          <Card title="ご利用にあたって" style={{ borderRadius: 12 }}>
            <Space direction="vertical" size={16}>
              <div>
                <Text strong>稼働時間について</Text>
                <Paragraph type="secondary" style={{ marginTop: 4 }}>
                  月間30時間の稼働時間内で対応いたします。複雑な依頼は複数時間を消費する場合があります。
                </Paragraph>
              </div>
              <div>
                <Text strong>対応時間</Text>
                <Paragraph type="secondary" style={{ marginTop: 4 }}>
                  営業日（平日9:00-18:00）に対応いたします。緊急の場合はお知らせください。
                </Paragraph>
              </div>
              <div>
                <Text strong>納期について</Text>
                <Paragraph type="secondary" style={{ marginTop: 4 }}>
                  依頼内容により異なりますが、通常2-5営業日で初回納品いたします。
                </Paragraph>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NewRequest;
