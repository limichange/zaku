import { Tabs } from 'antd'
import useDrag from './useDrag'
import Example1 from '../../../../components/Example1'
import Example2 from '../../../../components/Example2'
import DatePicker from '../../../../components/DatePicker'
import './index.less'

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

export default function RightPanel() {
  const [item, dragRef] = useDrag({ type: 'input', text: 'a' })
  const [item2, dragRef2] = useDrag({ type: 'button', text: 'a' })
  const [item3, dragRef3] = useDrag({ type: 'datePicker', text: 'a' })

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
          <div ref={dragRef3}>
            <DatePicker></DatePicker>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
