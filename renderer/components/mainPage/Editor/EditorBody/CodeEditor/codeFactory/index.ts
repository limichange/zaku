import {
  identifier,
  blockStatement,
  returnStatement,
  exportDefaultDeclaration,
  functionExpression,
  jsxText,
  stringLiteral,
  importDeclaration,
  importSpecifier,
  emptyStatement
} from '@babel/types'
import { jsxEmpty, jsx } from './jsx'
import generate from '@babel/generator'
import prettier from 'prettier/standalone'
import parserJS from 'prettier/parser-babylon'
import style from './style'

function generateCode(components) {
  if (components.length <= 0) return ''

  const {
    header: headerAST,
    body: bodyAST,
    style: styleAST
  } = createJSXelement(components)

  return prettier.format(
    [generate(headerAST).code, generate(styleAST).code, generate(bodyAST).code]
      .filter(code => code)
      .join('\n\n'),
    {
      parser: 'babel',
      plugins: [parserJS],
      singleQuote: true,
      jsxSingleQuote: true,
      jsxBracketSameLine: true
    }
  )
}

function createJSXelement(components: any[]) {
  const libName = 'antd'

  return {
    header: importComponentsDeclaration(components, libName),
    style: generateStyles(components),
    body: exportDefaultDeclaration(
      functionExpression(
        identifier('component'),
        [],
        blockStatement([
          generateHooks(),
          returnStatement(
            components.length === 1
              ? componentInfoTranslate(components[0])
              : jsxEmpty(components.map(componentInfoTranslate))
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

function generateStyles(components) {
  return style.generate(components)
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

  const allTags = getAllComponentsTag(components)

  if (allTags.length > 0) {
    return importDeclaration(
      getAllComponentsTag(components).map(componentName),
      stringLiteral(libName)
    )
  } else {
    return emptyStatement()
  }
}

function getAllComponentsTag(components) {
  const tagSet = new Set()

  function find(components) {
    components &&
      components.forEach(component => {
        if (component.type.includes('Antd')) {
          tagSet.add(component.tag)
        }

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

  return jsx(
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

export default {
  generateCode
}
