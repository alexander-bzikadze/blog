/**
 * @description Exports a remark plugin for Astro
 *              in order to transform mermaid code blocks in markdown
 *              to <pre class="mermaid"/> HTML blocks.
 *              [Mermaid library](https://mermaid.js.org/config/usage.html) will render the block,
 *              if included on the page.
 */
import type { RemarkPlugin } from "@astrojs/markdown-remark"
import type { Root, Code, Html } from "mdast"
import { visit } from "unist-util-visit"

export default (() => (tree: Root) => visit(tree, "code", (node: Code) => {
    if (node.lang !== "mermaid") {
        return
    }
    const htmlNode = node as unknown as Html
    htmlNode.type = 'html'
    htmlNode.value = `<pre class="mermaid">${node.value}</pre>`
})) satisfies RemarkPlugin<[]>
