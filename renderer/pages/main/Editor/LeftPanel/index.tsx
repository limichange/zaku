import { useDrop, DropTargetMonitor } from 'react-dnd'
import './index.less'

export default function RightPanel() {
  const [collectedProps, drop] = useDrop({
    accept: 'a',
    collect: (minoter: DropTargetMonitor) => {
      console.log(1)

      return {
        isOver: minoter.isOver()
      }
    }
  })

  const components = []

  return (
    <div className='LeftPanel' ref={drop}>
      Drop Target
      {components}
    </div>
  )
}
