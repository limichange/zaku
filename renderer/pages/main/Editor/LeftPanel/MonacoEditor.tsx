import React, { Component } from 'react'
import MonacoEditor from 'react-monaco-editor'

export default props => (
  <MonacoEditor
    width={500}
    height={200}
    language='javascript'
    theme='vs-dark'
    value=''
    options={{ selectOnLineNumbers: true }}
    onChange={() => null}
    editorDidMount={() => null}
    {...props}
  />
)
