import { Tabs } from 'antd'

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

export default function LeftPanel() {
  return (
    <Tabs defaultActiveKey='1' onChange={callback}>
      <TabPane tab='属性' key='1'>
        属性
      </TabPane>
      <TabPane tab='组件' key='2'>
        组件
      </TabPane>
    </Tabs>
  )
}
