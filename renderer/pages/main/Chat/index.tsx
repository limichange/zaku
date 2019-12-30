import React from 'react'
import ContactPanel from './ContactPanel'
import ChatPanel from './ChatPanel'
import SplitPane from 'react-split-pane'
import './index.less'

export default class Chat extends React.Component {
  render() {
    return (
      <div className='Chat'>
        {/* <ContactPanel />
				<ChatPanel /> */}

        <SplitPane>
          <div>This div has a minimum size of 200px</div>
          <div />
        </SplitPane>
      </div>
    )
  }
}
