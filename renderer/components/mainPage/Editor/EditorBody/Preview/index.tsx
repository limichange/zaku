import useSubscribe from '../../../../../hooks/useSubscribe'
import editorStore from '../../../../../store/editorStore'
import { useState, useEffect } from 'react'
import { Button, DatePicker, Input } from 'antd'
import uuid from 'uuid'
import React from 'react'

export default function() {
  const [components, setComponents] = useState([])
  const [editorState] = useSubscribe(editorStore)
  const componentMap = {
    button: <Button />,
    datePicker: <DatePicker />,
    input: <Input />
  }

  useEffect(() => {
    setComponents(
      editorState.components.map(item => {
        const key = uuid()
        const component = componentMap[item.type]

        return React.cloneElement(
          component,
          {
            key,
            ...item.attributes
          },
          item.text
        )
      })
    )
  }, [editorState])

  return (
    <div style={{ border: '10px solid #eee', height: '100vh' }}>
      {components}
    </div>
  )
}
