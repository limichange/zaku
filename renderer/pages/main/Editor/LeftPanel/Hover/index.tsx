import uuid from 'uuid'
import { useState } from 'react'
import store from '../../store/editorStore'
import useSubscribe from '../../../../../hooks/useSubscribe'

interface Hover {
  props: {}
}

export default function Hover(props) {
  const [editorStore, setEditorStore] = useSubscribe(store)
  const [key] = useState(uuid())

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
