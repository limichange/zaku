import { Select, Row, Col, Input } from 'antd'
import useSubscribe from '../../../../../../hooks/useSubscribe'
import editorStore from '../../../store/editorStore'
import './index.less'

const { Option } = Select

function ItemRow(props) {
  return (
    <Row
      style={{ marginBottom: '5px' }}
      type='flex'
      justify='space-between'
      align='middle'>
      {props.children}
    </Row>
  )
}

export default function Button() {
  const [editorState] = useSubscribe(editorStore)

  return (
    <div className='Button'>
      <ItemRow>
        <div>Type</div>
        <Select defaultValue='Default' style={{ width: 120 }}>
          <Option value='default'>default</Option>
          <Option value='primary'>primary</Option>
          <Option value='dashed'>dashed</Option>
          <Option value='danger'>danger</Option>
          <Option value='link'>link</Option>
        </Select>
      </ItemRow>
      <ItemRow>
        <div>Text</div>
        <div>
          <Input></Input>
        </div>
      </ItemRow>
    </div>
  )
}
