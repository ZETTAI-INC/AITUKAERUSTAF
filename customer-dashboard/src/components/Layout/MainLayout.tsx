import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Badge, Button, Space, Typography, Input, Tooltip, Divider } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  ReadOutlined,
  ContainerOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  ClockCircleOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { mockUser, mockNotifications, mockUsageStats } from '../../mock/data';

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadNotifications = mockNotifications.filter(n => !n.isRead).length;
  const usedPercentage = Math.round((mockUsageStats.usedHours / mockUsageStats.totalHours) * 100);

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'ダッシュボード',
    },
    {
      key: '/requests',
      icon: <FileTextOutlined />,
      label: '依頼管理',
    },
    {
      key: '/messages',
      icon: <MessageOutlined />,
      label: 'メッセージ',
    },
    {
      key: '/news',
      icon: <ReadOutlined />,
      label: 'AIニュースレポート',
    },
    {
      type: 'divider',
    },
    {
      key: '/contract',
      icon: <ContainerOutlined />,
      label: '契約情報',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '設定',
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'プロフィール',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '設定',
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'ログアウト',
      danger: true,
    },
  ];

  const notificationMenuItems: MenuProps['items'] = mockNotifications.slice(0, 5).map(notif => ({
    key: notif.id,
    label: (
      <div style={{ maxWidth: 300, padding: '4px 0' }}>
        <Text strong={!notif.isRead} style={{ display: 'block' }}>{notif.title}</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>{notif.message}</Text>
      </div>
    ),
    onClick: () => notif.link && navigate(notif.link),
  }));

  notificationMenuItems.push(
    { type: 'divider' },
    {
      key: 'all',
      label: <Text style={{ color: '#1890ff' }}>すべての通知を見る</Text>,
      onClick: () => navigate('/notifications'),
    }
  );

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={260}
        collapsedWidth={80}
        style={{
          boxShadow: '2px 0 12px rgba(0,0,0,0.08)',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ロゴ */}
        <div
          style={{
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #001529 0%, #003366 50%, #0055aa 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.03)',
            }}
          />
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <Text
              strong
              style={{
                color: '#fff',
                fontSize: collapsed ? 16 : 22,
                letterSpacing: 2,
                fontWeight: 700,
              }}
            >
              {collapsed ? 'OAI' : 'OTASUKE AI'}
            </Text>
            {!collapsed && (
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                バーチャルAIアシスタント
              </div>
            )}
          </div>
        </div>

        {/* ユーザー情報 */}
        {!collapsed && (
          <div
            style={{
              padding: '20px 16px',
              background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar
                size={48}
                icon={<UserOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)',
                  boxShadow: '0 4px 12px rgba(0,51,102,0.3)',
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text strong style={{ display: 'block', fontSize: 14 }}>{mockUser.name}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>{mockUser.company}</Text>
              </div>
            </div>
            <div
              style={{
                marginTop: 16,
                padding: '12px',
                background: '#fff',
                borderRadius: 8,
                border: '1px solid #e8e8e8',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Space size={4}>
                  <ClockCircleOutlined style={{ color: '#003366' }} />
                  <Text style={{ fontSize: 12 }}>今月の稼働時間</Text>
                </Space>
                <Text strong style={{ color: '#003366' }}>{usedPercentage}%</Text>
              </div>
              <div
                style={{
                  height: 6,
                  background: '#f0f0f0',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${usedPercentage}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #003366 0%, #0066cc 100%)',
                    borderRadius: 3,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <Text type="secondary" style={{ fontSize: 11, marginTop: 4, display: 'block' }}>
                {mockUsageStats.usedHours} / {mockUsageStats.totalHours}時間
              </Text>
            </div>
          </div>
        )}

        {/* メニュー */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ borderRight: 0, padding: '8px 0' }}
          />
        </div>

        {/* サポート */}
        {!collapsed && (
          <div style={{ padding: 16, borderTop: '1px solid #f0f0f0' }}>
            <Button
              type="dashed"
              icon={<CustomerServiceOutlined />}
              block
              style={{ marginBottom: 8 }}
            >
              サポートに連絡
            </Button>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <Text type="secondary" style={{ fontSize: 11 }}>
                営業時間: 平日 9:00-18:00
              </Text>
            </div>
            <a
              href="http://localhost:8080/#fv"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '8px 12px',
                background: '#f5f5f5',
                borderRadius: 6,
                color: '#666',
                fontSize: 12,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e8e8e8';
                e.currentTarget.style.color = '#003366';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f5f5f5';
                e.currentTarget.style.color = '#666';
              }}
            >
              <HomeOutlined />
              サービスサイトに戻る
            </a>
          </div>
        )}
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: 'margin-left 0.2s' }}>
        <Header
          style={{
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            position: 'sticky',
            top: 0,
            zIndex: 99,
            height: 64,
          }}
        >
          <Space size={16}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 18 }}
            />
            <Input
              placeholder="検索..."
              prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
              style={{
                width: 280,
                borderRadius: 20,
                background: '#f5f5f5',
                border: 'none',
              }}
              allowClear
            />
          </Space>

          <Space size={8}>
            <Tooltip title="ヘルプ">
              <Button
                type="text"
                icon={<QuestionCircleOutlined style={{ fontSize: 18 }} />}
              />
            </Tooltip>
            <Dropdown
              menu={{ items: notificationMenuItems }}
              placement="bottomRight"
              trigger={['click']}
              dropdownRender={(menu) => (
                <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 6px 16px rgba(0,0,0,0.12)' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
                    <Text strong>通知</Text>
                  </div>
                  {menu}
                </div>
              )}
            >
              <Badge count={unreadNotifications} size="small" offset={[-2, 2]}>
                <Button
                  type="text"
                  icon={<BellOutlined style={{ fontSize: 18 }} />}
                  style={{ padding: '4px 12px' }}
                />
              </Badge>
            </Dropdown>
            <Divider type="vertical" style={{ height: 24, margin: '0 8px' }} />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 8, transition: 'background 0.2s' }}>
                <Avatar
                  size={36}
                  icon={<UserOutlined />}
                  style={{
                    background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)',
                  }}
                />
                <div style={{ lineHeight: 1.3 }}>
                  <Text strong style={{ display: 'block', fontSize: 13 }}>{mockUser.name}</Text>
                  <Text type="secondary" style={{ fontSize: 11 }}>スタンダードプラン</Text>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content
          style={{
            margin: 24,
            minHeight: 'calc(100vh - 64px - 70px - 48px)',
          }}
        >
          <Outlet />
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            background: '#fafafa',
            borderTop: '1px solid #f0f0f0',
            padding: '16px 24px',
          }}
        >
          <Space split={<Divider type="vertical" />}>
            <a href="#" style={{ color: '#666', fontSize: 12 }}>利用規約</a>
            <a href="#" style={{ color: '#666', fontSize: 12 }}>プライバシーポリシー</a>
            <a href="#" style={{ color: '#666', fontSize: 12 }}>お問い合わせ</a>
          </Space>
          <div style={{ marginTop: 8 }}>
            <Text type="secondary" style={{ fontSize: 11 }}>
              © 2024 OTASUKE AI. All rights reserved.
            </Text>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
