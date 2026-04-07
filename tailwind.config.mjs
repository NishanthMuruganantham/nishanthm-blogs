/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                bg: {
                    DEFAULT: 'var(--color-bg)',
                    elevated: 'var(--color-bg-elevated)',
                    card: 'var(--color-bg-card)',
                },
                border: {
                    DEFAULT: 'var(--color-border)',
                    subtle: 'var(--color-border-subtle)',
                },
                text: {
                    primary: 'var(--color-text-primary)',
                    secondary: 'var(--color-text-secondary)',
                    muted: 'var(--color-text-muted)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    bright: 'var(--color-accent-bright)',
                    glow: 'var(--color-accent-glow)',
                },
                success: 'var(--color-success)',
                warning: 'var(--color-warning)',
                error: 'var(--color-error)',
                // Category colors
                backend: 'var(--color-backend)',
                frontend: 'var(--color-frontend)',
                tools: 'var(--color-tools)',
                android: 'var(--color-android)',
                startup: 'var(--color-startup)',
                life: 'var(--color-life)',
            },
            fontFamily: {
                display: ['Space Grotesk', 'sans-serif'],
                body: ['Lora', 'Georgia', 'serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            spacing: {
                section: 'clamp(4rem, 8vw, 8rem)',
            },
            maxWidth: {
                content: '720px',
                wide: '1100px',
            },
            transitionDuration: {
                fast: '150ms',
                base: '250ms',
            },
            typography: {
                DEFAULT: {
                    css: {
                        '--tw-prose-body': 'var(--color-text-primary)',
                        '--tw-prose-headings': 'var(--color-text-primary)',
                        '--tw-prose-lead': 'var(--color-text-secondary)',
                        '--tw-prose-links': 'var(--color-accent-bright)',
                        '--tw-prose-bold': 'var(--color-text-primary)',
                        '--tw-prose-counters': 'var(--color-text-secondary)',
                        '--tw-prose-bullets': 'var(--color-text-muted)',
                        '--tw-prose-hr': 'var(--color-border)',
                        '--tw-prose-quotes': 'var(--color-text-secondary)',
                        '--tw-prose-quote-borders': 'var(--color-accent)',
                        '--tw-prose-captions': 'var(--color-text-muted)',
                        '--tw-prose-code': 'var(--color-accent-bright)',
                        '--tw-prose-pre-code': 'var(--color-text-primary)',
                        '--tw-prose-pre-bg': 'var(--color-bg-elevated)',
                        '--tw-prose-th-borders': 'var(--color-border)',
                        '--tw-prose-td-borders': 'var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                        fontSize: '1.125rem',
                        lineHeight: '1.8',
                        fontFamily: "'Lora', Georgia, serif",
                        h1: {
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: '700',
                            lineHeight: '1.2',
                        },
                        h2: {
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: '700',
                            lineHeight: '1.25',
                        },
                        h3: {
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: '700',
                            lineHeight: '1.3',
                        },
                        h4: {
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: '700',
                        },
                        a: {
                            color: 'var(--color-accent-bright)',
                            textDecoration: 'none',
                            '&:hover': {
                                color: 'var(--color-accent)',
                            },
                        },
                        blockquote: {
                            borderLeftColor: 'var(--color-accent)',
                            fontStyle: 'italic',
                            color: 'var(--color-text-secondary)',
                        },
                        code: {
                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            color: 'var(--color-accent-bright)',
                            backgroundColor: 'var(--color-accent-glow)',
                            borderRadius: '0.25rem',
                            padding: '0.15rem 0.35rem',
                            fontWeight: '400',
                        },
                        'code::before': { content: 'none' },
                        'code::after': { content: 'none' },
                        pre: {
                            backgroundColor: 'var(--color-bg-elevated)',
                            borderRadius: '0.75rem',
                            border: '1px solid var(--color-border)',
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                            padding: '0',
                            color: 'var(--color-text-primary)',
                        },
                        strong: {
                            color: 'var(--color-text-primary)',
                        },
                        hr: {
                            borderColor: 'var(--color-border)',
                        },
                        img: {
                            borderRadius: '0.75rem',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
