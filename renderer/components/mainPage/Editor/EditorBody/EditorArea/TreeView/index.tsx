import { Tree } from 'antd'
import $style from './index.less'
import useSubscribe from '../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../store/editorStore'

const { TreeNode } = Tree

export default function() {
  const [editorState] = useSubscribe(editorStore)

  function onSelect([key]) {
    editorStore.update({
      key
    })
  }

  // todo: custom tree component
  return (
    <div className={$style.TreeView}>
      <Tree
        draggable
        onSelect={onSelect}
        defaultExpandAll={true}
        selectedKeys={[editorState.key]}>
        {editorState.components.map(item => {
          return <TreeNode title={item.type} key={item.key} />
        })}
      </Tree>
    </div>
  )
}
