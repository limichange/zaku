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
  importSpecifier
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
          // todo: auto generate hooks
          // todo: auto generate style
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

  components.forEach(component => {
    tagSet.add(component.tag)
  })

  return Array.from(tagSet)
}

function componentInfoTranslate(componentInfo) {
  const { text, tag, attributes = {} } = componentInfo

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
function attribute(name, value) {
  return jsxAttribute(jsxIdentifier(name), stringLiteral(value))
}

export default {
  generateCode
}
