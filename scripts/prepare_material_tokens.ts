#!/usr/bin/env -S deno run --allow-read
import { path } from '../deps.ts'
import { materialColors, materialTypeface, materialTypescale } from '../theme.config.ts'
Deno.chdir(path.dirname(path.fromFileUrl(import.meta.url)))

const INTEND = ' '
const SEPARATOR = ';'

console.log(':root {')

const lines: string[] = [
  materialColors.toTokens(),
  materialTypeface.toTokens(),
  materialTypescale.toTokens(),
].flat()
lines
  .map((line) => INTEND + line + SEPARATOR)
  .forEach((line) => console.log(line))

console.log('}')
