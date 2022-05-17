import React from 'react'
import { useDrag } from 'react-dnd'

const DragShell = (props) => {

  const [, drager, dragPreview] = useDrag({
    type: props.type, // 和drop的accept相呼应
    item: {
      ...props.item,
      uuid: props.item.id + '_' + Date.now() // +++++++++++++++
    }
  })

  let style = {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '-2000'
  }
  style = { ...style, ...props.showBoxCss }

  return (
    <div style={{
      position: 'relative'
    }}>

      <div style={style} ref={dragPreview}>
      </div>

      <div ref={drager}>
        {props.children}
      </div>

    </div>
  )
}

export default DragShell