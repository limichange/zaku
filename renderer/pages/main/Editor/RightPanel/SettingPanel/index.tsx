import Button from './Button'
import Input from './Input'
import useSubscribe from '../../../../../hooks/useSubscribe'
import editorStore from '../../store/editorStore'

export default function SettingPanel() {
  useSubscribe(editorStore)

  return <div>2</div>
}
