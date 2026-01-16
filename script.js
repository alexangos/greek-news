/**
 * Ελληνικά Νέα - Greek News Aggregator
 * Fetches RSS feeds from major Greek news sources
 */

// =====================================================
// Configuration
// =====================================================

const NEWS_SOURCES = [
    // ===== GENERAL NEWS =====
    {
        name: 'Πρώτο Θέμα',
        id: 'protothema',
        url: 'https://www.protothema.gr',
        rss: 'https://www.protothema.gr/rss/',
        category: 'general',
        color: '#e53935'
    },
    {
        name: 'Καθημερινή',
        id: 'kathimerini',
        url: 'https://www.kathimerini.gr',
        rss: 'https://www.kathimerini.gr/rss',
        category: 'politics',
        color: '#1565c0'
    },
    {
        name: 'in.gr',
        id: 'ingr',
        url: 'https://www.in.gr',
        rss: 'https://www.in.gr/feed/',
        category: 'general',
        color: '#ff6f00'
    },
    {
        name: 'Newsbomb',
        id: 'newsbomb',
        url: 'https://www.newsbomb.gr',
        rss: 'https://www.newsbomb.gr/rss',
        category: 'general',
        color: '#d32f2f'
    },
    {
        name: 'iefimerida',
        id: 'iefimerida',
        url: 'https://www.iefimerida.gr',
        rss: 'https://www.iefimerida.gr/rss.xml',
        category: 'general',
        color: '#0277bd'
    },
    {
        name: 'CNN Greece',
        id: 'cnn',
        url: 'https://www.cnn.gr',
        rss: 'https://www.cnn.gr/rss/all/rss.xml',
        category: 'general',
        color: '#cc0000'
    },
    {
        name: 'Skai',
        id: 'skai',
        url: 'https://www.skai.gr',
        rss: 'https://www.skai.gr/rss/news',
        category: 'general',
        color: '#0d47a1'
    },
    // ===== ECONOMY =====
    {
        name: 'Naftemporiki',
        id: 'naftemporiki',
        url: 'https://www.naftemporiki.gr',
        rss: 'https://www.naftemporiki.gr/feed',
        category: 'economy',
        color: '#00695c'
    },
    // ===== SPORTS =====
    {
        name: 'Gazzetta',
        id: 'gazzetta',
        url: 'https://www.gazzetta.gr',
        rss: 'https://www.gazzetta.gr/rss.xml',
        category: 'sports',
        color: '#4caf50'
    },
    {
        name: 'Sport24',
        id: 'sport24',
        url: 'https://www.sport24.gr',
        rss: 'https://www.sport24.gr/rss/sports.xml',
        category: 'sports',
        color: '#ff5722'
    },
    {
        name: 'SDNA',
        id: 'sdna',
        url: 'https://www.sdna.gr',
        rss: 'https://www.sdna.gr/rss.xml',
        category: 'sports',
        color: '#9c27b0'
    },
    // ===== TECHNOLOGY =====
    {
        name: 'Techblog',
        id: 'techblog',
        url: 'https://www.techblog.gr',
        rss: 'https://www.techblog.gr/feed/',
        category: 'tech',
        color: '#00bcd4'
    },
    {
        name: 'Techgear',
        id: 'techgear',
        url: 'https://www.techgear.gr',
        rss: 'https://www.techgear.gr/feed/',
        category: 'tech',
        color: '#3f51b5'
    },
    // ===== ENTERTAINMENT =====
    {
        name: 'Gossip-tv',
        id: 'gossiptv',
        url: 'https://www.gossip-tv.gr',
        rss: 'https://www.gossip-tv.gr/rss',
        category: 'entertainment',
        color: '#e91e63'
    },
    {
        name: 'LIFO',
        id: 'lifo',
        url: 'https://www.lifo.gr',
        rss: 'https://www.lifo.gr/rss/all',
        category: 'entertainment',
        color: '#673ab7'
    }
];

// Category mappings for Greek keywords (expanded)
const CATEGORY_KEYWORDS = {
    politics: ['πολιτικ', 'κυβέρνηση', 'βουλή', 'υπουργ', 'πρωθυπουργ', 'εκλογ', 'κόμμα', 'νομοσχέδιο', 'συριζα', 'νδ', 'πασοκ', 'κιναλ', 'μητσοτάκη', 'τσίπρα', 'ψηφοφορ', 'διάγγελμα'],
    economy: ['οικονομ', 'τράπεζ', 'χρηματιστήριο', 'επιχειρ', 'ευρώ', 'φορολ', 'ανεργία', 'επένδυσ', 'ΑΕΠ', 'μισθ', 'σύνταξ', 'πληθωρισμ', 'ακρίβεια', 'ρεύμα', 'καύσιμα', 'αγορά'],
    world: ['διεθν', 'κόσμος', 'εξωτερικ', 'πόλεμος', 'ουκρανία', 'ρωσία', 'ηπα', 'τουρκία', 'ευρωπαϊκ', 'nato', 'κίνα', 'ισραήλ', 'γάζα', 'παλαιστίν', 'τραμπ', 'πούτιν', 'ζελένσκι'],
    sports: ['αθλητ', 'ποδόσφαιρο', 'ολυμπιακ', 'παναθηναϊκ', 'αεκ', 'παοκ', 'μπάσκετ', 'πρωτάθλημα', 'αγών', 'γκολ', 'τερματ', 'προπονητ', 'μεταγραφ', 'euroleague', 'champions league', 'super league', 'εθνική', 'ομάδα', 'νίκη', 'ήττα', 'ισοπαλία', 'μπαλα', 'ποδοσφαιριστ', 'παίκτ', 'άρης', 'ατρόμητος'],
    tech: ['τεχνολογ', 'google', 'apple', 'microsoft', 'smartphone', 'internet', 'AI', 'ψηφιακ', 'software', 'iphone', 'android', 'samsung', 'laptop', 'gaming', 'playstation', 'xbox', 'nvidia', 'intel', 'amd', 'gadget', 'εφαρμογ', 'app', 'update', 'hacker', 'cyber', 'social media', 'instagram', 'tiktok', 'facebook', 'twitter', 'youtube', 'streaming'],
    entertainment: ['ψυχαγωγ', 'σινεμά', 'ταινία', 'μουσικ', 'τηλεόραση', 'σειρά', 'netflix', 'celebrity', 'θέατρο', 'ηθοποι', 'τραγουδ', 'συναυλ', 'βραβεί', 'oscar', 'φεστιβάλ', 'σόου', 'διασημ', 'gossip', 'showbiz', 'star', 'φωτογραφ', 'εκπομπ', 'παρουσιαστ', 'reality', 'survivor', 'masterchef', 'the voice', 'x factor']
};

// RSS to JSON API (free tier)
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';

// =====================================================
// State
// =====================================================

let allNews = [];
let currentCategory = 'all';
let isLoading = false;

// =====================================================
// DOM Elements
// =====================================================

const newsGrid = document.getElementById('news-grid');
const featuredSection = document.getElementById('featured-section');
const loading = document.getElementById('loading');
const errorState = document.getElementById('error-state');
const emptyState = document.getElementById('empty-state');
const newsCount = document.getElementById('news-count');
const sourcesCount = document.getElementById('sources-count');
const sourcesGrid = document.getElementById('sources-grid');
const currentDate = document.getElementById('current-date');
const refreshBtn = document.getElementById('refresh-btn');
const retryBtn = document.getElementById('retry-btn');
const categoryBtns = document.querySelectorAll('.category-btn');

// =====================================================
// Initialize
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    renderSourcesList();
    setupEventListeners();
    fetchAllNews();
});

// =====================================================
// Event Listeners
// =====================================================

function setupEventListeners() {
    // Category filters
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderNews();
        });
    });

    // Refresh button
    refreshBtn.addEventListener('click', () => {
        fetchAllNews();
    });

    // Retry button
    retryBtn.addEventListener('click', () => {
        fetchAllNews();
    });
}

// =====================================================
// Set Current Date
// =====================================================

function setCurrentDate() {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    currentDate.textContent = new Date().toLocaleDateString('el-GR', options);
}

// =====================================================
// Render Sources List
// =====================================================

function renderSourcesList() {
    sourcesGrid.innerHTML = NEWS_SOURCES.map(source => `
        <a href="${source.url}" target="_blank" rel="noopener" class="source-badge">
            <img src="https://www.google.com/s2/favicons?domain=${source.url}&sz=32" 
                 alt="${source.name}" 
                 onerror="this.style.display='none'">
            ${source.name}
        </a>
    `).join('');

    sourcesCount.textContent = NEWS_SOURCES.length;
}

// =====================================================
// Fetch All News
// =====================================================

async function fetchAllNews() {
    if (isLoading) return;

    isLoading = true;
    showLoading(true);
    hideError();
    hideEmpty();

    refreshBtn.classList.add('spinning');
    allNews = [];

    // Fetch from all sources in parallel
    const fetchPromises = NEWS_SOURCES.map(source => fetchFromSource(source));

    try {
        const results = await Promise.allSettled(fetchPromises);

        results.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value) {
                allNews = allNews.concat(result.value);
            } else {
                console.warn(`Failed to fetch from ${NEWS_SOURCES[index].name}`);
            }
        });

        // Sort by date (newest first)
        allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        if (allNews.length === 0) {
            showError();
        } else {
            renderNews();
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        showError();
    } finally {
        isLoading = false;
        showLoading(false);
        refreshBtn.classList.remove('spinning');
    }
}

// =====================================================
// Fetch From Source
// =====================================================

async function fetchFromSource(source) {
    try {
        const response = await fetch(RSS2JSON_API + encodeURIComponent(source.rss));

        if (!response.ok) throw new Error('Network error');

        const data = await response.json();

        if (data.status !== 'ok' || !data.items) {
            throw new Error('Invalid RSS data');
        }

        return data.items.map(item => ({
            title: cleanText(item.title),
            description: cleanText(item.description),
            link: item.link,
            pubDate: item.pubDate,
            image: extractImage(item),
            source: source.name,
            sourceId: source.id,
            sourceUrl: source.url,
            sourceColor: source.color,
            category: detectCategory(item.title + ' ' + item.description, source.category)
        }));
    } catch (error) {
        console.warn(`Error fetching ${source.name}:`, error);
        return [];
    }
}

// =====================================================
// Helpers
// =====================================================

function cleanText(text) {
    if (!text) return '';
    // Remove HTML tags and decode entities
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent.trim();
}

function extractImage(item) {
    // Try different image sources
    if (item.enclosure?.link) return item.enclosure.link;
    if (item.thumbnail) return item.thumbnail;

    // Try to extract from content
    if (item.content) {
        const match = item.content.match(/<img[^>]+src="([^">]+)"/);
        if (match) return match[1];
    }

    return null;
}

function detectCategory(text, defaultCategory) {
    if (!text) return defaultCategory;
    const lowerText = text.toLowerCase();

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        for (const keyword of keywords) {
            if (lowerText.includes(keyword.toLowerCase())) {
                return category;
            }
        }
    }

    return defaultCategory;
}

function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Τώρα';
    if (diffMins < 60) return `${diffMins} λεπτά πριν`;
    if (diffHours < 24) return `${diffHours} ώρες πριν`;
    if (diffDays === 1) return 'Χθες';
    if (diffDays < 7) return `${diffDays} μέρες πριν`;

    return date.toLocaleDateString('el-GR');
}

function getCategoryLabel(category) {
    const labels = {
        general: 'Γενικά',
        politics: 'Πολιτική',
        economy: 'Οικονομία',
        world: 'Κόσμος',
        sports: 'Αθλητικά',
        tech: 'Τεχνολογία',
        entertainment: 'Ψυχαγωγία'
    };
    return labels[category] || 'Γενικά';
}

// =====================================================
// Render News
// =====================================================

function renderNews() {
    // Filter by category
    const filtered = currentCategory === 'all'
        ? allNews
        : allNews.filter(item => item.category === currentCategory);

    if (filtered.length === 0) {
        featuredSection.innerHTML = '';
        newsGrid.innerHTML = '';
        showEmpty();
        newsCount.textContent = '0 ειδήσεις';
        return;
    }

    hideEmpty();

    // Update count
    newsCount.textContent = `${filtered.length} ειδήσεις`;

    // Render featured (first item with image)
    const featuredItem = filtered.find(item => item.image);
    if (featuredItem && currentCategory === 'all') {
        renderFeatured(featuredItem);
    } else {
        featuredSection.innerHTML = '';
    }

    // Render grid (skip featured if shown)
    const gridItems = featuredItem && currentCategory === 'all'
        ? filtered.filter(item => item !== featuredItem)
        : filtered;

    renderGrid(gridItems);
}

function renderFeatured(item) {
    featuredSection.innerHTML = `
        <article class="featured-card" onclick="window.open('${item.link}', '_blank')">
            <div class="image-container">
                <img src="${item.image}" alt="${item.title}" onerror="this.parentElement.classList.add('no-image'); this.remove();">
                <div class="featured-overlay">
                    <span class="featured-badge">Κορυφαία Είδηση</span>
                    <h2>${item.title}</h2>
                    <div class="meta">
                        <span class="source">
                            <img src="https://www.google.com/s2/favicons?domain=${item.sourceUrl}&sz=16" 
                                 alt="${item.source}" 
                                 onerror="this.style.display='none'">
                            ${item.source}
                        </span>
                        <span class="time">
                            <i class="far fa-clock"></i>
                            ${formatTimeAgo(item.pubDate)}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function renderGrid(items) {
    newsGrid.innerHTML = items.map((item, index) => `
        <article class="news-card" style="animation-delay: ${index * 0.05}s" onclick="window.open('${item.link}', '_blank')">
            <div class="image-container ${item.image ? '' : 'no-image'}">
                ${item.image
            ? `<img src="${item.image}" alt="${item.title}" onerror="this.parentElement.classList.add('no-image'); this.remove(); this.parentElement.innerHTML='<i class=\\'fas fa-newspaper\\'></i>';">`
            : '<i class="fas fa-newspaper"></i>'
        }
                <span class="category-tag">${getCategoryLabel(item.category)}</span>
            </div>
            <div class="content">
                <h3>${item.title}</h3>
                ${item.description ? `<p class="description">${item.description}</p>` : ''}
                <div class="meta">
                    <span class="source">
                        <img src="https://www.google.com/s2/favicons?domain=${item.sourceUrl}&sz=16" 
                             alt="${item.source}" 
                             onerror="this.style.display='none'">
                        ${item.source}
                    </span>
                    <span class="time">
                        <i class="far fa-clock"></i>
                        ${formatTimeAgo(item.pubDate)}
                    </span>
                </div>
            </div>
        </article>
    `).join('');
}

// =====================================================
// UI State Functions
// =====================================================

function showLoading(show) {
    loading.classList.toggle('hidden', !show);
    if (show) {
        newsGrid.innerHTML = '';
        featuredSection.innerHTML = '';
    }
}

function showError() {
    errorState.classList.remove('hidden');
}

function hideError() {
    errorState.classList.add('hidden');
}

function showEmpty() {
    emptyState.classList.remove('hidden');
}

function hideEmpty() {
    emptyState.classList.add('hidden');
}
