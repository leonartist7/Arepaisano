/* ============================================================
   AREPAISANO — Cart, Navigation & WhatsApp Order
   ============================================================ */

const CART_STORAGE_KEY = 'arepaisano-cart';
let cart = loadCart();
let lastFocusedElement = null;

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    return savedCart && typeof savedCart === 'object' ? savedCart : {};
  } catch {
    return {};
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/* ── ADD TO CART ── */
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
  const btn = document.getElementById(`btn-${id}`);
  if (!btn) return;
  btn.classList.add('added');
  btn.textContent = '✓ Agregado';
  setTimeout(() => {
    btn.classList.remove('added');
    btn.textContent = '+ Agregar';
  }, 1500);
}

/* ── UPDATE QUANTITY ── */
function updateQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  updateCartUI();
  renderCartItems();
}

/* ── UPDATE CART COUNT BADGE ── */
function updateCartUI() {
  const total = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartCount = document.getElementById('cartCount');
  if (cartCount) cartCount.textContent = total;
  saveCart();
  renderCartItems();
}

/* ── RENDER CART ITEMS ── */
function renderCartItems() {
  const container = document.getElementById('cartItems');
  const keys = Object.keys(cart).map(Number);

  if (keys.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <span class="empty-icon">🫓</span>
        <p>Tu pedido está vacío.<br>¡Agrega unas arepas!</p>
      </div>`;
    document.getElementById('cartTotal').textContent = '$0.00';
    return;
  }

  let totalPrice = 0;
  container.innerHTML = keys.map(id => {
    const p = products.find(x => x.id === id);
    const qty = cart[id];
    const subtotal = p.price * qty;
    totalPrice += subtotal;
    return `
      <div class="cart-item">
        <span class="cart-item-icon">${p.icon}</span>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">$${subtotal.toFixed(2)}</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQty(${id}, -1)" aria-label="Quitar uno">−</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn" onclick="updateQty(${id}, 1)" aria-label="Agregar uno">+</button>
        </div>
      </div>`;
  }).join('');

  document.getElementById('cartTotal').textContent = `$${totalPrice.toFixed(2)}`;
}

/* ── TOGGLE CART DRAWER ── */
function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const cartButton = document.querySelector('.cart-btn');
  const isOpen = !drawer.classList.contains('open');

  if (isOpen) {
    lastFocusedElement = document.activeElement;
  }

  drawer.classList.toggle('open', isOpen);
  drawer.setAttribute('aria-hidden', String(!isOpen));
  overlay.classList.toggle('open', isOpen);
  overlay.setAttribute('aria-hidden', String(!isOpen));
  cartButton.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('cart-is-open', isOpen);

  if (isOpen) {
    drawer.querySelector('.cart-close').focus();
  } else if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

/* ── SEND ORDER TO WHATSAPP ── */
function sendToWhatsApp() {
  const keys = Object.keys(cart).map(Number);
  if (keys.length === 0) {
    alert('¡Agrega productos primero!');
    return;
  }

  let msg = '¡Hola Martha! 👋 Quiero hacer el siguiente pedido:\n\n';
  let total = 0;

  keys.forEach(id => {
    const p = products.find(x => x.id === id);
    const qty = cart[id];
    const subtotal = p.price * qty;
    total += subtotal;
    msg += `• ${p.name} x${qty} = $${subtotal.toFixed(2)}\n`;
  });

  msg += `\n💰 *Total: $${total.toFixed(2)}*\n\n¡Gracias! 🇨🇴`;
  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/14033975089?text=${encoded}`, '_blank');
}

/* ── MOBILE HAMBURGER NAV ── */
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.getElementById('cartDrawer').classList.contains('open')) {
      toggleCart();
    }
  });
});
