import CodeEditor from './CodeEditor'
import Preview from './Preview'
import EditorArea from './EditorArea'
import { Tabs } from 'antd'
import $style from './index.less'

const { TabPane } = Tabs

export default function EditorBody() {
  return (
    <div className={$style.LeftPanel}>
      <Tabs tabBarStyle={{ margin: 0 }} animated={false} defaultActiveKey='0'>
        <TabPane tab='UI' key='0'>
          <EditorArea></EditorArea>
        </TabPane>
        <TabPane forceRender={true} tab='Code' key='1'>
          <CodeEditor></CodeEditor>
        </TabPane>
        <TabPane tab='Preview' key='2'>
          <Preview></Preview>
        </TabPane>
      </Tabs>
    </div>
  )
}
