import { useDrag } from 'react-dnd'

export default function(item) {
  return useDrag({
    item,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })
}
