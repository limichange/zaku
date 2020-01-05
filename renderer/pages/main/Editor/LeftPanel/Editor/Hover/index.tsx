import { useState, useEffect } from 'react'
import classnames from 'classnames'
import React from 'react'
import store from '../../../store/editorStore'
import useSubscribe from '../../../../../../hooks/useSubscribe'
import useDrag from '../../../RightPanel/useDrag'
import './index.less'

interface Hover {
  props: {}
}

export default function Hover(props) {
  const [editorStoreState] = useSubscribe(store)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [display, setDisplay] = useState('block')
  const [item, dragRef] = useDrag({ type: props.type, text: 'a' })
  const { uuid: key } = props

  const children = React.cloneElement(props.children, {
    id: key
  })

  function onClick() {
    store.setIndex('0')
    store.setComponentKey(key)
    props.onClick(key)
  }

  useEffect(() => {
    const dom = document.getElementById(key)

    setDisplay(getComputedStyle(dom).display)

    setTimeout(() => {
      const { width, height } = dom.getBoundingClientRect()

      setHeight(height)
      setWidth(width)
    }, 100)
  }, [])

  return (
    <div ref={dragRef} style={{ position: 'relative', display }}>
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
