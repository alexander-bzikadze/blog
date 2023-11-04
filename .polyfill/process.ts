/**
 * @description This is a polyfill to execute in Deno context
 *              npm packages that reference Node's [process](https://nodejs.org/api/process.html).
 */
import process from "node:process"

declare global {
    // deno-lint-ignore no-var
    var process: typeof process
}

globalThis.process = process
