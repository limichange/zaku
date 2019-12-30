import React from 'react'
import ChatHeader from './ChatHeader'
import './index.less'
import MessagePanel from './MessagePanel';
import InputPanel from './InputPanel';

export default class ChatPanel extends React.Component {
	render() {
		return (
			<div className='ChatPanel'>
				<ChatHeader />
        <MessagePanel />
        <InputPanel />
			</div>
		)
	}
}
