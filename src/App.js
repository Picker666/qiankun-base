import { useState, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';

import './App.css';

const { Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const defaultKey = useRef(location.pathname.split('/')[1]);
  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const items = useMemo(() => [{
    label: <Link to="/app-vue">Vue应用</Link>,
    icon: <DesktopOutlined/>,
    key: 'app-vue',
    title: 'Vue应用',
  },{
    label: <Link to="/app-react">React应用</Link>,
    icon: <PieChartOutlined />,
    key: 'app-react',
    title: 'React应用'
  }], []);

  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu theme="dark" defaultSelectedKeys={[defaultKey.current]} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Content>
          <div id="container" className="site-layout-background" style={{ minHeight: 360 }}></div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>This Project ©2021 Created by DiDi</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
