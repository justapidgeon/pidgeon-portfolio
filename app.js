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

async function fetchGitHubImages() {
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${IMAGES_PATH}`);
        if (!response.ok) throw new Error('Repo not public or wrong path');
        const files = await response.json();
        
        return files
            .filter(file => file.name.match(/\.(jpg|jpeg|png|webp|gif)$/i))
            .map(file => ({
                title: formatTitle(file.name),
                cat: 'Project',
                img: file.path // GitHub path works locally if served from root
            }));
    } catch (e) {
        console.warn('Auto-discovery failed (likely local dev or rate limit). Using fallback.', e);
        return getFallbackItems();
    }
}

function formatTitle(filename) {
    // Remove extension and replace dashes/underscores with spaces
    let title = filename.split('.')[0].replace(/[-_]/g, ' ');
    // Capitalize first letter of each word
    return title.replace(/\b\w/g, c => c.toUpperCase());
}

function getFallbackItems() {
    // These match the images you currently have in assets/images/
    return [
        { title: 'God Men Recruitment Poster', cat: 'Graphic Design', img: 'assets/images/godmen-recruitment-poster.jpg' },
        { title: 'God Men Banner', cat: 'Graphic Design', img: 'assets/images/godmen.jpg' },
        { title: 'MRC Closed Qualifiers', cat: 'Graphic Design', img: 'assets/images/mrc-closed-qualifiers-poster.jpg' },
        { title: 'Scrim Poster vs Cynder', cat: 'Graphic Design', img: 'assets/images/scrim-poster-vs-cynder-love.jpg' },
        { title: 'Ink Fusion Logo', cat: 'Logo Design', img: 'assets/images/ink-fusion-logo.jpg' },
        { title: 'MyBro Branding', cat: 'Logo Design', img: 'assets/images/mybro-logo.jpg' },
        { title: 'Beanie Pidge Character', cat: 'Illustration', img: 'assets/images/beanie-pidge.jpg' },
        { title: 'Twitch Community Icon', cat: 'Illustration', img: 'assets/images/twitch-icon.jpg' }
    ];
}

async function loadPortfolio() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    // 1. Fetch images automatically from GitHub
    const allItems = await fetchGitHubImages();
    
    // 2. Render Masonry Items
    gallery.innerHTML = '';
    allItems.forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'gallery-item fade-in';
        el.style.setProperty('--d', (i * 0.08) + 's');
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
        
        // Observe new elements
        observer.observe(el);
    });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    // Observe static HTML fade-in elements (hero, section headers, tiers, contact)
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    loadPortfolio(); // gallery items are observed individually after creation
});
