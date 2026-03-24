// Global site constants, useful for SEO and general metadata

export const SITE_TITLE = 'Nishanth Muruganantham';
export const SITE_DESCRIPTION = 'Personal blog and portfolio of Nishanth Muruganantham';
export const SITE_AUTHOR = '@nishanthm';
export const SITE_AUTHOR_FULL = 'Nishanth Muruganantham';

export const CATEGORIES = {
  Backend:  { description: 'APIs, databases, and server-side architecture', icon: '⚙️', color: 'backend' },
  Frontend: { description: 'UI, React, Astro, and browser technologies', icon: '🎨', color: 'frontend' },
  Tools:    { description: 'Developer tools, productivity, and workflows', icon: '🛠️', color: 'tools' },
  Android:  { description: 'Android development, Kotlin, and mobile apps', icon: '📱', color: 'android' },
  Startup:  { description: 'Building products, startups, and entrepreneurship', icon: '🚀', color: 'startup' },
  Life:     { description: 'Personal growth, reflections, and life lessons', icon: '✨', color: 'life' },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
