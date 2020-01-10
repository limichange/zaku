import { useState, useEffect, FC } from 'react'
import classnames from 'classnames'
import React from 'react'
import store from '../../../../../../store/editorStore'
import useSubscribe from '../../../../../../hooks/useSubscribe'
import $style from './index.less'

type Props = {
  uuid: string
  children: any
  onClick: (key: string) => void
}

const Hover: FC<Props> = props => {
  const [editorStoreState] = useSubscribe(store)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const { uuid: key } = props
  let timeId = 0

  const children = React.cloneElement(props.children, {
    id: key
  })

  function onClick() {
    store.setIndex('0')
    store.setComponentKey(key)
    props.onClick(key)
  }

  useEffect(() => {
    clearTimeout(timeId)

    timeId = window.setTimeout(() => {
      const dom = document.getElementById(key)
      const { width, height, left, top } = dom.getBoundingClientRect()
      const offset = 1

      setLeft(left - offset)
      setTop(top - offset)
      setHeight(height + offset * 2)
      setWidth(width + offset * 2)
    }, 100)
  }, [editorStoreState])

  return (
    <>
      {children}
      <div
        onClick={onClick}
        style={{
          position: 'fixed',
          left: `${left}px`,
          top: `${top}px`,
          width: `${width}px`,
          height: `${height}px`
        }}
        className={classnames({
          [$style.hover]: true,
          [$style.selected]: key === editorStoreState.key
        })}></div>
    </>
  )
}

export default Hover
