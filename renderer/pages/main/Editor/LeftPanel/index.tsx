import MonacoEditor from './MonacoEditor'
import Preview from './Preview'
import Editor from './Editor'
import { Button, Input, DatePicker, Tabs } from 'antd'

import './index.less'

const { TabPane } = Tabs

function LeftPanel() {
  return (
    <div className='LeftPanel'>
      <Tabs tabBarStyle={{ margin: 0 }} animated={false} defaultActiveKey='0'>
        <TabPane tab='UI' key='0'>
          <Editor></Editor>
        </TabPane>
        <TabPane tab='Code' key='1'>
          <div className='editor'>
            <MonacoEditor></MonacoEditor>
          </div>
        </TabPane>
        <TabPane tab='Preview' key='2'>
          <Preview></Preview>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default LeftPanel
