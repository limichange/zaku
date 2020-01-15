import * as Item from '../Item'
import { InputNumber } from 'antd'
import { useState, useEffect } from 'react'
import useSubscribe from '../../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../../store/editorStore'
import $style from './index.less'

export default function Margin() {
  const [marginTopValue, setValueMarginTopValue] = useState(undefined)
  const [marginRightValue, setValueMarginRightValue] = useState(undefined)
  const [marginBottomValue, setValueMarginBottomValue] = useState(undefined)
  const [marginLeftValue, setValueMarginLeftValue] = useState(undefined)
  const [marginValue, setValueMarginValue] = useState(undefined)
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    const { component } = editorStore.findComponent(editorState.key)

    if (!component) return

    const { marginTop, marginRight, marginBottom, marginLeft } = component.style

    setValueMarginTopValue(marginTop)
    setValueMarginRightValue(marginRight)
    setValueMarginBottomValue(marginBottom)
    setValueMarginLeftValue(marginLeft)

    if (
      marginTop === marginRight &&
      marginBottom === marginRight &&
      marginLeft === marginRight
    ) {
      setValueMarginValue(marginTop)
    } else {
      setValueMarginValue(undefined)
    }
  }, [editorState])

  function onInputChange(value) {
    editorStore.updateComponentStyle(editorState.key, value)
  }

  return (
    <Item.Panel>
      <Item.Label>margin</Item.Label>
      <div className={$style.parent}>
        <InputNumber
          value={marginTopValue}
          onChange={value => onInputChange({ marginTop: value })}
          className={$style.top}
          size='small'></InputNumber>
        <InputNumber
          value={marginRightValue}
          onChange={value => onInputChange({ marginRight: value })}
          className={$style.right}
          size='small'></InputNumber>
        <InputNumber
          value={marginBottomValue}
          onChange={value => onInputChange({ marginBottom: value })}
          className={$style.bottom}
          size='small'></InputNumber>
        <InputNumber
          value={marginLeftValue}
          onChange={value => onInputChange({ marginLeft: value })}
          className={$style.left}
          size='small'></InputNumber>
        <InputNumber
          value={marginValue}
          onChange={value =>
            onInputChange({
              marginTop: value,
              marginRight: value,
              marginBottom: value,
              marginLeft: value
            })
          }
          className={$style.center}
          size='small'></InputNumber>
      </div>
    </Item.Panel>
  )
}
