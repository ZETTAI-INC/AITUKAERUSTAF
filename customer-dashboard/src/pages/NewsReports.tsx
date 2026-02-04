import React, { useState } from 'react';
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
} from 'antd';
import {
  SearchOutlined,
  BulbOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockNewsReports } from '../mock/data';

const { Title, Text, Paragraph } = Typography;

const NewsReports: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [...new Set(mockNewsReports.map(n => n.category))];

  const filteredNews = mockNewsReports.filter(news => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchText.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || news.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const unreadCount = mockNewsReports.filter(n => !n.isRead).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Space>
          <Title level={4} style={{ margin: 0 }}>AIニュースレポート</Title>
          {unreadCount > 0 && (
            <Badge count={`${unreadCount}件未読`} style={{ backgroundColor: '#003366' }} />
          )}
        </Space>
      </div>

      <Card>
        {/* フィルター */}
        <Space wrap style={{ marginBottom: 24 }}>
          <Input
            placeholder="ニュースを検索..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: 150 }}
            options={[
              { value: 'all', label: 'すべてのカテゴリ' },
              ...categories.map(cat => ({ value: cat, label: cat })),
            ]}
          />
        </Space>

        {/* ニュースリスト */}
        <List
          itemLayout="vertical"
          dataSource={filteredNews}
          pagination={{
            pageSize: 5,
            showTotal: (total) => `全 ${total} 件`,
          }}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              style={{
                cursor: 'pointer',
                background: !item.isRead ? '#fafafa' : 'transparent',
                padding: 16,
                marginBottom: 8,
                borderRadius: 8,
                border: '1px solid #f0f0f0',
              }}
              onClick={() => navigate(`/news/${item.id}`)}
            >
              <Row gutter={16} align="top">
                <Col flex="none">
                  <Avatar
                    size={48}
                    icon={<BulbOutlined />}
                    style={{
                      backgroundColor: !item.isRead ? '#003366' : '#bfbfbf',
                    }}
                  />
                </Col>
                <Col flex="auto">
                  <div style={{ marginBottom: 8 }}>
                    <Space>
                      <Tag color="blue">{item.category}</Tag>
                      {!item.isRead && <Tag color="red">未読</Tag>}
                    </Space>
                  </div>
                  <Title level={5} style={{ margin: 0, marginBottom: 8 }}>
                    {item.title}
                  </Title>
                  <Paragraph
                    type="secondary"
                    ellipsis={{ rows: 2 }}
                    style={{ marginBottom: 8 }}
                  >
                    {item.summary}
                  </Paragraph>
                  <Space wrap>
                    <Space>
                      <CalendarOutlined />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {new Date(item.publishedAt).toLocaleDateString('ja-JP')}
                      </Text>
                    </Space>
                    {item.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Space>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default NewsReports;
