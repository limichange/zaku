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
  jsxText,
  jsxEmptyExpression,
  stringLiteral,
  program,
  importDeclaration,
  emptyStatement,
  importSpecifier,
  file
} from '@babel/types'

function createJSXelement(components) {
  return {
    header: importDeclaration(
      [importSpecifier(identifier('Button'), identifier('Button'))],
      stringLiteral('ant')
    ),
    body: exportDefaultDeclaration(
      functionExpression(
        identifier('functionName'),
        [],
        blockStatement([
          returnStatement(JSXempty(components.map(componentInfoTranslate)))
        ])
      )
    )
  }
}

function importComponents(components) {
  return []
}

function componentInfoTranslate(componentInfo) {
  const { text, tag, attributes } = componentInfo

  return element(
    tag,
    Object.entries(attributes).map(([key, value]) => {
      return {
        key,
        value
      }
    }),
    text ? [jsxText(text)] : []
  )
}

function JSXempty(children) {
  return element('', [], children)
}

function element(name, attributes?, children = []) {
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

function attribute(name, value) {
  return jsxAttribute(jsxIdentifier(name), stringLiteral(value))
}

export default {
  createJSXelement
}
