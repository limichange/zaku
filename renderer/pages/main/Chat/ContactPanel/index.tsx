import React from 'react'
import { List, Badge } from 'antd'

import './index.less'

export default class ContactPanel extends React.Component {
	render() {
		return (
			<div className='ContactPanel'>
				<ul className='list'>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(group => {
						return (
							<li key={group}>
								<a href='#'>
									<div className='avatar'>
										<img
											src='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
											alt=''
										/>
									</div>
									<div className='info'>
										<div className='top'>
											<div className='name'>群组名称{group}</div>
											<div className='ago'>2分钟前</div>
										</div>
										<div className='bottom'>
											<div className='content'>
												内容内容内容内容内容内容内容内容内容内容内容内容内容内容
											</div>
											<Badge count={25} style={{ fontSize: 10 }} />
										</div>
									</div>
								</a>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}
