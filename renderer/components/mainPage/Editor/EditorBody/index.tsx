import CodeEditor from './CodeEditor'
import Preview from './Preview'
import EditorArea from './EditorArea'
import { Tabs } from 'antd'
import $style from './index.less'
import LogicEditor from './LogicEditor'

const { TabPane } = Tabs

export default function EditorBody() {
  return (
    <div className={$style.LeftPanel}>
      <Tabs
        size='small'
        tabBarStyle={{ margin: 0 }}
        animated={false}
        defaultActiveKey='0'>
        <TabPane tab='UI' key='0'>
          <EditorArea></EditorArea>
        </TabPane>
        <TabPane tab='Logic' key='2'>
          <LogicEditor></LogicEditor>
        </TabPane>
        <TabPane tab='Code' key='3'>
          <CodeEditor></CodeEditor>
        </TabPane>
        <TabPane tab='Preview' forceRender={true} key='4'>
          <Preview></Preview>
        </TabPane>
      </Tabs>
    </div>
  )
}
