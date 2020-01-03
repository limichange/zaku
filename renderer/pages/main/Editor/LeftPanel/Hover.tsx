import uuid from 'uuid'
import { useState, useLayoutEffect } from 'react'
import store from '../store'

export default function Hover(props) {
  const [editorStore, setEditorStore] = useState(store.initialState)

  useLayoutEffect(() => {
    const sub = store.subscribe(setEditorStore)

    return () => {
      sub.unsubscribe()
    }
  }, [])

  function onClickHover() {
    store.setIndex('0')
  }

  return (
    <div style={{ position: 'relative' }} key={uuid()}>
      {props.children}
      <div onClick={onClickHover} className='hover'></div>
    </div>
  )
}
