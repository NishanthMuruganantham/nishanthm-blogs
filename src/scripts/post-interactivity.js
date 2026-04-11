async function initPostInteractivity() {
    // 1. Copy Buttons and Line Numbers
    const codeBlocks = document.querySelectorAll('pre');
    // ... (rest of the copy button logic remains the same, I'll just keep it structured)
    codeBlocks.forEach(pre => {
        if (pre.querySelector('.copy-btn')) return;
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;
        copyBtn.ariaLabel = 'Copy code';
        copyBtn.title = 'Copy code';
        pre.appendChild(copyBtn);

        copyBtn.addEventListener('click', async () => {
            const code = pre.querySelector('code');
            if (!code) return;
            const textToCopy = code.innerText;
            try {
                await navigator.clipboard.writeText(textToCopy);
                copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                setTimeout(() => {
                    copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });

        const lines = pre.querySelectorAll('[data-line]');
        if (lines.length > 5) pre.classList.add('show-line-numbers');
    });

    // 2. ToC Observer (Reading progress is handled by ProgressBar.astro)
    const headings = Array.from(document.querySelectorAll(".prose h2, .prose h3"));
    const tocLinks = document.querySelectorAll("#toc a");
    if (headings.length > 0 && tocLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    tocLinks.forEach(link => link.classList.remove("active"));
                    const activeLink = document.querySelector(`#toc a[data-slug="${entry.target.getAttribute("id")}"]`);
                    if (activeLink) activeLink.classList.add("active");
                }
            });
        }, { rootMargin: "0px 0px -60% 0px" });
        headings.forEach(h => observer.observe(h));
    }

    // 4. Mermaid Rendering
    const mermaidBlocks = document.querySelectorAll('[data-language="mermaid"]');
    if (mermaidBlocks.length > 0) {
        if (window.__mermaid_initialized) return; // Idempotent guard
        window.__mermaid_initialized = true;

        try {
            const { default: mermaid } = await import('mermaid');

            // Resolve CSS variables (including nested var() chains) into computed RGB values.
            const resolveColor = (value, fallback = '#7c6af7') => {
                if (!value) return fallback;

                const trimmed = value.trim();
                const varMatch = trimmed.match(/^var\((--[^,\s)]+)\)/);
                if (varMatch) {
                    const resolved = getComputedStyle(document.documentElement)
                        .getPropertyValue(varMatch[1])
                        .trim();
                    if (resolved && resolved !== trimmed) {
                        return resolveColor(resolved, fallback);
                    }
                }

                const probe = document.createElement('span');
                probe.style.color = trimmed;
                probe.style.display = 'none';
                document.body.appendChild(probe);
                const computed = getComputedStyle(probe).color;
                document.body.removeChild(probe);

                if (computed && computed !== 'rgba(0, 0, 0, 0)' && computed !== 'transparent') {
                    return computed;
                }

                return fallback;
            };

            const accent = resolveColor('var(--color-accent)');
            const textPrimary = resolveColor('var(--color-text-primary)', '#e8e8f0');
            const textSecondary = resolveColor('var(--color-text-secondary)', '#9ca3af');
            const surface = resolveColor('var(--color-bg-card)', '#13131a');
            const base = resolveColor('var(--color-bg)', '#09090e');
            const border = resolveColor('var(--color-border)', '#1e1e2e');

            mermaid.initialize({
                startOnLoad: false,
                theme: 'base',
                securityLevel: 'loose',
                fontFamily: 'Space Grotesk, sans-serif',
                themeVariables: {
                    background: base,
                    primaryColor: surface,
                    primaryTextColor: textPrimary,
                    primaryBorderColor: border,
                    lineColor: accent,
                    secondaryColor: resolveColor('var(--color-bg-elevated)', surface),
                    tertiaryColor: base,
                    nodeBkg: surface,
                    nodeBorder: accent,
                    clusterBkg: surface,
                    clusterBorder: border,
                    textColor: textPrimary,
                    mainBkg: base,
                    fontFamily: 'Space Grotesk, sans-serif',
                    edgeLabelBackground: resolveColor('var(--color-bg-elevated)', surface),
                    actorBorder: border,
                    actorBkg: surface,
                    actorTextColor: textPrimary,
                    noteBkgColor: resolveColor('var(--color-bg-card)', surface),
                    noteTextColor: textSecondary,
                },
            });

            for (const [index, block] of Array.from(mermaidBlocks).entries()) {
                const codeElement = block.tagName === 'CODE' ? block : block.querySelector('code');
                if (!codeElement) continue;

                const preElement = codeElement.closest('pre');
                if (!preElement) continue;

                // Unique ID based on code content hash to be safe, or just index if unique
                const diagramId = `mermaid-render-${index}`;
                if (document.getElementById(diagramId)) continue; 

                const code = codeElement.innerText.trim();
                const figure = preElement.closest('figure');

                const container = document.createElement('div');
                container.className = 'mermaid-rendered';
                container.id = diagramId;

                if (figure) {
                    figure.parentNode.insertBefore(container, figure);
                    figure.style.display = 'none';
                } else {
                    preElement.parentNode.insertBefore(container, preElement);
                    preElement.style.display = 'none';
                }

                try {
                    const { svg } = await mermaid.render(`mermaid-svg-${index}`, code);
                    container.innerHTML = svg;
                } catch (renderErr) {
                    console.error(`Failed to render diagram ${index}:`, renderErr);
                    if (figure) figure.style.display = 'block';
                    else preElement.style.display = 'block';
                }
            }
        } catch (importErr) {
            console.error('Failed to load mermaid library:', importErr);
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPostInteractivity);
} else {
    initPostInteractivity();
}
