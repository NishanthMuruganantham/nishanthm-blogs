document.addEventListener('DOMContentLoaded', () => {
    // 1. Array of Code Blocks
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(pre => {
        // Copy Button Injection
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
                copyBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;

                setTimeout(() => {
                    copyBtn.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    `;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });

        // Line Number Conditional Logic
        const lines = pre.querySelectorAll('[data-line]');
        if (lines.length > 5) {
            pre.classList.add('show-line-numbers');
        }
    });

    // 2. Reading Progress functionality
    const progressBar = document.getElementById("reading-progress");
    let ticking = false;

    const updateProgress = () => {
        const totalHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        if (totalHeight > 0 && progressBar) {
            const progress = Math.min(100, (window.scrollY / totalHeight) * 100);
            const rounded = Math.round(progress);

            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute("aria-valuenow", String(rounded));

            // Color milestones: purple (<25), blue (<75), green (>=75)
            if (progress < 25) {
                progressBar.style.background = '#7c6af7';
            } else if (progress < 75) {
                progressBar.style.background = '#3b82f6';
            } else {
                progressBar.style.background = '#22c55e';
            }
        }
        ticking = false;
    };

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });
    updateProgress(); // init

    // 3. ToC Intersection Observer highlights
    const headings = Array.from(
        document.querySelectorAll(".prose h2, .prose h3")
    );
    const tocLinks = document.querySelectorAll("#toc a");

    if (headings.length > 0 && tocLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -60% 0px", // Fixed Issue 5: Tweak rootMargin
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Remove active from all
                    tocLinks.forEach((link) => {
                        link.classList.remove("text-accent", "font-medium");
                        link.classList.add("text-text-secondary");
                    });

                    // Add active to current
                    const id = entry.target.getAttribute("id");
                    const activeLink = document.querySelector(
                        `#toc a[data-slug="${id}"]`
                    );
                    if (activeLink) {
                        activeLink.classList.remove("text-text-secondary");
                        activeLink.classList.add("text-accent", "font-medium");
                    }
                }
            });
        }, observerOptions);

        headings.forEach((h) => observer.observe(h));
    }
});

import mermaid from 'mermaid';
mermaid.initialize({ startOnLoad: false, theme: 'dark' });

document.addEventListener('DOMContentLoaded', async () => {
    const mermaidBlocks = document.querySelectorAll('pre[data-language="mermaid"]');

    if (mermaidBlocks.length === 0) return;

    mermaidBlocks.forEach(async (pre, index) => {
        const codeElement = pre.querySelector('code');
        if (!codeElement) return;

        const code = codeElement.textContent;
        const figure = pre.closest('figure');

        const div = document.createElement('div');
        div.className = 'mermaid-rendered';
        div.style.display = 'flex';
        div.style.justifyContent = 'center';
        div.style.margin = '3rem 0';
        div.id = `mermaid-${index}`;

        if (figure) {
            figure.parentNode.insertBefore(div, figure);
            figure.style.display = 'none';
        } else {
            pre.parentNode.insertBefore(div, pre);
            pre.style.display = 'none';
        }

        try {
            const { svg } = await mermaid.render(`mermaid-svg-${index}`, code);
            div.innerHTML = svg;
        } catch (err) {
            console.error('Failed to render Mermaid diagram', err);
        }
    });
});
