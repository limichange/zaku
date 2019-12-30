import React from 'react'
import './index.less'
import Message from './Message'

export default class MessagePanel extends React.Component {
	render() {
		const messages = [
			{
				id: '1',
				owner: {
					from: 'me',
					nickname: '侯耀',
					avatar:
						'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epkRo85mMCunRuicc5icmvjmxfgdefiaBy5ngvurCbp2amW42Qh5Ez8q4XKejsKZnLkWMrtotIAQGiaZg/132'
				},
				content: '吃饭了？'
			}
		]

		return (
			<div className='MessagePanel'>
				{messages.map(message => {
					return (
						<Message
							key={message.id}
							owner={message.owner}
							content={message.content}
						/>
					)
				})}
			</div>
		)
	}
}
