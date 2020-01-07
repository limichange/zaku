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

const demo = {
  type: 'File',
  program: {
    type: 'Program',
    sourceType: 'module',
    interpreter: null,
    body: [
      {
        type: 'FunctionDeclaration',
        id: {
          type: 'Identifier',
          name: 'main'
        },
        generator: false,
        async: false,
        params: [],
        body: {
          type: 'BlockStatement',
          body: [
            {
              type: 'ReturnStatement',
              argument: {
                type: 'JSXElement',
                openingElement: {
                  type: 'JSXOpeningElement',
                  name: {
                    type: 'JSXIdentifier',
                    name: 'Button'
                  },
                  attributes: [
                    {
                      type: 'JSXAttribute',
                      name: {
                        type: 'JSXIdentifier',
                        name: 'className'
                      },
                      value: {
                        type: 'StringLiteral',
                        value: 'classname'
                      }
                    }
                  ],
                  selfClosing: false
                },
                closingElement: {
                  type: 'JSXClosingElement',
                  name: {
                    type: 'JSXIdentifier',
                    name: 'Button'
                  }
                },
                children: [
                  {
                    type: 'JSXText',
                    extra: {
                      rawValue: 'text',
                      raw: 'text'
                    },
                    value: 'text'
                  }
                ]
              }
            }
          ],
          directives: []
        }
      }
    ],
    directives: []
  },
  comments: []
}

export default {
  createAttribute,
  createJSXelement,
  demo
}
