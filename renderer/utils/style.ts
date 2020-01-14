export function px(value) {
  return `${value}px`
}

export function noPx(value = '0px') {
  return Number(value.split('px')[0])
}
