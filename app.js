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

// ---- PORTFOLIO DATA ----
const DEFAULT_WORK = [
    { title: 'God Men Recruitment Poster', cat: 'Graphic Design', img: 'assets/images/godmen-recruitment-poster.jpg' },
    { title: 'God Men Banner', cat: 'Graphic Design', img: 'assets/images/godmen.jpg' },
    { title: 'MRC Closed Qualifiers', cat: 'Graphic Design', img: 'assets/images/mrc-closed-qualifiers-poster.jpg' },
    { title: 'Scrim Poster vs Cynder', cat: 'Graphic Design', img: 'assets/images/scrim-poster-vs-cynder-love.jpg' },
    { title: 'Ink Fusion Logo', cat: 'Logo Design', img: 'assets/images/ink-fusion-logo.jpg' },
    { title: 'MyBro Branding', cat: 'Logo Design', img: 'assets/images/mybro-logo.jpg' },
    { title: 'Beanie Pidge Character', cat: 'Illustration', img: 'assets/images/beanie-pidge.jpg' },
    { title: 'Twitch Community Icon', cat: 'Illustration', img: 'assets/images/twitch-icon.jpg' }
];

const STORAGE_KEY = 'pidgeon_portfolio';

function loadPortfolio() {
    let adminItems = [];
    try { adminItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch {}
    
    // Combine default assets with any local admin additions
    const allItems = [...DEFAULT_WORK, ...adminItems];
    
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    
    gallery.innerHTML = ''; // Clear prev
    
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
    });
}

// ---- CAROUSEL AUTO-SCROLL ----
function initCarousel() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollSpeed = 0.6; 
    let animationId;
    let isHovered = false;

    const step = () => {
        if (!isDown && !isHovered) {
            gallery.scrollLeft += autoScrollSpeed;
            if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth) {
                gallery.scrollLeft = 0;
            }
        }
        animationId = requestAnimationFrame(step);
    };

    gallery.addEventListener('mouseenter', () => isHovered = true);
    gallery.addEventListener('mouseleave', () => isHovered = false);

    gallery.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
        cancelAnimationFrame(animationId);
    });
    gallery.addEventListener('mouseleave', () => { isDown = false; step(); });
    gallery.addEventListener('mouseup', () => { isDown = false; step(); });
    gallery.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - gallery.offsetLeft;
        const walk = (x - startX) * 2;
        gallery.scrollLeft = scrollLeft - walk;
    });

    step();
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolio();
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    initCarousel();
});
