/* ============================================================
   Gift4You – Product JavaScript
   ============================================================ */

'use strict';

// ─────────────────────────────────────────
// PRODUCT DATA CATALOG
// ─────────────────────────────────────────
const PRODUCTS = {
  'p1': {
    id: 'p1',
    name: 'Luxury Personalized Photo Frame',
    category: '3D Photo Frames',
    price: 1299,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 128,
    description: 'A premium 3D LED photo frame crafted with love. Perfect for birthdays, anniversaries, and wedding gifts. Personalize it with your favorite memory.',
    images: [
      'https://picsum.photos/seed/frame1/600/600',
      'https://picsum.photos/seed/frame2/600/600',
      'https://picsum.photos/seed/frame3/600/600',
      'https://picsum.photos/seed/frame4/600/600'
    ],
    badge: 'Best Seller',
    variants: ['Small (4×6)', 'Medium (5×7)', 'Large (8×10)'],
    features: ['LED illumination', 'Personalized text', 'Premium wood frame', 'Gift packaging']
  },
  'p2': {
    id: 'p2',
    name: 'Romantic Couple Gift Box',
    category: 'Couple Gifts',
    price: 2499,
    originalPrice: 3499,
    rating: 4.9,
    reviews: 97,
    description: 'The ultimate romantic gift set for couples. Includes scented candles, chocolates, a personalized card, and a luxurious keepsake.',
    images: [
      'https://picsum.photos/seed/couple1/600/600',
      'https://picsum.photos/seed/couple2/600/600',
      'https://picsum.photos/seed/couple3/600/600',
      'https://picsum.photos/seed/couple4/600/600'
    ],
    badge: 'Top Rated',
    variants: ['Classic', 'Premium', 'Deluxe'],
    features: ['Handcrafted box', 'Scented candles', 'Personalized card', 'Premium chocolates']
  },
  'p3': {
    id: 'p3',
    name: 'Birthday Surprise Gift Hamper',
    category: 'Birthday Gifts',
    price: 1899,
    originalPrice: 2599,
    rating: 4.7,
    reviews: 214,
    description: 'Make birthdays unforgettable with our handcrafted birthday surprise hamper, packed with premium goodies and personalized to perfection.',
    images: [
      'https://picsum.photos/seed/bday1/600/600',
      'https://picsum.photos/seed/bday2/600/600',
      'https://picsum.photos/seed/bday3/600/600',
      'https://picsum.photos/seed/bday4/600/600'
    ],
    badge: 'Sale',
    variants: ['For Her', 'For Him', 'For Kids'],
    features: ['Customizable', 'Festive packaging', 'Free message card', 'Same-day delivery']
  },
  'p4': {
    id: 'p4',
    name: 'Premium Crystal Award Trophy',
    category: 'Personalized Gifts',
    price: 3299,
    originalPrice: 4299,
    rating: 4.9,
    reviews: 63,
    description: 'Celebrate achievements with our premium crystal award trophy. Engraved with custom text, it is the perfect gift for corporate milestones and personal victories.',
    images: [
      'https://picsum.photos/seed/trophy1/600/600',
      'https://picsum.photos/seed/trophy2/600/600',
      'https://picsum.photos/seed/trophy3/600/600',
      'https://picsum.photos/seed/trophy4/600/600'
    ],
    badge: 'Premium',
    variants: ['Small', 'Medium', 'Large', 'Extra Large'],
    features: ['Laser engraved', 'Optical crystal', 'Velvet gift box', 'Corporate discounts']
  },
  'p5': {
    id: 'p5',
    name: 'Artisan Scented Candle Gift Set',
    category: 'Gift Boxes',
    price: 999,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 341,
    description: 'A curated set of four artisan scented candles in premium fragrances. Hand-poured in small batches for the ultimate sensory experience.',
    images: [
      'https://picsum.photos/seed/candle1/600/600',
      'https://picsum.photos/seed/candle2/600/600',
      'https://picsum.photos/seed/candle3/600/600',
      'https://picsum.photos/seed/candle4/600/600'
    ],
    badge: 'Popular',
    variants: ['Lavender Set', 'Citrus Set', 'Floral Set', 'Mixed Set'],
    features: ['Soy wax', 'Hand-poured', '45hr burn time', 'Elegant packaging']
  },
  'p6': {
    id: 'p6',
    name: 'Personalized Name Necklace',
    category: 'Personalized Gifts',
    price: 1599,
    originalPrice: 2199,
    rating: 4.8,
    reviews: 189,
    description: 'A beautiful personalized name necklace crafted in 925 sterling silver. A timeless piece of jewelry that carries your unique identity.',
    images: [
      'https://picsum.photos/seed/necklace1/600/600',
      'https://picsum.photos/seed/necklace2/600/600',
      'https://picsum.photos/seed/necklace3/600/600',
      'https://picsum.photos/seed/necklace4/600/600'
    ],
    badge: 'New',
    variants: ['Gold Plated', 'Silver', 'Rose Gold'],
    features: ['925 sterling silver', 'Up to 10 characters', 'Adjustable chain', 'Gift box included']
  },
  'p7': {
    id: 'p7',
    name: 'Custom Star Map Print',
    category: 'Personalized Gifts',
    price: 849,
    originalPrice: 1199,
    rating: 4.7,
    reviews: 276,
    description: 'Immortalize a special moment with a custom star map showing exactly how the night sky looked on your important date.',
    images: [
      'https://picsum.photos/seed/starmap1/600/600',
      'https://picsum.photos/seed/starmap2/600/600',
      'https://picsum.photos/seed/starmap3/600/600',
      'https://picsum.photos/seed/starmap4/600/600'
    ],
    badge: null,
    variants: ['A4 Print', 'A3 Print', 'Framed A4', 'Framed A3'],
    features: ['Accurate star positions', 'Customizable colors', 'Premium paper', 'Digital proof']
  },
  'p8': {
    id: 'p8',
    name: 'Luxury Chocolate Gift Box',
    category: 'Gift Boxes',
    price: 1199,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 453,
    description: 'An exquisite collection of 20 handcrafted premium chocolates from around the world. The perfect indulgent gift for any occasion.',
    images: [
      'https://picsum.photos/seed/choco1/600/600',
      'https://picsum.photos/seed/choco2/600/600',
      'https://picsum.photos/seed/choco3/600/600',
      'https://picsum.photos/seed/choco4/600/600'
    ],
    badge: 'Best Seller',
    variants: ['Assorted 20pc', 'Dark Chocolate', 'Milk Chocolate', 'White Chocolate'],
    features: ['20 premium pieces', 'Imported chocolates', 'Luxury box', 'Personalized ribbon']
  }
};

// ─────────────────────────────────────────
// PRODUCT PAGE INIT
// ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initProductPage();
  initProductGrid();
  initQuickViewProduct();
  initShopSearch();
  initShopSort();
  initShopPagination();
});

// ─────────────────────────────────────────
// PRODUCT DETAIL PAGE
// ─────────────────────────────────────────
function initProductPage() {
  const productContainer = document.getElementById('product-detail');
  if (!productContainer) return;

  // Get product id from URL
  const params = new URLSearchParams(location.search);
  const productId = params.get('id') || 'p1';
  const product = PRODUCTS[productId];

  if (!product) {
    productContainer.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:60px 0">Product not found.</p>';
    return;
  }

  // Inject product data
  populateProductPage(product);
  initProductReviews(product);
}

function populateProductPage(product) {
  setTextContent('pd-category', product.category);
  setTextContent('pd-name', product.name);
  setTextContent('pd-price', formatPrice(product.price));
  setTextContent('pd-original-price', formatPrice(product.originalPrice));

  const saving = product.originalPrice - product.price;
  const savePct = Math.round((saving / product.originalPrice) * 100);
  setTextContent('pd-saving', `Save ${formatPrice(saving)} (${savePct}% off)`);
  setTextContent('pd-description', product.description);

  // Rating
  setRatingStars('pd-stars', product.rating);
  setTextContent('pd-rating-text', `${product.rating} (${product.reviews} reviews)`);

  // Images
  const mainImg = document.getElementById('pd-main-img');
  if (mainImg && product.images[0]) {
    mainImg.src = product.images[0];
    mainImg.alt = product.name;
  }

  const thumbsContainer = document.getElementById('pd-thumbs');
  if (thumbsContainer && product.images) {
    thumbsContainer.innerHTML = product.images.map((img, i) => `
      <div class="thumb-item ${i === 0 ? 'active' : ''}" data-img="${escapeAttr(img)}">
        <img src="${escapeAttr(img)}" alt="View ${i + 1}" loading="lazy">
      </div>
    `).join('');

    // Thumb click
    thumbsContainer.querySelectorAll('.thumb-item').forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbsContainer.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        if (mainImg) {
          mainImg.style.opacity = '0';
          mainImg.style.transform = 'scale(0.97)';
          setTimeout(() => {
            mainImg.src = thumb.dataset.img;
            mainImg.style.opacity = '1';
            mainImg.style.transform = 'scale(1)';
          }, 150);
        }
      });
    });
  }

  // Variants
  const variantsContainer = document.getElementById('pd-variants');
  if (variantsContainer && product.variants) {
    variantsContainer.innerHTML = product.variants.map((v, i) => `
      <button class="option-btn ${i === 0 ? 'active' : ''}">${escapeHTML(v)}</button>
    `).join('');
  }

  // Features
  const featuresContainer = document.getElementById('pd-features');
  if (featuresContainer && product.features) {
    featuresContainer.innerHTML = product.features.map(f => `
      <div class="product-feature">
        <i class="fas fa-check-circle"></i>
        <span>${escapeHTML(f)}</span>
      </div>
    `).join('');
  }

  // Add to cart
  const cartBtn = document.getElementById('pd-add-cart');
  if (cartBtn) {
    cartBtn.dataset.addCart = product.id;
    cartBtn.addEventListener('click', () => {
      const qty = parseInt(document.querySelector('#pd-qty .qty-value')?.textContent || '1', 10);
      const cart = getCartFromStorage();
      const existing = cart.find(i => i.id === product.id);

      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          variant: document.querySelector('#pd-variants .option-btn.active')?.textContent || 'Standard',
          qty
        });
      }

      localStorage.setItem('g4u_cart', JSON.stringify(cart));
      updateCartBadgesAll();

      const origHTML = cartBtn.innerHTML;
      cartBtn.innerHTML = '<i class="fas fa-check"></i> Added to Cart!';
      window.showToast && window.showToast(`${product.name} added to cart!`, 'success');

      setTimeout(() => {
        cartBtn.innerHTML = origHTML;
      }, 1800);
    });
  }

  // Buy Now
  const buyBtn = document.getElementById('pd-buy-now');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      const cartBtn = document.getElementById('pd-add-cart');
      if (cartBtn) cartBtn.click();
      setTimeout(() => { window.location.href = 'cart.html'; }, 300);
    });
  }

  // Wishlist
  const wishBtn = document.getElementById('pd-wishlist');
  if (wishBtn) {
    wishBtn.dataset.wishlist = product.id;
    const wishlist = getWishlistFromStorage();
    if (wishlist.includes(product.id)) {
      wishBtn.classList.add('active');
      wishBtn.querySelector('i') && (wishBtn.querySelector('i').className = 'fas fa-heart');
      wishBtn.querySelector('span') && (wishBtn.querySelector('span').textContent = 'Wishlisted');
    }
  }

  // Set document title
  document.title = `${product.name} – Gift4You`;
}

function initProductReviews(product) {
  const container = document.getElementById('pd-reviews');
  if (!container) return;

  const sampleReviews = [
    { name: 'Priya Sharma', rating: 5, date: '2 weeks ago', text: 'Absolutely stunning product! The quality exceeded my expectations. Perfect gift for my anniversary.', avatar: 'https://picsum.photos/seed/rev1/50/50' },
    { name: 'Rahul Mehta', rating: 5, date: '1 month ago', text: 'Ordered for my girlfriend\'s birthday and she loved it! Fast delivery and beautiful packaging.', avatar: 'https://picsum.photos/seed/rev2/50/50' },
    { name: 'Ananya Patel', rating: 4, date: '3 weeks ago', text: 'Great quality and very thoughtful gift. The personalization was perfect. Will definitely order again.', avatar: 'https://picsum.photos/seed/rev3/50/50' },
    { name: 'Vikram Singh', rating: 5, date: '5 days ago', text: 'Outstanding craftsmanship. The attention to detail is remarkable. Gift4You never disappoints!', avatar: 'https://picsum.photos/seed/rev4/50/50' }
  ];

  container.innerHTML = sampleReviews.map(r => `
    <div class="review-card reveal delay-1">
      <div class="review-quote">"</div>
      <div class="review-stars">${renderStars(r.rating)}</div>
      <p class="review-text">${escapeHTML(r.text)}</p>
      <div class="review-author">
        <img src="${escapeAttr(r.avatar)}" alt="${escapeAttr(r.name)}" class="review-avatar" loading="lazy">
        <div class="review-author-info">
          <h4>${escapeHTML(r.name)}</h4>
          <p>${escapeHTML(r.date)}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// ─────────────────────────────────────────
// PRODUCT GRID (shop page + homepage)
// ─────────────────────────────────────────
function initProductGrid() {
  const grids = document.querySelectorAll('[data-product-grid]');
  grids.forEach(grid => {
    const type = grid.dataset.productGrid;
    const limit = parseInt(grid.dataset.limit || '8', 10);

    let items = Object.values(PRODUCTS);

    if (type === 'bestsellers') {
      items = items.filter(p => p.badge === 'Best Seller' || p.rating >= 4.8);
    } else if (type === 'featured') {
      items = items.filter(p => p.badge === 'Top Rated' || p.badge === 'Premium');
    }

    items = items.slice(0, limit);
    grid.innerHTML = items.map(createProductCardHTML).join('');
  });
}

function createProductCardHTML(product) {
  const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const wishlist = getWishlistFromStorage();
  const isWishlisted = wishlist.includes(product.id);

  return `
    <div class="product-card reveal" data-product-id="${escapeAttr(product.id)}">
      <div class="product-card-image">
        <img 
          src="${escapeAttr(product.images[0])}" 
          alt="${escapeAttr(product.name)}" 
          loading="lazy"
        >
        <div class="product-badges">
          ${product.badge ? `<span class="badge badge-gold">${escapeHTML(product.badge)}</span>` : ''}
          ${discountPct > 0 ? `<span class="badge badge-red">-${discountPct}%</span>` : ''}
        </div>
        <div class="product-actions">
          <button 
            class="product-action-btn ${isWishlisted ? 'active' : ''}" 
            data-wishlist="${escapeAttr(product.id)}" 
            title="Add to Wishlist"
            aria-label="Add to wishlist"
          >
            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
          </button>
          <a 
            href="product.html?id=${escapeAttr(product.id)}" 
            class="product-action-btn" 
            title="Quick View"
            aria-label="View product"
            data-quick-view="${escapeAttr(product.id)}"
          >
            <i class="far fa-eye"></i>
          </a>
        </div>
        <a href="product.html?id=${escapeAttr(product.id)}" class="product-quick-view">
          <i class="fas fa-eye"></i> Quick View
        </a>
      </div>
      <div class="product-card-info">
        <div class="product-category">${escapeHTML(product.category)}</div>
        <a href="product.html?id=${escapeAttr(product.id)}">
          <div class="product-name">${escapeHTML(product.name)}</div>
        </a>
        <div class="product-rating">
          <div class="stars">${renderStars(product.rating)}</div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price-row">
          <div class="product-price">
            <span class="price-current">${formatPrice(product.price)}</span>
            <span class="price-original">${formatPrice(product.originalPrice)}</span>
          </div>
          <button 
            class="add-to-cart-btn" 
            data-add-cart="${escapeAttr(product.id)}"
            data-name="${escapeAttr(product.name)}"
            data-price="${product.price}"
            data-image="${escapeAttr(product.images[0])}"
            title="Add to Cart"
            aria-label="Add to cart"
          >
            <i class="fas fa-shopping-bag"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────
// QUICK VIEW PRODUCT POPUP
// ─────────────────────────────────────────
function initQuickViewProduct() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-quick-view]');
    if (!btn) return;
    e.preventDefault();

    const productId = btn.dataset.quickView;
    const product = PRODUCTS[productId];
    if (!product) return;

    openProductQuickView(product);
  });
}

function openProductQuickView(product) {
  let modal = document.getElementById('quick-view-modal');

  if (!modal) {
    modal = createQuickViewModal();
    document.body.appendChild(modal);
  }

  modal.querySelector('#qv-image').src = product.images[0];
  modal.querySelector('#qv-image').alt = product.name;
  modal.querySelector('#qv-category').textContent = product.category;
  modal.querySelector('#qv-name').textContent = product.name;
  modal.querySelector('#qv-price').textContent = formatPrice(product.price);
  modal.querySelector('#qv-original').textContent = formatPrice(product.originalPrice);
  modal.querySelector('#qv-stars').innerHTML = renderStars(product.rating);
  modal.querySelector('#qv-reviews').textContent = `(${product.reviews} reviews)`;
  modal.querySelector('#qv-desc').textContent = product.description;
  modal.querySelector('#qv-add-cart').dataset.addCartId = product.id;
  modal.querySelector('#qv-view').href = `product.html?id=${product.id}`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function createQuickViewModal() {
  const modal = document.createElement('div');
  modal.id = 'quick-view-modal';
  modal.className = 'quick-view-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Quick View');

  modal.innerHTML = `
    <div class="quick-view-backdrop"></div>
    <div class="quick-view-content">
      <button class="quick-view-close" aria-label="Close">
        <i class="fas fa-times"></i>
      </button>
      <div class="quick-view-image">
        <img id="qv-image" src="" alt="" loading="lazy">
      </div>
      <div class="quick-view-info">
        <div class="product-category" id="qv-category"></div>
        <h2 class="product-info-title" id="qv-name" style="font-size:1.4rem;margin-bottom:12px"></h2>
        <div class="product-rating" style="margin-bottom:16px">
          <div class="stars" id="qv-stars"></div>
          <span class="rating-count" id="qv-reviews"></span>
        </div>
        <div class="product-price-section" style="margin-bottom:20px">
          <div class="product-price-large" id="qv-price"></div>
          <span class="product-price-original" id="qv-original"></span>
        </div>
        <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.6;margin-bottom:24px" id="qv-desc"></p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <button id="qv-add-cart" class="btn btn-primary btn-sm" style="flex:1;justify-content:center;min-width:140px">
            <i class="fas fa-shopping-bag"></i> Add to Cart
          </button>
          <a id="qv-view" href="#" class="btn btn-outline btn-sm" style="flex:1;justify-content:center;min-width:120px">
            View Details
          </a>
        </div>
      </div>
    </div>
  `;

  // Close events
  modal.querySelector('.quick-view-backdrop').addEventListener('click', () => closeModal(modal));
  modal.querySelector('.quick-view-close').addEventListener('click', () => closeModal(modal));

  // Add to cart from quick view
  modal.querySelector('#qv-add-cart').addEventListener('click', function() {
    const productId = this.dataset.addCartId;
    const product = PRODUCTS[productId];
    if (!product) return;

    const cart = getCartFromStorage();
    const existing = cart.find(i => i.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, image: product.images[0], qty: 1 });
    }
    localStorage.setItem('g4u_cart', JSON.stringify(cart));
    updateCartBadgesAll();

    const origHTML = this.innerHTML;
    this.innerHTML = '<i class="fas fa-check"></i> Added!';
    window.showToast && window.showToast(`${product.name} added to cart!`, 'success');
    setTimeout(() => { this.innerHTML = origHTML; }, 1800);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(modal);
  });

  return modal;
}

function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// ─────────────────────────────────────────
// SHOP SEARCH
// ─────────────────────────────────────────
let searchTimeout;
function initShopSearch() {
  const searchInput = document.querySelector('.search-input');
  const grid = document.querySelector('[data-product-grid="shop"]');
  if (!searchInput || !grid) return;

  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const query = searchInput.value.trim().toLowerCase();
      filterProducts({ query });
    }, 300);
  });
}

// ─────────────────────────────────────────
// SHOP SORT
// ─────────────────────────────────────────
function initShopSort() {
  const sortSelect = document.querySelector('.sort-select');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', () => {
    filterProducts({ sortBy: sortSelect.value });
  });
}

// ─────────────────────────────────────────
// FILTER PRODUCTS
// ─────────────────────────────────────────
let currentFilters = { query: '', sortBy: 'featured', categories: [], maxPrice: Infinity };

function filterProducts(overrides = {}) {
  Object.assign(currentFilters, overrides);
  const grid = document.querySelector('[data-product-grid="shop"]');
  if (!grid) return;

  const searchInput = document.querySelector('.search-input');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : currentFilters.query;

  const sortSelect = document.querySelector('.sort-select');
  const sortBy = sortSelect ? sortSelect.value : currentFilters.sortBy;

  // Get checked categories
  const checkedCategories = [...document.querySelectorAll('.filter-item.active .filter-item-label')]
    .map(el => el.textContent.trim().toLowerCase());

  let products = Object.values(PRODUCTS);

  // Filter by search
  if (query) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (checkedCategories.length > 0) {
    products = products.filter(p =>
      checkedCategories.some(cat => p.category.toLowerCase().includes(cat))
    );
  }

  // Sort
  switch (sortBy) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      products.reverse();
      break;
    default:
      break;
  }

  const countEl = document.querySelector('.shop-results-count b');
  if (countEl) countEl.textContent = products.length;

  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:80px 0;color:var(--text-muted)">
        <i class="fas fa-search" style="font-size:3rem;opacity:0.2;display:block;margin-bottom:20px"></i>
        <p>No products found for your search.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(createProductCardHTML).join('');
}

// ─────────────────────────────────────────
// PAGINATION
// ─────────────────────────────────────────
function initShopPagination() {
  const paginationBtns = document.querySelectorAll('.page-btn[data-page]');
  paginationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paginationBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Scroll to shop top
      document.querySelector('.shop-layout')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ─────────────────────────────────────────
// ADD-TO-CART FROM PRODUCT CARDS (enhanced)
// ─────────────────────────────────────────
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-add-cart]');
  if (!btn) return;

  const productId = btn.dataset.addCart;
  const product = PRODUCTS[productId];
  if (!product) return;

  const cart = getCartFromStorage();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.images[0], qty: 1 });
  }
  localStorage.setItem('g4u_cart', JSON.stringify(cart));
  updateCartBadgesAll();

  btn.classList.add('added');
  setTimeout(() => btn.classList.remove('added'), 1800);

  window.showToast && window.showToast(`${product.name} added to cart!`, 'success');
});

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
function getCartFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('g4u_cart') || '[]');
  } catch {
    return [];
  }
}

function getWishlistFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('g4u_wishlist') || '[]');
  } catch {
    return [];
  }
}

function updateCartBadgesAll() {
  const cart = getCartFromStorage();
  const count = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

function setTextContent(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function formatPrice(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    '<i class="fas fa-star"></i>'.repeat(full) +
    (half ? '<i class="fas fa-star-half-alt"></i>' : '') +
    '<i class="far fa-star"></i>'.repeat(empty)
  );
}

function setRatingStars(id, rating) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = renderStars(rating);
}

function escapeHTML(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(str) {
  return escapeHTML(String(str || ''));
}

// Export
window.PRODUCTS = PRODUCTS;
window.formatPrice = formatPrice;
window.renderStars = renderStars;
