import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useState, useEffect } from 'react'
import { Button, Input, DatePicker } from 'antd'
import Hover from '../Hover'
import editorStore from '../../../../../../store/editorStore'
import uuid from 'uuid'
import useSubscribe from '../../../../../../hooks/useSubscribe'
import $style from './index.less'

export default function UIArea() {
  const [components, setComponents] = useState([])
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    setComponents(
      editorState.components.map(c => {
        let component = null
        const key = c.key

        // todo: auto create component
        if (c.type === 'button') {
          component = <Button {...c.attributes}>Button</Button>
        } else if (c.type === 'datePicker') {
          component = <DatePicker />
        } else if (c.type === 'input') {
          component = <Input />
        }

        if (!component) return

        return (
          <Hover key={key} uuid={key} onClick={removeComponent}>
            {component}
          </Hover>
        )
      })
    )
  }, [editorState])

  const [collectedProps, drop] = useDrop({
    accept: ['input', 'button', 'datePicker'],
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
