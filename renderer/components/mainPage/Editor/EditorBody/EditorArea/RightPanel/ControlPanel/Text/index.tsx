import { Select, Row, Col, Input } from 'antd'
import useSubscribe from '../../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../../store/editorStore'
import { useState, useEffect } from 'react'
import * as Item from '../Item'

export default function Text() {
  const [editorState] = useSubscribe(editorStore)
  const [text, setText] = useState('')

  useEffect(() => {
    const { component: info } = editorStore.findComponent(editorState.key)

    if (!info) return

    setText(info.text)
  }, [editorState])

  function onInputChange(event) {
    const value = event.target.value

    setText(value)
    editorStore.updateComponentText(editorState.key, value)
  }

  return (
    <Item.Panel>
      <Item.Row>
        <Item.Label>Text</Item.Label>
        <Input
          size='small'
          style={{ flex: 1 }}
          value={text}
          onChange={onInputChange}></Input>
      </Item.Row>
    </Item.Panel>
  )
}
