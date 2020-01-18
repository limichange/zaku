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
import klona from 'klona'

const initConfig = {
  withImport: true,
  withExport: true
}

function generateCode(components, config = initConfig) {
  if (components.length <= 0) return ''

  components = klona(components)

  let codeArray = []
  const {
    header: headerAST,
    body: bodyAST,
    style: styleAST
  } = createJSXelement(components, {
    withExport: config.withExport
  })

  codeArray = [generate(styleAST).code, generate(bodyAST).code]

  if (config.withImport) {
    codeArray.unshift(generate(headerAST).code)
  }

  return prettier.format(codeArray.filter(code => code).join('\n\n'), {
    parser: 'babel',
    plugins: [parserJS],
    singleQuote: true,
    jsxSingleQuote: true,
    jsxBracketSameLine: true
  })
}

function createJSXelement(
  components: any[],
  config = {
    withExport: true
  }
) {
  const libName = 'antd'

  let body
  let func = functionExpression(
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

  if (config.withExport) {
    body = exportDefaultDeclaration(func)
  } else {
    body = func
  }

  return {
    header: importComponentsDeclaration(components, libName),
    style: generateStyles(components),
    body
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
          // <Layout.Header> just import Layout
          tagSet.add(component.tag.split('.')[0])
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
