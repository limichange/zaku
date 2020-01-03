import uuid from 'uuid'

export default function withHover(component) {
  return (
    <div style={{ position: 'relative' }} key={uuid()}>
      {component}
      <div className='hover'></div>
    </div>
  )
}
