// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypePrettyCode from 'rehype-pretty-code';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://blogs.nishanthm.com/',

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
        }]
      ],
    }),
    sitemap(),
    tailwind()
  ]
});