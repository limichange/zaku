import Button from './Button'
import Input from './Input'
import useSubscribe from '../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../store/editorStore'
import Normal from './Normal'
import Margin from './Margin'
import Color from './Color'
import Background from './Background'
import AntRow from './AntRow'
import Text from './Text'

export default function SettingPanel() {
  const [editorState] = useSubscribe(editorStore)

  const { component } = editorStore.findComponent(editorState.key)

  if (!component) return <div></div>

  return (
    <>
      {/* {component.type}-{editorState.key} */}
      <Normal></Normal>
      <Color></Color>
      <Background></Background>
      <Text></Text>
      <div>{component.type === 'AntdButton' && <Button></Button>}</div>
      <div>{component.type === 'AntdInput' && <Input></Input>}</div>
      <div>{component.type === 'AntdRow' && <AntRow></AntRow>}</div>
      <Margin></Margin>
      {/* <StyleSetting></StyleSetting> */}
    </>
  )
}
