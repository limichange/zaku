import useSubscribe from '../../../../../hooks/useSubscribe'
import editorStore from '../../../../../store/editorStore'
import { useState, useEffect } from 'react'
import { Button, DatePicker, Input } from 'antd'
import uuid from 'uuid'

export default function() {
  const [components, setComponents] = useState([])
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    setComponents(
      editorState.components.map(component => {
        const item = component
        const key = uuid()

        if (item.type === 'button') {
          component = (
            <Button {...item.attributes} key={key}>
              Button
            </Button>
          )
        } else if (item.type === 'datePicker') {
          component = <DatePicker key={key} />
        } else if (item.type === 'input') {
          component = <Input key={key} />
        }

        return component
      })
    )
  }, [editorState])

  return (
    <div style={{ border: '10px solid #eee', height: '100vh' }}>
      {components}
    </div>
  )
}
