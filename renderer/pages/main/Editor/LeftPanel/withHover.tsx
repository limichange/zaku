import uuid from 'uuid'

export default function withHover(component) {
  return (
    <div key={uuid()} onClickCapture={() => false}>
      {component}
    </div>
  )
}
