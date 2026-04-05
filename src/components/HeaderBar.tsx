import React from 'react';
import {
  Layout,
  Button,
  Avatar,
  Dropdown,
  Space,
  Typography,
  Switch,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useUserStore } from '../store/useUserStore';

import './HeaderBar.scss';

const { Header } = Layout;
const { Text } = Typography;

interface HeaderBarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ collapsed, onToggle }) => {
  const { role, setRole } = useUserStore();

  const userMenuItems: any[] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  return (
    <Header className="zorfin-header">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        className="h-10 w-10 text-slate-400 hover:text-white"
      />

      <div className="header-actions">
        <Space align="center">
          <Text strong className="text-slate-400">
            Role:
          </Text>
          <Switch
            checkedChildren="Admin"
            unCheckedChildren="Viewer"
            checked={role === 'Admin'}
            onChange={(checked) => setRole(checked ? 'Admin' : 'Viewer')}
          />
        </Space>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <Space className="user-profile">
            <Avatar icon={<UserOutlined />} className="bg-blue-600" />
            <div className="user-info">
              <Text strong className="user-name">
                Sidhartha
              </Text>
              <Text type="secondary" className="user-role">
                {role}
              </Text>
            </div>
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderBar;
