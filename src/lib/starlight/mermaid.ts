import type { ModeProvider } from '../mermaid/facade'
import { MermaidFacade } from '../mermaid/facade'

const provider: ModeProvider = {
    get isDark() {
      return document.documentElement.dataset.theme === 'dark'
    },
  },
  facade = new MermaidFacade(provider)

document.addEventListener('DOMContentLoaded', () => {
  facade.renderAll(document.documentElement).catch(console.error)
})

const themeObserver = new MutationObserver(records => {
  Promise.all(records.map(async () => facade.rerenderAll(document.documentElement))).catch(console.error)
})
themeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme'],
})
