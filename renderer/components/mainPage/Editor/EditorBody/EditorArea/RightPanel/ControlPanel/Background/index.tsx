import * as Item from '../Item'
import { useState, useEffect } from 'react'
import useSubscribe from '../../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../../store/editorStore'

export default function Background() {
  const [value, setValue] = useState('#000000')
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    const { component } = editorStore.findComponent(editorState.key)

    if (!component) return

    setValue(component.style.background || '#000000')
  }, [editorState])

  function onChange(event) {
    editorStore.updateComponentStyle(editorState.key, {
      background: event.target.value
    })
  }

  return (
    <Item.Panel>
      <Item.Row>
        <Item.Label>background</Item.Label>
        <input type='color' value={value} onChange={onChange}></input>
      </Item.Row>
    </Item.Panel>
  )
}
