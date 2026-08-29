// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';

import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkMermaid from 'remark-mermaidjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://oktogazh.github.io',
  base: '/',
  build: { format: 'file' },
  trailingSlash: 'never',

  integrations: [
    expressiveCode(),
    mdx({
      syntaxHighlight: 'prism',
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    sitemap(),
  ],

  markdown: {
    remarkPlugins: [remarkMath, remarkMermaid],
    rehypePlugins: [rehypeKatex],
  },
});
