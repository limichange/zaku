import { useDrop } from 'react-dnd'

export default function RightPanel() {
  const [collectedProps, drop] = useDrop({
    accept: 'a'
  })

  return <div ref={drop}>Drop Target</div>
}
