import React from 'react'
import { Button } from 'antd'
import './index.less'

export default class InputPanel extends React.Component {
	render() {
		return (
			<div className='InputPanel'>
				<textarea placeholder='输入信息' />
				<div className='btn'>
					<Button>发送</Button>
				</div>
			</div>
		)
	}
}
