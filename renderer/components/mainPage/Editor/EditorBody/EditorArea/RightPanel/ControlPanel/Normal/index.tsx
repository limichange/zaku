import { Button } from 'antd'
import editorStore from '../../../../../../../../store/editorStore'
import useSubscribe from '../../../../../../../../hooks/useSubscribe'

export default function Normal() {
  const [editorState] = useSubscribe(editorStore)

  function onClick() {
    editorStore.removeComponent(editorState.key)
  }

  return (
    <div
      style={{
        padding: '10px'
      }}>
      <Button size='small' onClick={onClick} icon='delete'></Button>
    </div>
  )
}
