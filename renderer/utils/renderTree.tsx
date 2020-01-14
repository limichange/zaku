import componentsMap from './componentsMap'
import klona from 'klona'
import { FC } from 'react'

interface renderTree {
  components: any[]
  mode: 'editor' | 'preview'
  WrapComponent: FC
}

export default function renderTree(
  components = [],
  WrapComponent?,
  mode = 'editor'
) {
  return [
    <div key='createStyleTree'>{createStyleTree(components)}</div>,
    <div key='createComponentTree'>
      {createComponentTree(components, WrapComponent)}
    </div>,
    <div key='createHolderTree'>
      {createHolderTree(components, WrapComponent)}
    </div>
  ]
}

function createHolderTree(components, WrapComponent) {
  return components.map(item => {
    const key = item.key
    let children = []

    if (!item.noChildren) {
      children = [
        item.text,
        ...createHolderTree(item.components, WrapComponent)
      ].filter(item => item)
    }

    if (WrapComponent && !item.noHover) {
      return (
        <WrapComponent key={'wrap' + key} {...item} uuid={key}>
          {children}
        </WrapComponent>
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

function createComponentTree(components = [], WrapComponent?) {
  return components.map(item => {
    const key = item.key
    const Component = componentsMap.getComponent(item.type)
    let children = null

    if (!item.noChildren) {
      children = [
        item.text,
        ...createComponentTree(item.components, WrapComponent)
      ].filter(item => item)
    }

    const displayComponent = (
      <Component
        id={'id' + key}
        key={key}
        {...item.attributes}
        style={klona(item.style)}>
        {children}
      </Component>
    )

    return displayComponent
  })
}
