import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import MainHeader from './MainHeader'
import Setting from './Setting'
import Editor from './Editor'
import './index.less'

const { Content, Sider } = Layout

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
              <span>Editor</span>
            </Menu.Item>
            <Menu.Item key='5'>
              <Icon type='setting' />
              <span>Setting</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <div className='mainLayout'>
            <MainHeader></MainHeader>
            <div className='mainContent'>
              {menuKey === '1' && <Editor />}
              {menuKey === '5' && <Setting />}
            </div>
          </div>
        </Layout>
      </Layout>
    )
  }
}

export default LayoutComponent
