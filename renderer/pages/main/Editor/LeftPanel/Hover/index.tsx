import { useState, useEffect } from 'react'
import store from '../../store/editorStore'
import useSubscribe from '../../../../../hooks/useSubscribe'
import classnames from 'classnames'
import React from 'react'
import './index.less'

interface Hover {
  props: {}
}

export default function Hover(props) {
  const [editorStoreState] = useSubscribe(store)
  const { uuid: key } = props
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const children = React.cloneElement(props.children, {
    id: key
  })

  function onClick() {
    store.setIndex('0')
    store.setComponentKey(key)
    props.onClick(key)
  }

  useEffect(() => {
    const { width, height } = document
      .getElementById(key)
      .getBoundingClientRect()

    setHeight(height)
    setWidth(width)
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      {children}
      <div
        onClick={onClick}
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
        className={classnames({
          hover: true,
          selected: key === editorStoreState.key
        })}></div>
    </div>
  )
}
