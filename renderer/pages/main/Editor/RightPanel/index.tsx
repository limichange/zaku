import { Tabs } from 'antd'
import useDrag from './useDrag'
import Example1 from '../../../../components/Example1'
import Example2 from '../../../../components/Example2'
import DatePicker from '../../../../components/DatePicker'
import store from '../store'
import { useEffect, useState } from 'react'
import './index.less'
import useSubscribe from '../../../../hooks/useSubscribe'

const { TabPane } = Tabs

export default function RightPanel() {
  const [item, dragRef] = useDrag({ type: 'input', text: 'a' })
  const [item2, dragRef2] = useDrag({ type: 'button', text: 'a' })
  const [item3, dragRef3] = useDrag({ type: 'datePicker', text: 'a' })
  const [editorStore, setEditorStore] = useState(store.initialState)

  useSubscribe(store, setEditorStore)

  function callback(key) {
    store.setIndex(key)
  }

  return (
    <div className='RightPanel'>
      <Tabs
        defaultActiveKey='0'
        activeKey={editorStore.tabIndex}
        onChange={callback}>
        <TabPane tab='属性' key='0'>
          属性
        </TabPane>
        <TabPane tab='组件' key='1'>
          <div ref={dragRef}>
            <Example1></Example1>
          </div>
          <div ref={dragRef2}>
            <Example2></Example2>
          </div>
          <div ref={dragRef3}>
            <DatePicker></DatePicker>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
