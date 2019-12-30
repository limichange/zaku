import React from 'react'
import ContactPanel from './ContactPanel'
import ChatPanel from './ChatPanel'
import './index.less'

export default class Chat extends React.Component {
	render() {
		return (
			<div className='Chat'>
				<ContactPanel />
				<ChatPanel />
			</div>
		)
	}
}
