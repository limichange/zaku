import Button from './Button'
import Input from './Input'
import useSubscribe from '../../../../../hooks/useSubscribe'
import editorStore from '../../store/editorStore'

export default function SettingPanel() {
  const [editorState] = useSubscribe(editorStore)

  return (
    <div>
      <div>{editorState.key}</div>
      <div>
        <Button></Button>
      </div>
    </div>
  )
}
