import { useDrop, DropTargetMonitor } from 'react-dnd'
import './index.less'

export default function RightPanel() {
  const [collectedProps, drop] = useDrop({
    accept: 'a',
    collect: (minoter: DropTargetMonitor) => ({
      isOver: minoter.isOver()
    })
  })

  return (
    <div className='LeftPanel' ref={drop}>
      Drop Target
    </div>
  )
}
