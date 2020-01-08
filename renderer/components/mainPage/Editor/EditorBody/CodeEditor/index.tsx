import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import editorStore from '../../../../../store/editorStore'
import useSubscribe from '../../../../../hooks/useSubscribe'
import babelHelp from './BabelTool/babelHelp'
import generate from '@babel/generator'
import prettier from 'prettier/standalone'
import parserJS from 'prettier/parser-babylon'

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
    const { header: headerAST, body: bodyAST } = babelHelp.createJSXelement(
      editorState.components
    )
    const { code: headerCode } = generate(headerAST)
    const { code: bodyCode } = generate(bodyAST)

    const formattedCode = prettier.format(headerCode + '\n\n' + bodyCode, {
      parser: 'babel',
      plugins: [parserJS],
      singleQuote: true,
      jsxSingleQuote: true,
      jsxBracketSameLine: true
    })

    setCode(formattedCode)
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
