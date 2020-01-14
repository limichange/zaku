import {
  jsxElement,
  jsxOpeningElement,
  jsxIdentifier,
  jsxClosingElement,
  jsxExpressionContainer,
  numericLiteral,
  stringLiteral,
  jsxAttribute
} from '@babel/types'

export function jsxEmpty(children = []) {
  return jsx('', [], children)
}

/**
 * create jsx element
 * @param name
 * @param attributes
 * @param children
 */
export function jsx(name, attributes?, children = []) {
  return jsxElement(
    jsxOpeningElement(
      jsxIdentifier(name),
      attributes.map(({ key, value }) => attribute(key, value))
    ),
    jsxClosingElement(jsxIdentifier(name)),
    children,
    true
  )
}

/**
 * create jsx attribute
 * @param name
 * @param value
 */
export function attribute(name, value: number | string) {
  let attributeValueExpress = null

  if (typeof value === 'number') {
    attributeValueExpress = jsxExpressionContainer(numericLiteral(value))
  } else {
    attributeValueExpress = stringLiteral(value)
  }

  return jsxAttribute(jsxIdentifier(name), attributeValueExpress)
}

export default {
  jsx,
  jsxEmpty,
  jsxAttribute
}
