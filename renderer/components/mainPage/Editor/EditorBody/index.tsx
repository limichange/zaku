import CodeEditor from './CodeEditor'
import Preview from './Preview'
import EditorArea from './EditorArea'
import { Button, Input, DatePicker, Tabs } from 'antd'
import $style from './index.less'

const { TabPane } = Tabs

function LeftPanel() {
  return (
    <div className={$style.LeftPanel}>
      <Tabs tabBarStyle={{ margin: 0 }} animated={false} defaultActiveKey='0'>
        <TabPane tab='UI' key='0'>
          <EditorArea></EditorArea>
        </TabPane>
        <TabPane forceRender={true} tab='Code' key='1'>
          <div className={$style.editor}>
            <CodeEditor></CodeEditor>
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
