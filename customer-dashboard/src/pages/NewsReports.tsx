import React, { useState, useEffect } from 'react';
import {
  Card,
  List,
  Tag,
  Typography,
  Input,
  Select,
  Space,
  Avatar,
  Badge,
  Row,
  Col,
  Button,
  Segmented,
  Skeleton,
  Empty,
  Tooltip,
  Dropdown,
  Divider,
  Statistic,
  FloatButton,
  message,
  Drawer,
  Checkbox,
} from 'antd';
import {
  SearchOutlined,
  BulbOutlined,
  CalendarOutlined,
  FilterOutlined,
  BookOutlined,
  EyeOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  FireOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  ReadOutlined,
  FileTextOutlined,
  HeartOutlined,
  HeartFilled,
  MoreOutlined,
  SortAscendingOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ReloadOutlined,
  BellOutlined,
  CheckCircleOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockNewsReports } from '../mock/data';

const { Title, Text, Paragraph } = Typography;

const NewsReports: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<string | number>('list');
  const [sortBy, setSortBy] = useState('latest');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [readFilter, setReadFilter] = useState<string>('all');

  const categories = [...new Set(mockNewsReports.map(n => n.category))];
  const allTags = [...new Set(mockNewsReports.flatMap(n => n.tags))];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredNews = mockNewsReports.filter(news => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchText.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || news.category === categoryFilter;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => news.tags.includes(tag));
    const matchesReadFilter =
      readFilter === 'all' ||
      (readFilter === 'unread' && !news.isRead) ||
      (readFilter === 'read' && news.isRead) ||
      (readFilter === 'favorites' && favorites.includes(news.id));
    return matchesSearch && matchesCategory && matchesTags && matchesReadFilter;
  });

  // Sort
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
    }
    return 0;
  });

  const unreadCount = mockNewsReports.filter(n => !n.isRead).length;
  const readCount = mockNewsReports.filter(n => n.isRead).length;

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
    message.success(favorites.includes(id) ? 'お気に入りから削除しました' : 'お気に入りに追加しました');
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    'AI技術': <RocketOutlined />,
    '業界動向': <ThunderboltOutlined />,
    'ツール紹介': <BulbOutlined />,
    '事例紹介': <TrophyOutlined />,
  };

  const categoryColors: Record<string, string> = {
    'AI技術': '#1890ff',
    '業界動向': '#52c41a',
    'ツール紹介': '#722ed1',
    '事例紹介': '#fa8c16',
  };

  return (
    <div>
      {/* ヘッダー */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Space>
          <Title level={4} style={{ margin: 0 }}>
            <ReadOutlined style={{ marginRight: 8 }} />
            AIニュースレポート
          </Title>
          <Badge count={unreadCount} style={{ backgroundColor: '#ff4d4f' }}>
            <Tag icon={<BellOutlined />} color="red">未読</Tag>
          </Badge>
        </Space>
        <Space>
          <Tooltip title="更新">
            <Button icon={<ReloadOutlined />} onClick={() => message.info('更新しました')} />
          </Tooltip>
          <Tooltip title="すべて既読にする">
            <Button icon={<CheckCircleOutlined />} onClick={() => message.success('すべて既読にしました')} />
          </Tooltip>
        </Space>
      </div>

      {/* 統計カード */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ borderRadius: 12 }}>
            <Statistic
              title="総記事数"
              value={mockNewsReports.length}
              prefix={<FileTextOutlined style={{ color: '#003366' }} />}
              valueStyle={{ color: '#003366' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ borderRadius: 12 }}>
            <Statistic
              title="未読"
              value={unreadCount}
              prefix={<BulbOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ borderRadius: 12 }}>
            <Statistic
              title="既読"
              value={readCount}
              prefix={<EyeOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ borderRadius: 12 }}>
            <Statistic
              title="お気に入り"
              value={favorites.length}
              prefix={<HeartFilled style={{ color: '#eb2f96' }} />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* フィルターバー */}
      <Card style={{ marginBottom: 24, borderRadius: 12 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Input
              placeholder="ニュースを検索..."
              prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} md={16}>
            <Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
              <Space wrap>
                <Segmented
                  options={[
                    { label: 'すべて', value: 'all' },
                    { label: '未読', value: 'unread', icon: <Badge dot /> },
                    { label: '既読', value: 'read' },
                    { label: 'お気に入り', value: 'favorites', icon: <HeartOutlined /> },
                  ]}
                  value={readFilter}
                  onChange={(v) => setReadFilter(v as string)}
                />
                <Select
                  value={categoryFilter}
                  onChange={setCategoryFilter}
                  style={{ width: 150 }}
                  options={[
                    { value: 'all', label: 'すべてのカテゴリ' },
                    ...categories.map(cat => ({
                      value: cat,
                      label: (
                        <Space>
                          {categoryIcons[cat]}
                          {cat}
                        </Space>
                      ),
                    })),
                  ]}
                />
                <Button icon={<FilterOutlined />} onClick={() => setFilterDrawerOpen(true)}>
                  詳細フィルター
                </Button>
              </Space>
              <Space>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  style={{ width: 120 }}
                  prefix={<SortAscendingOutlined />}
                  options={[
                    { value: 'latest', label: '新しい順' },
                    { value: 'oldest', label: '古い順' },
                  ]}
                />
                <Segmented
                  options={[
                    { value: 'list', icon: <UnorderedListOutlined /> },
                    { value: 'grid', icon: <AppstoreOutlined /> },
                  ]}
                  value={viewMode}
                  onChange={setViewMode}
                />
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 詳細フィルターDrawer */}
      <Drawer
        title="詳細フィルター"
        placement="right"
        onClose={() => setFilterDrawerOpen(false)}
        open={filterDrawerOpen}
        width={320}
      >
        <div style={{ marginBottom: 24 }}>
          <Title level={5}>タグで絞り込み</Title>
          <Checkbox.Group
            value={selectedTags}
            onChange={(v) => setSelectedTags(v as string[])}
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
          >
            {allTags.map(tag => (
              <Checkbox key={tag} value={tag}>
                <Tag icon={<TagOutlined />}>{tag}</Tag>
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>

        <Divider />

        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            type="primary"
            block
            onClick={() => setFilterDrawerOpen(false)}
            style={{ background: 'linear-gradient(135deg, #003366 0%, #0066cc 100%)' }}
          >
            適用
          </Button>
          <Button
            block
            onClick={() => {
              setSelectedTags([]);
              setReadFilter('all');
              setCategoryFilter('all');
            }}
          >
            リセット
          </Button>
        </Space>
      </Drawer>

      {/* ニュースリスト */}
      <Skeleton loading={loading} active avatar paragraph={{ rows: 4 }}>
        {sortedNews.length > 0 ? (
          viewMode === 'list' ? (
            <List
              itemLayout="vertical"
              dataSource={sortedNews}
              pagination={{
                pageSize: 5,
                showTotal: (total) => `全 ${total} 件`,
                showSizeChanger: true,
              }}
              renderItem={(item) => (
                <Card
                  hoverable
                  style={{
                    marginBottom: 16,
                    borderRadius: 12,
                    border: !item.isRead ? '1px solid #e6f4ff' : '1px solid #f0f0f0',
                    background: !item.isRead ? 'linear-gradient(135deg, #fafafa 0%, #fff 100%)' : '#fff',
                  }}
                  styles={{ body: { padding: 20 } }}
                  onClick={() => navigate(`/news/${item.id}`)}
                >
                  <Row gutter={24} align="middle">
                    <Col xs={24} sm={4}>
                      <div style={{ position: 'relative' }}>
                        <Avatar
                          size={80}
                          icon={categoryIcons[item.category] || <BulbOutlined />}
                          style={{
                            backgroundColor: `${categoryColors[item.category] || '#003366'}15`,
                            color: categoryColors[item.category] || '#003366',
                          }}
                        />
                        {!item.isRead && (
                          <Badge
                            status="processing"
                            style={{ position: 'absolute', top: 0, right: 0 }}
                          />
                        )}
                      </div>
                    </Col>
                    <Col xs={24} sm={16}>
                      <Space style={{ marginBottom: 8 }}>
                        <Tag
                          icon={categoryIcons[item.category]}
                          color={categoryColors[item.category]}
                        >
                          {item.category}
                        </Tag>
                        {!item.isRead && <Tag color="red" icon={<FireOutlined />}>NEW</Tag>}
                        {favorites.includes(item.id) && (
                          <Tag color="pink" icon={<HeartFilled />}>お気に入り</Tag>
                        )}
                      </Space>
                      <Title level={5} style={{ margin: '0 0 8px' }}>
                        {item.title}
                      </Title>
                      <Paragraph
                        type="secondary"
                        ellipsis={{ rows: 2 }}
                        style={{ marginBottom: 12 }}
                      >
                        {item.summary}
                      </Paragraph>
                      <Space wrap size={[8, 8]}>
                        <Space size={4}>
                          <CalendarOutlined style={{ color: '#8c8c8c' }} />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {new Date(item.publishedAt).toLocaleDateString('ja-JP')}
                          </Text>
                        </Space>
                        <Space size={4}>
                          <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            約3分で読了
                          </Text>
                        </Space>
                        <Divider type="vertical" />
                        {item.tags.slice(0, 3).map(tag => (
                          <Tag key={tag} style={{ borderRadius: 12 }}>{tag}</Tag>
                        ))}
                      </Space>
                    </Col>
                    <Col xs={24} sm={4} style={{ textAlign: 'right' }}>
                      <Space direction="vertical" size={8}>
                        <Tooltip title={favorites.includes(item.id) ? 'お気に入り解除' : 'お気に入りに追加'}>
                          <Button
                            type="text"
                            icon={
                              favorites.includes(item.id)
                                ? <HeartFilled style={{ color: '#eb2f96' }} />
                                : <HeartOutlined />
                            }
                            onClick={(e) => toggleFavorite(item.id, e)}
                          />
                        </Tooltip>
                        <Tooltip title="共有">
                          <Button
                            type="text"
                            icon={<ShareAltOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              message.success('リンクをコピーしました');
                            }}
                          />
                        </Tooltip>
                        <Dropdown
                          menu={{
                            items: [
                              { key: 'later', label: 'あとで読む', icon: <BookOutlined /> },
                              { key: 'download', label: 'PDFでダウンロード', icon: <DownloadOutlined /> },
                            ],
                          }}
                          trigger={['click']}
                        >
                          <Button type="text" icon={<MoreOutlined />} onClick={(e) => e.stopPropagation()} />
                        </Dropdown>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              )}
            />
          ) : (
            // グリッドビュー
            <Row gutter={[16, 16]}>
              {sortedNews.map(item => (
                <Col xs={24} sm={12} lg={8} key={item.id}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: 12,
                      height: '100%',
                      border: !item.isRead ? '1px solid #e6f4ff' : '1px solid #f0f0f0',
                    }}
                    cover={
                      <div
                        style={{
                          height: 140,
                          background: `linear-gradient(135deg, ${categoryColors[item.category] || '#003366'}20, ${categoryColors[item.category] || '#003366'}05)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                        }}
                      >
                        <Avatar
                          size={64}
                          icon={categoryIcons[item.category] || <BulbOutlined />}
                          style={{
                            backgroundColor: categoryColors[item.category] || '#003366',
                            color: '#fff',
                          }}
                        />
                        {!item.isRead && (
                          <Tag
                            color="red"
                            icon={<FireOutlined />}
                            style={{ position: 'absolute', top: 12, right: 12 }}
                          >
                            NEW
                          </Tag>
                        )}
                        <Button
                          type="text"
                          icon={
                            favorites.includes(item.id)
                              ? <HeartFilled style={{ color: '#eb2f96' }} />
                              : <HeartOutlined style={{ color: '#fff' }} />
                          }
                          style={{ position: 'absolute', top: 8, left: 8 }}
                          onClick={(e) => toggleFavorite(item.id, e)}
                        />
                      </div>
                    }
                    onClick={() => navigate(`/news/${item.id}`)}
                  >
                    <Tag
                      icon={categoryIcons[item.category]}
                      color={categoryColors[item.category]}
                      style={{ marginBottom: 12 }}
                    >
                      {item.category}
                    </Tag>
                    <Title level={5} ellipsis={{ rows: 2 }} style={{ margin: '0 0 8px', height: 48 }}>
                      {item.title}
                    </Title>
                    <Paragraph
                      type="secondary"
                      ellipsis={{ rows: 2 }}
                      style={{ marginBottom: 12, fontSize: 13 }}
                    >
                      {item.summary}
                    </Paragraph>
                    <Space split={<Divider type="vertical" />}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <CalendarOutlined style={{ marginRight: 4 }} />
                        {new Date(item.publishedAt).toLocaleDateString('ja-JP')}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        約3分
                      </Text>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          )
        ) : (
          <Card style={{ borderRadius: 12 }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Text type="secondary">該当するニュースが見つかりませんでした</Text>
                  <br />
                  <Button
                    type="link"
                    onClick={() => {
                      setSearchText('');
                      setCategoryFilter('all');
                      setSelectedTags([]);
                      setReadFilter('all');
                    }}
                  >
                    フィルターをリセット
                  </Button>
                </div>
              }
            />
          </Card>
        )}
      </Skeleton>

      {/* フローティングボタン */}
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 24, bottom: 24 }}
        icon={<BulbOutlined />}
      >
        <FloatButton
          icon={<ReloadOutlined />}
          tooltip="更新"
          onClick={() => message.info('更新しました')}
        />
        <FloatButton
          icon={<CheckCircleOutlined />}
          tooltip="すべて既読"
          onClick={() => message.success('すべて既読にしました')}
        />
      </FloatButton.Group>
    </div>
  );
};

export default NewsReports;
