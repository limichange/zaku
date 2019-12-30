import React from 'react'
import SplitPane from 'react-split-pane'
import './index.less'
import LeftPanel from './LeftPanel'

export default class Chat extends React.Component {
  render() {
    return (
      <div className='Chat'>
        {/* <ContactPanel />
				<ChatPanel /> */}

        <SplitPane>
          <div>预览面板</div>
          <div>
            <LeftPanel></LeftPanel>
          </div>
        </SplitPane>
      </div>
    )
  }
}
