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
  jsxElement,
  functionExpression,
  jsxMemberExpression,
  jsxEmptyExpression,
  stringLiteral
} from '@babel/types'

function createJSXelement() {
  return functionExpression(
    identifier('functionName'),
    [],
    blockStatement([
      returnStatement(
        jsxElement(
          jsxOpeningElement(jsxIdentifier('Button'), [
            jsxAttribute(jsxIdentifier('name'), stringLiteral('value'))
          ]),
          jsxClosingElement(jsxIdentifier('Button')),
          [],
          true
        )
      )
    ])
  )
}

function createAttribute(name, value) {
  return {}
}

export default {
  createAttribute,
  createJSXelement
}
