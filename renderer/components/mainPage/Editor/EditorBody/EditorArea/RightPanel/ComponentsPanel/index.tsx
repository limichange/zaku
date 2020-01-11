import Input from './components/Input'
import Button from './components/Button'
import DatePicker from './components/DatePicker'
import $style from './index.less'
import useDrag from '../../../../../../../hooks/useDrag'

const ComponentsPanel: React.FC = function() {
  const [item, dragRef] = useDrag({
    type: 'AntdInput',
    tag: 'Input',
    noChildren: true
  })
  const [item2, dragRef2] = useDrag({
    type: 'AntdButton',
    tag: 'Button',
    text: 'Button'
  })
  const [item3, dragRef3] = useDrag({
    noChildren: true,
    type: 'AntdDatePicker',
    tag: 'DatePicker'
  })
  const [item4, dragRef4] = useDrag({
    type: 'div',
    tag: 'div'
  })

  return (
    <div className={$style.ComponentsPanel}>
      <div ref={dragRef}>
        <Input></Input>
      </div>
      <div ref={dragRef2}>
        <Button></Button>
      </div>
      <div ref={dragRef3}>
        <DatePicker></DatePicker>
      </div>
      <div ref={dragRef4}>
        <div>DIV</div>
      </div>
    </div>
  )
}

export default ComponentsPanel
