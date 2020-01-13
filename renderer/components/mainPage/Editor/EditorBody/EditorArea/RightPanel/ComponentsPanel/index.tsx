import $style from './index.less'
import useDrag from '../../../../../../../hooks/useDrag'
import configs from './config'
import DragPreview from '../../../../../../DragPreview'
import editorStore from '../../../../../../../store/editorStore'

const Item = props => {
  const [item, dragRef, previewRef] = useDrag(props.config)

  function onDragStart() {
    editorStore.update({
      dragComponent: {
        ...props.config
      }
    })
  }

  function onDragEnd() {
    editorStore.update({
      dragComponent: null
    })
  }

  return (
    <>
      <div
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        className={$style.Item}
        ref={dragRef}>
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
          <Item {...config} key={config.type} config={config}>
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
