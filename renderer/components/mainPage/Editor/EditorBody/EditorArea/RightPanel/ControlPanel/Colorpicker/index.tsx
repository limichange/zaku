import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'

export default function Colorpicker(props) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [color, setColor] = useState('#000000')

  useEffect(() => {
    setColor(props.defaultValue)
  }, [props.defaultValue])

  function handleClick() {
    setDisplayColorPicker(!displayColorPicker)
  }

  function handleClose() {
    setDisplayColorPicker(false)
  }

  function onChange(color) {
    setColor(handleColor(color))
  }

  function onChangeComplete(color) {
    props.onChange && props.onChange(handleColor(color))
  }

  function handleColor(color) {
    const rgb = color.rgb
    return rgb.a === 1
      ? color.hex
      : `rgba(${rgb.r},${rgb.g}, ${rgb.b}, ${rgb.a})`
  }

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          border: '1px solid #A7A7A7',
          borderRadius: 4,
          background: color,
          height: 20,
          width: 50
        }}></div>
      {displayColorPicker ? (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 1100000
            }}
            onClick={handleClose}
          />
          <div
            style={{
              position: 'fixed',
              right: 15,
              zIndex: 1100001
            }}>
            <SketchPicker
              color={color}
              onChange={onChange}
              onChangeComplete={onChangeComplete}
            />
          </div>
        </>
      ) : null}
    </div>
  )
}
