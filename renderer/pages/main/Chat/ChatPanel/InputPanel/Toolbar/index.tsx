import React from 'react'
import { Icon } from 'antd'
import './index.less'

export default class Toolbar extends React.Component {
	render() {
		return (
			<div className='Toolbar'>
				<Icon type='file' />
			</div>
		)
	}
}
