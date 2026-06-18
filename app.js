// ---- SCROLL REVEAL ----
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

// ---- NAVBAR SCROLL STATE ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ---- MOBILE MENU ----
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- DISCORD COPY ----
const discordCard = document.getElementById('discordCard');
if (discordCard) {
    discordCard.addEventListener('click', (e) => {
        e.preventDefault();
        const username = 'artsypige';
        navigator.clipboard.writeText(username).then(() => {
            const valEl = discordCard.querySelector('.contact-val') || discordCard.querySelector('.contact-value');
            if (valEl) {
                const originalText = valEl.innerText;
                valEl.innerText = 'Copied!';
                discordCard.classList.add('copied');
                setTimeout(() => {
                    valEl.innerText = originalText;
                    discordCard.classList.remove('copied');
                }, 2000);
            }
        });
    });
}

// ---- LIGHTBOX ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');

let currentAlbum = [];
let currentIndex = 0;

function openLightbox(src) {
    currentAlbum = [src];
    currentIndex = 0;
    lightboxImg.src = src;
    lightbox.classList.remove('is-album');
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function openLightboxAlbum(images, index = 0) {
    currentAlbum = images;
    currentIndex = index;
    lightboxImg.src = currentAlbum[currentIndex];
    lightbox.classList.add('is-album', 'open');
    updateLightboxCounter();
    document.body.style.overflow = 'hidden';
}

function updateLightboxCounter() {
    if (lightboxCounter) {
        lightboxCounter.textContent = `${currentIndex + 1} / ${currentAlbum.length}`;
    }
}

function nextLightboxImage() {
    if (currentAlbum.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentAlbum.length;
    lightboxImg.src = currentAlbum[currentIndex];
    updateLightboxCounter();
}

function prevLightboxImage() {
    if (currentAlbum.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentAlbum.length) % currentAlbum.length;
    lightboxImg.src = currentAlbum[currentIndex];
    updateLightboxCounter();
}

function closeLightbox() {
    lightbox.classList.remove('open', 'is-album');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; currentAlbum = []; }, 300);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) closeLightbox();
    });
}
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); nextLightboxImage(); });
if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); prevLightboxImage(); });

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'ArrowLeft') prevLightboxImage();
});

// ---- PORTFOLIO / AUTO-DISCOVERY ----
const REPO_OWNER = 'justapidgeon';
const REPO_NAME = 'pidgeon-portfolio';
const IMAGES_PATH = 'assets/images';

// ---- FEATURED PROJECTS CONFIG ----
// These are your big brand identity projects, displayed prominently at the top.
// Add new projects here as you build more.
const FEATURED_PROJECTS = [
    {
        id: 'dinner-time',
        title: 'Dinner Time',
        subtitle: 'Brand Identity System',
        description: 'A complete brand identity deep-dive — including logo rough drafts, digital vector versions, wordmark, typography, custom monogram, character mascot sketches, color palette, and esports tournament banners.',
        tags: ['Logo Design', 'Illustration', 'Brand Identity'],
        cover: 'assets/images/Brand Identity/dinner-time-logo-transparent.png',
        imagePaths: [
            'assets/images/Brand Identity/dinner-time-logo-transparent.png',
            'assets/images/Brand Identity/dinner-time-logo-white.png',
            'assets/images/Brand Identity/dinner-time-logo-typeface.png',
            'assets/images/Brand Identity/dinner-time-logo-rough-drafts.png',
            'assets/images/Brand Identity/dinner-time-concept-drawing.png',
            'assets/images/Brand Identity/dinner-time-draft-mascot.png',
            'assets/images/Brand Identity/dinner-time-draft-wordmark.png',
            'assets/images/Brand Identity/dinner-time-draft-monogram.png',
            'assets/images/Brand Identity/dinner-time-color-palette.png',
            'assets/images/Brand Identity/dinner-time-closed-qualifiers-banner.png',
        ],
    },
    {
        id: 'god-men',
        title: 'God Men',
        subtitle: 'Brand Identity & Advertising',
        description: 'A robust, dark esports brand identity developed for an Apex Legends competitive team. Includes logo design iterations, custom signatures, schedule and ranking posters, and a comprehensive VS match day banner series.',
        tags: ['Logo Design', 'Advertising', 'Brand Identity'],
        cover: 'assets/images/Brand Identity/god-men-logo-draft-3.png',
        imagePaths: [
            'assets/images/Brand Identity/god-men-logo-draft-3.png',
            'assets/images/Brand Identity/god-men-logo-draft-1.png',
            'assets/images/Brand Identity/god-men-logo-draft-2.png',
            'assets/images/Brand Identity/god-men-purple-logo.png',
            'assets/images/Brand Identity/god-men-white-logo.png',
            'assets/images/Brand Identity/god-men-artistic-logo.png',
            'assets/images/Brand Identity/god-men-signature-final.png',
            'assets/images/Brand Identity/godmen-signature-logo.png',
            'assets/images/Brand Identity/god-men-closed-qualifiers-banner.png',
            'assets/images/Advertising/godmen-recruitment-poster.jpg',
            'assets/images/Advertising/god-men-mrc-poster.png',
            'assets/images/Advertising/god-men-break-week-poster.png',
            'assets/images/Advertising/god-men-final-ranking-poster.png',
            'assets/images/Advertising/god-men-schedule-week-one-poster.png',
            'assets/images/Advertising/god-men-schedule-week-two-poster.png',
            'assets/images/Advertising/god-men-vs-dinner-time-poster.png',
            'assets/images/Advertising/god-men-vs-dinner-time-banner.png',
            'assets/images/Advertising/god-men-vs-apexs-poster.png',
            'assets/images/Advertising/god-men-vs-apexs-banner.png',
            'assets/images/Advertising/god-men-vs-cynder-love-poster.png',
            'assets/images/Advertising/god-men-vs-cynder-love-banner.png',
            'assets/images/Advertising/god-men-vs-ethernal-poster.png',
            'assets/images/Advertising/god-men-vs-ethernal-banner.png',
            'assets/images/Advertising/god-men-vs-fallen-knights-poster.png',
            'assets/images/Advertising/god-men-vs-fallen-knights-banner.png',
            'assets/images/Advertising/god-men-vs-phreaky-phridays-poster.png',
            'assets/images/Advertising/god-men-vs-phreaky-phridays-banner.png',
            'assets/images/Advertising/god-men-vs-pyrotechnics-poster.png',
            'assets/images/Advertising/god-men-vs-pyrotechnics-banner.png',
            'assets/images/Advertising/god-men-vs-westside-poster.png',
            'assets/images/Advertising/god-men-vs-westside-banner.png',
        ],
    },
    {
        id: 'pidgeon-coffee',
        title: 'pidgeon Coffee',
        subtitle: 'Cafe Brand Identity',
        description: 'A cozy, custom cafe branding project including alternative logo stamps, typographic designs, and concept sketches.',
        tags: ['Logo Design', 'Branding', 'Typography'],
        cover: 'assets/images/Brand Identity/pidgeon-coffee-logo.png',
        imagePaths: [
            'assets/images/Brand Identity/pidgeon-coffee-logo.png',
            'assets/images/Brand Identity/pidgeon-coffee-type-logo.png',
            'assets/images/Brand Identity/pidgeon-coffee-alternative-logo.png',
            'assets/images/Brand Identity/pidgeon-coffee-logo-draft.png',
            'assets/images/Logo Designs/pidgeon-co-final-logo.png',
        ],
    },
    {
        id: 'cars-and-clouds',
        title: 'Cars & Clouds',
        subtitle: 'Brand Identity',
        description: 'Clean, minimalist corporate stationery and business card identity, featuring double-sided layout designs.',
        tags: ['Brand Identity', 'Print Design'],
        cover: 'assets/images/Advertising/cars-and-clouds-business-card-front.png',
        imagePaths: [
            'assets/images/Advertising/cars-and-clouds-business-card-front.png',
            'assets/images/Advertising/cars-and-clouds-business-card-back.png',
        ],
    },
    {
        id: 'pidgeon-brand',
        title: 'pidgeon.',
        subtitle: 'Personal Mascot Series',
        description: 'A massive personal mascot illustration system. Features the core pidgeon character redesigned into sixteen thematic outfits, seasonal characters, and pop-culture styles.',
        tags: ['Character Design', 'Branding', 'Illustration'],
        cover: 'assets/images/Graphics/pidgeons/honey-pidgeon.png',
        imagePaths: [
            'assets/images/Graphics/pidgeons/honey-pidgeon.png',
            'assets/images/Graphics/pidgeons/the-original.png',
            'assets/images/Graphics/pidgeons/beanie-pidge.png',
            'assets/images/Graphics/pidgeons/beanie-pidge-white.png',
            'assets/images/Graphics/pidgeons/red-pidgeon.png',
            'assets/images/Graphics/pidgeons/snow-pidgeon.png',
            'assets/images/Graphics/pidgeons/pumpgeon.png',
            'assets/images/Graphics/pidgeons/failed-pumpgeon.png',
            'assets/images/Graphics/pidgeons/cloak-and-pidgeon.png',
            'assets/images/Graphics/pidgeons/koalageon.png',
            'assets/images/Graphics/pidgeons/pidgeky.png',
            'assets/images/Graphics/pidgeons/skullgeon.png',
            'assets/images/Graphics/pidgeons/skullgeon-with-hat.png',
            'assets/images/Graphics/pidgeons/st.-pidgeon.png',
            'assets/images/Graphics/pidgeons/reign-the-pidgeon.png',
            'assets/images/Graphics/pidgeons/admin-pidgeon.png',
        ],
    },
    {
        id: 'justapidgeon-portfolio',
        title: 'justapidgeon Portfolio',
        subtitle: 'Self-Promo Poster Series',
        description: 'Self-promotional poster designs showcasing custom layout concepts, draft iterations, and typography.',
        tags: ['Advertising', 'Poster Design', 'Typography'],
        cover: 'assets/images/Advertising/justapidgeon-portfolio-poster.png',
        imagePaths: [
            'assets/images/Advertising/justapidgeon-portfolio-poster.png',
            'assets/images/Advertising/justapidgeon-portfolio-draft-one.png',
            'assets/images/Advertising/justapidgeon-portfolio-draft-two.png',
            'assets/images/Advertising/justapidgeon-portfolio-draft-three.png',
            'assets/images/Advertising/justapidgeon-poster-draft.png',
        ],
    },
];

// Paths that belong to featured projects — excluded from the archive grid to avoid duplicates
const FEATURED_PATHS = new Set(
    FEATURED_PROJECTS.flatMap(p => p.imagePaths.map(s => s.toLowerCase()))
);

let allPortfolioItems = [];

async function fetchGitHubImages() {
    try {
        const categories = [
            { path: 'Advertising', name: 'Advertising' },
            { path: 'Graphics', name: 'Graphic' },
            { path: 'Logo Designs', name: 'Logo Design' },
            { path: 'Brand Identity', name: 'Logo Design' }
        ];

        let results = [];
        for (const cat of categories) {
            const items = await fetchFolderRecursive(`${IMAGES_PATH}/${cat.path}`, cat.name);
            results = results.concat(items);
        }
        return results;
    } catch (e) {
        console.warn('Auto-discovery failed. Using fallback.', e);
        return getFallbackItems();
    }
}

async function fetchFolderRecursive(path, categoryName) {
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`);
        if (!response.ok) return [];
        const files = await response.json();

        let items = [];
        for (const file of files) {
            if (file.type === 'dir') {
                const subItems = await fetchFolderRecursive(file.path, categoryName);
                items = items.concat(subItems);
            } else if (file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
                if (file.name.toLowerCase() === 'pp vs god men.png') continue;
                items.push({
                    title: formatTitle(file.name),
                    cat: categoryName,
                    img: file.path
                });
            }
        }
        return items;
    } catch (e) {
        return [];
    }
}

function formatTitle(filename) {
    let title = filename.split('.')[0].replace(/[-_]/g, ' ');
    return title.replace(/\b\w/g, c => c.toUpperCase());
}

function getFallbackItems() {
    return [
        { title: 'Camping Menu', cat: 'Advertising', img: 'assets/images/Advertising/camping-menu.png' },
        { title: 'MRC Closed Qualifiers', cat: 'Advertising', img: 'assets/images/Advertising/mrc-closed-qualifiers-poster.jpg' },
        { title: 'Ink Fusion Logo', cat: 'Logo Design', img: 'assets/images/Logo Designs/ink-fusion-logo.jpg' },
        { title: 'MyBro Branding', cat: 'Logo Design', img: 'assets/images/Logo Designs/my-bro-logo.png' },
        { title: 'Heavens Fall Logo', cat: 'Logo Design', img: 'assets/images/Logo Designs/heavens-fall-logo.png' },
        { title: 'Twitch Friend', cat: 'Graphic', img: 'assets/images/Graphics/twitch-friend.png' },
        { title: 'Team Talk Typography', cat: 'Graphic', img: 'assets/images/Graphics/team-talk-typography.jpg' },
    ];
}

async function loadPortfolio() {
    const gallery = document.getElementById('gallery');
    const featuredContainer = document.getElementById('featuredProjects');
    if (!gallery) return;

    // 1. Render Featured Projects immediately (no async needed — paths are configured)
    if (featuredContainer) {
        renderFeaturedProjects(featuredContainer);
    }

    // 2. Fetch archive items from GitHub
    const rawItems = await fetchGitHubImages();

    // 3. Filter out items that belong to featured projects
    const archiveItems = rawItems.filter(item => {
        return !FEATURED_PATHS.has(item.img.toLowerCase());
    });

    // 4. Group remaining archive items
    allPortfolioItems = groupArchiveItems(archiveItems);

    // 5. Setup filter listeners + render archive
    setupFilters();
    renderGallery('all');
}

function renderFeaturedProjects(container) {
    container.innerHTML = '';
    FEATURED_PROJECTS.forEach((project, i) => {
        const isReversed = i % 2 !== 0;
        const el = document.createElement('div');
        el.className = `featured-row fade-in${isReversed ? ' featured-row--reversed' : ''}`;
        el.style.setProperty('--d', (i * 0.12) + 's');

        const tagsHTML = project.tags.map(t => `<span class="featured-tag">${t}</span>`).join('');
        const countLabel = project.imagePaths.length > 1
            ? `${project.imagePaths.length} assets`
            : '1 asset';

        el.innerHTML = `
            <div class="featured-img-wrap">
                <img src="${project.cover}" alt="${project.title}" loading="lazy">
                <div class="featured-img-count">${countLabel}</div>
            </div>
            <div class="featured-info">
                <div class="featured-meta">
                    <span class="featured-index">0${i + 1}</span>
                    <span class="featured-subtitle">${project.subtitle}</span>
                </div>
                <h2 class="featured-title">${project.title}</h2>
                <p class="featured-desc">${project.description}</p>
                <div class="featured-tags">${tagsHTML}</div>
                <button class="btn btn-primary featured-btn" data-project-id="${project.id}">
                    View Project &nbsp;→
                </button>
            </div>
        `;

        const btn = el.querySelector('.featured-btn');
        btn.addEventListener('click', () => {
            openLightboxAlbum(project.imagePaths, 0);
        });

        // Clicking the image also opens the lightbox
        const imgWrap = el.querySelector('.featured-img-wrap');
        imgWrap.addEventListener('click', () => {
            openLightboxAlbum(project.imagePaths, 0);
        });

        container.appendChild(el);
        observer.observe(el);
    });
}

function groupArchiveItems(items) {
    // Only group remaining items not handled by featured projects
    const grouped = [];
    const albums = {
        'Scrim Posters': { cat: 'Advertising', items: [] },
        'Coffee Illustrations': { cat: 'Graphic', items: [] },
        'Marvel Line Art': { cat: 'Graphic', items: [] },
        'Phi Pi Logos': { cat: 'Logo Design', items: [] },
        'LanceArt Logos': { cat: 'Logo Design', items: [] },
    };

    const coffeeNames = ['americano', 'cappuccino', 'cold-brew', 'espresso', 'flat-white', 'iced-latte', 'latte', 'macchiato', 'matcha', 'mocha'];
    const marvelNames = ['deadpool', 'cyclops', 'gambit', 'invisible-woman'];

    for (const item of items) {
        let added = false;
        const lowerImg = item.img.toLowerCase();

        if (lowerImg.includes('scrim-poster-')) {
            albums['Scrim Posters'].items.push(item);
            added = true;
        } else if (coffeeNames.some(name => lowerImg.includes(name))) {
            albums['Coffee Illustrations'].items.push(item);
            added = true;
        } else if (marvelNames.some(name => lowerImg.includes(name))) {
            albums['Marvel Line Art'].items.push(item);
            added = true;
        } else if (lowerImg.includes('phi-pi-logo')) {
            albums['Phi Pi Logos'].items.push(item);
            added = true;
        } else if (lowerImg.includes('lanceart-logo')) {
            albums['LanceArt Logos'].items.push(item);
            added = true;
        }

        if (!added) grouped.push(item);
    }

    for (const [albumTitle, albumData] of Object.entries(albums)) {
        if (albumData.items.length > 0) {
            grouped.push({
                isAlbum: true,
                title: albumTitle,
                cat: albumData.cat,
                img: albumData.items[0].img,
                images: albumData.items.map(i => i.img)
            });
        }
    }

    return grouped;
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(btn.dataset.filter);
        });
    });
}

function renderGallery(filter) {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    gallery.innerHTML = '';

    const filteredItems = filter === 'all'
        ? allPortfolioItems
        : allPortfolioItems.filter(item => item.cat === filter);

    if (filteredItems.length === 0) {
        gallery.innerHTML = `<p class="section-sub" style="grid-column: 1/-1; text-align: center; padding: 4rem 0;">No items found in this category.</p>`;
        return;
    }

    filteredItems.forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'gallery-item fade-in';
        if (item.isAlbum) el.classList.add('is-album');
        el.style.setProperty('--d', (i * 0.05) + 's');
        el.innerHTML = `
            <div class="gallery-img-wrap">
                <img src="${item.img}" alt="${item.title}" loading="lazy">
                ${item.isAlbum ? `<div class="album-badge">${item.images.length} Items</div>` : ''}
            </div>
            <div class="gallery-info">
                <span class="gallery-cat">${item.cat}</span>
                <h3 class="gallery-title">${item.title}</h3>
            </div>
        `;
        el.addEventListener('click', () => {
            if (item.isAlbum) {
                openLightboxAlbum(item.images, 0);
            } else {
                openLightbox(item.img);
            }
        });
        gallery.appendChild(el);
        observer.observe(el);
    });
}


// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    loadPortfolio();
});
