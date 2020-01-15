import React, { useState } from 'react'
import { SketchPicker } from 'react-color'

export default function Colorpicker(props) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  function handleClick() {
    setDisplayColorPicker(!displayColorPicker)
  }

  function handleClose() {
    setDisplayColorPicker(false)
  }

  function onChange(color) {
    const rgb = color.rgb
    const result =
      rgb.a === 1 ? color.hex : `rgba(${rgb.r},${rgb.g}, ${rgb.b}, ${rgb.a})`
    props.onChange(result)
  }

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          border: '1px solid #A7A7A7',
          borderRadius: 4,
          background: props.color,
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
            <SketchPicker color={props.color} onChange={onChange} />
          </div>
        </>
      ) : null}
    </div>
  )
}
