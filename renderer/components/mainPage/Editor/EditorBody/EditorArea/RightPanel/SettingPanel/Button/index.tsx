import { Select, Row, Col, Input } from 'antd'
import useSubscribe from '../../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../../store/editorStore'
import $style from './index.less'
import { useState, useEffect } from 'react'

const { Option } = Select

function ItemRow(props) {
  return (
    <Row
      style={{ marginBottom: '5px' }}
      type='flex'
      justify='space-between'
      align='middle'>
      {props.children}
    </Row>
  )
}

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
      <ItemRow>
        <div>Type</div>
        <Select
          onChange={onChange}
          value={attributes.type || 'default'}
          style={{ width: 120 }}>
          <Option value='default'>default</Option>
          <Option value='primary'>primary</Option>
          <Option value='dashed'>dashed</Option>
          <Option value='danger'>danger</Option>
          <Option value='link'>link</Option>
        </Select>
      </ItemRow>
      <ItemRow>
        <div>Text</div>
        <div>
          <Input value={text} onChange={onInputChange}></Input>
        </div>
      </ItemRow>
    </div>
  )
}
