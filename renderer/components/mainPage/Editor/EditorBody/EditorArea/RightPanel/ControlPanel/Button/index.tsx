import { Select, Row, Col, Input } from 'antd'
import useSubscribe from '../../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../../store/editorStore'
import $style from './index.less'
import { useState, useEffect } from 'react'
import * as Item from '../Item'

const { Option } = Select

export default function Button() {
  const [editorState] = useSubscribe(editorStore)
  const [text, setText] = useState('')
  const [attributes, setAttributes] = useState({
    type: 'default'
  })

  useEffect(() => {
    const info = editorState.components.find(c => c.key === editorState.key)

    if (info?.type !== 'AntdButton') return

    setText(info.text)
    setAttributes(info.attributes)
  }, [editorState])

  function onChange(value) {
    editorStore.updateComponentAttribute(editorState.key, {
      type: value
    })
  }

  function onInputChange(event) {
    const value = event.target.value

    setText(value)
    editorStore.updateComponentText(editorState.key, value)
  }

  return (
    <div className={$style.Button}>
      <Item.Row>
        <Item.Label>Type</Item.Label>
        <Select
          onChange={onChange}
          value={attributes.type || 'default'}
          style={{ flex: 1 }}>
          <Option value='default'>default</Option>
          <Option value='primary'>primary</Option>
          <Option value='dashed'>dashed</Option>
          <Option value='danger'>danger</Option>
          <Option value='link'>link</Option>
        </Select>
      </Item.Row>
      <Item.Row>
        <Item.Label>Text</Item.Label>
        <Input
          style={{ flex: 1 }}
          value={text}
          onChange={onInputChange}></Input>
      </Item.Row>
    </div>
  )
}
