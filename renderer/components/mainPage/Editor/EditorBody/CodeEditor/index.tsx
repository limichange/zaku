import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import editorStore from '../../../../../store/editorStore'
import useSubscribe from '../../../../../hooks/useSubscribe'
import codeFactory from './codeFactory'

let MonacoEditor = null

export default function(props) {
  const [code, setCode] = useState('')
  const [editorState] = useSubscribe(editorStore)

  if (process.browser && !MonacoEditor) {
    MonacoEditor = dynamic(() => import('react-monaco-editor'), {
      ssr: false
    })
  }

  if (!MonacoEditor) {
    return <div></div>
  }

  useEffect(() => {
    setCode(codeFactory.generateCode(editorState.components))
  }, [editorState])

  return (
    <div
      style={{
        width: '100%',
        height: '100vh'
      }}>
      <MonacoEditor
        language='javascript'
        theme='vs-dark'
        value={code}
        options={{ selectOnLineNumbers: true }}
        onChange={setCode}
        editorDidMount={() => null}
        {...props}
      />
    </div>
  )
}
