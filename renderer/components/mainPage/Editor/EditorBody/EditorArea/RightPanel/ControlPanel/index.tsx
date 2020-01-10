import Button from './Button'
import Input from './Input'
import useSubscribe from '../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../store/editorStore'
import Normal from './Normal'

export default function SettingPanel() {
  const [editorState] = useSubscribe(editorStore)

  const component = editorState.components.find(
    item => editorState.key === item.key
  )

  return (
    <>
      <Normal></Normal>
      <div>
        {component && component.type === 'AntdButton' && <Button></Button>}
      </div>
      <div>{component && component.type === 'AntInput' && <Input></Input>}</div>
    </>
  )
}
