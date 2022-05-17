import React from 'react'
import './App.css'

import { useDrop } from 'react-dnd';
import DragShell from './DragShell'
import DragSelf from './DragSelf'

function App() {

  const [modules] = React.useState([
    { id: 1, name: '开关A' },
    { id: 2, name: '开关B' },
    { id: 3, name: '开关C' },
    { id: 4, name: '开关D' },
    { id: 5, name: '开关E' },
  ])

  // 已放置组件列表
  const [theMainBoxModules, setTheMainBoxModules] = React.useState([])

  // 当前是否正在执行拖动排序事件
  const waitMoveEnd = React.useRef(false)

  // 中央，放置组件区域
  const [, droper] = useDrop({ // 第一个参数是 collect 方法返回的对象，第二个参数是一个 ref 值，赋值给 drop 元素
    accept: 'theFirstCouple', // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
    collect: (minoter) => ({ // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
      isOver: minoter.isOver()
    }),
    drop: (item, minoter) => {
      console.log('drap组件目前放置到了组件上方')
      console.log('item=', item)

      if (waitMoveEnd.current) { // 若刚刚进行了拖动排序事件，不做这个新增处理
        console.log('刚刚进行了拖动排序事件，不做这个新增处理')
        return
      }

      // console.log('minoter=', minoter)
      setTheMainBoxModules(theMainBoxModules.concat(item))
    }
  })

  // 已放置组件列表-修改排序
  const changeModules = (moveId, targetId, moveItem, targetItem) => {

    // 标记进行的拖动排序事件，通知禁用整体拖入事件
    waitMoveEnd.current = true
    setTimeout(() => {
      waitMoveEnd.current = false
    }, 1000)

    let listData = [...theMainBoxModules]
    console.log(moveId, targetId)
    let move_I
    let move_item
    let target_I
    let target_item
    listData.map((item, i) => {
      if (item.uuid === moveId) {
        move_I = i
        move_item = item
      }
      if (item.uuid === targetId) {
        target_I = i
        target_item = move_item
      }
    })
    // console.log(listData)
    console.log(move_I, target_I)
    // target之后插入，并删除原始move

    if (!move_I) { // 纯新增模式
      listData.splice(target_I, 0, moveItem)

    } else { // 移动排序模式
      let change
      let change2
      if (move_I < target_I) {
        change = 1
        change2 = 0
      } else {
        change = 0
        change2 = 1
      }
      listData.splice(target_I + change, 0, move_item)
      listData[move_I + change2] = null
      listData = listData.filter(Boolean)

    }

    console.log(listData)
    setTheMainBoxModules([...listData])
  }



  return (
    <div className="App">
      <div className='theLeft'>
        {
          modules.map((item, i) => {
            return (
              <DragShell
                type='theFirstCouple'
                item={item}
                showBoxCss={{
                  width: '120px',
                  height: '72px',
                  backgroundColor: 'rgb(243, 243, 243, 0.75)'
                }}
                key={i}
              >
                <p>{item.name}</p>
              </DragShell>
            )
          })
        }
      </div>

      <div className='theRight' ref={droper}>
        {
          theMainBoxModules.map((item, i) => {
            return (
              <DragSelf
                key={i}
                item={item}
                changeModules={changeModules}
              >
                <p>
                  {item.name}
                </p>
              </DragSelf>
            )
          })
        }
      </div>
    </div>
  )
}

export default App
