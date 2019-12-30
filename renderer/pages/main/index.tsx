import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import Chat from './Chat'
import History from './History'
import Contact from './Contact'
import Cloud from './Cloud'
import MainHeader from './MainHeader'

const { Content, Sider } = Layout

import './index.less'
import Setting from './Setting'

class LayoutComponent extends React.Component {
  state = {
    collapsed: false,
    menuKey: '1'
  }

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  onMenuSelect = (e: {
    item: any
    key: any
    keyPath: any
    selectedKeys: any
    domEvent: any
  }) => {
    const { key } = e

    this.setState({
      menuKey: key
    })
  }

  render() {
    const { menuKey } = this.state

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          width={140}
          collapsible
          defaultCollapsed={true}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}>
          <div className='ant-pro-sider-menu-logo' id='logo'>
            <img src='/static/Icon.png' alt='logo' />
          </div>
          <Menu
            theme='dark'
            onSelect={this.onMenuSelect}
            defaultSelectedKeys={['1']}
            mode='inline'>
            <Menu.Item key='1'>
              <Icon type='message' />
              <span>聊天</span>
            </Menu.Item>
            <Menu.Item key='2'>
              <Icon type='contacts' />
              <span>通讯录</span>
            </Menu.Item>
            <Menu.Item key='3'>
              <Icon type='cloud' />
              <span>文件云</span>
            </Menu.Item>
            <Menu.Item key='4'>
              <Icon type='clock-circle' />
              <span>记录</span>
            </Menu.Item>
            <Menu.Item key='5'>
              <Icon type='setting' />
              <span>设置</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <div className='mainLayout'>
            <MainHeader></MainHeader>
            <div className='mainContent'>
              {menuKey === '1' && <Chat />}
              {menuKey === '2' && <Contact />}
              {menuKey === '3' && <Cloud />}
              {menuKey === '4' && <History />}
              {menuKey === '5' && <Setting />}
            </div>
          </div>
        </Layout>
      </Layout>
    )
  }
}

export default LayoutComponent
