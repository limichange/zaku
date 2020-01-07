import { Tree } from 'antd'
import $style from './index.less'

const { TreeNode } = Tree

export default function() {
  return (
    <div className={$style.TreeView}>
      <Tree defaultExpandedKeys={['0-0-0', '0-0-1']}>
        <TreeNode title='Layout' key='0-0'>
          <TreeNode title='Row' key='0-0-0'>
            <TreeNode title='Button' key='0-0-0-0' />
            <TreeNode title='Button' key='0-0-0-1' />
          </TreeNode>
          <TreeNode title='Row' key='0-0-1'>
            <TreeNode title='Input' key='0-0-1-0' />
          </TreeNode>
        </TreeNode>
      </Tree>
    </div>
  )
}
