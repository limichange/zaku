import { Tabs } from 'antd'

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

export default function LeftPanel() {
  return (
    <Tabs defaultActiveKey='1' onChange={callback}>
      <TabPane tab='Tab 1' key='1'>
        组件
      </TabPane>
      <TabPane tab='Tab 2' key='2'>
        属性
      </TabPane>
    </Tabs>
  )
}
