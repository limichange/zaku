import useSubscribe from '../../../../../hooks/useSubscribe'
import editorStore from '../../../../../store/editorStore'
import { useState, useEffect } from 'react'
import React from 'react'
import { LiveProvider, LiveError, LivePreview } from 'react-live'
import componentsMap from '../../../../../utils/componentsMap'
import codeFactory from '../CodeEditor/codeFactory'

const scope = {
  ...componentsMap.getComponentsMap()
}

export default function() {
  const [components, setComponents] = useState([])
  const [editorState] = useSubscribe(editorStore)
  const [code, setCode] = useState('')

  useEffect(() => {
    setCode(
      codeFactory.generateCode(editorState.components, {
        withImport: false,
        withExport: false
      })
    )
  }, [editorState])

  return (
    <div style={{ border: '10px solid #eee', height: '100vh' }}>
      <LiveProvider code={code} scope={scope}>
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </div>
  )
}
