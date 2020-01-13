import $style from './index.less'
import { px } from '../../utils/style'

let index = 5000

export default function DragPreview(props) {
  return (
    <div
      style={{ top: px((index += 30)) }}
      ref={props.ref}
      className={$style.previewWrap}>
      <div className={$style.preview}>{props.children}</div>
    </div>
  )
}
