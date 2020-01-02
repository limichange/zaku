import { Tabs } from 'antd'
import Example1 from '../../../../components/Example1'
import { useDrag } from 'react-dnd'
import Example2 from '../../../../components/Example2'
import './index.less'

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

export default function RightPanel() {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: 'input', text: 'a' },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  const [{ opacity: a2 }, dragRef2] = useDrag({
    item: { type: 'button', text: 'a' },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <div className='RightPanel'>
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab='属性' key='1'>
          属性
        </TabPane>
        <TabPane tab='组件' key='2'>
          <div ref={dragRef}>
            <Example1></Example1>
          </div>
          <div ref={dragRef2}>
            <Example2></Example2>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
