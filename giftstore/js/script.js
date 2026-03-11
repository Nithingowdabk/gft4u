/* ============================================================
   Gift4You – Main JavaScript
   ============================================================ */

'use strict';

// ── DOM Ready ──
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initMobileNav();
  initScrollReveal();
  initParticles();
  initSlider();
  initBackToTop();
  initQuickView();
  initWishlist();
  initCartBadge();
  initToast();
  initCounters();
});

// ─────────────────────────────────────────
// LOADING SCREEN
// ─────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;

  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 600);
  });

  // Fallback
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 3000);
}

// ─────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const isHero = document.querySelector('.hero');
  let lastScroll = 0;

  if (isHero) {
    navbar.classList.add('transparent');
  }

  function handleScroll() {
    const scrollY = window.scrollY;

    if (isHero) {
      if (scrollY > 50) {
        navbar.classList.remove('transparent');
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.add('transparent');
        navbar.classList.remove('scrolled');
      }
    } else {
      navbar.classList.add('scrolled');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Active nav link
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ─────────────────────────────────────────
// MOBILE NAV
// ─────────────────────────────────────────
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-overlay');
  if (!hamburger || !mobileNav) return;

  function openNav() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (mobileNav.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  // Close on nav link click
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });
}

// ─────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────────
// PARTICLES
// ─────────────────────────────────────────
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const NUM = 18;
  const sizes = [3, 4, 5, 6, 8];
  const durations = [8, 10, 12, 14, 16, 18];

  for (let i = 0; i < NUM; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const duration = durations[Math.floor(Math.random() * durations.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * duration;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;
    container.appendChild(p);
  }
}

// ─────────────────────────────────────────
// REVIEW SLIDER
// ─────────────────────────────────────────
function initSlider() {
  const track = document.querySelector('.reviews-track');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots');
  if (!track) return;

  let currentIndex = 0;
  let autoPlayTimer;
  const cards = track.querySelectorAll('.review-card');
  const visibleCount = getVisibleCount();
  const totalSlides = Math.ceil(cards.length / visibleCount);

  // Create dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function getVisibleCount() {
    if (window.innerWidth < 680) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
  }

  function goTo(index) {
    const vc = getVisibleCount();
    const max = Math.ceil(cards.length / vc) - 1;
    currentIndex = Math.max(0, Math.min(index, max));

    const cardWidth = track.offsetWidth / vc + 8; // gap
    const offset = currentIndex * (track.offsetWidth + 24);
    track.style.transform = `translateX(-${currentIndex * (100 / vc * vc)}%)`;

    // Simpler: just move by track width fraction
    const percent = currentIndex * (100 / vc) * vc;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    dotsContainer && dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  // Better approach: translateX based on card widths
  function updateSlider() {
    const vc = getVisibleCount();
    const totalW = track.scrollWidth;
    const viewW = track.parentElement.offsetWidth;
    const slideW = viewW + 24; // gap
    const maxScroll = totalW - viewW;
    let scrollTo = currentIndex * slideW;
    scrollTo = Math.min(scrollTo, maxScroll);
    track.style.transform = `translateX(-${scrollTo}px)`;

    dotsContainer && dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateSlider();
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxIdx = Math.ceil(cards.length / getVisibleCount()) - 1;
      currentIndex = Math.min(maxIdx, currentIndex + 1);
      updateSlider();
      resetAutoPlay();
    });
  }

  function autoPlay() {
    autoPlayTimer = setInterval(() => {
      const maxIdx = Math.ceil(cards.length / getVisibleCount()) - 1;
      currentIndex = currentIndex >= maxIdx ? 0 : currentIndex + 1;
      updateSlider();
    }, 4000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlay();
  }

  autoPlay();
  updateSlider();

  window.addEventListener('resize', debounce(updateSlider, 200));
}

// ─────────────────────────────────────────
// BACK TO TOP
// ─────────────────────────────────────────
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─────────────────────────────────────────
// QUICK VIEW MODAL
// ─────────────────────────────────────────
function initQuickView() {
  // Open
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-quick-view]');
    if (!trigger) return;
    e.preventDefault();

    const productId = trigger.dataset.quickView;
    openQuickView(productId);
  });

  // Close
  document.addEventListener('click', e => {
    if (e.target.closest('.quick-view-close') || e.target.classList.contains('quick-view-backdrop')) {
      closeQuickView();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeQuickView();
  });
}

function openQuickView(productId) {
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  // Populate with product data from PRODUCTS array if available
  if (typeof PRODUCTS !== 'undefined' && PRODUCTS[productId]) {
    const p = PRODUCTS[productId];
    const img = modal.querySelector('#qv-image');
    const name = modal.querySelector('#qv-name');
    const price = modal.querySelector('#qv-price');
    const desc = modal.querySelector('#qv-desc');

    if (img) img.src = p.image;
    if (name) name.textContent = p.name;
    if (price) price.textContent = `₹${p.price.toLocaleString()}`;
    if (desc) desc.textContent = p.description;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// ─────────────────────────────────────────
// WISHLIST
// ─────────────────────────────────────────
function initWishlist() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.product-action-btn[data-wishlist]');
    if (!btn) return;

    const productId = btn.dataset.wishlist;
    const wishlisted = btn.classList.toggle('active');

    // Update localStorage
    const wishlist = getWishlist();
    if (wishlisted) {
      if (!wishlist.includes(productId)) wishlist.push(productId);
      showToast('Added to wishlist', 'success');
    } else {
      const idx = wishlist.indexOf(productId);
      if (idx > -1) wishlist.splice(idx, 1);
      showToast('Removed from wishlist', 'error');
    }
    saveWishlist(wishlist);
    updateWishlistIcon(btn, wishlisted);
  });

  // Init wishlist state
  const wishlist = getWishlist();
  document.querySelectorAll('[data-wishlist]').forEach(btn => {
    if (wishlist.includes(btn.dataset.wishlist)) {
      btn.classList.add('active');
    }
  });
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('g4u_wishlist') || '[]');
  } catch {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem('g4u_wishlist', JSON.stringify(list));
}

function updateWishlistIcon(btn, active) {
  const icon = btn.querySelector('i');
  if (!icon) return;
  icon.className = active ? 'fas fa-heart' : 'far fa-heart';
}

// ─────────────────────────────────────────
// CART BADGE
// ─────────────────────────────────────────
function initCartBadge() {
  updateCartBadge();
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = getCartCount();
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

function getCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem('g4u_cart') || '[]');
    return cart.reduce((acc, item) => acc + (item.qty || 1), 0);
  } catch {
    return 0;
  }
}

// ─────────────────────────────────────────
// ADD TO CART
// ─────────────────────────────────────────
function initAddToCart() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.add-to-cart-btn, [data-add-cart]');
    if (!btn) return;

    const card = btn.closest('[data-product-id]') || btn.closest('.product-card');
    const productId = (card && card.dataset.productId) || btn.dataset.addCart || 'unknown';
    const name = card && card.querySelector('.product-name')?.textContent;
    const priceEl = card && card.querySelector('.price-current');
    const price = priceEl ? parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) : 0;
    const imgEl = card && card.querySelector('img');
    const image = imgEl ? imgEl.src : '';

    addToCart({ id: productId, name, price, image, qty: 1 });

    btn.classList.add('added');
    setTimeout(() => btn.classList.remove('added'), 1800);

    showToast(`${name || 'Item'} added to cart!`, 'success');
    updateCartBadge();
  });
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(product);
  }
  saveCart(cart);
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('g4u_cart') || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('g4u_cart', JSON.stringify(cart));
}

// ─────────────────────────────────────────
// TOAST NOTIFICATIONS
// ─────────────────────────────────────────
function initToast() {
  if (!document.getElementById('toast')) {
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon"><i class="fas fa-check"></i></div>
      <span class="toast-msg">Message</span>
    `;
    document.body.appendChild(toast);
  }
}

let toastTimer;
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const icon = toast.querySelector('.toast-icon i');
  const msg = toast.querySelector('.toast-msg');

  toast.className = `toast toast-${type}`;
  if (msg) msg.textContent = message;
  if (icon) {
    icon.className = type === 'success' ? 'fas fa-check' :
                     type === 'error'   ? 'fas fa-times' : 'fas fa-info';
  }

  // Show
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

window.showToast = showToast;

// ─────────────────────────────────────────
// ANIMATED COUNTERS
// ─────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      animateCount(el, 0, target, 1800, suffix);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCount(el, start, end, duration, suffix) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(easeOutQuart(progress) * (end - start) + start);
    el.textContent = value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

// ─────────────────────────────────────────
// SMOOTH SCROLL
// ─────────────────────────────────────────
document.addEventListener('click', e => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = document.querySelector(anchor.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ─────────────────────────────────────────
// IMAGE LAZY LOAD (native + fallback)
// ─────────────────────────────────────────
function initLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (img.dataset.src) img.src = img.dataset.src;
    });
    return;
  }

  const lazyImages = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imgObserver.unobserve(img);
    });
  });

  lazyImages.forEach(img => imgObserver.observe(img));
}

initLazyLoad();

// ─────────────────────────────────────────
// NEWSLETTER FORM
// ─────────────────────────────────────────
document.addEventListener('submit', e => {
  const form = e.target.closest('.newsletter-form-el');
  if (!form) return;
  e.preventDefault();

  const input = form.querySelector('.newsletter-input');
  const email = input ? input.value.trim() : '';

  if (!email || !isValidEmail(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate submission
  const btn = form.querySelector('button[type="submit"]');
  if (btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
      btn.disabled = false;
      if (input) input.value = '';
      showToast('You have subscribed successfully!', 'success');

      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 3000);
    }, 1200);
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────
document.addEventListener('submit', e => {
  const form = e.target.closest('.contact-form-el');
  if (!form) return;
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;

  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    form.reset();
    showToast('Your message has been sent. We\'ll get back to you soon!', 'success');

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    }, 3000);
  }, 1500);
});

// ─────────────────────────────────────────
// PRODUCT IMAGE GALLERY (product page)
// ─────────────────────────────────────────
function initProductGallery() {
  const mainImg = document.querySelector('.product-main-image img');
  const thumbs = document.querySelectorAll('.thumb-item');
  if (!mainImg || !thumbs.length) return;

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const src = thumb.querySelector('img')?.src;
      if (src) {
        mainImg.style.opacity = '0';
        mainImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          mainImg.src = src;
          mainImg.style.opacity = '1';
          mainImg.style.transform = 'scale(1)';
        }, 150);
      }
    });
  });

  mainImg.style.transition = 'opacity 0.2s ease, transform 0.3s ease';
}

// ─────────────────────────────────────────
// PRODUCT TABS
// ─────────────────────────────────────────
function initProductTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(`tab-${target}`);
      if (panel) panel.classList.add('active');
    });
  });
}

// ─────────────────────────────────────────
// QUANTITY SELECTOR
// ─────────────────────────────────────────
document.addEventListener('click', e => {
  const btn = e.target.closest('.qty-btn');
  if (!btn) return;

  const control = btn.closest('.qty-control');
  const valueEl = control && control.querySelector('.qty-value');
  if (!valueEl) return;

  let val = parseInt(valueEl.textContent, 10);
  if (btn.classList.contains('qty-minus')) val = Math.max(1, val - 1);
  if (btn.classList.contains('qty-plus')) val = Math.min(99, val + 1);
  valueEl.textContent = val;
});

// ─────────────────────────────────────────
// OPTION BUTTONS
// ─────────────────────────────────────────
document.addEventListener('click', e => {
  const btn = e.target.closest('.option-btn');
  if (!btn) return;

  const group = btn.closest('.option-buttons');
  if (!group) return;

  group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
});

// ─────────────────────────────────────────
// SHOP PAGE – FILTERS
// ─────────────────────────────────────────
function initShopFilters() {
  const filterItems = document.querySelectorAll('.filter-item');
  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        item.classList.toggle('active', checkbox.checked);
      }
    });
  });

  const priceSlider = document.querySelector('.price-slider');
  const priceMax = document.querySelector('.price-max');
  if (priceSlider && priceMax) {
    priceSlider.addEventListener('input', () => {
      priceMax.value = `₹${parseInt(priceSlider.value).toLocaleString()}`;
    });
  }
}

// ─────────────────────────────────────────
// VIEW TOGGLE (grid / list)
// ─────────────────────────────────────────
function initViewToggle() {
  const viewBtns = document.querySelectorAll('.view-btn');
  const grid = document.querySelector('.products-grid');
  if (!viewBtns.length || !grid) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (btn.dataset.view === 'list') {
        grid.classList.add('list-view');
      } else {
        grid.classList.remove('list-view');
      }
    });
  });
}

// ─────────────────────────────────────────
// PASSWORD VISIBILITY TOGGLE
// ─────────────────────────────────────────
document.addEventListener('click', e => {
  const toggle = e.target.closest('.input-toggle');
  if (!toggle) return;

  const input = toggle.previousElementSibling || toggle.closest('.form-group')?.querySelector('input');
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    toggle.className = toggle.className.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    toggle.className = toggle.className.replace('fa-eye-slash', 'fa-eye');
  }
});

// ─────────────────────────────────────────
// PAYMENT METHOD SELECTION
// ─────────────────────────────────────────
document.addEventListener('change', e => {
  const radio = e.target.closest('input[type="radio"][name="payment"]');
  if (!radio) return;

  document.querySelectorAll('.payment-method-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  radio.closest('.payment-method-option')?.classList.add('selected');
});

// ─────────────────────────────────────────
// INIT PAGE-SPECIFIC
// ─────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initAddToCart();
  initProductGallery();
  initProductTabs();
  initShopFilters();
  initViewToggle();
});

// ─────────────────────────────────────────
// UTILITY: DEBOUNCE
// ─────────────────────────────────────────
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ─────────────────────────────────────────
// CURSOR GLOW (premium effect)
// ─────────────────────────────────────────
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,215,0,0.035) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    glow.style.left = mx + 'px';
    glow.style.top = my + 'px';
  });
})();

// ─────────────────────────────────────────
// EXPORT helpers for other modules
// ─────────────────────────────────────────
window.G4U = {
  showToast,
  addToCart,
  getCart,
  saveCart,
  updateCartBadge,
  getCartCount
};
