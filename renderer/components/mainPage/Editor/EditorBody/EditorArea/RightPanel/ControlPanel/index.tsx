import Button from './Button'
import Input from './Input'
import useSubscribe from '../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../store/editorStore'
import Normal from './Normal'
import StyleSetting from './StyleSetting'
import Margin from './Margin'
import Color from './Color'
import AntRow from './AntRow'

export default function SettingPanel() {
  const [editorState] = useSubscribe(editorStore)

  const { component } = editorStore.findComponent(editorState.key)

  if (!component) return <div></div>

  return (
    <>
      {component.type}
      <Normal></Normal>
      <Color></Color>
      <Margin></Margin>
      <div>{component.type === 'AntdButton' && <Button></Button>}</div>
      <div>{component.type === 'AntdInput' && <Input></Input>}</div>
      <div>{component.type === 'AntdRow' && <AntRow></AntRow>}</div>
      <StyleSetting></StyleSetting>
    </>
  )
}
