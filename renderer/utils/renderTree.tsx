import componentsMap from './componentsMap'

export default function renderTree(components = [], WrapComponent?) {
  return components.map(item => {
    const key = item.key
    const Component = componentsMap.getComponent(item.type)
    let children = null

    if (!item.noChildren) {
      children = [item.text, renderTree(item.components, WrapComponent)]
    }

    const displayComponent = (
      <Component key={key} {...item.attributes}>
        {children}
      </Component>
    )

    if (WrapComponent && !item.noHover) {
      return (
        <WrapComponent key={key} uuid={key}>
          {displayComponent}
        </WrapComponent>
      )
    } else {
      return displayComponent
    }
  })
}
