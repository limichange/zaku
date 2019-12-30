import React from 'react'
import SplitPane from 'react-split-pane'
import './index.less'
import HTML5Backend from 'react-dnd-html5-backend'
import LeftPanel from './LeftPanel'
import { DndProvider } from 'react-dnd'
import RightPanel from './RightPanel'

export default function Chat() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='Chat'>
        {/* <ContactPanel />
				<ChatPanel /> */}

        <SplitPane>
          <div>
            <RightPanel></RightPanel>
          </div>
          <div>
            <LeftPanel></LeftPanel>
          </div>
        </SplitPane>
      </div>
    </DndProvider>
  )
}
