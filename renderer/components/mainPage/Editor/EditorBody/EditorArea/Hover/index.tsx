import { useState, useEffect, FC } from 'react'
import classnames from 'classnames'
import React from 'react'
import store from '../../../../../../store/editorStore'
import useSubscribe from '../../../../../../hooks/useSubscribe'
import $style from './index.less'
import { Icon } from 'antd'
import { px } from '../../../../../../utils/style'

type Props = {
  type: string
  zoomIndex: number
  uuid: string
  children: any
  onClick?: (key: string) => void
}

const Hover: FC<Props> = props => {
  const [editorStoreState] = useSubscribe(store)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [left, setLeft] = useState<number>(0)
  const [top, setTop] = useState<number>(0)
  const { uuid: key } = props
  const selected = key === editorStoreState.key
  let timeId = 0

  const children = React.cloneElement(props.children, {
    id: key
  })

  function onClick() {
    store.setIndex('0')
    store.setComponentKey(key)
    props.onClick && props.onClick(key)
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

    return () => {
      clearTimeout(timeId)
    }
  }, [editorStoreState])

  return (
    <>
      {children}
      <div
        onClick={onClick}
        style={{
          zIndex: props.zoomIndex,
          left: px(left),
          top: px(top),
          width: px(width),
          height: px(height)
        }}
        className={classnames({
          [$style.hover]: true,
          [$style.selected]: selected
        })}>
        <div className={$style.label}>
          {props.type} <Icon className={$style.icon} type='drag' />
          <Icon className={$style.icon} type='delete' />
        </div>
        <div className={$style.hoverInner}></div>
      </div>
    </>
  )
}

export default Hover
