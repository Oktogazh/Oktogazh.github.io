// @ts-nocheck
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import mdx from "@astrojs/mdx";
import wikiLinkPlugin from "@portaljs/remark-wiki-link";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://oktogazh.github.io",
  base: "/",
  build: {
    format: 'file'
  },
  trailingSlash: "never",
  integrations: [
    mdx({
      syntaxHighlight: "prism",
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [
    ]
  }
});