#!/usr/bin/env -S deno run --allow-read
import { fs, path } from '../deps.ts'
Deno.chdir(path.dirname(path.fromFileUrl(import.meta.url)))

const START_LABEL = 'START: '
const END_LABEL = 'END'
const ARCHITECTURE_DIR = '../src/content/docs/architecture'
const PROMPT_PREFACE = `\
Hey, I'm creating a personal website. I am an engineering manager, located in Japan.
I want to share an architecture description of the site with you (as defined in ISO/IEC/IEEE 42010:2011).
The description is separated into a few pages, each starts with "START" and ends with "END".
It also includes its path for hierachihal information for you to use.
For now only acknowledge with "I got it" after processing.
`
const compilation: Array<Promise<string>> = []
const decoder = new TextDecoder()
for await (const entry of fs.walk(ARCHITECTURE_DIR)) {
  if (entry.isFile) {
    compilation.push((async (path: string) => {
      const trimmedPath = path.substring(ARCHITECTURE_DIR.length)

      const bytes = await Deno.readFile(path)
      const text = decoder.decode(bytes)
      const labeledText = START_LABEL + trimmedPath + '\n' + text + END_LABEL + '\n'
      return labeledText
    })(entry.path))
  }
}
const document = [PROMPT_PREFACE, ...await Promise.all(compilation)].join('\n')
console.log(document)
