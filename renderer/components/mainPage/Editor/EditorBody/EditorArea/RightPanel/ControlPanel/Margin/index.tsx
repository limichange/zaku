import * as Item from '../Item'
import { InputNumber } from 'antd'
import { useState, useEffect } from 'react'
import useSubscribe from '../../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../../store/editorStore'
import { px, noPx } from '../../../../../../../../utils/style'

export default function Margin() {
  const [value, setValue] = useState(0)
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    const { component } = editorStore.findComponent(editorState.key)

    if (!component) return

    console.log(component)

    setValue(noPx(component.style.margin))
  }, [editorState])

  function onInputChange(value) {
    editorStore.updateComponentStyle(editorState.key, {
      margin: px(value)
    })
  }

  return (
    <div style={{ padding: '0 12px' }}>
      <Item.Row>
        <Item.Label>margin</Item.Label>
        <InputNumber
          size='small'
          style={{ flex: 1 }}
          value={value}
          onChange={onInputChange}></InputNumber>
      </Item.Row>
    </div>
  )
}
