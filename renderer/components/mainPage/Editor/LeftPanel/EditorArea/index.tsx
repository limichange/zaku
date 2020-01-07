import $style from './index.less'
import TreeView from './TreeView'
import UIArea from './UIArea'

export default function EditorArea(props) {
  return (
    <div className={$style.EditorArea}>
      <TreeView></TreeView>
      <UIArea></UIArea>
    </div>
  )
}
