import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useState } from 'react'
import { Button, Input, DatePicker } from 'antd'
import Hover from './Hover'
import './index.less'
import editorStore from '../store/editorStore'

export default function RightPanel() {
  const [components, setComponents] = useState([])
  const [collectedProps, drop] = useDrop({
    accept: ['input', 'button', 'datePicker'],
    drop: (item, monitor) => {
      let component = null

      if (item.type === 'button') {
        component = <Button>Button</Button>
      } else if (item.type === 'datePicker') {
        component = <DatePicker />
      } else if (item.type === 'input') {
        component = <Input />
      }

      if (!component) return

      // editorStore.addComponent({})

      setComponents([
        ...components,
        <Hover onClick={removeComponent}>{component}</Hover>
      ])
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
