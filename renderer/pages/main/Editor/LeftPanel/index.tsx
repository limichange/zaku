import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useState } from 'react'
import { Button, Input, DatePicker } from 'antd'
import Hover from './Hover'
import editorStore from '../store/editorStore'
import uuid from 'uuid'
import './index.less'

export default function RightPanel() {
  const [components, setComponents] = useState([])
  const [collectedProps, drop] = useDrop({
    accept: ['input', 'button', 'datePicker'],
    drop: (item, monitor) => {
      let component = null
      const key = uuid()

      if (item.type === 'button') {
        component = <Button>Button</Button>
      } else if (item.type === 'datePicker') {
        component = <DatePicker />
      } else if (item.type === 'input') {
        component = <Input />
      }

      if (!component) return

      component = (
        <Hover key={key} uuid={key} onClick={removeComponent}>
          {component}
        </Hover>
      )

      editorStore.addComponent({
        key,
        ...item
      })

      setComponents([...components, component])
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
    <div className='LeftPanel' ref={drop}>
      {components}
    </div>
  )
}
