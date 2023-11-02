/**
 * This file masks as a node:stream.
 * 
 * As of 2023.11.03, [astro starlight](https://starlight.astro.build/) references Node's [process](https://nodejs.org/api/process.html).
 * When executed in Deno context, it fails.
 * Therefore this file injects Deno's polyfill into global variables.
 */
import * as stream from "node:stream"
import process from "node:process"

declare global {
    // deno-lint-ignore no-var
    var process: unknown
}

globalThis.process= process

export default stream
