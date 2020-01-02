import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useState } from 'react'
import './index.less'

export default function RightPanel() {
  const [components, setComponents] = useState([])
  const [collectedProps, drop] = useDrop({
    accept: 'a',
    drop: (item, monitor) => {
      setComponents(components.concat([<input />]))
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
      Drop Target
      {components}
    </div>
  )
}
