import {
  variableDeclaration,
  variableDeclarator,
  arrayPattern,
  callExpression,
  identifier,
  stringLiteral,
  numericLiteral
} from '@babel/types'

export function generateUseState(name: string, type: 'string' | 'number') {
  name.toLocaleUpperCase()

  const funcName = name[0].toUpperCase() + name.substr(1).toLowerCase()
  const stateDefaultValue =
    type === 'string' ? stringLiteral('""') : numericLiteral(0)

  return variableDeclaration('const', [
    variableDeclarator(
      arrayPattern([identifier(name), identifier(`set${funcName}`)]),
      callExpression(identifier('useState'), [stateDefaultValue])
    )
  ])
}
