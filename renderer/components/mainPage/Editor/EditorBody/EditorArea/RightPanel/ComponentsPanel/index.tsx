import $style from './index.less'
import useDrag from '../../../../../../../hooks/useDrag'
import configs from './config'

const Item = props => {
  const [item, dragRef] = useDrag(props.config)

  return (
    <div className={$style.Item} ref={dragRef}>
      {props.children}
    </div>
  )
}

const ComponentsPanel: React.FC = function() {
  return (
    <div className={$style.ComponentsPanel}>
      {configs.map(config => {
        return (
          <Item key={config.type} config={config}>
            <div className={$style.imgWrap}>
              <img src={config.previewImage} alt='' />
            </div>
            <div>{config.name}</div>
          </Item>
        )
      })}
    </div>
  )
}

export default ComponentsPanel
