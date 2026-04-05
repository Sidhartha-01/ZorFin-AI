import React from 'react';
import { Statistic, Typography } from 'antd';
import { formatCurrency } from '../utils';
import './StatCard.scss';

const { Text } = Typography;

interface StatCardProps {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color, icon }) => {
  return (
    <div className="stat-card">
      <Statistic
        title={<Text className="stat-title">{title}</Text>}
        value={value}
        precision={0}
        valueStyle={{ color, fontWeight: 700 }}
        prefix={icon}
        formatter={(val) => formatCurrency(val as number)}
      />
    </div>
  );
};

export default StatCard;
