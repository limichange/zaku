import CodeEditor from './CodeEditor'
import Preview from './Preview'
import EditorArea from './EditorArea'
import { Tabs } from 'antd'
import $style from './index.less'
import EventEditor from './EventEditor'

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
        <TabPane tab='Event' key='2'>
          <EventEditor></EventEditor>
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
