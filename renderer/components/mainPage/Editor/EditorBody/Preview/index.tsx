import useSubscribe from '../../../../../hooks/useSubscribe'
import editorStore from '../../../../../store/editorStore'
import { useState, useEffect } from 'react'
import React from 'react'
import renderTree from '../../../../../utils/renderTree'

export default function() {
  const [components, setComponents] = useState([])
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    setComponents(renderTree(editorState.components))
  }, [editorState])

  return (
    <div style={{ border: '10px solid #eee', height: '100vh' }}>
      {components}
    </div>
  )
}
