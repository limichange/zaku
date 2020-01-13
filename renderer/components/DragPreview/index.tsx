import $style from './index.less'

export default function DragPreview(props) {
  return (
    <div ref={props.ref} className={$style.previewWrap}>
      <div className={$style.preview}>{props.children}</div>
    </div>
  )
}
