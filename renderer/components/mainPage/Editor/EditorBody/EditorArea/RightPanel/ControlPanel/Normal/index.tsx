import { Button, Tooltip } from 'antd'
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
      <Tooltip placement='top' title={'remove component'}>
        <Button size='small' onClick={onClick} icon='delete'></Button>
      </Tooltip>
    </div>
  )
}
