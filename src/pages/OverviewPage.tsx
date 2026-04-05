import React, { lazy, useState } from 'react';
import { Typography, List, Tag, Space, Button, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  WalletOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Area, Pie } from '@ant-design/plots';
import { useFinanceStore } from '../store/useFinanceStore';
import { useAIStore } from '../store/useAIStore';
import { formatCurrency } from '../utils';
import StatCard from '../components/StatCard';
import ZorfinCard from '../components/ZorfinCard';

import './OverviewPage.scss';

const { Title, Text } = Typography;

const OverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useFinanceStore();
  const { insights, isGenerating, setGenerating } = useAIStore();

  const [range, setRange] = useState<'1M' | '3M' | '6M' | '1Y' | 'MAX'>('MAX');

  const filterDataByRange = (data: any[], range: string) => {
    const now = new Date();

    return data.filter((item) => {
      const date = new Date(item.date);
      const diffMonths =
        (now.getFullYear() - date.getFullYear()) * 12 +
        (now.getMonth() - date.getMonth());

      switch (range) {
        case '1M':
          return diffMonths <= 1;
        case '3M':
          return diffMonths <= 3;
        case '6M':
          return diffMonths <= 6;
        case '1Y':
          return diffMonths <= 12;
        case 'MAX':
        default:
          return true;
      }
    });
  };

  const filteredData = filterDataByRange(data.balanceHistory, range);
  const areaConfig = {
    data: filteredData,
    xField: 'date',
    yField: 'balance',
    smooth: true,
    theme: 'dark',
    color: '#3b82f6',
    point: {
      size: 3,
      style: { fill: '#3b82f6', stroke: '#3b82f6' },
    },
  };

  const stats = [
    {
      title: 'Total Balance',
      value: data.totalBalance,
      color: '#3b82f6',
      icon: <WalletOutlined />,
    },
    {
      title: 'Total Income',
      value: data.totalIncome,
      color: '#22c55e',
      icon: <ArrowUpOutlined />,
    },
    {
      title: 'Total Expenses',
      value: data.totalExpenses,
      color: '#ef4444',
      icon: <ArrowDownOutlined />,
    },
  ];

  const pieConfig = {
    appendPadding: 10,
    data: data.categorySpending,
    angleField: 'amount',
    colorField: 'category',
    radius: 1,
    innerRadius: 0.4,
    theme: 'dark',
    color: ['#3b82f6', '#0ea5e9', '#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'],
  };

  return (
    <div className="overview-page">
      <div className="overview-header">
        <div>
          <Title level={2} className="zorfin-gradient-text header-title">
            Financial Command Center
          </Title>
          <Text className="header-subtitle">
            Welcome back, Sidhartha. Here's your ZorFin AI.
          </Text>
        </div>

        <Button
          type="primary"
          icon={<SyncOutlined spin={isGenerating} />}
          className="zorfin-btn-primary"
          onClick={() => {
            setGenerating(true);
            setTimeout(() => setGenerating(false), 2000);
          }}
        >
          Refresh Insights
        </Button>
      </div>

      <div className="stats-grid">
        {stats.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            color={item.color}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="chart-grid trend-section">
        <ZorfinCard
          title={
            <Space>
              <ThunderboltOutlined className="text-blue-500" /> Balance Trend
            </Space>
          }
          extra={
            <Space>
              {['1M', '3M', '6M', '1Y', 'MAX'].map((item) => (
                <Button
                  key={item}
                  size="small"
                  type={range === item ? 'primary' : 'default'}
                  onClick={() => setRange(item as any)}
                >
                  {item}
                </Button>
              ))}
            </Space>
          }
        >
          <div className="chart-container">
            <Area {...areaConfig} />
          </div>
        </ZorfinCard>
        <ZorfinCard
          title={
            <Space>
              <BulbOutlined className="text-yellow-500" /> ZorFin AI Insights
            </Space>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={insights}
            renderItem={(item) => (
              <div className="insight-item">
                <div className="insight-meta">
                  <Tag
                    color={
                      item.type === 'alert'
                        ? 'error'
                        : item.type === 'tip'
                          ? 'warning'
                          : 'processing'
                    }
                    className="border-none"
                  >
                    {item.type.toUpperCase()}
                  </Tag>
                  <Text type="secondary" style={{ fontSize: '0.75rem' }}>
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </Text>
                </div>
                <div className="insight-content">{item.content}</div>
              </div>
            )}
            locale={{
              emptyText: (
                <Empty
                  description={
                    <span className="text-slate-500">No insights yet</span>
                  }
                />
              ),
            }}
          />
        </ZorfinCard>
      </div>

      <div className="chart-grid category-section">
        <ZorfinCard title="Spending by Category">
          <div className="chart-container">
            <Pie {...pieConfig} />
          </div>
        </ZorfinCard>

        <ZorfinCard
          title="Recent Activity"
          extra={
            <Button
              type="link"
              className="text-blue-400 hover:text-blue-300"
              onClick={() => navigate('/transactions')}
            >
              View All
            </Button>
          }
        >
          <List
            dataSource={data.transactions.slice(0, 4)}
            renderItem={(item) => (
              <div className="activity-item">
                <div className="activity-item-content">
                  <div className="activity-item-info">
                    <div className="activity-description">
                      {item.description}
                    </div>
                    <div className="activity-meta">
                      <span className="activity-date">{item.date}</span>
                      <span className="activity-separator">|</span>
                      <Tag className="activity-category">{item.category}</Tag>
                    </div>
                  </div>
                  <div className={`activity-amount ${item.status}`}>
                    {item.status === 'income' ? '+' : '-'}
                    {formatCurrency(item.amount)}
                  </div>
                </div>
              </div>
            )}
          />
        </ZorfinCard>
      </div>
    </div>
  );
};

export default OverviewPage;
