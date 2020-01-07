import { Tree } from 'antd'

const { TreeNode } = Tree

export default function() {
  return (
    <div className='treeView'>
      <Tree
        checkable
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}>
        <TreeNode title='parent 1' key='0-0'>
          <TreeNode title='parent 1-0' key='0-0-0' disabled>
            <TreeNode title='leaf' key='0-0-0-0' disableCheckbox />
            <TreeNode title='leaf' key='0-0-0-1' />
          </TreeNode>
          <TreeNode title='parent 1-1' key='0-0-1'>
            <TreeNode
              title={<span style={{ color: '#1890ff' }}>sss</span>}
              key='0-0-1-0'
            />
          </TreeNode>
        </TreeNode>
      </Tree>
    </div>
  )
}
