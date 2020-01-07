import $style from './index.less'
import TreeView from './TreeView'
import UIArea from './UIArea'
import RightPanel from './RightPanel'

export default function EditorArea(props) {
  return (
    <div className={$style.EditorArea}>
      <TreeView></TreeView>
      <UIArea></UIArea>
      <RightPanel></RightPanel>
    </div>
  )
}
