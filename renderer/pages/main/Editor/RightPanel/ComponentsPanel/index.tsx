import useDrag from '../useDrag'
import Example1 from '../../../../../components/Example1'
import Example2 from '../../../../../components/Example2'
import DatePicker from '../../../../../components/DatePicker'

export default function ComponentsPanel() {
  const [item, dragRef] = useDrag({ type: 'input', text: 'a' })
  const [item2, dragRef2] = useDrag({ type: 'button', text: 'a' })
  const [item3, dragRef3] = useDrag({ type: 'datePicker', text: 'a' })

  return (
    <div className='ComponentsPanel'>
      {' '}
      <div ref={dragRef}>
        <Example1></Example1>
      </div>
      <div ref={dragRef2}>
        <Example2></Example2>
      </div>
      <div ref={dragRef3}>
        <DatePicker></DatePicker>
      </div>
    </div>
  )
}
