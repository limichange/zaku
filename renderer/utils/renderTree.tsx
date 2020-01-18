import componentsMap from './componentsMap'
import klona from 'klona'
import { FC } from 'react'

interface renderTree {
  components: any[]
  mode: 'editor' | 'preview'
  HoverComponent: FC
}

export default function renderTree(
  components = [],
  HoverComponent?,
  mode = 'editor'
) {
  return [
    <div key='style'>{createStyleTree(components)}</div>,
    <div key='component'>{createComponentTree(components)}</div>,
    <div key='hover'>{createHolderTree(components, HoverComponent)}</div>
  ]
}

function createHolderTree(components, HoverComponent) {
  return components.map(item => {
    const key = item.key
    let children = []

    if (!item.noChildren) {
      children = createHolderTree(item.components, HoverComponent).filter(
        item => item
      )
    }

    if (HoverComponent && !item.noHover) {
      return (
        <HoverComponent key={'wrap' + key} {...item} uuid={key}>
          {children}
        </HoverComponent>
      )
    }
  })
}

function createStyleTree(components = []) {
  const styles = []
  function deep(components = []) {
    return components.map(item => {
      const key = item.key

      if (!item.noChildren) {
        deep(item.components)
      }

      if (
        item.emptyPlaceholder &&
        item.components?.length === 0 &&
        !item.text
      ) {
        styles.push(
          <style
            key={'style' + key}
            type='text/css'
            dangerouslySetInnerHTML={{
              __html: ` #id${item.key}::before {
                content: '#${item.type}#';
                padding: 5px;
                color: #aaa;
              }
            `
            }}></style>
        )
      }
    })
  }

  deep(components)

  return styles
}

function createComponentTree(components = []) {
  return components.map(item => {
    const key = item.key
    const Component = componentsMap.getComponent(item.type)
    let children = null

    if (item.text) {
      children = [item.text]
    }

    if (!item.noChildren) {
      children = [...children, ...createComponentTree(item.components)].filter(
        item => item
      )
    }

    return (
      <Component
        id={'id' + key}
        key={key}
        {...item.attributes}
        style={klona(item.style)}>
        {children}
      </Component>
    )
  })
}
