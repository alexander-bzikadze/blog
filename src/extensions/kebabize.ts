export function kebabize(input: string): string {
  return input.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (token, rest) => (rest ? '-' : '') + token.toLowerCase())
}
