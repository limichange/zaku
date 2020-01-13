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

  function onDrop(e) {
    console.log(e)
    //   const { dropToGap, node, dragNode } = e
    //   const dropKey = node.props.eventKey
    //   const dragKey = dragNode.props.eventKey
    //   const dropPos = node.props.pos.split('-')
    //   const dropPosition = e.dropPosition - Number(dropPos[dropPos.length - 1])

    //   editorStore.moveComponent(dragKey, dropKey, dropToGap, dropPosition)
  }

  function displayNode(components) {
    return components.map(item => {
      let children = null

      if (item.components?.length > 0) {
        children = displayNode(item.components)
      }

      return (
        <TreeNode title={item.type} key={item.key}>
          {children}
        </TreeNode>
      )
    })
  }

  // todo: custom tree component
  return (
    <div className={$style.TreeView}>
      <Tree
        draggable
        onSelect={onSelect}
        defaultExpandAll={true}
        onDrop={onDrop}
        selectedKeys={[editorState.key]}>
        {displayNode(editorState.components)}
      </Tree>
    </div>
  )
}
