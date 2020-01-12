const DRAG_SIDE_RANGE = 0.25
const DRAG_MIN_GAP = 2

export function calcDropPosition(event: React.MouseEvent, dom: HTMLElement) {
  const { clientY } = event
  const { top, bottom, height } = dom.getBoundingClientRect()
  const des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP)

  if (clientY <= top + des) {
    return -1
  }
  if (clientY >= bottom - des) {
    return 1
  }

  return 0
}
