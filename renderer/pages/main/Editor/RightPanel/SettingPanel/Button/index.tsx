import { Select, Row, Col } from 'antd'

const { Option } = Select

export default function Button() {
  return (
    <div className='Button'>
      <Row type='flex' justify='start'>
        <Col span={4}>Type</Col>
        <Col span={4}>
          <Select defaultValue='Default' style={{ width: 120 }}>
            <Option value='default'>default</Option>
            <Option value='primary'>primary</Option>
            <Option value='dashed'>dashed</Option>
            <Option value='danger'>danger</Option>
            <Option value='link'>link</Option>
          </Select>
        </Col>
      </Row>
    </div>
  )
}
