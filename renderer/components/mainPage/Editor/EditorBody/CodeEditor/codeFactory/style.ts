import {
  variableDeclarator,
  identifier,
  objectExpression,
  objectProperty,
  stringLiteral,
  variableDeclaration,
  program,
  numericLiteral
} from '@babel/types'

export function generate(components = []) {
  let styleIndex = 0
  let styleArray = []

  function generateStyleDeclaration(component) {
    const { style } = component
    if (!style || Reflect.ownKeys(style).length === 0) return

    const styleName = `style${styleIndex++}`

    component.attributes.style = {
      type: 'object',
      value: styleName
    }

    styleArray.push(
      variableDeclaration('const', [
        variableDeclarator(
          identifier(styleName),
          objectExpression(
            Object.entries(style).map(([key, value]: any) => {
              if (typeof value === 'string') {
                value = stringLiteral(value)
              } else {
                value = numericLiteral(value)
              }

              return objectProperty(stringLiteral(key), value)
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
