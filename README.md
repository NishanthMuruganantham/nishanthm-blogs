# Nishanth M — Dev Blog

Building real systems. Documenting the journey. A high-performance, SEO-optimized blog built with **Astro**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Features

-   **Fast by Default**: Built with Astro for minimal client-side JS.
-   **SEO Optimized**: Dynamic meta tags, Open Graph images, JSON-LD structured data, and automated sitemap.
-   **RSS Feed**: Full-content RSS feed for subscription.
-   **Comments**: Integrated with **Giscus** (GitHub Discussions).
-   **Analytics**: Built-in reading time and post statistics.
-   **Design**: Clean, dark-themed aesthetic using Space Grotesk and Lora typography.

## 🧞 Local Development

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 🌍 Production Deployment

### Vercel Setup

1.  Push your code to GitHub.
2.  Connect your repository to **Vercel**.
3.  Add the following **Environment Variables**:

| Variable                      | Description                                |
| :---------------------------- | :----------------------------------------- |
| `PUBLIC_SITE_URL`             | Your production domain (e.g., `https://...`) |
| `PUBLIC_GISCUS_REPO`          | Your GitHub repo (e.g., `user/repo`)       |
| `PUBLIC_GISCUS_REPO_ID`       | Giscus Repo ID (get from giscus.app)       |
| `PUBLIC_GISCUS_CATEGORY`      | Giscus Category (e.g., `Announcements`)    |
| `PUBLIC_GISCUS_CATEGORY_ID`   | Giscus Category ID (get from giscus.app)   |

> [!NOTE]
> Giscus requires your repository to be **Public** and have **Discussions** enabled to function correctly.

## 👀 Learn More

-   [Astro Documentation](https://docs.astro.build)
-   [Giscus Documentation](https://giscus.app)
