---
name: nishanthm-blogs
description: |
  Full project context for the Nishanth M personal developer blog.
  An Astro 5 + Tailwind CSS 3 + MDX static blog with a dark-first editorial design.
  Use this skill whenever working on any file in this repository.
triggers:
  - blog
  - astro
  - nishanthm
  - design system
  - tailwind config
  - blog post
  - new page
  - new component
  - content collection
  - category
  - tag
  - "issue #"
  - "PR #"
---

# nishanthm-blogs — Project Skill

## Metadata

| Key | Value |
|---|---|
| **Repo** | [NishanthMuruganantham/nishanthm-blogs](https://github.com/NishanthMuruganantham/nishanthm-blogs) |
| **Type** | Static personal developer blog |
| **Framework** | Astro 5.17 (SSG) |
| **Styling** | Tailwind CSS 3.4 + CSS custom properties |
| **Content** | MDX via `@astrojs/mdx` |
| **Domain** | `https://blogs.nishanthm.com/` |
| **Owner** | NishanthMuruganantham |
| **Status** | Foundation complete, building pages (see [Roadmap](#roadmap)) |

---

## Project Overview

A dark-first, editorial tech blog for a full-stack developer (React + Django). The site uses Astro's content collections for blog posts in MDX, Tailwind CSS with a custom design system, and rehype plugins for code highlighting and Mermaid diagrams.

### Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Astro | ^5.17.1 |
| Styling | Tailwind CSS | ^3.4.19 |
| Typography plugin | @tailwindcss/typography | ^0.5.19 |
| Content | @astrojs/mdx | ^4.3.13 |
| Code highlighting | rehype-pretty-code + Shiki | ^0.14.1 / ^3.23.0 |
| Diagrams | rehype-mermaid | ^3.0.0 |
| Sitemap | @astrojs/sitemap | ^3.7.0 |
| RSS | @astrojs/rss | ^4.0.15 |
| Image processing | sharp | ^0.34.5 |
| Reading time | reading-time | ^1.5.0 |
| Display font | Space Grotesk (fontsource) | ^5.2.10 |
| Body font | Lora (fontsource) | ^5.2.8 |
| Mono font | JetBrains Mono (fontsource) | ^5.2.8 |
| Testing | Playwright | ^1.58.2 |
| TypeScript | strict (extends `astro/tsconfigs/strict`) | — |

### npm Scripts

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production → dist/
npm run preview  # Preview production build locally
```

---

## Directory Structure

```
nishanthm-blogs/
├── .agents/
│   ├── rules/learning-first-code-generation-rule.md
│   └── skills/SKILL.md              ← This file
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── fonts/                        ← Custom fonts (if any beyond fontsource)
│   └── images/                       ← Static images
├── src/
│   ├── components/                   ← Astro components (EMPTY — to be built)
│   ├── content/
│   │   ├── config.ts                 ← Content collection schema (Zod)
│   │   └── blog/                     ← MDX blog posts
│   │       ├── django-cors-fix.mdx
│   │       ├── mcp-vscode-setup.mdx
│   │       └── android-gradle-error.mdx
│   ├── layouts/                      ← Page layouts (EMPTY — to be built)
│   ├── lib/
│   │   └── utils.ts                  ← getReadingTime, formatDate, slugify
│   ├── pages/
│   │   ├── index.astro               ← Homepage (placeholder only)
│   │   └── blog/                     ← Blog routes (EMPTY — to be built)
│   └── styles/
│       └── global.css                ← Full design system (340 lines)
├── astro.config.mjs                  ← Astro config with MDX, sitemap, tailwind
├── tailwind.config.mjs               ← Extended Tailwind config (145 lines)
├── tsconfig.json
├── package.json
└── .env.example                      ← Giscus + site URL env vars
```

---

## Design System Reference

### Color Tokens

All colors are defined as both CSS custom properties (in `global.css`) and Tailwind tokens (in `tailwind.config.mjs`).

#### Backgrounds
| CSS Variable | Tailwind Class | Hex | Use |
|---|---|---|---|
| `--color-bg` | `bg-bg` | `#09090e` | Page background |
| `--color-bg-elevated` | `bg-bg-elevated` | `#111118` | Elevated surfaces, pre blocks |
| `--color-bg-card` | `bg-bg-card` | `#13131a` | Card backgrounds |

#### Borders
| CSS Variable | Tailwind Class | Hex |
|---|---|---|
| `--color-border` | `border-border` | `#1e1e2e` |
| `--color-border-subtle` | `border-border-subtle` | `#161622` |

#### Text
| CSS Variable | Tailwind Class | Hex | Use |
|---|---|---|---|
| `--color-text-primary` | `text-text-primary` | `#e8e8f0` | Headings, body |
| `--color-text-secondary` | `text-text-secondary` | `#8888a8` | Subtitles, meta |
| `--color-text-muted` | `text-text-muted` | `#55556a` | Captions, placeholders |

#### Accent — Electric Indigo
| CSS Variable | Tailwind Class | Hex | Use |
|---|---|---|---|
| `--color-accent` | `text-accent` / `bg-accent` | `#7c6af7` | Primary accent, buttons |
| `--color-accent-bright` | `text-accent-bright` | `#a89bff` | Links, hover states |
| `--color-accent-glow` | `bg-accent-glow` | `rgba(124,106,247,0.15)` | Glow effects, tag backgrounds |

#### Category Colors
| Category | CSS Variable | Tailwind Class | Hex |
|---|---|---|---|
| Backend | `--color-backend` | `text-backend` / `bg-backend` | `#f97316` (orange) |
| Frontend | `--color-frontend` | `text-frontend` / `bg-frontend` | `#3b82f6` (blue) |
| Tools | `--color-tools` | `text-tools` / `bg-tools` | `#a855f7` (purple) |
| Android | `--color-android` | `text-android` / `bg-android` | `#22c55e` (green) |
| Startup | `--color-startup` | `text-startup` / `bg-startup` | `#ec4899` (pink) |
| Life | `--color-life` | `text-life` / `bg-life` | `#06b6d4` (cyan) |

#### Status Colors
| Purpose | Hex | Tailwind |
|---|---|---|
| Success | `#4ade80` | `text-success` |
| Warning | `#fbbf24` | `text-warning` |
| Error | `#f87171` | `text-error` |

### Typography

| Token | Font | Tailwind Class | Use |
|---|---|---|---|
| `--font-display` | Space Grotesk | `font-display` | Headings, buttons, tags, navigation |
| `--font-body` | Lora (serif) | `font-body` | Body text, blog prose |
| `--font-mono` | JetBrains Mono | `font-mono` | Code blocks, inline code |

> **Note:** The original issue #3 specified Cabinet Grotesk, but the actual implementation uses **Space Grotesk** (which is freely available via fontsource). All configs and CSS use Space Grotesk.

### Spacing & Layout

| Token | Value | Use |
|---|---|---|
| `--space-section` | `clamp(4rem, 8vw, 8rem)` | Vertical spacing between major sections |
| `--content-width` | `720px` | Prose/article max-width |
| `--wide-width` | `1100px` | Wide layout max-width |
| `--transition-fast` | `150ms ease` | Hover micro-interactions |
| `--transition-base` | `250ms ease` | Component transitions |

### Reusable Component Classes (in `global.css`)

| Class | Description |
|---|---|
| `.btn-primary` | Accent background, white text, hover glow + lift |
| `.btn-ghost` | Transparent, accent border, hover fill |
| `.tag` | Small pill (accent glow bg, accent-bright text) |
| `.tag-backend` | Orange category tag |
| `.tag-frontend` | Blue category tag |
| `.tag-tools` | Purple category tag |
| `.tag-android` | Green category tag |
| `.tag-startup` | Pink category tag |
| `.tag-life` | Cyan category tag |
| `.card` | Elevated bg, subtle border, hover lift + glow |
| `.gradient-text` | Accent → purple → blue gradient on text |
| `.glow-accent` | Box-shadow glow in accent color |
| `.hero-gradient` | Animated mesh gradient background (20s loop) |

---

## Development Patterns

### Content Collection Schema

Defined in `src/content/config.ts` using Zod:

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['Backend', 'Frontend', 'Tools', 'Android', 'Startup', 'Life']),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    readingTime: z.string().optional(),
  }),
});
```

**Valid categories:** `Backend`, `Frontend`, `Tools`, `Android`, `Startup`, `Life`

### How to Create a New Blog Post

1. Create an MDX file at `src/content/blog/<slug>.mdx`
2. Add frontmatter matching the schema:

```mdx
---
title: "Your Post Title"
description: "A brief summary for SEO and previews."
date: "2026-03-07"
category: "Backend"
tags: ["django", "python", "api"]
draft: false
---

# Your Post Title

Content goes here. Supports:
- Code blocks with syntax highlighting (via rehype-pretty-code, theme: one-dark-pro)
- Mermaid diagrams in ```mermaid fenced blocks
- All standard MDX features
```

3. The slug is derived from the filename (e.g., `django-cors-fix.mdx` → `/blog/django-cors-fix`)

### How to Create a New Component

Components go in `src/components/`. Use `.astro` for server-rendered, `.tsx` for client-interactive.

```astro
---
// src/components/PostCard.astro
interface Props {
  title: string;
  description: string;
  date: Date;
  category: string;
  tags: string[];
  slug: string;
}

const { title, description, date, category, tags, slug } = Astro.props;
---

<a href={`/blog/${slug}/`} class="card block">
  <span class={`tag tag-${category.toLowerCase()}`}>{category}</span>
  <h3 class="font-display text-xl">{title}</h3>
  <p class="text-text-secondary">{description}</p>
</a>
```

### How to Create a New Page

Pages go in `src/pages/`. File-based routing:
- `src/pages/index.astro` → `/`
- `src/pages/blog/index.astro` → `/blog`
- `src/pages/blog/[slug].astro` → `/blog/<slug>` (dynamic)

```astro
---
// src/pages/about.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About — Nishanth M" description="About the author.">
  <section class="max-w-content mx-auto py-section">
    <h1 class="font-display text-4xl gradient-text">About Me</h1>
  </section>
</BaseLayout>
```

### How to Query Blog Posts

```typescript
import { getCollection } from 'astro:content';

// All published posts, sorted newest first
const posts = await getCollection('blog', ({ data }) => !data.draft);
const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

// Posts by category
const backendPosts = sorted.filter(p => p.data.category === 'Backend');

// Posts by tag
const djangoPosts = sorted.filter(p => p.data.tags.includes('django'));
```

### Utility Functions (`src/lib/utils.ts`)

```typescript
getReadingTime(content: string): string  // → "5 min read"
formatDate(date: Date): string           // → "March 7, 2026"
slugify(text: string): string            // → "my-post-title"
```

### Astro Config (`astro.config.mjs`)

- **Site URL:** `https://blogs.nishanthm.com/`
- **MDX:** `syntaxHighlight: false` (delegated to rehype-pretty-code)
- **Code theme:** `one-dark-pro` (via rehype-pretty-code)
- **Mermaid:** enabled via rehype-mermaid
- **Sitemap:** auto-generated
- **Tailwind:** integrated via `@astrojs/tailwind`

### Environment Variables (`.env.example`)

```
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_GISCUS_REPO=username/repo
PUBLIC_GISCUS_REPO_ID=
PUBLIC_GISCUS_CATEGORY=
PUBLIC_GISCUS_CATEGORY_ID=
```

---

## Roadmap

### ✅ Completed (Closed Issues)

| # | Title | Labels |
|---|---|---|
| 1 | Project Setup: Scaffold Astro + Tailwind + MDX + Integrations | `setup`, `foundation` |
| 2 | Content Schema: Blog Post Collection + Sample Posts | `foundation`, `content` |
| 3 | Design System: Colors, Typography, Dark Theme, CSS Variables + Tailwind Config | `foundation`, `ui`, `design-system` |

### 🔨 Open Issues — Build Order

Issues should be tackled roughly in this order (dependencies flow top-down):

| Priority | # | Title | Labels | Depends On |
|---|---|---|---|---|
| **P0 — Next** | 4 | Layout: Header, Footer, BaseLayout, Mobile Nav | `ui`, `components`, `layout` | #3 ✅ |
| **P0 — Next** | 5 | Homepage: Hero, Featured Posts, Categories Teaser | `ui`, `components`, `page` | #4 |
| **P1** | 7 | Blog Post Page: Full Article Layout, ToC, Code Highlighting, Mermaid, Giscus | `content`, `ui`, `components`, `page` | #4 |
| **P1** | 6 | Blog Listing Page: All Posts, Category Filter, Search, Grid/List Toggle | `ui`, `page`, `filtering` | #5, #7 (PostCard) |
| **P2** | 8 | Tag & Category Pages: Dynamic Routes `/tags/[tag]` and `/categories/[category]` | `ui`, `page`, `filtering`, `seo` | #6 |
| **P2** | 10 | SEO: Meta Tags, Open Graph, Sitemap, RSS, JSON-LD | `seo`, `performance` | #4 (BaseLayout) |
| **P3** | 9 | Stats Page: Publishing Heatmap, Writing Streak, Analytics Dashboard | `ui`, `page`, `stats` | #6 |
| **P3** | 11 | Deployment: Vercel, Custom Domain, Giscus Config, Google Search Console | `seo`, `deployment` | #10 |
| **P4** | 15 | Tooling: GitHub App for Claude AI Code Reviews | `setup`, `tooling` | None (independent) |

### Key Dependencies

```
#3 Design System ✅
 └→ #4 Layout (Header, Footer, BaseLayout)
     ├→ #5 Homepage (Hero, Featured Posts)
     │   └→ #6 Blog Listing (uses PostCard from #5)
     │       └→ #8 Tag & Category Pages
     │       └→ #9 Stats Page
     ├→ #7 Blog Post Page (article layout)
     └→ #10 SEO (needs BaseLayout for <head> tags)
          └→ #11 Deployment
```

---

## Troubleshooting

### Common Errors

| Error | Cause | Fix |
|---|---|---|
| `Cannot find module 'astro:content'` | TypeScript doesn't see generated types | Run `npm run dev` once to generate `.astro/types.d.ts` |
| Font not loading (FOUT) | Missing fontsource import in `global.css` | Add correct `@import "@fontsource/<font>/<weight>.css"` |
| Tailwind classes not applying | File not in `content` array | Ensure `tailwind.config.mjs` content includes `./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}` |
| Code blocks not highlighted | `syntaxHighlight` conflict | `astro.config.mjs` sets `syntaxHighlight: false` in MDX config — rehype-pretty-code handles it |
| Draft posts visible | Missing filter in query | Always filter with `({ data }) => !data.draft` |
| Category not recognized | Invalid enum value | Must match exactly: `Backend`, `Frontend`, `Tools`, `Android`, `Startup`, `Life` |
| Build error with Mermaid | Puppeteer/Chromium issue | `rehype-mermaid` may need `playwright` or a headless browser installed |

### Performance Checklist

- [ ] All images use `<Image />` from `astro:assets` or `sharp` for optimization
- [ ] Fonts imported via fontsource (no layout shift vs Google Fonts CDN)
- [ ] Code splitting: JavaScript only where needed (Astro islands)
- [ ] Lighthouse targets: Performance 90+, SEO 100, Accessibility 90+

### Pre-Merge Verification

Before merging any PR:
1. `npm run build` completes without errors
2. `npm run preview` — manually check affected pages
3. Mobile responsive check (375px, 768px, 1280px)
4. No horizontal scroll on any viewport
5. Dark theme consistency (no white flashes)

---

## Quick Reference

### Key Files

| Purpose | Path |
|---|---|
| Astro config | `astro.config.mjs` |
| Tailwind config | `tailwind.config.mjs` |
| TypeScript config | `tsconfig.json` |
| Design system (CSS) | `src/styles/global.css` |
| Content schema | `src/content/config.ts` |
| Utilities | `src/lib/utils.ts` |
| Homepage | `src/pages/index.astro` |
| Blog posts | `src/content/blog/*.mdx` |
| Environment vars | `.env.example` |
| GitHub workflow rules | `.agents/rules/learning-first-code-generation-rule.md` |

### Coding Conventions

- **Astro components:** PascalCase filenames (e.g., `PostCard.astro`, `BaseLayout.astro`)
- **Pages:** lowercase (`index.astro`, `[slug].astro`)
- **Blog slugs:** kebab-case (`django-cors-fix.mdx`)
- **CSS approach:** CSS custom properties for design tokens, Tailwind utility classes for layout, component classes in `@layer components` of `global.css`
- **TypeScript:** strict mode, `interface Props` in component frontmatter
- **Fonts:** Space Grotesk (display), Lora (body), JetBrains Mono (code)

### Git Workflow (from user rules)

- **NO direct commits to `main`** — all changes go through PRs
- Branch naming: `feature/<issue_no>-snake_case_title`
- PR must reference issue: `Closes #<number>`
- Always **Squash and Merge**
- Delete branch after merge
- Conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

### Links

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Typography](https://tailwindcss.com/docs/typography-plugin)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [rehype-pretty-code](https://rehype-pretty.pages.dev/)
- [Giscus](https://giscus.app/)
