// @ts-nocheck
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import mdx from "@astrojs/mdx";
import wikiLinkPlugin from "@portaljs/remark-wiki-link";

import tailwind from "@astrojs/tailwind";

import expressiveCode from "astro-expressive-code";
import remarkMermaid from 'remark-mermaidjs'

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://oktogazh.github.io",
  base: "/",
  build: {
    format: 'file'
  },
  trailingSlash: "never",
  integrations: [expressiveCode(), mdx({
    syntaxHighlight: "prism",
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  }), tailwind(), svelte()],
  markdown: {
    remarkPlugins: [
      remarkMermaid
    ]
  }
});