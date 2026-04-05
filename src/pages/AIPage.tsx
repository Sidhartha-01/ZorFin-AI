import React from 'react';
import { Typography } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import AIChatBox from '../components/AIChatBox';

import './AIPage.scss';

const { Title, Text } = Typography;

const AIPage: React.FC = () => {
  return (
    <div className="ai-page">
      <div className="ai-page-header">
        <div className="header-content">
          <div className="header-title-group">
            <Title level={2} className="zorfin-gradient-text header-title">
              <BulbOutlined /> ZorFin AI Assistant
            </Title>
            <Text className="header-subtitle">
              Ask questions about your finances and get AI-powered insights
            </Text>
          </div>
        </div>
      </div>

      <div className="ai-page-content">
        <div className="ai-container">
          <AIChatBox />
        </div>
      </div>
    </div>
  );
};

export default AIPage;
