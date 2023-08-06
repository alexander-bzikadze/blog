import { defineConfig } from 'astro/config';
import relativeLinks from "astro-relative-links";

export default defineConfig({
  output: 'static',
  integrations: [relativeLinks()]
});
