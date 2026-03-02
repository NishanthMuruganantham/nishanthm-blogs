/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                bg: '#0a0a0f',
                accent: '#06b6d4', // vibrant cyan
            },
            fontFamily: {
                display: ['Cabinet Grotesk', 'Clash Display', 'sans-serif'],
                body: ['Lora', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
