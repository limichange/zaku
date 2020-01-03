import { Select } from 'antd'

const { Option } = Select

export default function Button() {
  return (
    <div className='Button'>
      type
      <Select defaultValue='Default' style={{ width: 120 }}>
        <Option value='default'>default</Option>
        <Option value='primary'>primary</Option>
        <Option value='dashed'>dashed</Option>
        <Option value='danger'>danger</Option>
        <Option value='link'>link</Option>
      </Select>
    </div>
  )
}
