import $style from './index.less'
import useDrag from '../../../../../../../hooks/useDrag'
import configs from './config'
import DragPreview from '../../../../../../DragPreview'

const Item = props => {
  const [item, dragRef, previewRef] = useDrag(props.config)

  return (
    <>
      <div className={$style.Item} ref={dragRef}>
        {props.children}
        <div ref={previewRef}>
          <DragPreview>{props.name}</DragPreview>
        </div>
      </div>
    </>
  )
}

const ComponentsPanel: React.FC = function() {
  return (
    <div className={$style.ComponentsPanel}>
      {configs.map(config => {
        return (
          <Item name={config.name} key={config.type} config={config}>
            <div className={$style.imgWrap}>
              {config.previewImage && <img src={config.previewImage} alt='' />}
              {!config.previewImage && (
                <div className={$style.noImage}>{`<${config.tag} />`}</div>
              )}
            </div>
            <div>{config.name}</div>
          </Item>
        )
      })}
    </div>
  )
}

export default ComponentsPanel
