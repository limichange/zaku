import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useState } from 'react'
import './index.less'
import { Button, Input, DatePicker } from 'antd'

export default function RightPanel() {
  const [components, setComponents] = useState([])
  const [collectedProps, drop] = useDrop({
    accept: ['input', 'button'],
    drop: (item, monitor) => {
      console.log(item, monitor)

      const component =
        item.type === 'button' ? <Button>按钮</Button> : <DatePicker />

      setComponents([...components, component])
    },
    collect: (minoter: DropTargetMonitor) => {
      const isOver = minoter.isOver()

      return {
        isOver
      }
    }
  })

  return (
    <div className='LeftPanel' ref={drop}>
      {components}
    </div>
  )
}
