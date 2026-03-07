// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeMermaid from 'rehype-mermaid';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://nishanthm.dev',

  integrations: [
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [
        [rehypePrettyCode, {
          theme: 'one-dark-pro',
          keepBackground: true,
          defaultLang: {
            block: 'plaintext',
            inline: 'plaintext',
          },
        }],
        rehypeMermaid
      ],
    }),
    sitemap(),
    tailwind()
  ]
});