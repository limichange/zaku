import { Select, Row, Col, Input } from 'antd'
import useSubscribe from '../../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../../store/editorStore'
import { useState, useEffect } from 'react'
import * as Item from '../Item'

const { Option } = Select

export default function AntRow() {
  const [editorState] = useSubscribe(editorStore)
  const [attributes, setAttributes] = useState({
    align: 'top',
    justify: 'start'
  })

  useEffect(() => {
    const { component: info } = editorStore.findComponent(editorState.key)

    if (info?.type !== 'AntdRow') return

    setAttributes(info.attributes)
  }, [editorState])

  function onChange(value) {
    editorStore.updateComponentAttribute(editorState.key, value)
  }

  return (
    <Item.Panel>
      <Item.Row>
        <Item.Label>align</Item.Label>
        <Select
          size='small'
          onChange={align => onChange({ align })}
          value={attributes.align || 'top'}
          style={{ flex: 1 }}>
          <Option value='top'>top</Option>
          <Option value='middle'>middle</Option>
          <Option value='bottom'>bottom</Option>
        </Select>
      </Item.Row>
      <Item.Row>
        <Item.Label>justify</Item.Label>
        <Select
          size='small'
          onChange={justify => onChange({ justify })}
          value={attributes.justify || 'start'}
          style={{ flex: 1 }}>
          <Option value='start'>start</Option>
          <Option value='end'>end</Option>
          <Option value='center'>center</Option>
          <Option value='space-between'>space-between</Option>
          <Option value='space-around'>space-around</Option>
        </Select>
      </Item.Row>
    </Item.Panel>
  )
}
