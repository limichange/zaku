import Input from './components/Input'
import Button from './components/Button'
import DatePicker from './components/DatePicker'
import $style from './index.less'
import useDrag from '../../../../../../../hooks/useDrag'

const ComponentsPanel: React.FC = function() {
  const [item, dragRef] = useDrag({ type: 'input', tag: 'Input' })
  const [item2, dragRef2] = useDrag({
    type: 'button',
    tag: 'Button',
    text: 'Button'
  })
  const [item3, dragRef3] = useDrag({ type: 'datePicker', tag: 'DatePicker' })

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
    </div>
  )
}

export default ComponentsPanel
