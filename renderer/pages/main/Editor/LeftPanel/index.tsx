import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useState } from 'react'
import { Button, Input, DatePicker, Tabs } from 'antd'
import Hover from './Hover'
import editorStore from '../store/editorStore'
import uuid from 'uuid'
import useSubscribe from '../../../../hooks/useSubscribe'
import MonacoEditor from './MonacoEditor'
import './index.less'

const { TabPane } = Tabs

function LeftPanel() {
  const [components, setComponents] = useState([])
  const [editorState] = useSubscribe(editorStore)
  const [collectedProps, drop] = useDrop({
    accept: ['input', 'button', 'datePicker'],
    drop: (item, monitor) => {
      let component = null
      const key = uuid()

      // todo: auto create component
      if (item.type === 'button') {
        component = <Button>Button</Button>
      } else if (item.type === 'datePicker') {
        component = <DatePicker />
      } else if (item.type === 'input') {
        component = <Input />
      }

      if (!component) return

      component = (
        <Hover key={key} uuid={key} onClick={removeComponent}>
          {component}
        </Hover>
      )

      editorStore.addComponent({
        key,
        ...item
      })

      setComponents([...components, component])
    },
    collect: (minoter: DropTargetMonitor) => {
      const isOver = minoter.isOver()

      return {
        isOver
      }
    }
  })

  function removeComponent(key) {
    console.log(key)
  }

  return (
    <div className='LeftPanel'>
      <Tabs animated={false} defaultActiveKey='0'>
        <TabPane tab='UI' key='0'>
          <div className='uiArea' ref={drop}>
            {components}
          </div>
        </TabPane>
        <TabPane tab='Code' key='1'>
          <div className='editor'>
            <MonacoEditor></MonacoEditor>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default LeftPanel
