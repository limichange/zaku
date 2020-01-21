import {
  variableDeclaration,
  variableDeclarator,
  arrayPattern,
  callExpression,
  identifier,
  stringLiteral
} from '@babel/types'

export function generateUseState() {
  return variableDeclaration('const', [
    variableDeclarator(
      arrayPattern([identifier('value'), identifier('setValue')]),
      callExpression(identifier('useState'), [stringLiteral('""')])
    )
  ])
}
