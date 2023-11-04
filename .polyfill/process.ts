/**
 * @description This is a polyfill to execute in Deno context
 *              npm packages that reference Node's [process](https://nodejs.org/api/process.html).
 */
import nodeprocess from 'process';

// deno-lint-ignore no-var
declare var process: typeof nodeprocess;
process = nodeprocess;
