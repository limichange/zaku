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

function createJSXelement(components) {
  return {
    header: importComponentsDeclaration(components),
    body: exportDefaultDeclaration(
      functionExpression(
        identifier('component'),
        [],
        blockStatement([
          returnStatement(JSXempty(components.map(componentInfoTranslate)))
        ])
      )
    )
  }
}

function importComponentsDeclaration(components) {
  const componentName = name =>
    importSpecifier(identifier(name), identifier(name))

  return importDeclaration(
    getAllComponentsTag(components).map(componentName),
    stringLiteral('ant')
  )
}

function getAllComponentsTag(components) {
  return components.map(component => {
    return component.tag
  })
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
  createJSXelement
}
