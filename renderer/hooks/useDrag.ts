import { useDrag } from 'react-dnd'

export default function(item) {
  return useDrag({
    item,
    previewOptions: {
      offsetX: 0,
      offsetY: 0
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })
}
