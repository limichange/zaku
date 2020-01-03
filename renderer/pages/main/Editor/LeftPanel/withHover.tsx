import uuid from 'uuid'

export default function withHover(component) {
  return <div key={uuid()}>{component}</div>
}
