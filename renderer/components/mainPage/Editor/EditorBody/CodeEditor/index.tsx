import React, { Component, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import editorStore from '../../../../../store/editorStore'
import useSubscribe from '../../../../../hooks/useSubscribe'
import babelHelp from './BabelTool/babelHelp'
import generate from '@babel/generator'

let MonacoEditor = null

if (process.browser && !MonacoEditor) {
  MonacoEditor = dynamic(() => import('react-monaco-editor'), {
    ssr: false
  })
}

export default function(props) {
  const [code, setCode] = useState('')
  const [editorState] = useSubscribe(editorStore)

  if (!MonacoEditor) {
    return <div></div>
  }

  useEffect(() => {
    setCode(generate(babelHelp.createJSXelement(editorState.components)).code)
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
