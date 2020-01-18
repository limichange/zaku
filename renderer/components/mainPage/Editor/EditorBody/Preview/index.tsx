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
  const [editorState] = useSubscribe(editorStore)
  const [code, setCode] = useState('')

  useEffect(() => {
    let renderCode = codeFactory.generateCode(editorState.components, {
      withImport: false,
      withExport: false
    })

    if (renderCode) {
      renderCode += '\nrender(<Component />)'
    } else {
      renderCode = 'render(null)'
    }

    setCode(renderCode)
  }, [editorState])

  return (
    <div style={{ border: '10px solid #eee', height: '100vh' }}>
      <LiveProvider noInline={true} code={code} scope={scope}>
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </div>
  )
}
