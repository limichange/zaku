import { Tabs } from 'antd'
import Example1 from '../../../../components/Example1'
import { useDrag } from 'react-dnd'
import Example2 from '../../../../components/Example2'

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

export default function LeftPanel() {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: 'a', text: 'a' },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <Tabs defaultActiveKey='1' onChange={callback}>
      <TabPane tab='属性' key='1'>
        属性
      </TabPane>
      <TabPane tab='组件' key='2'>
        <div ref={dragRef}>
          <Example1></Example1>
          <Example2></Example2>
        </div>
      </TabPane>
    </Tabs>
  )
}
