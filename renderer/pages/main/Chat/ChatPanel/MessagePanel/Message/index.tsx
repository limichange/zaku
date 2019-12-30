import React from 'react'
import './index.less'

type props = {
  owner: {
    from: string,
    avatar: string,
    nickname: string
  },
  content: string
}

export default class Message extends React.Component<props> {
	render() {
		return (
      <>
			<div className='message ng-scope me'>
				<img
					src='https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epkRo85mMCunRuicc5icmvjmxfgdefiaBy5ngvurCbp2amW42Qh5Ez8q4XKejsKZnLkWMrtotIAQGiaZg/132'
					alt=''
					className='avatar'
				/>
        <div className="content">
          <div className="bubble js_message_bubble ng-scope bubble_primary right">
            <div className="bubble_cont">
              <div className="plain">
                <div className="js_message_plain ng-binding">吃饭了没有？</div>
              </div>
            </div>
          </div>
        </div>
			</div>
			<div className='message ng-scope you'>
				<img
					src='https://wx.qlogo.cn/mmopen/vi_32/KYtYYmlW9ccKqGngXhYxDWiawqY6Dz2NiaYjo0PCnLk9XkiaIZhAuK7hDibQ6t6BTFthudxLkwN9OIicRT3JyOdobLw/132'
					alt=''
					className='avatar'
				/>
        <div className="content">
          <div className="bubble js_message_bubble ng-scope bubble_default left">
            <div className="bubble_cont">
              <div className="plain">
                <div className="js_message_plain ng-binding">没有</div>
              </div>
            </div>
          </div>
        </div>
			</div>
      </>
		)
	}
}
