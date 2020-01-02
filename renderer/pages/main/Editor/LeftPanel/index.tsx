import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useState } from 'react'
import './index.less'

export default function RightPanel() {
  const [components, setComponents] = useState([])
  const [collectedProps, drop] = useDrop({
    accept: 'a',
    collect: (minoter: DropTargetMonitor) => {
      const isOver = minoter.isOver()
      console.log(1)

      isOver && setComponents(components.concat([<input />]))

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
