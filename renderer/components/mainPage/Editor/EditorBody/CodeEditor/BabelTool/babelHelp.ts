import {
  identifier,
  jsxOpeningElement,
  jsxClosingElement,
  jsxAttribute,
  jsxIdentifier,
  blockStatement,
  returnStatement,
  binaryExpression,
  expressionStatement,
  jsxExpressionContainer,
  exportDefaultDeclaration,
  jsxElement,
  functionExpression,
  jsxMemberExpression,
  jsxEmptyExpression,
  stringLiteral
} from '@babel/types'

function createJSXelement(components) {
  return exportDefaultDeclaration(
    functionExpression(
      identifier('functionName'),
      [],
      blockStatement([
        returnStatement(JSXempty(components.map(componentInfoTranslate)))
      ])
    )
  )
}

function componentInfoTranslate(componentInfo) {
  return element(componentInfo.type, [])
}

function JSXempty(children) {
  return element('', [], children)
}

function element(name, attributes?, children = []) {
  return jsxElement(
    jsxOpeningElement(
      jsxIdentifier(name),
      attributes.map(({ name, value }) => attribute(name, value))
    ),
    jsxClosingElement(jsxIdentifier(name)),
    children,
    true
  )
}

function attribute(name, value) {
  return jsxAttribute(jsxIdentifier(name), stringLiteral(value))
}

export default {
  createJSXelement
}
