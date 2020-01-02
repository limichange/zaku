import { useDrag } from 'react-dnd'

export default function() {
  return useDrag({
    item: { type: 'button', text: 'a' },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })
}
