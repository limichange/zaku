import React from 'react'
import { Icon, Menu, Dropdown } from 'antd'
import './index.less'

const menu = (
	<Menu>
		<Menu.Item>
			<a
				target='_blank'
				rel='noopener noreferrer'
				href='http://www.alipay.com/'>
				下载APP
			</a>
		</Menu.Item>
		<Menu.Item>
			<a
				target='_blank'
				rel='noopener noreferrer'
				href='http://www.taobao.com/'>
				关于
			</a>
		</Menu.Item>
		<Menu.Item>退出</Menu.Item>
	</Menu>
)

export default class UserAvatar extends React.Component {
	render() {
		return (
			<Dropdown overlay={menu}>
					<a className='ant-dropdown-link UserAvatar' href='#'>
						<img src='https://wx.qlogo.cn/mmopen/vi_32/KYtYYmlW9ccKqGngXhYxDWiawqY6Dz2NiaYjo0PCnLk9XkiaIZhAuK7hDibQ6t6BTFthudxLkwN9OIicRT3JyOdobLw/132' />
						<Icon type='caret-down' />
					</a>
			</Dropdown>
		)
	}
}
