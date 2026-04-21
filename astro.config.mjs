// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeExternalLinks from 'rehype-external-links';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://blogs.nishanthm.com/',

  integrations: [
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [
        [rehypePrettyCode, {
          theme: {
            light: 'light-plus',
            dark: 'one-dark-pro',
          },
          keepBackground: false,
          defaultLang: {
            block: 'plaintext',
            inline: 'plaintext',
          },
        }],
        [rehypeExternalLinks, {
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer']
        }]
      ],
    }),
    sitemap(),
    tailwind()
  ]
});