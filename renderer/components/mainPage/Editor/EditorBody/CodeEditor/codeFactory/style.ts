import {
  variableDeclarator,
  identifier,
  objectExpression,
  objectProperty,
  stringLiteral,
  variableDeclaration,
  program
} from '@babel/types'

export function generate(components = []) {
  let styleIndex = 0
  let styleArray = []

  function generateStyleDeclaration(component) {
    const { style } = component
    if (!style) return

    const className = `style${styleIndex++}`

    component.attributes.className = {
      var: className
    }

    styleArray.push(
      variableDeclaration('const', [
        variableDeclarator(
          identifier(className),
          objectExpression(
            Object.entries(style).map(([key, value]) => {
              return objectProperty(
                stringLiteral(key),
                stringLiteral(value as string)
              )
            })
          )
        )
      ])
    )
  }

  function generate(components = []) {
    components.forEach(component => {
      generateStyleDeclaration(component)

      generate(component.components)
    })
  }

  generate(components)

  return program(styleArray)
}

export default {
  generate
}
