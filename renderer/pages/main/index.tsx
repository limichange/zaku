import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import MainHeader from '../../components/mainPage/MainHeader'
import Setting from '../../components/mainPage/Setting'
import Editor from '../../components/mainPage/Editor'
import $style from './index.less'
import logo from './images/Icon.png'

const { Content, Sider } = Layout

class LayoutComponent extends React.Component {
  state = {
    collapsed: false,
    menuKey: '1'
  }

  onCollapse = (collapsed: boolean) => {
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
          <div className={$style['ant-pro-sider-menu-logo']} id='logo'>
            <img src={logo} alt='logo' />
          </div>
          <Menu
            theme='dark'
            onSelect={this.onMenuSelect}
            defaultSelectedKeys={['1']}
            mode='inline'>
            <Menu.Item key='1'>
              <Icon type='edit' />
              <span>Editor</span>
            </Menu.Item>
            <Menu.Item key='5'>
              <Icon type='setting' />
              <span>Setting</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <div className={$style.mainLayout}>
            <MainHeader></MainHeader>
            <div className={$style.mainContent}>
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
