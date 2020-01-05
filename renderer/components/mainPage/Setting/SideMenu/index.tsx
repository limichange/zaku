import { Menu, Icon } from 'antd'
import React from 'react';

const { SubMenu } = Menu

export default class SideMenu extends React.Component {
	handleClick = (e: any) => {
		console.log('click ', e)
	}

	render() {
		return (
			<Menu
				onClick={this.handleClick}
				style={{ width: 224, height: '100vh' }}
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['1']}
				mode='inline'>
				<Menu.Item
					key='1'>
          <span>基本设置</span>
				</Menu.Item>
				<Menu.Item
					key='2'>
          <span>安全设置</span>
				</Menu.Item>
				<Menu.Item
					key='3'>
          <span>账号绑定</span>
				</Menu.Item>
				<Menu.Item
					key='4'>
          <span>消息通知</span>
				</Menu.Item>
			</Menu>
		)
	}
}
