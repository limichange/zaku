import { Row as AntdRow } from 'antd'
import { FC } from 'react'

export const Row: FC = props => {
  return (
    <AntdRow
      style={{ marginBottom: '5px' }}
      type='flex'
      justify='space-between'
      align='middle'>
      {props.children}
    </AntdRow>
  )
}

export const Label: FC = props => {
  return <div style={{ width: '50px' }}>{props.children}</div>
}
