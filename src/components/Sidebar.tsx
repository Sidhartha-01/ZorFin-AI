import React from 'react';
import { Layout, Menu, Space, Typography } from 'antd';
import {
  DashboardOutlined,
  TransactionOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

import './Sidebar.scss';

const { Sider } = Layout;
const { Title } = Typography;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Overview',
    },
    {
      key: '/transactions',
      icon: <TransactionOutlined />,
      label: 'Transactions',
    },
  ];

  return (
    <Sider collapsed={collapsed} className="zorfin-sider">
      <div className="logo-container">
        <Space align="center">
          <div className="logo-icon">
            <WalletOutlined />
          </div>
          {!collapsed && (
            <Title
              level={4}
              style={{ margin: 0 }}
              className="zorfin-gradient-text"
            >
              ZorFin AI
            </Title>
          )}
        </Space>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        className="side-menu"
      />
    </Sider>
  );
};

export default Sidebar;
