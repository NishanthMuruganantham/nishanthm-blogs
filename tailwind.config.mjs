/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                bg: {
                    DEFAULT: '#09090e',
                    elevated: '#111118',
                    card: '#13131a',
                },
                border: {
                    DEFAULT: '#1e1e2e',
                    subtle: '#161622',
                },
                text: {
                    primary: '#e8e8f0',
                    secondary: '#8888a8',
                    muted: '#55556a',
                },
                accent: {
                    DEFAULT: '#7c6af7',
                    bright: '#a89bff',
                    glow: 'rgba(124, 106, 247, 0.15)',
                },
                success: '#4ade80',
                warning: '#fbbf24',
                error: '#f87171',
                // Category colors
                backend: '#f97316',
                frontend: '#3b82f6',
                tools: '#a855f7',
                android: '#22c55e',
                startup: '#ec4899',
                life: '#06b6d4',
                mcp: '#10b981',
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
                        '--tw-prose-body': '#e8e8f0',
                        '--tw-prose-headings': '#e8e8f0',
                        '--tw-prose-lead': '#8888a8',
                        '--tw-prose-links': '#a89bff',
                        '--tw-prose-bold': '#e8e8f0',
                        '--tw-prose-counters': '#8888a8',
                        '--tw-prose-bullets': '#55556a',
                        '--tw-prose-hr': '#1e1e2e',
                        '--tw-prose-quotes': '#8888a8',
                        '--tw-prose-quote-borders': '#7c6af7',
                        '--tw-prose-captions': '#55556a',
                        '--tw-prose-code': '#a89bff',
                        '--tw-prose-pre-code': '#e8e8f0',
                        '--tw-prose-pre-bg': '#111118',
                        '--tw-prose-th-borders': '#1e1e2e',
                        '--tw-prose-td-borders': '#161622',
                        color: '#e8e8f0',
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
                            color: '#a89bff',
                            textDecoration: 'none',
                            '&:hover': {
                                color: '#7c6af7',
                            },
                        },
                        blockquote: {
                            borderLeftColor: '#7c6af7',
                            fontStyle: 'italic',
                            color: '#8888a8',
                        },
                        code: {
                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                            color: '#a89bff',
                            backgroundColor: 'rgba(124, 106, 247, 0.1)',
                            borderRadius: '0.25rem',
                            padding: '0.15rem 0.35rem',
                            fontWeight: '400',
                        },
                        'code::before': { content: 'none' },
                        'code::after': { content: 'none' },
                        pre: {
                            backgroundColor: '#111118',
                            borderRadius: '0.75rem',
                            border: '1px solid #1e1e2e',
                        },
                        'pre code': {
                            backgroundColor: 'transparent',
                            padding: '0',
                            color: '#e8e8f0',
                        },
                        strong: {
                            color: '#e8e8f0',
                        },
                        hr: {
                            borderColor: '#1e1e2e',
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
