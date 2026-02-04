import React from 'react';
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
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  BellOutlined,
  LockOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { mockUser } from '../mock/data';

const { Title, Text } = Typography;

const Settings: React.FC = () => {
  const [profileForm] = Form.useForm();
  const [notificationForm] = Form.useForm();

  const handleProfileSubmit = (values: any) => {
    console.log('Profile updated:', values);
    message.success('プロフィールを更新しました');
  };

  const handleNotificationSubmit = (values: any) => {
    console.log('Notification settings:', values);
    message.success('通知設定を更新しました');
  };

  return (
    <div>
      <Title level={4} style={{ marginBottom: 24 }}>設定</Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          {/* プロフィール設定 */}
          <Card title="プロフィール設定" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
              <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: '#003366' }} />
              <div style={{ marginLeft: 16 }}>
                <Upload
                  showUploadList={false}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>画像を変更</Button>
                </Upload>
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary">JPG, PNG 最大2MB</Text>
                </div>
              </div>
            </div>

            <Form
              form={profileForm}
              layout="vertical"
              onFinish={handleProfileSubmit}
              initialValues={{
                name: mockUser.name,
                email: mockUser.email,
                company: mockUser.company,
                phone: '03-1234-5678',
              }}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    label="お名前"
                    rules={[{ required: true, message: 'お名前を入力してください' }]}
                  >
                    <Input prefix={<UserOutlined />} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="company"
                    label="会社名"
                  >
                    <Input prefix={<BankOutlined />} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label="メールアドレス"
                    rules={[
                      { required: true, message: 'メールアドレスを入力してください' },
                      { type: 'email', message: '有効なメールアドレスを入力してください' },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    label="電話番号"
                  >
                    <Input prefix={<PhoneOutlined />} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ background: '#003366' }}>
                  プロフィールを更新
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {/* 通知設定 */}
          <Card title="通知設定" style={{ marginBottom: 24 }}>
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
              }}
            >
              <Form.Item
                name="emailNotifications"
                label="メール通知"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Divider />

              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>依頼ステータス更新</Text>
                    <br />
                    <Text type="secondary">依頼の進捗が更新された時に通知</Text>
                  </div>
                  <Form.Item name="requestUpdates" valuePropName="checked" style={{ marginBottom: 0 }}>
                    <Switch />
                  </Form.Item>
                </div>

                <Divider style={{ margin: '12px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>AIニュースレポート</Text>
                    <br />
                    <Text type="secondary">毎日のAIニュースレポート配信</Text>
                  </div>
                  <Form.Item name="newsReports" valuePropName="checked" style={{ marginBottom: 0 }}>
                    <Switch />
                  </Form.Item>
                </div>

                <Divider style={{ margin: '12px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>請求・支払い通知</Text>
                    <br />
                    <Text type="secondary">請求書発行や支払い関連の通知</Text>
                  </div>
                  <Form.Item name="billingAlerts" valuePropName="checked" style={{ marginBottom: 0 }}>
                    <Switch />
                  </Form.Item>
                </div>

                <Divider style={{ margin: '12px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>お知らせ・マーケティング</Text>
                    <br />
                    <Text type="secondary">サービスの新機能やキャンペーン情報</Text>
                  </div>
                  <Form.Item name="marketingEmails" valuePropName="checked" style={{ marginBottom: 0 }}>
                    <Switch />
                  </Form.Item>
                </div>
              </Space>

              <Divider />

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ background: '#003366' }}>
                  通知設定を保存
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {/* セキュリティ */}
          <Card title="セキュリティ">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>パスワード変更</Text>
                  <br />
                  <Text type="secondary">最終更新: 30日前</Text>
                </div>
                <Button icon={<LockOutlined />}>変更する</Button>
              </div>

              <Divider style={{ margin: '12px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>二段階認証</Text>
                  <br />
                  <Text type="secondary">アカウントのセキュリティを強化</Text>
                </div>
                <Button>設定する</Button>
              </div>

              <Divider style={{ margin: '12px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>ログイン履歴</Text>
                  <br />
                  <Text type="secondary">最近のログイン活動を確認</Text>
                </div>
                <Button>確認する</Button>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* アカウント情報 */}
          <Card title="アカウント情報">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text type="secondary">アカウントID</Text>
                <br />
                <Text copyable>{mockUser.id}</Text>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div>
                <Text type="secondary">契約プラン</Text>
                <br />
                <Text strong>スタンダードプラン</Text>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div>
                <Text type="secondary">登録日</Text>
                <br />
                <Text>{new Date(mockUser.contractStartDate).toLocaleDateString('ja-JP')}</Text>
              </div>
            </Space>
          </Card>

          {/* サポート */}
          <Card title="サポート" style={{ marginTop: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button type="primary" block style={{ background: '#003366' }}>
                お問い合わせ
              </Button>
              <Button block>よくある質問（FAQ）</Button>
              <Button block>利用規約</Button>
              <Button block>プライバシーポリシー</Button>
            </Space>
          </Card>

          {/* 危険ゾーン */}
          <Card
            title={<Text type="danger">危険ゾーン</Text>}
            style={{ marginTop: 16 }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text type="secondary">
                アカウントを削除すると、すべてのデータが完全に削除されます。この操作は取り消せません。
              </Text>
              <Button danger>アカウントを削除</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
