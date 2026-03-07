class BlogFilter extends HTMLElement {
    constructor() {
        super();
        // Default State
        this.posts = [];
        this.activeCategory = 'all';
        this.searchQuery = '';
        this.viewMode = 'grid'; // 'grid' | 'list'

        // DOM Elements
        this.container = this.querySelector('#posts-container');
        this.searchInput = this.querySelector('#search-input');
        this.categoryBtns = this.querySelectorAll('.category-btn');
        this.layoutBtns = this.querySelectorAll('.layout-btn');
        this.emptyState = this.querySelector('#empty-state');
        this.countDisplay = this.querySelector('#result-count');
    }

    connectedCallback() {
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

        // 3. Optional: Read initial state from URL query params (e.g. ?q=astro&category=frontend)
        this.syncFromURL();

        // 4. Run first render to match JS state
        this.filterAndRender();
    }

    bindEvents() {
        // Search input (debounce slightly for feel)
        this.searchInput?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase().trim();
            this.updateURL();
            this.filterAndRender();
        });

        // Category buttons
        this.categoryBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;

                // Update active class
                this.categoryBtns.forEach(b => b.classList.remove('btn-primary'));
                this.categoryBtns.forEach(b => b.classList.add('btn-ghost'));
                e.target.classList.remove('btn-ghost');
                e.target.classList.add('btn-primary');

                this.activeCategory = category;
                this.updateURL();
                this.filterAndRender();
            });
        });

        // Layout Toggle Buttons (Grid vs List)
        this.layoutBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                // Find closest button in case SVG is clicked
                const targetBtn = e.target.closest('button');
                const layout = targetBtn.dataset.layout;

                // Update active class visually
                this.layoutBtns.forEach(b => b.classList.remove('text-accent'));
                this.layoutBtns.forEach(b => b.classList.add('text-text-muted'));
                targetBtn.classList.remove('text-text-muted');
                targetBtn.classList.add('text-accent');

                this.viewMode = layout;
                this.filterAndRender();
            });
        });

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

        if (q) {
            this.searchQuery = q.toLowerCase();
            if (this.searchInput) this.searchInput.value = this.searchQuery;
        }

        if (cat) {
            const targetBtn = Array.from(this.categoryBtns).find(b => b.dataset.category === cat);
            if (targetBtn) {
                // Trigger click visually updates the button and sets activeCategory without re-fetching
                targetBtn.click();
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
        const filtered = this.posts.filter((post) => {
            const matchCategory = this.activeCategory === 'all' || post.category.toLowerCase() === this.activeCategory;
            const matchSearch = !this.searchQuery ||
                post.title.toLowerCase().includes(this.searchQuery) ||
                post.description.toLowerCase().includes(this.searchQuery) ||
                post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery));
            return matchCategory && matchSearch;
        });

        // 2. Update Result Count text
        if (this.countDisplay) {
            this.countDisplay.textContent = `Showing ${filtered.length} post${filtered.length === 1 ? '' : 's'}`;
        }

        // 3. Handle Empty State
        if (filtered.length === 0) {
            this.container.innerHTML = '';
            if (this.emptyState) this.emptyState.style.display = 'flex';
            return;
        } else {
            if (this.emptyState) this.emptyState.style.display = 'none';
        }

        // 4. Update Container Class for Grid vs List Layout
        if (this.viewMode === 'list') {
            this.container.className = 'posts-list';
        } else {
            // Revert to default grid config via Tailwind classes passed in index.astro
            this.container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
        }

        // 5. Generate and inject new HTML
        this.container.innerHTML = filtered.map(post => this.generateCardHTML(post)).join('');
    }

    generateCardHTML(post) {
        const categoryLower = post.category.toLowerCase();
        const dateStr = post.dateStr;
        const readTimeStr = post.readingTime || '';

        const coverHTML = post.cover ? `
      <div class="post-card__cover">
        <img src="${post.cover}" alt="${post.title}" loading="lazy" decoding="async" />
      </div>
    ` : '';

        const tagsHTML = post.tags && post.tags.length > 0 ? `
      <div class="post-card__tags">
        ${post.tags.slice(0, 3).map(tag => `<span class="post-card__tag">${tag}</span>`).join('')}
      </div>
    ` : '';

        return `
      <a href="/blog/${post.slug}/" class="post-card card" id="post-${post.slug}">
        ${coverHTML}
        <div class="post-card__content">
          <div class="post-card__header">
            <span class="tag tag-${categoryLower}">${post.category}</span>
          </div>
          
          <h3 class="post-card__title">${post.title}</h3>
          <p class="post-card__description">${post.description}</p>
          
          <div class="post-card__meta">
            <time datetime="${post.date}">
              ${dateStr}
            </time>
            ${readTimeStr ? `<span class="post-card__dot">·</span><span>${readTimeStr}</span>` : ''}
          </div>
          
          ${tagsHTML}
        </div>
      </a>
    `;
    }
}

// Define the custom element
customElements.define('blog-filter', BlogFilter);
