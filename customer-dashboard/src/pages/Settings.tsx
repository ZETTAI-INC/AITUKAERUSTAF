import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Typography,
  Divider,
  Space,
  Avatar,
  Upload,
  message,
  Row,
  Col,
  Tabs,
  Tag,
  Badge,
  Tooltip,
  Modal,
  Alert,
  List,
  Popconfirm,
  Select,
  Radio,
  Slider,
  Progress,
  Timeline,
  Descriptions,
  Result,
  Collapse,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  BellOutlined,
  LockOutlined,
  UploadOutlined,
  SafetyOutlined,
  GlobalOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MobileOutlined,
  DesktopOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  CameraOutlined,
  KeyOutlined,
  SecurityScanOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  TeamOutlined,
  ApiOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { mockUser } from '../mock/data';

const { Title, Text, Paragraph } = Typography;

const Settings: React.FC = () => {
  const [profileForm] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('profile');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [twoFactorModalOpen, setTwoFactorModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(14);

  const handleProfileSubmit = (values: any) => {
    console.log('Profile updated:', values);
    message.success('プロフィールを更新しました');
  };

  const handleNotificationSubmit = (values: any) => {
    console.log('Notification settings:', values);
    message.success('通知設定を更新しました');
  };

  // セキュリティスコア計算
  const securityScore = 75;
  const securityItems = [
    { label: 'パスワード設定', status: 'done', points: 25 },
    { label: 'メール認証', status: 'done', points: 25 },
    { label: '二段階認証', status: 'pending', points: 25 },
    { label: '携帯電話認証', status: 'done', points: 25 },
  ];

  // ログイン履歴
  const loginHistory = [
    { device: 'MacBook Pro', location: '東京, 日本', time: '2時間前', current: true },
    { device: 'iPhone 15', location: '東京, 日本', time: '1日前', current: false },
    { device: 'Windows PC', location: '大阪, 日本', time: '3日前', current: false },
  ];

  const tabItems = [
    {
      key: 'profile',
      label: (
        <span>
          <UserOutlined />
          プロフィール
        </span>
      ),
      children: (
        <Card style={{ borderRadius: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
            <Badge
              count={
                <Tooltip title="画像を変更">
                  <Button
                    shape="circle"
                    size="small"
                    icon={<CameraOutlined />}
                    style={{ backgroundColor: '#003366', borderColor: '#003366' }}
                  />
                </Tooltip>
              }
              offset={[-10, 70]}
            >
              <Avatar
                size={80}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: '#003366',
                  boxShadow: '0 4px 12px rgba(0,51,102,0.3)',
                }}
              />
            </Badge>
            <div style={{ marginLeft: 24 }}>
              <Title level={5} style={{ margin: 0 }}>{mockUser.name}</Title>
              <Text type="secondary">{mockUser.email}</Text>
              <div style={{ marginTop: 8 }}>
                <Tag color="blue">スタンダードプラン</Tag>
                <Tag color="green" icon={<CheckCircleOutlined />}>認証済み</Tag>
              </div>
            </div>
          </div>

          <Divider />

          <Form
            form={profileForm}
            layout="vertical"
            onFinish={handleProfileSubmit}
            initialValues={{
              name: mockUser.name,
              email: mockUser.email,
              company: mockUser.company,
              phone: '03-1234-5678',
              department: '経営企画部',
              position: 'マネージャー',
            }}
          >
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="name"
                  label="お名前"
                  rules={[{ required: true, message: 'お名前を入力してください' }]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="company" label="会社名">
                  <Input
                    prefix={<BankOutlined style={{ color: '#bfbfbf' }} />}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="email"
                  label="メールアドレス"
                  rules={[
                    { required: true, message: 'メールアドレスを入力してください' },
                    { type: 'email', message: '有効なメールアドレスを入力してください' },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
                    size="large"
                    suffix={
                      <Tooltip title="認証済み">
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                      </Tooltip>
                    }
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="phone" label="電話番号">
                  <Input
                    prefix={<PhoneOutlined style={{ color: '#bfbfbf' }} />}
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item name="department" label="部門">
                  <Select
                    size="large"
                    prefix={<TeamOutlined />}
                    options={[
                      { value: '営業部', label: '営業部' },
                      { value: 'マーケティング部', label: 'マーケティング部' },
                      { value: '人事部', label: '人事部' },
                      { value: '経営企画部', label: '経営企画部' },
                      { value: '情報システム部', label: '情報システム部' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="position" label="役職">
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<CheckCircleOutlined />}
                  style={{ background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)' }}
                >
                  変更を保存
                </Button>
                <Button onClick={() => profileForm.resetFields()}>
                  リセット
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'notifications',
      label: (
        <span>
          <BellOutlined />
          通知設定
        </span>
      ),
      children: (
        <Card style={{ borderRadius: 12 }}>
          <Alert
            message="通知の受け取り方を設定できます"
            description="重要な更新を見逃さないよう、必要な通知を有効にしてください。"
            type="info"
            showIcon
            closable
            style={{ marginBottom: 24, borderRadius: 8 }}
          />

          <Form
            form={notificationForm}
            layout="vertical"
            onFinish={handleNotificationSubmit}
            initialValues={{
              emailNotifications: true,
              requestUpdates: true,
              newsReports: true,
              billingAlerts: true,
              marketingEmails: false,
              pushNotifications: true,
              digestFrequency: 'daily',
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <Title level={5}>
                <MailOutlined style={{ marginRight: 8 }} />
                メール通知
              </Title>
              <List
                dataSource={[
                  {
                    name: 'requestUpdates',
                    title: '依頼ステータス更新',
                    description: '依頼の進捗が更新された時に通知',
                    icon: <SyncOutlined />,
                  },
                  {
                    name: 'newsReports',
                    title: 'AIニュースレポート',
                    description: '毎日のAIニュースレポート配信',
                    icon: <FileTextOutlined />,
                  },
                  {
                    name: 'billingAlerts',
                    title: '請求・支払い通知',
                    description: '請求書発行や支払い関連の通知',
                    icon: <ExclamationCircleOutlined />,
                  },
                  {
                    name: 'marketingEmails',
                    title: 'お知らせ・マーケティング',
                    description: 'サービスの新機能やキャンペーン情報',
                    icon: <BellOutlined />,
                  },
                ]}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Form.Item name={item.name} valuePropName="checked" style={{ marginBottom: 0 }}>
                        <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                      </Form.Item>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar icon={item.icon} style={{ backgroundColor: '#e6f0ff', color: '#003366' }} />
                      }
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </div>

            <Divider />

            <div style={{ marginBottom: 24 }}>
              <Title level={5}>
                <MobileOutlined style={{ marginRight: 8 }} />
                プッシュ通知
              </Title>
              <Form.Item name="pushNotifications" valuePropName="checked">
                <Switch checkedChildren="有効" unCheckedChildren="無効" />
              </Form.Item>
            </div>

            <Divider />

            <div style={{ marginBottom: 24 }}>
              <Title level={5}>ダイジェスト配信頻度</Title>
              <Form.Item name="digestFrequency">
                <Radio.Group>
                  <Radio.Button value="realtime">リアルタイム</Radio.Button>
                  <Radio.Button value="daily">1日1回</Radio.Button>
                  <Radio.Button value="weekly">週1回</Radio.Button>
                  <Radio.Button value="off">配信しない</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<CheckCircleOutlined />}
                style={{ background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)' }}
              >
                通知設定を保存
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'security',
      label: (
        <span>
          <SafetyOutlined />
          セキュリティ
        </span>
      ),
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card style={{ marginBottom: 24, borderRadius: 12 }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Progress
                  type="circle"
                  percent={securityScore}
                  strokeColor={{
                    '0%': securityScore < 50 ? '#ff4d4f' : '#003366',
                    '100%': securityScore < 50 ? '#ff7875' : '#0066cc',
                  }}
                  format={(percent) => (
                    <div>
                      <div style={{ fontSize: 24, fontWeight: 700 }}>{percent}</div>
                      <div style={{ fontSize: 12, color: '#999' }}>セキュリティスコア</div>
                    </div>
                  )}
                />
              </div>

              <List
                dataSource={securityItems}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      item.status === 'done' ? (
                        <Tag color="success" icon={<CheckCircleOutlined />}>完了</Tag>
                      ) : (
                        <Button type="link" size="small">設定する</Button>
                      ),
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={item.status === 'done' ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
                          style={{
                            backgroundColor: item.status === 'done' ? '#f6ffed' : '#fff7e6',
                            color: item.status === 'done' ? '#52c41a' : '#faad14',
                          }}
                        />
                      }
                      title={item.label}
                      description={`+${item.points}ポイント`}
                    />
                  </List.Item>
                )}
              />
            </Card>

            <Card title="セキュリティ設定" style={{ borderRadius: 12 }}>
              <List
                dataSource={[
                  {
                    title: 'パスワード変更',
                    description: '最終更新: 30日前',
                    icon: <LockOutlined />,
                    action: (
                      <Button icon={<EditOutlined />} onClick={() => setPasswordModalOpen(true)}>
                        変更
                      </Button>
                    ),
                  },
                  {
                    title: '二段階認証',
                    description: 'アカウントのセキュリティを強化',
                    icon: <KeyOutlined />,
                    action: (
                      <Button onClick={() => setTwoFactorModalOpen(true)}>
                        設定する
                      </Button>
                    ),
                    badge: <Badge status="warning" text="未設定" />,
                  },
                  {
                    title: 'ログイン履歴',
                    description: '最近のログイン活動を確認',
                    icon: <HistoryOutlined />,
                    action: <Button>確認する</Button>,
                  },
                  {
                    title: 'APIアクセストークン',
                    description: '外部連携用のトークン管理',
                    icon: <ApiOutlined />,
                    action: <Button>管理する</Button>,
                  },
                ]}
                renderItem={(item) => (
                  <List.Item actions={[item.action]}>
                    <List.Item.Meta
                      avatar={
                        <Avatar icon={item.icon} style={{ backgroundColor: '#e6f0ff', color: '#003366' }} />
                      }
                      title={
                        <Space>
                          {item.title}
                          {item.badge}
                        </Space>
                      }
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="ログイン履歴" style={{ borderRadius: 12 }}>
              <Timeline
                items={loginHistory.map((log) => ({
                  color: log.current ? 'green' : 'gray',
                  dot: log.current ? <CheckCircleOutlined /> : undefined,
                  children: (
                    <div>
                      <Space>
                        {log.device.includes('iPhone') ? <MobileOutlined /> : <DesktopOutlined />}
                        <Text strong>{log.device}</Text>
                        {log.current && <Tag color="green" size="small">現在</Tag>}
                      </Space>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {log.location} • {log.time}
                      </Text>
                    </div>
                  ),
                }))}
              />
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'appearance',
      label: (
        <span>
          <SettingOutlined />
          表示設定
        </span>
      ),
      children: (
        <Card style={{ borderRadius: 12 }}>
          <div style={{ marginBottom: 32 }}>
            <Title level={5}>テーマ</Title>
            <Radio.Group value={theme} onChange={(e) => setTheme(e.target.value)} size="large">
              <Radio.Button value="light">
                <Space>
                  <DesktopOutlined />
                  ライト
                </Space>
              </Radio.Button>
              <Radio.Button value="dark">
                <Space>
                  <DesktopOutlined />
                  ダーク
                </Space>
              </Radio.Button>
              <Radio.Button value="system">
                <Space>
                  <GlobalOutlined />
                  システム設定に従う
                </Space>
              </Radio.Button>
            </Radio.Group>
          </div>

          <Divider />

          <div style={{ marginBottom: 32 }}>
            <Title level={5}>フォントサイズ</Title>
            <Row align="middle" gutter={16}>
              <Col span={16}>
                <Slider
                  min={12}
                  max={20}
                  value={fontSize}
                  onChange={setFontSize}
                  marks={{
                    12: '小',
                    14: '標準',
                    16: '大',
                    20: '特大',
                  }}
                />
              </Col>
              <Col span={8}>
                <Text style={{ fontSize }}>サンプルテキスト</Text>
              </Col>
            </Row>
          </div>

          <Divider />

          <div style={{ marginBottom: 32 }}>
            <Title level={5}>言語</Title>
            <Select
              defaultValue="ja"
              style={{ width: 200 }}
              size="large"
              options={[
                { value: 'ja', label: '日本語' },
                { value: 'en', label: 'English' },
              ]}
            />
          </div>

          <Divider />

          <div>
            <Title level={5}>タイムゾーン</Title>
            <Select
              defaultValue="Asia/Tokyo"
              style={{ width: 300 }}
              size="large"
              options={[
                { value: 'Asia/Tokyo', label: '(GMT+9:00) 東京' },
                { value: 'America/New_York', label: '(GMT-5:00) ニューヨーク' },
                { value: 'Europe/London', label: '(GMT+0:00) ロンドン' },
              ]}
            />
          </div>

          <Divider />

          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            style={{ background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)' }}
          >
            表示設定を保存
          </Button>
        </Card>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>設定</Title>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={18}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            size="large"
            tabBarStyle={{ marginBottom: 24 }}
          />
        </Col>

        <Col xs={24} lg={6}>
          {/* アカウント情報 */}
          <Card
            title={
              <Space>
                <UserOutlined />
                <span>アカウント情報</span>
              </Space>
            }
            style={{ marginBottom: 16, borderRadius: 12 }}
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="アカウントID">
                <Text copyable style={{ fontSize: 12 }}>{mockUser.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="契約プラン">
                <Tag color="blue">スタンダード</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="登録日">
                {new Date(mockUser.contractStartDate).toLocaleDateString('ja-JP')}
              </Descriptions.Item>
              <Descriptions.Item label="ステータス">
                <Badge status="success" text="アクティブ" />
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* サポート */}
          <Card
            title={
              <Space>
                <QuestionCircleOutlined />
                <span>サポート</span>
              </Space>
            }
            style={{ marginBottom: 16, borderRadius: 12 }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                type="primary"
                block
                style={{ background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)' }}
              >
                お問い合わせ
              </Button>
              <Button block icon={<QuestionCircleOutlined />}>よくある質問</Button>
              <Button block icon={<FileTextOutlined />}>利用規約</Button>
            </Space>
          </Card>

          {/* 危険ゾーン */}
          <Card
            title={<Text type="danger">危険ゾーン</Text>}
            style={{ borderRadius: 12, borderColor: '#ffccc7' }}
          >
            <Paragraph type="secondary" style={{ fontSize: 12 }}>
              アカウントを削除すると、すべてのデータが完全に削除されます。この操作は取り消せません。
            </Paragraph>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => setDeleteModalOpen(true)}
            >
              アカウントを削除
            </Button>
          </Card>
        </Col>
      </Row>

      {/* パスワード変更モーダル */}
      <Modal
        title={
          <Space>
            <LockOutlined />
            <span>パスワード変更</span>
          </Space>
        }
        open={passwordModalOpen}
        onCancel={() => setPasswordModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setPasswordModalOpen(false)}>
            キャンセル
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              message.success('パスワードを変更しました');
              setPasswordModalOpen(false);
            }}
          >
            変更する
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="現在のパスワード" required>
            <Input.Password prefix={<LockOutlined />} placeholder="現在のパスワード" />
          </Form.Item>
          <Form.Item label="新しいパスワード" required>
            <Input.Password prefix={<LockOutlined />} placeholder="新しいパスワード" />
          </Form.Item>
          <Form.Item label="新しいパスワード（確認）" required>
            <Input.Password prefix={<LockOutlined />} placeholder="新しいパスワード（確認）" />
          </Form.Item>
        </Form>
        <Alert
          message="パスワードは8文字以上で、英数字と記号を含めてください"
          type="info"
          showIcon
        />
      </Modal>

      {/* 二段階認証モーダル */}
      <Modal
        title={
          <Space>
            <SecurityScanOutlined />
            <span>二段階認証の設定</span>
          </Space>
        }
        open={twoFactorModalOpen}
        onCancel={() => setTwoFactorModalOpen(false)}
        width={500}
        footer={[
          <Button key="cancel" onClick={() => setTwoFactorModalOpen(false)}>
            キャンセル
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              message.success('二段階認証を設定しました');
              setTwoFactorModalOpen(false);
            }}
          >
            有効にする
          </Button>,
        ]}
      >
        <Result
          icon={<SecurityScanOutlined style={{ color: '#003366' }} />}
          title="二段階認証でアカウントを保護"
          subTitle="認証アプリを使用して、ログイン時に追加の認証コードを要求します"
        />
        <Alert
          message="推奨: Google Authenticator または Microsoft Authenticator をご利用ください"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Modal>

      {/* アカウント削除モーダル */}
      <Modal
        title={
          <Space>
            <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
            <span>アカウントの削除</span>
          </Space>
        }
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalOpen(false)}>
            キャンセル
          </Button>,
          <Button
            key="delete"
            danger
            onClick={() => {
              message.error('アカウント削除はデモでは実行できません');
              setDeleteModalOpen(false);
            }}
          >
            削除する
          </Button>,
        ]}
      >
        <Result
          status="warning"
          title="本当にアカウントを削除しますか？"
          subTitle="この操作は取り消せません。すべてのデータが完全に削除されます。"
        />
        <Alert
          message="削除されるデータ"
          description={
            <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
              <li>すべての依頼履歴</li>
              <li>メッセージ履歴</li>
              <li>保存した設定</li>
              <li>請求情報</li>
            </ul>
          }
          type="error"
          showIcon
        />
      </Modal>
    </div>
  );
};

export default Settings;
