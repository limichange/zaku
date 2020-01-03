import uuid from 'uuid'
import { useState } from 'react'
import store from '../../store/editorStore'
import useSubscribe from '../../../../../hooks/useSubscribe'

interface Hover {
  props: {}
}

export default function Hover(props) {
  const [editorStoreState] = useSubscribe(store)
  const { uuid: key } = props

  function onClick() {
    store.setIndex('0')
    store.setComponentKey(key)
    props.onClick(key)
  }

  return (
    <div style={{ position: 'relative' }}>
      {props.children}
      <div onClick={onClick} className='hover'></div>
    </div>
  )
}
