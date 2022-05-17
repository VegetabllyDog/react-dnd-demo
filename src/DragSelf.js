import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

const DragShell = (props) => {

  const [, drager_Inner] = useDrag({
    type: 'theFirstCouple',
    item: props.item
  })

  const [, droper_Inner] = useDrop({ // 第一个参数是 collect 方法返回的对象，第二个参数是一个 ref 值，赋值给 drop 元素
    accept: 'theFirstCouple', // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
    collect: (minoter) => ({ // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
      isOver: minoter.isOver()
    }),
    drop: (item, minoter) => {
      console.log('此内部组件目前放置到了本内部组件上方')
      console.log('移入dom item=', item)
      console.log('本身dom item=', props.item)
      props.changeModules(item.uuid, props.item.uuid, item, props.item)
    }
  })

  return (
    <div
      style={{
        position: 'relative'
      }}
      ref={drager_Inner}
    >
      <div
        ref={droper_Inner}
      >

        {/* <div style={style} ref={dragPreview_Inner}>
        </div> */}

        <div>
          {props.children}
        </div>

      </div>
    </div>
  )
}

export default DragShell