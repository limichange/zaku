import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useState, useEffect } from 'react'
import Hover from '../Hover'
import editorStore from '../../../../../../store/editorStore'
import useSubscribe from '../../../../../../hooks/useSubscribe'
import $style from './index.less'
import React from 'react'
import renderTree from '../../../../../../utils/renderTree'
import componentsMap from '../../../../../../utils/componentsMap'

export default function UIArea() {
  const [components, setComponents] = useState([])
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    setComponents(renderTree(editorState.components, Hover))
  }, [editorState])

  const [collectedProps, drop] = useDrop({
    accept: [...componentsMap.getAllComponetsName()],
    drop: (item, monitor) => {
      editorStore.addComponent({
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

  return (
    <div ref={drop} className={$style.uiArea}>
      {components}
    </div>
  )
}
