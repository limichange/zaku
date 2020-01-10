import { Tabs } from 'antd'
import editorStore from '../../../../../../store/editorStore'
import useSubscribe from '../../../../../../hooks/useSubscribe'
import ControlPanel from './ControlPanel'
import ComponentsPanel from './ComponentsPanel'
import $style from './index.less'

const { TabPane } = Tabs

export default function RightPanel() {
  const [editorStoreState, setEditorStore] = useSubscribe(editorStore)

  function callback(key) {
    editorStore.setIndex(key)
  }

  return (
    <div className={$style.RightPanel}>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        size='small'
        animated={false}
        defaultActiveKey='0'
        activeKey={editorStoreState.tabIndex}
        onChange={callback}>
        <TabPane tab='Properties' key='0'>
          <ControlPanel></ControlPanel>
        </TabPane>
        <TabPane tab='Components' key='1'>
          <ComponentsPanel></ComponentsPanel>
        </TabPane>
      </Tabs>
    </div>
  )
}
