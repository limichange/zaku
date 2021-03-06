import { useState, useEffect, FC, useContext } from 'react'
import classnames from 'classnames'
import React from 'react'
import editorStore from '../../../../../../store/editorStore'
import useSubscribe from '../../../../../../hooks/useSubscribe'
import $style from './index.less'
import { Icon } from 'antd'
import { px } from '../../../../../../utils/style'
import { useDrag } from 'react-dnd'
import DragPreview from '../../../../../DragPreview'
import { useWindowResize } from 'beautiful-react-hooks'

type Props = {
  type: string
  zoomIndex: number
  uuid: string
  children: any
  onClick?: (key: string) => void
}

const Hover: FC<Props> = props => {
  const [editorState] = useSubscribe(editorStore)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [left, setLeft] = useState<number>(0)
  const [top, setTop] = useState<number>(0)
  const [isActive, setIsActive] = useState(false)
  const [{ opacity }, drag, preview] = useDrag({
    item: { ...props },
    options: {
      dropEffect: 'move'
    },
    previewOptions: {
      offsetX: 0,
      offsetY: 0
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  })
  const { uuid: key } = props
  const selected = key === editorState.key
  let timeId = 0

  function onDragEnter() {
    setIsActive(true)
  }

  function onDragLeave() {
    setIsActive(false)
  }

  function onDrop(e) {
    setIsActive(false)

    if (!editorState.dragComponent) return

    if (editorState.dragComponent.key) {
      editorStore.moveComponent(editorState.dragComponent.key, key, false, 0)
    } else {
      editorStore.addComponent(editorState.dragComponent, key)
    }

    editorStore.update({
      dragComponent: null
    })
    e.preventDefault()
    e.stopPropagation()
  }

  function onClick() {
    editorStore.setIndex('0')
    editorStore.setComponentKey(key)
    props.onClick && props.onClick(key)
  }

  function delNode() {
    editorStore.removeComponent(key)
  }

  function onDragStart() {
    editorStore.update({
      dragComponent: {
        ...props,
        key,
        children: null
      }
    })
  }

  function updateSize() {
    clearTimeout(timeId)

    timeId = window.setTimeout(() => {
      const dom = document.getElementById('id' + key)
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
  }

  useWindowResize(updateSize)
  useEffect(updateSize, [editorState])

  return (
    <>
      {props.children}
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
          {props.type}
          <div onDragStart={onDragStart} ref={drag}>
            <Icon className={$style.icon} type='drag' />
          </div>

          <div>
            <Icon onClick={delNode} className={$style.icon} type='delete' />
          </div>
        </div>

        <div
          onDrop={onDrop}
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          className={classnames({
            [$style.hoverInner]: true,
            [$style.isActive]: isActive
          })}></div>
        <div ref={preview}>
          <DragPreview>{props.type}</DragPreview>
        </div>
      </div>
    </>
  )
}

export default Hover
