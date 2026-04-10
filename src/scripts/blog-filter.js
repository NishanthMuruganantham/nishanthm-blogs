class BlogFilter extends HTMLElement {
    constructor() {
        super();
        // Default State
        this.posts = [];
        this.activeCategory = 'all';
        this.searchQuery = '';
        this.sortBy = 'latest';
    }

    connectedCallback() {
        // DOM queries must happen in connectedCallback, not constructor
        this.container = this.querySelector('#posts-container');
        this.searchInput = this.querySelector('#search-input');
        this.categoryBtns = this.querySelectorAll('.category-item');
        this.tagBtns = this.querySelectorAll('button.tag[data-tag]');
        this.sortSelect = this.querySelector('[data-sort]');
        this.emptyState = this.querySelector('#empty-state');
        this.countDisplay = this.querySelector('#result-count');

        // 1. Read the initial JSON payload parsed by Astro
        const dataScript = document.getElementById('post-data');
        if (dataScript) {
            try {
                this.posts = JSON.parse(dataScript.textContent);
            } catch (e) {
                console.error('Failed to parse blog post data:', e);
            }
        }

        // 2. Bind all event listeners
        this.bindEvents();

        // 3. Optional: Read initial state from URL query params
        this.syncFromURL();

        // 4. Run first render to match JS state
        this.filterAndRender();
    }

    bindEvents() {
        // Search input
        this.searchInput?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase().trim();
            this.updateURL();
            this.filterAndRender();
        });

        // Category buttons
        this.categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;

                this.activeCategory = category;

                // Visual Update
                this.categoryBtns.forEach(b => {
                    b.classList.toggle('active', b.dataset.category === category);
                });

                this.updateURL();
                this.filterAndRender();
            });
        });

        // Popular Tags
        this.tagBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tag = e.currentTarget.dataset.tag;
                if (this.searchInput) {
                    this.searchInput.value = tag;
                    this.searchQuery = tag;
                    this.updateURL();
                    this.filterAndRender();
                }
            });
        });

        // Sort Select
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.filterAndRender();
            });
        }

        // Hook up reset button inside empty state
        const resetBtn = this.querySelector('#reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (this.searchInput) this.searchInput.value = '';
                this.searchQuery = '';

                const allBtn = Array.from(this.categoryBtns).find(b => b.dataset.category === 'all');
                if (allBtn) allBtn.click(); // Triggers the render & active class naturally
            });
        }
    }

    syncFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get('q');
        const cat = urlParams.get('category');

        if (q && this.searchInput) {
            this.searchQuery = q.toLowerCase();
            this.searchInput.value = this.searchQuery;
        }

        if (cat) {
            const targetBtn = Array.from(this.categoryBtns).find(b => b.dataset.category === cat);
            if (targetBtn) {
                // Set state and visual only
                this.activeCategory = cat;
                this.categoryBtns.forEach(b => {
                    b.classList.toggle('active', b.dataset.category === cat);
                });
            }
        }
    }

    updateURL() {
        const url = new URL(window.location);

        if (this.searchQuery) url.searchParams.set('q', this.searchQuery);
        else url.searchParams.delete('q');

        if (this.activeCategory !== 'all') url.searchParams.set('category', this.activeCategory);
        else url.searchParams.delete('category');

        window.history.replaceState({}, '', url);
    }

    filterAndRender() {
        // 1. Filter the dataset based on state
        let filtered = this.posts.filter((post) => {
            const matchCategory = this.activeCategory === 'all' || post.category.toLowerCase() === this.activeCategory;
            const matchSearch = !this.searchQuery ||
                post.title.toLowerCase().includes(this.searchQuery) ||
                post.description.toLowerCase().includes(this.searchQuery) ||
                post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery));
            return matchCategory && matchSearch;
        });

        // 2. Sort the dataset
        if (this.sortBy === 'latest') {
            filtered.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
        }

        // 3. Update Result Count text
        if (this.countDisplay) {
            this.countDisplay.textContent = `Showing ${filtered.length} post${filtered.length === 1 ? '' : 's'}`;
        }

        // 4. Handle Empty State
        if (filtered.length === 0) {
            this.container.innerHTML = '';
            this.emptyState.classList.remove('hidden');
            this.emptyState.classList.add('flex');
            return;
        }

        this.emptyState.classList.add('hidden');
        this.emptyState.classList.remove('flex');

        // 5. Generate and inject new HTML
        this.container.innerHTML = filtered.map(post => this.generateCardHTML(post)).join('');
    }

    generateCardHTML(post) {
        const coverHTML = post.cover ? `
          <img src="${post.cover}" alt="${post.title}" loading="lazy" decoding="async" />
        ` : `<div class="image-fallback"></div>`;

        const tagsHTML = post.tags && post.tags.length > 0 ? `
          <div class="card-tags">
            ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
          </div>
        ` : '';

        return `
          <div class="blog-card" data-post-slug="${post.slug}">
            <div class="blog-card-content">
              <span class="category-badge">${post.category}</span>
              <h2 class="card-title">${post.title}</h2>
              <p class="card-excerpt">${post.description}</p>
              
              <div class="card-metadata">
                <time datetime="${post.date}" class="date">${post.dateStr}</time>
                <span class="read-time">${post.readingTime || '3 min read'}</span>
              </div>
              
              ${tagsHTML}
              
              <a href="/blog/${post.slug}/" class="read-more">Read more &rarr;</a>
            </div>
            
            <div class="blog-card-image">
              ${coverHTML}
            </div>
          </div>
        `;
    }
}

// Define the custom element
customElements.define('blog-filter', BlogFilter);
