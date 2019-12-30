import React from 'react'
import SplitPane from 'react-split-pane'
import HTML5Backend from 'react-dnd-html5-backend'
import LeftPanel from './LeftPanel'
import { DndProvider } from 'react-dnd'
import RightPanel from './RightPanel'
import './index.less'

export default function Editor() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='Editor'>
        {/* <SplitPane> */}
        <LeftPanel></LeftPanel>
        <RightPanel></RightPanel>
        {/* </SplitPane> */}
      </div>
    </DndProvider>
  )
}
