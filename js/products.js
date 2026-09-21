/* ============================================================
   AREPAISANO — Products Data & Rendering
   ⚠️  Prices: confirm with Martha before publishing.
   ============================================================ */

const products = [
  /* ── ROW 1: Classic ── */
  {
    id: 1,
    name: "Arepas Originales (OG)",
    desc: "6 unidades · Arepas tradicionales de maíz blanco",
    price: 6.99,
    icon: "🌽",
    img: "https://res.cloudinary.com/dgio9uutc/image/upload/v1775090272/24_bgtidz.png",
    badge: "MÁS VENDIDA",
    weight: "600g"
  },
  {
    id: 2,
    name: "Arepas de Queso (Cheese)",
    desc: "5 unidades · Maíz blanco con queso",
    price: 7.49,
    icon: "🧀",
    img: "https://res.cloudinary.com/dgio9uutc/image/upload/v1775090271/22_rjb2fq.png",
    badge: "MÁS VENDIDA",
    weight: "600g"
  },
  {
    id: 4,
    name: "Arepas Maíz con Queso (Corn Cheese)",
    desc: "4 unidades · Combinación de maíz blanco y queso",
    price: 5.99,
    icon: "🌽",
    img: "https://res.cloudinary.com/dgio9uutc/image/upload/v1775090272/23_qmrlto.png",
    badge: null,
    weight: "600g"
  },
  /* ── ROW 2: Life Series ── */
  {
    id: 6,
    name: "Arepas Green Life (Spinach)",
    desc: "5 unidades · Con todos los beneficios de la espinaca",
    price: 7.49,
    icon: "🥬",
    img: "https://res.cloudinary.com/dgio9uutc/image/upload/v1775090254/freepik_from-this-image-lets-remaster-this-for-a-studio-light-and-professional-looking-render-this-will-be-the-big-image-for-the-hero-of-my-website-so-make-it-look-good-and-only-the-items-no-back_0002_1_cbn4mo.png",
    badge: "NUEVO",
    weight: "500g"
  },
  {
    id: 7,
    name: "Arepas Carrot Life (Zanahoria)",
    desc: "5 unidades · Con todos los beneficios de la zanahoria",
    price: 7.49,
    icon: "🥕",
    img: "https://res.cloudinary.com/dgio9uutc/image/upload/v1775091497/freepik_from-this-image-lets-remaster-this-for-a-studio-light-and-professional-looking-render-this-will-be-the-big-image-for-the-hero-of-my-website-so-make-it-look-good-and-only-the-items-no-back_0011_iibijk.png",
    badge: "NUEVO",
    weight: "500g"
  },
  {
    id: 8,
    name: "Arepas Seeds Life (Semillas)",
    desc: "5 unidades · Con 5 tipos de semillas diferentes",
    price: 7.49,
    icon: "🌾",
    img: "https://res.cloudinary.com/dgio9uutc/image/upload/v1775090251/freepik_from-this-image-lets-remaster-this-for-a-studio-light-and-professional-looking-render-this-will-be-the-big-image-for-the-hero-of-my-website-so-make-it-look-good-and-only-the-items-no-back_0003_zxwper.png",
    badge: "NUEVO",
    weight: "500g"
  },
  /* ── ROW 3: Mini & Specialty ── */
  {
    id: 5,
    name: "Mini Arepas de Maíz (Mini Corn)",
    desc: "10 unidades · Perfectas para onces y snacks",
    price: 4.99,
    icon: "🫓",
    badge: null,
    weight: "400g"
  },
  {
    id: 9,
    name: "Arepas Almond Life (Almendra)",
    desc: "5 unidades · Con todos los beneficios de las almendras",
    price: 7.49,
    icon: "🌰",
    img: "https://res.cloudinary.com/dgio9uutc/image/upload/v1775093315/freepik_from-this-image-remake-the-design-with-clean-studio-lighting-and-a-professional-highresolution-render.-remove-the-text-under-the-product-this-will-be-the-main-hero-image-for-my-products-p_0014_sz6bmh.png",
    badge: "NUEVO",
    weight: "500g"
  },
  /* ── HIDDEN (reactivate later) ── */
  {
    id: 3,
    name: "Arepas de Queso Grande (Cheese)",
    desc: "5 unidades · 700g · Maíz blanco con queso · Gluten Free · Porción extra",
    price: 10.99,
    icon: "🧀",
    badge: null,
    weight: "700g",
    hidden: true
  }
];

const wholesaleCard = `
  <div class="product-card product-card--wholesale">
    <div class="product-img product-img--wholesale">
      📦
    </div>
    <div class="product-info">
      <div class="product-name">+10 paquetes — Mayoristas</div>
      <div class="product-desc">Precios especiales para pedidos grandes, tiendas latinas y distribuidores. Contáctanos directamente.</div>
      <div class="product-footer">
        <span class="product-price" style="font-size:0.9rem;color:var(--red);font-weight:900;">Precio especial</span>
        <a href="#contacto" class="add-btn" style="text-decoration:none;text-align:center;">Contacto</a>
      </div>
    </div>
  </div>`;

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const visible = products.filter(p => !p.hidden);

  grid.innerHTML = visible.map(p => `
    <div class="product-card${p.img ? ' has-photo' : ''}">
      <div class="product-img${p.img ? ' product-img--photo' : ''}">
        ${p.img
          ? `<img class="product-img-circle" src="${p.img}" alt="${p.name}" width="150" height="150" loading="lazy">`
          : p.icon}
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <span class="product-price">$${p.price.toFixed(2)}</span>
          <button class="add-btn" id="btn-${p.id}" onclick="addToCart(${p.id})" aria-label="Agregar ${p.name} al pedido">
            + Agregar
          </button>
        </div>
      </div>
    </div>
  `).join('') + wholesaleCard;
}

// Initialise on DOM ready
document.addEventListener('DOMContentLoaded', renderProducts);
