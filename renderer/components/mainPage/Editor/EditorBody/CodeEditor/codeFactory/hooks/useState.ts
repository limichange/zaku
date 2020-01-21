import {
  variableDeclaration,
  variableDeclarator,
  arrayPattern,
  callExpression,
  identifier,
  stringLiteral,
  numericLiteral
} from '@babel/types'

export function generateUseState(name: string, value: string | number) {
  name.toLocaleUpperCase()

  const funcName = name[0].toUpperCase() + name.substr(1).toLowerCase()
  const stateDefaultValue =
    typeof value === 'string'
      ? stringLiteral(`'${value}'`)
      : numericLiteral(value)

  return variableDeclaration('const', [
    variableDeclarator(
      arrayPattern([identifier(name), identifier(`set${funcName}`)]),
      callExpression(identifier('useState'), [stateDefaultValue])
    )
  ])
}
