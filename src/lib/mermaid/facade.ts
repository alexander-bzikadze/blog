import type { MermaidConfig } from 'mermaid';
import mermaid from 'mermaid';
import { CSS_CLASSNAME } from '../../plugins/mermaid_const';

export interface ModeProvider {
  get isDark(): boolean;
}

export class MermaidFacade {
  private readonly decoder = new TextDecoder();

  constructor(
    private readonly modeProvider: ModeProvider,
  ) {
    mermaid.initialize(this.config);
  }

  async renderAll(root: Element): Promise<void> {
    const elements = root.querySelectorAll(`.${CSS_CLASSNAME}`);
    await Promise.all(Array.from(elements, (element) => this.render(element)));
  }

  async rerenderAll(root: Element): Promise<void> {
    mermaid.initialize(this.config);

    const elements = root.querySelectorAll(`.${CSS_CLASSNAME}`);
    await Promise.all(Array.from(elements, (element) => this.rerender(element)));
  }

  private async render(element: Element): Promise<void> {
    const id = crypto.randomUUID();
    const code = element.innerHTML;

    const { svg, bindFunctions } = await mermaid.render(id, code, element);
    element.innerHTML = svg;
    bindFunctions?.(element);

    element.setAttribute('code', code);
  }

  private async rerender(element: Element): Promise<void> {
    const id = element.children.item(0)?.id;
    if (id === undefined) {
      return;
    }

    const code = element.getAttribute('code');
    if (code === null) {
      return;
    }

    const { svg, bindFunctions } = await mermaid.render(id, code, element);
    element.innerHTML = svg;
    bindFunctions?.(element);
  }

  private static BASE_CONFIG: MermaidConfig = Object.freeze({
    startOnLoad: false,
  });

  private get config(): MermaidConfig {
    const themeOptions = this.modeProvider.isDark
      ? { theme: 'dark', darkMode: true }
      : { theme: 'default', darkMode: false };
    return { ...MermaidFacade.BASE_CONFIG, ...themeOptions };
  }
}
