import React, { Component, useEffect } from 'react'
import dynamic from 'next/dynamic'

export default function(props) {
  let MonacoEditor = null

  if (process.browser && !MonacoEditor) {
    MonacoEditor = dynamic(() => import('react-monaco-editor'), {
      ssr: false
    })
  }

  if (!MonacoEditor) {
    return <div></div>
  }

  return (
    <MonacoEditor
      language='json'
      theme='vs-dark'
      value=''
      options={{ selectOnLineNumbers: true }}
      onChange={() => null}
      editorDidMount={() => null}
      {...props}
    />
  )
}
