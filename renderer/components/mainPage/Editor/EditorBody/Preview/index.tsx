import useSubscribe from '../../../../../hooks/useSubscribe'
import editorStore from '../../../../../store/editorStore'
import { useState, useEffect } from 'react'
import componentsMap from '../../../../../utils/componentsMap'
import uuid from 'uuid'
import React from 'react'

export default function() {
  const [components, setComponents] = useState([])
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    setComponents(
      editorState.components.map(item => {
        const key = uuid()
        const component = componentsMap.getComponent(item.type)

        return React.createElement(
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
