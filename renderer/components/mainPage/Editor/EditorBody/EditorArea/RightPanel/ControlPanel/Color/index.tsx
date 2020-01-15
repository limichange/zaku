import * as Item from '../Item'
import { useState, useEffect } from 'react'
import useSubscribe from '../../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../../store/editorStore'
import Colorpicker from '../Colorpicker'

export default function Color() {
  const [value, setValue] = useState('#000000')
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    const { component } = editorStore.findComponent(editorState.key)

    if (!component) return

    setValue(component.style.color || '#000000')
  }, [editorState])

  function onChange(color) {
    editorStore.updateComponentStyle(editorState.key, {
      color: color
    })
  }

  return (
    <Item.Panel>
      <Item.Row>
        <Item.Label>color</Item.Label>
        <Colorpicker defaultValue={value} onChange={onChange}></Colorpicker>
      </Item.Row>
    </Item.Panel>
  )
}
