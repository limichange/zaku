import React from 'react'
import SideMenu from './SideMenu'
import { List } from 'antd'
import './index.less'

const data = [
  {
    title: '账户密码',
    desc: '当前密码强度：强'
  },
  {
    title: '密保手机',
    desc: '已绑定手机：138****8293'
  },
  {
    title: '密保问题',
    desc: '未设置密保问题，密保问题可有效保护账户安全'
  },
  {
    title: '备用邮箱',
    desc: '已绑定邮箱：ant***sign.com'
  },
]

export default class Setting extends React.Component {
	render() {
		return (
			<div className='Setting'>
				<div className='leftMenu'>
					<SideMenu />
				</div>
				<div className='right'>
					<div className='title'>设置</div>
          <List
						itemLayout='horizontal'
						dataSource={data}
						renderItem={item => (
							<List.Item>
								<List.Item.Meta
									title={<a href='https://ant.design'>{item.title}</a>}
									description={item.desc}
								/>
							</List.Item>
						)}
					/>
				</div>
			</div>
		)
	}
}
