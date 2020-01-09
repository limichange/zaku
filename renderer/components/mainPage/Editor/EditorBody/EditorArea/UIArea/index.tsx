import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useState, useEffect } from 'react'
import { Button, Input, DatePicker } from 'antd'
import Hover from '../Hover'
import editorStore from '../../../../../../store/editorStore'
import uuid from 'uuid'
import useSubscribe from '../../../../../../hooks/useSubscribe'
import $style from './index.less'
import componentsMap from '../../../../../../utils/componentsMap'
import React from 'react'

export default function UIArea() {
  const [components, setComponents] = useState([])
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    setComponents(
      editorState.components.map(item => {
        const key = item.key
        const Component = componentsMap.getComponent(item.type)

        return (
          <Hover key={key} uuid={key} onClick={removeComponent}>
            <Component key={key} {...item.attributes}>
              {item.text}
            </Component>
          </Hover>
        )
      })
    )
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
