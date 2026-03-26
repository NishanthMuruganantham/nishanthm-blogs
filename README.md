# nishanthm-blogs

A technical blog documenting my journey building products with Python, Django, React, and Android. Real problems. Real solutions. Real learnings.

**Live site:** [blogs.nishanthm.com](https://blogs.nishanthm.com)

---

## What's Here

I write about:

- **Backend challenges** with Django, Python, Pandas (production issues, optimization, architecture)
- **Frontend experiments** building with React + Vite (learning in public with vibe coding + AI)
- **Android development** (shipping real apps while learning)
- **Gen AI and agentic systems** (experiments, configs, how I'm using them)
- **Dev tools and automation** (N8N workflows, setups, configurations)
- **Tech stories** (how things work, why I chose them, lessons learned)
- **General engineering thoughts** (patterns that matter, mistakes I made, what I'd do differently)

Not tutorials. Not abstract theory. Just real engineering work documented.

---

## The Stack

| Area | Tech |
|---|---|
| **Backend** | Python, Django, Pandas, PostgreSQL |
| **Frontend** | React (Vite) — using vibe coding with AI |
| **Mobile** | Android (learning in public) |
| **Exploring** | Gen AI, agentic AI, N8N |

---

## How It Works

**Tech stack for this blog:**

| Layer | Tech | Why |
|---|---|---|
| Framework | Astro | Static HTML. Fast. SEO-friendly. No JS bloat. |
| Styling | Tailwind CSS | Utility-first. Quick to iterate. |
| Content | MDX | Markdown + React components when needed. |
| Code highlighting | rehype-pretty-code | Real syntax highlighting. |
| Diagrams | Mermaid | Flowcharts and system diagrams inline. |
| Comments | Giscus | Uses GitHub Discussions. No database. |
| Stats | Cal-Heatmap | Publishing activity visualization. |
| Hosting | Vercel | Push to GitHub, auto-deploys. |

**The look:**

Dark theme optimized for reading long-form content.

Colors:
- Background: `#09090e`
- Accent: `#7c6af7`
- Backend: orange `#f97316`
- Frontend: blue `#3b82f6`
- Tools & DevOps: purple `#a855f7`
- Android: green `#22c55e`
- AI & Exploration: pink `#ec4899`

Fonts: Space Grotesk (headings) + Lora (body) + JetBrains Mono (code)

---

## Running It Locally

### Prerequisites
- Node.js 18.14.0+
- npm

### Setup

```bash
git clone https://github.com/NishanthMuruganantham/nishanthm-blogs.git
cd nishanthm-blogs
npm install
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

Open http://localhost:3000. Hot-reloads on every file change.

### Build

```bash
npm run build
```

Creates static HTML/CSS/JS in `dist/` folder.

### Deploy

Push to `main` branch → Vercel auto-builds and deploys.

```bash
git add .
git commit -m "Your message"
git push origin main
```

---

## Writing a Post

Each post lives in `src/content/blog/` as an MDX file.

**Frontmatter:**

```yaml
---
title: "Post Title"
description: "One sentence summary for search engines"
date: 2024-03-20
category: Backend | Frontend | Tools & DevOps | Android | AI & Exploration
tags: [relevant, keywords]
draft: false
---
```

**Then write your post in Markdown.** Include code blocks, diagrams, whatever you need.

```bash
# Create a new post
touch src/content/blog/your-post-title.mdx

# Write your content, then commit and push
git add src/content/blog/your-post-title.mdx
git commit -m "docs: new post about [topic]"
git push origin main
```

Done. Vercel deploys it automatically.

**Optional:** Cross-post to Dev.to or Medium with canonical URL pointing back here.

---

## Site Structure

| Route | What's There |
|---|---|
| `/` | Homepage with featured posts and category showcase |
| `/blog` | All posts, searchable and filterable |
| `/blog/[slug]` | Individual post with table of contents, comments, code highlighting |
| `/categories` | All 5 categories |
| `/categories/[category]` | Posts filtered by category |
| `/tags` | Tag cloud |
| `/tags/[tag]` | Posts filtered by tag |
| `/stats` | Publishing heatmap and activity stats |
| `/about` | Bio and links |

---

## Why I Maintain This

For me:
- Writing clarifies thinking. Forces me to understand problems deeply.
- Searchable reference. Future-me can find solutions I've already solved.
- Credibility. My domain gets SEO credit for real problems I solve.

For others:
- Real solutions to real problems.
- Context about why it matters.
- Learning from shipping, not just reading theory.

---

## Current Work

Check [GitHub issues](https://github.com/NishanthMuruganantham/nishanthm-blogs/issues) for what I'm building:

- Foundation setup
- Homepage and post listing
- Post detail page with MDX rendering
- Category and tag filtering
- Comments (Giscus)
- Publishing heatmap
- About page and RSS feed

---

## Development Approach

I use Claude + Antigravity IDE for code generation. But I always understand what I'm merging. AI makes mistakes. So:

- Read generated code before committing
- Test it locally
- Only merge what I fully understand
- Write clear commit messages

This keeps velocity high without sacrificing quality.

Code standards: No hacks. Production-grade from day one. Performance matters.

---

## Found a Bug? Have an Idea?

- **Bug:** [Open an issue](https://github.com/NishanthMuruganantham/nishanthm-blogs/issues/new)
- **Idea:** [Start a discussion](https://github.com/NishanthMuruganantham/nishanthm-blogs/discussions)
- **Want to help:** Fork the repo, make changes, send a PR

---

## License

MIT License. See [LICENSE](LICENSE).

Blog content (posts in `src/content/blog/`) is copyright Nishanth M. Ask before republishing.

---

## Links

- Website: [blogs.nishanthm.com](https://blogs.nishanthm.com)
- GitHub: [@NishanthMuruganantham](https://github.com/NishanthMuruganantham)
- Portfolio: [https://portfolio.nishanthm.com](https://nishanthm.com)
- Email: nishanthmurugananth10@gmail.com


---

**Status:** Active development
