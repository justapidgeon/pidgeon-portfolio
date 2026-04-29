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
// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- LOAD DYNAMIC GALLERY ITEMS FROM LOCALSTORAGE ----
const STORAGE_KEY = 'pidgeon_portfolio';

function loadAdminItems() {
    let items = [];
    try { items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch {}
    if (!items.length) return;

    const gallery = document.getElementById('gallery');
    items.forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'gallery-item fade-in';
        el.style.setProperty('--d', (i * 0.08) + 's');
        el.dataset.category = item.cat;
        el.innerHTML = `
            <div class="gallery-img-wrap">
                <img src="${item.img}" alt="${item.title}" loading="lazy">
            </div>
            <div class="gallery-info">
                <span class="gallery-cat">${item.cat}</span>
                <h3 class="gallery-title">${item.title}</h3>
            </div>
        `;
        gallery.appendChild(el);
    });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    loadAdminItems();
    // Observe all fade-in elements (including dynamically added ones)
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
