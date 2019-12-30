import React from 'react'
import { Avatar, Badge } from 'antd'
import styled from 'styled-components'
import './index.less'

const styles = styled.style`
	background: red;
`

console.log(styles.toString());

export default class ContactPanel extends React.Component {
	render() {
		return (
			<div className={styles}>
				<ul className='list'>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(group => {
						return (
							<li key={group}>
								<a href='#'>
									<div className='avatar'>
										<Avatar icon="user" />
									</div>
									<div className='info'>
										<div className='top'>
											<div className='name'>群组名称{group}</div>
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
