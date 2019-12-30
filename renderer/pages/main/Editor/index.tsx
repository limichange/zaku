import React from 'react'
import SplitPane from 'react-split-pane'
import './index.less'
import HTML5Backend from 'react-dnd-html5-backend'

import LeftPanel from './LeftPanel'
import { DndProvider } from 'react-dnd'

export default class Chat extends React.Component {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>
    )
  }
}
