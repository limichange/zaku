import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import EditorBody from './EditorBody'
import { DndProvider } from 'react-dnd'
import $style from './index.less'

export default function Editor() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={$style.Editor}>
        <EditorBody></EditorBody>
      </div>
    </DndProvider>
  )
}
