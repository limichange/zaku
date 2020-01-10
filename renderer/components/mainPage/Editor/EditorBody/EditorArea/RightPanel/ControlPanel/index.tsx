import Button from './Button'
import Input from './Input'
import useSubscribe from '../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../store/editorStore'
import Normal from './Normal'
import StyleSetting from './StyleSetting'

export default function SettingPanel() {
  const [editorState] = useSubscribe(editorStore)

  const component = editorState.components.find(
    item => editorState.key === item.key
  )

  if (!component) return <div></div>

  return (
    <>
      <Normal></Normal>
      <div>{component.type === 'AntdButton' && <Button></Button>}</div>
      <div>{component.type === 'AntInput' && <Input></Input>}</div>
      <StyleSetting></StyleSetting>
    </>
  )
}
