/**
 * sidebar-nav.js
 * Handles sidebar interactions on post pages by redirecting to the main blog page 
 * with the appropriate filter parameters.
 */

function initSidebarNav() {
    const sidebar = document.querySelector('[data-sidebar-nav]');
    // If we're inside a <blog-filter> component, let that handle the logic
    const isFilterMode = !!sidebar?.closest('blog-filter');
    
    if (!sidebar || isFilterMode) return;

    const searchInput = sidebar.querySelector('#search-input');
    const categoryBtns = sidebar.querySelectorAll('.category-item');
    const tagBtns = sidebar.querySelectorAll('button.tag[data-tag]');

    // Search Redirection
    searchInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.trim();
            if (query) {
                window.location.href = `/blog?q=${encodeURIComponent(query)}`;
            }
        }
    });

    // Category Redirection
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            if (category === 'all') {
                window.location.href = '/blog';
            } else {
                window.location.href = `/blog?category=${encodeURIComponent(category)}`;
            }
        });
    });

    // Tag Redirection
    tagBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tag = e.currentTarget.dataset.tag;
            window.location.href = `/blog?q=${encodeURIComponent(tag)}`;
        });
    });
}

// Initial run
initSidebarNav();

// Listen for Astro page loads (View Transitions)
document.addEventListener('astro:page-load', initSidebarNav);
