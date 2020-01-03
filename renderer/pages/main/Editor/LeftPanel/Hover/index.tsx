import uuid from 'uuid'
import { useState } from 'react'
import store from '../../store'
import useSubscribe from '../../../../../hooks/useSubscribe'

interface Hover {
  props: {}
}

export default function Hover(props) {
  const [editorStore, setEditorStore] = useState(store.initialState)
  const [key] = useState(uuid())

  useSubscribe(store, setEditorStore)

  function onClick() {
    store.setIndex('0')
    store.setComponentKey(key)
    props.onClick(key)
  }

  return (
    <div style={{ position: 'relative' }} key={key}>
      {props.children}
      <div onClick={onClick} className='hover'></div>
    </div>
  )
}
