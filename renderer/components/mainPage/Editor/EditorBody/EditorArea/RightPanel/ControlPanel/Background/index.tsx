import * as Item from '../Item'
import { useState, useEffect } from 'react'
import useSubscribe from '../../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../../store/editorStore'
import Colorpicker from '../Colorpicker'

export default function Background() {
  const [value, setValue] = useState('transparent')
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    const { component } = editorStore.findComponent(editorState.key)

    if (!component) return

    setValue(component.style.background || 'transparent')
  }, [editorState])

  function onChange(color) {
    editorStore.updateComponentStyle(editorState.key, {
      background: color
    })
  }

  return (
    <Item.Panel>
      <Item.Row>
        <Item.Label>background</Item.Label>
        <Colorpicker defaultValue={value} onChange={onChange}></Colorpicker>
      </Item.Row>
    </Item.Panel>
  )
}
