// ---- SCROLL REVEAL ----
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

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

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) closeLightbox();
    });
}
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

// ---- PORTFOLIO / AUTO-DISCOVERY ----
const REPO_OWNER = 'justapidgeon';
const REPO_NAME = 'pidgeon-portfolio';
const IMAGES_PATH = 'assets/images';

let allPortfolioItems = [];

async function fetchGitHubImages() {
    try {
        // We'll fetch the three main category folders
        const categories = [
            { path: 'Advertising', name: 'Advertising' },
            { path: 'Graphics', name: 'Graphic' },
            { path: 'Logo Designs', name: 'Logo Design' }
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
        { title: 'God Men Recruitment Poster', cat: 'Advertising', img: 'assets/images/Advertising/godmen-recruitment-poster.jpg' },
        { title: 'MRC Closed Qualifiers', cat: 'Advertising', img: 'assets/images/Advertising/mrc-closed-qualifiers-poster.jpg' },
        { title: 'Ink Fusion Logo', cat: 'Logo Design', img: 'assets/images/Logo Designs/ink-fusion-logo.jpg' },
        { title: 'MyBro Branding', cat: 'Logo Design', img: 'assets/images/Logo Designs/my-bro-logo.png' },
        { title: 'Twitch Friend', cat: 'Graphic', img: 'assets/images/Graphics/twitch-friend.png' },
        { title: 'Team Talk Typography', cat: 'Graphic', img: 'assets/images/Graphics/team-talk-typography.jpg' },
        { title: 'Honey Pidgeon', cat: 'Graphic', img: 'assets/images/Graphics/pidgeons/honey-pidgeon.png' },
        { title: 'Beanie Pidge', cat: 'Graphic', img: 'assets/images/Graphics/pidgeons/beanie-pidge.png' }
    ];
}

async function loadPortfolio() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    // 1. Fetch images
    allPortfolioItems = await fetchGitHubImages();
    
    // 2. Setup Filter Listeners
    setupFilters();
    
    // 3. Initial Render
    renderGallery('all');
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
        el.style.setProperty('--d', (i * 0.05) + 's');
        el.innerHTML = `
            <div class="gallery-img-wrap">
                <img src="${item.img}" alt="${item.title}" loading="lazy">
            </div>
            <div class="gallery-info">
                <span class="gallery-cat">${item.cat}</span>
                <h3 class="gallery-title">${item.title}</h3>
            </div>
        `;
        el.addEventListener('click', () => openLightbox(item.img));
        gallery.appendChild(el);
        observer.observe(el);
    });
}


// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    // Observe static HTML fade-in elements (hero, section headers, tiers, contact)
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    loadPortfolio(); // gallery items are observed individually after creation
});
