import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useState, useEffect } from 'react'
import Hover from '../Hover'
import editorStore from '../../../../../../store/editorStore'
import uuid from 'uuid'
import useSubscribe from '../../../../../../hooks/useSubscribe'
import $style from './index.less'
import React from 'react'
import renderTree from '../../../../../../utils/renderTree'

export default function UIArea() {
  const [components, setComponents] = useState([])
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    setComponents(renderTree(editorState.components, Hover))
  }, [editorState])

  const [collectedProps, drop] = useDrop({
    accept: ['AntdInput', 'AntdButton', 'AntdDatePicker'],
    drop: (item, monitor) => {
      editorStore.addComponent({
        key: uuid(),
        attributes: {},
        ...item
      })
    },
    collect: (minoter: DropTargetMonitor) => {
      const isOver = minoter.isOver()

      return {
        isOver
      }
    }
  })

  function removeComponent(key) {
    console.log(key)
  }

  return (
    <div ref={drop} className={$style.uiArea}>
      {components}
    </div>
  )
}
