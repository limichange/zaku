import Input from './components/Input'
import Button from './components/Button'
import DatePicker from './components/DatePicker'
import $style from './index.less'
import useDrag from '../../../../../../../hooks/useDrag'

const Item = props => {
  const [item, dragRef] = useDrag(props.config)

  return <div ref={dragRef}>{props.children}</div>
}

const ComponentsPanel: React.FC = function() {
  return (
    <div className={$style.ComponentsPanel}>
      <Item
        config={{
          type: 'AntdInput',
          tag: 'Input',
          name: 'Input',
          noChildren: true
        }}>
        <Input></Input>
      </Item>
      <Item
        config={{
          type: 'AntdButton',
          tag: 'Button',
          name: 'Button',
          text: 'Button'
        }}>
        <Button></Button>
      </Item>
      <Item
        config={{
          noChildren: true,
          type: 'AntdDatePicker',
          tag: 'DatePicker',
          name: 'DatePicker'
        }}>
        <DatePicker></DatePicker>
      </Item>
      <Item
        config={{
          type: 'AntdTooltip',
          tag: 'Tooltip',
          name: 'Tooltip',
          noHover: true,
          attributes: {
            title: 'tst'
          }
        }}>
        <div>Tooltip</div>
      </Item>
    </div>
  )
}

export default ComponentsPanel
