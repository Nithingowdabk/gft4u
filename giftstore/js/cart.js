/* ============================================================
   Gift4You – Cart JavaScript
   ============================================================ */

'use strict';

// ── Cart State ──
let cartState = {
  items: [],
  couponCode: '',
  discount: 0,
  shipping: 99,
  freeShippingThreshold: 999
};

const COUPON_CODES = {
  'GIFT10': { type: 'percent', value: 10, label: '10% off' },
  'SAVE20': { type: 'percent', value: 20, label: '20% off' },
  'FLAT50': { type: 'fixed', value: 50, label: '₹50 off' },
  'FREESHIP': { type: 'shipping', value: 0, label: 'Free Shipping' }
};

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderCart();
  initCartEvents();
});

// ─────────────────────────────────────────
// LOAD CART FROM STORAGE
// ─────────────────────────────────────────
function loadCart() {
  try {
    const stored = localStorage.getItem('g4u_cart');
    cartState.items = stored ? JSON.parse(stored) : [];
  } catch {
    cartState.items = [];
  }
}

// ─────────────────────────────────────────
// SAVE CART TO STORAGE
// ─────────────────────────────────────────
function persistCart() {
  localStorage.setItem('g4u_cart', JSON.stringify(cartState.items));
  updateCartBadges();
}

function updateCartBadges() {
  const count = cartState.items.reduce((acc, item) => acc + (item.qty || 1), 0);
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ─────────────────────────────────────────
// RENDER CART
// ─────────────────────────────────────────
function renderCart() {
  const listEl = document.getElementById('cart-items-list');
  const emptyEl = document.getElementById('cart-empty');
  const summaryEl = document.getElementById('order-summary');
  if (!listEl) return;

  if (cartState.items.length === 0) {
    listEl.innerHTML = '';
    listEl.style.display = 'none';
    if (emptyEl) emptyEl.style.display = 'block';
    if (summaryEl) summaryEl.style.display = 'none';

    const header = document.querySelector('.cart-items-header');
    if (header) header.style.display = 'none';
    return;
  }

  listEl.style.display = 'block';
  if (emptyEl) emptyEl.style.display = 'none';
  if (summaryEl) summaryEl.style.display = 'block';

  const header = document.querySelector('.cart-items-header');
  if (header) header.style.display = 'grid';

  listEl.innerHTML = cartState.items.map((item, index) => createCartItemHTML(item, index)).join('');

  renderSummary();
  updateCartBadges();
}

function createCartItemHTML(item, index) {
  const subtotal = (item.price * item.qty).toLocaleString('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  });
  const priceStr = item.price.toLocaleString('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  });

  return `
    <div class="cart-item" data-item-id="${escapeHTML(item.id)}">
      <div class="cart-item-product">
        <img 
          src="${escapeHTML(item.image || 'https://picsum.photos/seed/' + item.id + '/80/80')}" 
          alt="${escapeHTML(item.name || 'Product')}" 
          class="cart-item-img"
          loading="lazy"
        >
        <div>
          <div class="cart-item-name">${escapeHTML(item.name || 'Product')}</div>
          <div class="cart-item-variant">${escapeHTML(item.variant || 'Standard')}</div>
        </div>
      </div>
      <div class="cart-item-price">${priceStr}</div>
      <div class="cart-item-qty">
        <div class="qty-control" style="width:fit-content">
          <button class="qty-btn qty-minus" data-idx="${index}" aria-label="Decrease quantity">
            <i class="fas fa-minus" style="font-size:0.7rem"></i>
          </button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn qty-plus" data-idx="${index}" aria-label="Increase quantity">
            <i class="fas fa-plus" style="font-size:0.7rem"></i>
          </button>
        </div>
      </div>
      <div class="cart-item-subtotal">${subtotal}</div>
      <button class="cart-item-remove" data-idx="${index}" aria-label="Remove item">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
}

// ─────────────────────────────────────────
// RENDER ORDER SUMMARY
// ─────────────────────────────────────────
function renderSummary() {
  const subtotal = getSubtotal();
  const shipping = getShipping(subtotal);
  const discount = getDiscount(subtotal);
  const total = Math.max(0, subtotal - discount + shipping);

  const subtotalEl = document.getElementById('summary-subtotal');
  const shippingEl = document.getElementById('summary-shipping');
  const discountEl = document.getElementById('summary-discount');
  const discountRow = document.getElementById('summary-discount-row');
  const totalEl = document.getElementById('summary-total');
  const itemCountEl = document.getElementById('summary-item-count');

  const count = cartState.items.reduce((acc, item) => acc + item.qty, 0);

  if (itemCountEl) itemCountEl.textContent = `${count} item${count !== 1 ? 's' : ''}`;
  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatCurrency(shipping);
  if (totalEl) totalEl.textContent = formatCurrency(total);

  if (discountEl && discountRow) {
    if (discount > 0) {
      discountEl.textContent = `-${formatCurrency(discount)}`;
      discountRow.style.display = 'flex';
    } else {
      discountRow.style.display = 'none';
    }
  }

  // Free shipping progress
  const freeShipBar = document.getElementById('free-ship-bar');
  const freeShipMsg = document.getElementById('free-ship-msg');
  if (freeShipBar && freeShipMsg) {
    const remaining = cartState.freeShippingThreshold - subtotal;
    if (remaining > 0) {
      const pct = Math.min((subtotal / cartState.freeShippingThreshold) * 100, 100);
      freeShipBar.style.width = pct + '%';
      freeShipMsg.textContent = `Add ${formatCurrency(remaining)} more for FREE shipping!`;
    } else {
      freeShipBar.style.width = '100%';
      freeShipMsg.textContent = 'You\'ve unlocked FREE shipping!';
      freeShipMsg.style.color = '#38ef7d';
    }
  }

  // Sync checkout page items
  syncCheckoutItems();
}

function getSubtotal() {
  return cartState.items.reduce((acc, item) => acc + (item.price * item.qty), 0);
}

function getShipping(subtotal) {
  if (cartState.couponCode === 'FREESHIP') return 0;
  return subtotal >= cartState.freeShippingThreshold ? 0 : cartState.shipping;
}

function getDiscount(subtotal) {
  const coupon = COUPON_CODES[cartState.couponCode];
  if (!coupon || coupon.type === 'shipping') return 0;
  if (coupon.type === 'percent') return Math.floor(subtotal * coupon.value / 100);
  if (coupon.type === 'fixed') return coupon.value;
  return 0;
}

function formatCurrency(val) {
  return '₹' + val.toLocaleString('en-IN');
}

// ─────────────────────────────────────────
// SYNC CHECKOUT PAGE ITEMS
// ─────────────────────────────────────────
function syncCheckoutItems() {
  const container = document.getElementById('checkout-items');
  if (!container) return;

  container.innerHTML = cartState.items.map(item => `
    <div class="checkout-product-item">
      <img 
        src="${escapeHTML(item.image || 'https://picsum.photos/seed/' + item.id + '/60/60')}" 
        alt="${escapeHTML(item.name || 'Product')}" 
        class="checkout-product-img"
        loading="lazy"
      >
      <div class="checkout-product-info">
        <h4>${escapeHTML(item.name || 'Product')}</h4>
        <p>Qty: ${item.qty}</p>
      </div>
      <div class="checkout-product-price">${formatCurrency(item.price * item.qty)}</div>
    </div>
  `).join('');

  // Update checkout totals
  const subtotal = getSubtotal();
  const shipping = getShipping(subtotal);
  const discount = getDiscount(subtotal);
  const total = Math.max(0, subtotal - discount + shipping);

  setEl('co-subtotal', formatCurrency(subtotal));
  setEl('co-shipping', shipping === 0 ? 'FREE' : formatCurrency(shipping));
  setEl('co-total', formatCurrency(total));
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ─────────────────────────────────────────
// CART EVENTS
// ─────────────────────────────────────────
function initCartEvents() {
  // Qty buttons
  document.addEventListener('click', e => {
    const btn = e.target.closest('.qty-btn[data-idx]');
    if (!btn) return;

    const idx = parseInt(btn.dataset.idx, 10);
    if (isNaN(idx) || !cartState.items[idx]) return;

    if (btn.classList.contains('qty-plus')) {
      cartState.items[idx].qty = Math.min(cartState.items[idx].qty + 1, 99);
    } else if (btn.classList.contains('qty-minus')) {
      cartState.items[idx].qty = Math.max(cartState.items[idx].qty - 1, 1);
    }

    persistCart();
    renderCart();
  });

  // Remove item
  document.addEventListener('click', e => {
    const btn = e.target.closest('.cart-item-remove[data-idx]');
    if (!btn) return;

    const idx = parseInt(btn.dataset.idx, 10);
    if (isNaN(idx)) return;

    const removed = cartState.items.splice(idx, 1);
    persistCart();
    renderCart();

    if (window.showToast && removed[0]) {
      window.showToast(`Removed from cart`, 'error');
    }
  });

  // Coupon apply
  const couponBtn = document.getElementById('apply-coupon-btn');
  if (couponBtn) {
    couponBtn.addEventListener('click', applyCoupon);
  }

  const couponInput = document.getElementById('coupon-input');
  if (couponInput) {
    couponInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') applyCoupon();
    });
  }

  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cartState.items.length === 0) {
        window.showToast && window.showToast('Your cart is empty!', 'error');
        return;
      }
      window.location.href = 'checkout.html';
    });
  }

  // Checkout form submit
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
}

// ─────────────────────────────────────────
// COUPON
// ─────────────────────────────────────────
function applyCoupon() {
  const input = document.getElementById('coupon-input');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  const msgEl = document.getElementById('coupon-msg');

  if (!code) {
    showCouponMsg('Please enter a coupon code.', 'error');
    return;
  }

  const coupon = COUPON_CODES[code];

  if (!coupon) {
    showCouponMsg('Invalid coupon code.', 'error');
    cartState.couponCode = '';
    cartState.discount = 0;
    renderSummary();
    return;
  }

  cartState.couponCode = code;
  renderSummary();
  showCouponMsg(`✓ Coupon applied: ${coupon.label}`, 'success');
  window.showToast && window.showToast(`Coupon "${code}" applied!`, 'success');
}

function showCouponMsg(msg, type) {
  const el = document.getElementById('coupon-msg');
  if (!el) return;
  el.textContent = msg;
  el.style.color = type === 'success' ? '#38ef7d' : '#FF416C';
  el.style.fontSize = '0.8rem';
  el.style.marginTop = '6px';
}

// ─────────────────────────────────────────
// CHECKOUT FORM
// ─────────────────────────────────────────
function handleCheckoutSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const inputs = form.querySelectorAll('[required]');
  let valid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#FF416C';
      valid = false;
    } else {
      input.style.borderColor = '';
    }
  });

  if (!valid) {
    window.showToast && window.showToast('Please fill in all required fields.', 'error');
    return;
  }

  const btn = form.querySelector('.place-order-btn');
  if (!btn) return;

  const origHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Placing Order...';
  btn.disabled = true;

  setTimeout(() => {
    // Clear cart
    cartState.items = [];
    cartState.couponCode = '';
    persistCart();

    // Redirect to success
    window.location.href = createOrderSuccessURL(form);
  }, 2000);
}

function createOrderSuccessURL(form) {
  const name = form.querySelector('#fname')?.value || 'Customer';
  return `index.html?order=success&name=${encodeURIComponent(name)}`;
}

// ─────────────────────────────────────────
// ORDER SUCCESS TOAST
// ─────────────────────────────────────────
(function checkOrderSuccess() {
  const params = new URLSearchParams(location.search);
  if (params.get('order') === 'success') {
    const name = params.get('name') || 'Customer';
    setTimeout(() => {
      window.showToast && window.showToast(
        `🎉 Order placed successfully! Thank you, ${name}!`, 'success'
      );
    }, 1000);
    // Clean URL
    history.replaceState({}, '', location.pathname);
  }
})();

// ─────────────────────────────────────────
// SECURITY: ESCAPE HTML
// ─────────────────────────────────────────
function escapeHTML(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
