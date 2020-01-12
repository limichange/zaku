import {
  identifier,
  jsxOpeningElement,
  jsxClosingElement,
  jsxAttribute,
  jsxIdentifier,
  blockStatement,
  returnStatement,
  exportDefaultDeclaration,
  jsxElement,
  functionExpression,
  jsxText,
  stringLiteral,
  importDeclaration,
  importSpecifier,
  jsxExpressionContainer,
  numericLiteral,
  emptyStatement
} from '@babel/types'
import generate from '@babel/generator'
import prettier from 'prettier/standalone'
import parserJS from 'prettier/parser-babylon'

function generateCode(components) {
  if (components.length <= 0) return ''

  const { header: headerAST, body: bodyAST } = createJSXelement(components)
  const { code: headerCode } = generate(headerAST)
  const { code: bodyCode } = generate(bodyAST)

  return prettier.format(headerCode + '\n\n' + bodyCode, {
    parser: 'babel',
    plugins: [parserJS],
    singleQuote: true,
    jsxSingleQuote: true,
    jsxBracketSameLine: true
  })
}

function createJSXelement(components: any[]) {
  const libName = 'antd'

  return {
    header: importComponentsDeclaration(components, libName),
    body: exportDefaultDeclaration(
      functionExpression(
        identifier('component'),
        [],
        blockStatement([
          generateStyles(),
          generateHooks(),
          returnStatement(
            components.length === 1
              ? componentInfoTranslate(components[0])
              : JSXempty(components.map(componentInfoTranslate))
          )
        ])
      )
    )
  }
}

function generateHooks() {
  // todo: auto generate hooks
  return emptyStatement()
}

function generateStyles() {
  // todo: auto generate style
  return emptyStatement()
}

function exportClassStyleComponent() {
  // todo
}

function exportFunctionStyleComponent() {
  // todo
}

function importComponentsDeclaration(components, libName) {
  const componentName = name =>
    importSpecifier(identifier(name), identifier(name))

  return importDeclaration(
    getAllComponentsTag(components).map(componentName),
    stringLiteral(libName)
  )
}

function getAllComponentsTag(components) {
  const tagSet = new Set()

  function find(components) {
    components &&
      components.forEach(component => {
        tagSet.add(component.tag)

        if (component.components) find(component.components)
      })
  }

  find(components)

  return Array.from(tagSet)
}

function componentInfoTranslate(componentInfo) {
  const {
    text,
    tag,
    attributes = {},
    components = [],
    noChildren
  } = componentInfo
  let children = []

  if (text) {
    children = [jsxText(text)]
  }

  if (!noChildren && components?.length > 0) {
    children = [...children, ...components.map(componentInfoTranslate)]
  }

  return element(
    tag,
    Object.entries(attributes).map(([key, value]) => {
      return {
        key,
        value
      }
    }),
    children
  )
}

/**
 * create jsx <></>
 * @param children
 */
function JSXempty(children) {
  return element('', [], children)
}

/**
 * create jsx element
 * @param name
 * @param attributes
 * @param children
 */
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

/**
 * create jsx attribute
 * @param name
 * @param value
 */
function attribute(name, value: number | string) {
  let attributeValueExpress = null

  if (typeof value === 'number') {
    attributeValueExpress = jsxExpressionContainer(numericLiteral(value))
  } else {
    attributeValueExpress = stringLiteral(value)
  }

  return jsxAttribute(jsxIdentifier(name), attributeValueExpress)
}

export default {
  generateCode
}
