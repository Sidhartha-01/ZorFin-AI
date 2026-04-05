import AppRouter from './routes/AppRouter';
import { ConfigProvider, theme } from 'antd';

export default function App() {

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 12,
          fontFamily: 'Sora, system-ui, sans-serif',
          colorBgContainer: '#161b22',
          colorBgLayout: '#0b0f17',
          colorBorder: '#30363d',
        },
        components: {
          Card: {
            boxShadowTertiary: '0 4px 12px rgba(0, 0, 0, 0.5)',
          },
        },
      }}
    >
      <AppRouter />
    </ConfigProvider>
  );
}
