import { Tabs } from 'antd'
import editorStore from '../store/editorStore'
import useSubscribe from '../../../../hooks/useSubscribe'
import SettingPanel from './SettingPanel'
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
        animated={false}
        defaultActiveKey='0'
        activeKey={editorStoreState.tabIndex}
        onChange={callback}>
        <TabPane tab='属性' key='0'>
          <SettingPanel></SettingPanel>
        </TabPane>
        <TabPane tab='组件' key='1'>
          <ComponentsPanel></ComponentsPanel>
        </TabPane>
      </Tabs>
    </div>
  )
}
