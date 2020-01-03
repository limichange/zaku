import { useDrop, DropTargetMonitor } from 'react-dnd'
import { useState } from 'react'
import { Button, Input, DatePicker } from 'antd'
import Hover from './Hover'
import editorStore from '../store/editorStore'
import uuid from 'uuid'
import useSubscribe from '../../../../hooks/useSubscribe'
import MonacoEditor from 'react-monaco-editor'
import dynamic from 'next/dynamic'
import './index.less'

function RightPanel() {
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
    <div className='LeftPanel' ref={drop}>
      {components}
      {/* <MonacoEditor
        language='javascript'
        theme='vs-dark'
        value={'todo'}
        options={{
          selectOnLineNumbers: true
        }}
      /> */}
    </div>
  )
}

export default dynamic(() => Promise.resolve(RightPanel), {
  ssr: false
})
