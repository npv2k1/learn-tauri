import React, { PropsWithChildren } from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Col, Layout, Menu, Row, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import { menu } from '@/routes';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
  {
    key: '/',
    icon: <BarChartOutlined />,
    label: `Home`,
  },
  {
    key: '/learn',
    icon: <BarChartOutlined />,
    label: `Learn`,
  },

  {
    key: '/tauri',
    icon: <BarChartOutlined />,
    label: `Tauri`,
  },
  {
    key: '/dictionary',
    icon: <BarChartOutlined />,
    label: `Dictionary`,
  },
];

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          onClick={({ keyPath }) => {
            console.log('🚀 ~ file: index.tsx:66 ~ keyPath:', keyPath);
            navigate(`${keyPath[0]}`);
          }}
          theme="dark"
          mode="inline"
          items={menu}
        />
      </Sider>
      <Layout className="flex h-screen bg-gray-300" style={{ marginLeft: 200 }}>
        <Header className="flex h-12 w-full items-start justify-center bg-white">
          <Row className="flex h-full w-full items-center ">
            <Col span={8} className="flex items-center justify-center">
              <Search placeholder="Search" enterButton />
            </Col>
          </Row>
        </Header>
        <Content className="m-1 bg-white text-start">
          <div
            className="h-full flex-1 justify-start overflow-auto rounded-lg shadow-lg"
            style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
