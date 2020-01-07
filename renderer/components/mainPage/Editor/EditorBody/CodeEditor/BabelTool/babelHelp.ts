import types from '@babel/types'

function createJSXelement() {
  return types.jsxAttribute
}

function createAttribute(name, value) {
  return {
    type: types.jsxAttribute,
    name: {
      type: types.jsxIdentifier,
      name
    },

    value: {
      type: types.stringLiteral,
      value
    }
  }
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
