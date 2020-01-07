import React, { Component, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

let MonacoEditor = null

if (process.browser && !MonacoEditor) {
  MonacoEditor = dynamic(() => import('react-monaco-editor'), {
    ssr: false
  })
}

export default function(props) {
  const [code, setCode] = useState('')

  if (!MonacoEditor) {
    return <div></div>
  }

  return (
    <MonacoEditor
      language='javascript'
      theme='vs-dark'
      value={code}
      options={{ selectOnLineNumbers: true }}
      onChange={setCode}
      editorDidMount={() => null}
      {...props}
    />
  )
}
