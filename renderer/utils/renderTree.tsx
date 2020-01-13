import componentsMap from './componentsMap'

export default function renderTree(components = [], WrapComponent?) {
  return components.map(item => {
    const key = item.key
    const Component = componentsMap.getComponent(item.type)
    let children = null

    if (!item.noChildren) {
      children = [
        item.text,
        ...renderTree(item.components, WrapComponent)
      ].filter(item => item)
    }

    if (item.emptyPlaceholder && children.length === 0) {
      children.push(
        <div style={{ padding: '5px', color: '#aaa' }} key={key}>
          #{item.type}#
        </div>
      )
    }

    const displayComponent = (
      <Component key={key} {...item.attributes}>
        {children}
      </Component>
    )

    if (WrapComponent && !item.noHover) {
      return (
        <WrapComponent {...item} key={key} uuid={key}>
          {displayComponent}
        </WrapComponent>
      )
    } else {
      return displayComponent
    }
  })
}
