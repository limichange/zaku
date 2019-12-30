import { useDrop, DropTargetMonitor } from 'react-dnd'

export default function RightPanel() {
  const [collectedProps, drop] = useDrop({
    accept: 'a',
    collect: (minoter: DropTargetMonitor) => ({
      isOver: minoter.isOver()
    })
  })

  return <div ref={drop}>Drop Target</div>
}
