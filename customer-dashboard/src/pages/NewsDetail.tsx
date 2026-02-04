import React from 'react';
import {
  Card,
  Typography,
  Tag,
  Space,
  Button,
  Divider,
  Row,
  Col,
} from 'antd';
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ShareAltOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { mockNewsReports } from '../mock/data';

const { Title, Text, Paragraph } = Typography;

const NewsDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const news = mockNewsReports.find(n => n.id === id);
  const relatedNews = mockNewsReports
    .filter(n => n.id !== id && n.category === news?.category)
    .slice(0, 3);

  if (!news) {
    return (
      <Card>
        <Text>ニュースが見つかりませんでした。</Text>
        <Button type="link" onClick={() => navigate('/news')}>
          一覧に戻る
        </Button>
      </Card>
    );
  }

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/news')}
        >
          ニュース一覧に戻る
        </Button>
      </Space>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card>
            <Space style={{ marginBottom: 16 }}>
              <Tag color="blue">{news.category}</Tag>
              <Space>
                <CalendarOutlined />
                <Text type="secondary">
                  {new Date(news.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </Space>
            </Space>

            <Title level={3}>{news.title}</Title>

            <Paragraph
              style={{
                fontSize: 16,
                color: '#666',
                background: '#f5f5f5',
                padding: 16,
                borderRadius: 8,
                borderLeft: '4px solid #003366',
              }}
            >
              {news.summary}
            </Paragraph>

            <Divider />

            <div style={{ whiteSpace: 'pre-line', fontSize: 15, lineHeight: 1.8 }}>
              {news.content}
            </div>

            <Divider />

            <Space wrap>
              {news.tags.map(tag => (
                <Tag key={tag} style={{ cursor: 'pointer' }}>#{tag}</Tag>
              ))}
            </Space>

            <Divider />

            <Space>
              <Button icon={<ShareAltOutlined />}>共有</Button>
              <Button icon={<PrinterOutlined />}>印刷</Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="関連ニュース">
            {relatedNews.length > 0 ? (
              <Space direction="vertical" style={{ width: '100%' }}>
                {relatedNews.map(item => (
                  <Card
                    key={item.id}
                    size="small"
                    hoverable
                    onClick={() => navigate(`/news/${item.id}`)}
                  >
                    <Text strong>{item.title}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {new Date(item.publishedAt).toLocaleDateString('ja-JP')}
                    </Text>
                  </Card>
                ))}
              </Space>
            ) : (
              <Text type="secondary">関連ニュースはありません</Text>
            )}
          </Card>

          <Card title="カテゴリ" style={{ marginTop: 16 }}>
            <Space wrap>
              {[...new Set(mockNewsReports.map(n => n.category))].map(cat => (
                <Tag
                  key={cat}
                  color="blue"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/news')}
                >
                  {cat}
                </Tag>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NewsDetail;
