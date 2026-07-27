/*
  KATALOG MANTIĞI
  ================
  Bu dosyayı değiştirmene genelde gerek yok. Kitap eklemek/düzenlemek için
  js/data.js dosyasına bak.
*/

// Kapak görseli bulunamazsa veya link bozuksa gösterilecek yedek görsel (SVG, data URI)
const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="560" viewBox="0 0 400 560">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#3b5bdb"/>
          <stop offset="1" stop-color="#5f3dc4"/>
        </linearGradient>
      </defs>
      <rect width="400" height="560" fill="url(#g)"/>
      <g fill="#ffffff" opacity="0.9">
        <rect x="140" y="180" width="120" height="160" rx="6" fill="none" stroke="#ffffff" stroke-width="8"/>
        <line x1="140" y1="220" x2="260" y2="220" stroke="#ffffff" stroke-width="6"/>
        <line x1="140" y1="250" x2="260" y2="250" stroke="#ffffff" stroke-width="6"/>
        <line x1="140" y1="280" x2="230" y2="280" stroke="#ffffff" stroke-width="6"/>
      </g>
      <text x="200" y="400" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#ffffff" text-anchor="middle" opacity="0.85">Görsel Eklenmedi</text>
    </svg>
  `);

const state = {
  grade: "all",
  examType: "all",
  subject: "all",
  sort: "default",
  search: "",
  hideSold: true
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  initTheme();
  populateSubjectFilter();
  bindEvents();
  render();
  updateCartUI();
});

function cacheElements() {
  els.grid = document.getElementById("bookGrid");
  els.empty = document.getElementById("emptyState");
  els.statsBar = document.getElementById("statsBar");
  els.themeToggle = document.getElementById("themeToggle");

  els.gradeFilter = document.getElementById("gradeFilter");
  els.examFilter = document.getElementById("examFilter");
  els.subjectFilter = document.getElementById("subjectFilter");
  els.sortFilter = document.getElementById("sortFilter");
  els.searchInput = document.getElementById("searchInput");
  els.hideSoldCheckbox = document.getElementById("hideSoldCheckbox");
  els.resetBtn = document.getElementById("resetFilters");

  els.modal = document.getElementById("bookModal");
  els.modalClose = document.getElementById("modalClose");
  els.modalBackdrop = document.getElementById("modalBackdrop");
  els.modalGalleryImg = document.getElementById("modalGalleryImg");
  els.modalPrev = document.getElementById("modalPrev");
  els.modalNext = document.getElementById("modalNext");
  els.modalDotContainer = document.getElementById("modalDots");
  els.modalTitle = document.getElementById("modalTitle");
  els.modalBadges = document.getElementById("modalBadges");
  els.modalCondition = document.getElementById("modalCondition");
  els.modalDescription = document.getElementById("modalDescription");
  els.modalOriginalPrice = document.getElementById("modalOriginalPrice");
  els.modalSellPrice = document.getElementById("modalSellPrice");
  els.modalAddToCart = document.getElementById("modalAddToCart");

  els.cartFab = document.getElementById("cartFab");
  els.cartBadge = document.getElementById("cartBadge");
  els.cartModal = document.getElementById("cartModal");
  els.cartModalClose = document.getElementById("cartModalClose");
  els.cartModalBackdrop = document.getElementById("cartModalBackdrop");
  els.cartList = document.getElementById("cartList");
  els.cartEmpty = document.getElementById("cartEmpty");
  els.cartTotal = document.getElementById("cartTotal");
  els.cartClearBtn = document.getElementById("cartClearBtn");
  els.cartWhatsappBtn = document.getElementById("cartWhatsappBtn");
  els.cartMessageText = document.getElementById("cartMessageText");
  els.cartCopyBtn = document.getElementById("cartCopyBtn");
}

// subject alanı hem tek metin ("Kimya") hem de dizi (["Fizik","Kimya","Biyoloji"])
// olabilir. Bu fonksiyon her ikisini de düz bir diziye çevirir.
function subjectList(subject) {
  return Array.isArray(subject) ? subject : [subject];
}

function populateSubjectFilter() {
  const subjects = Array.from(new Set(BOOKS.flatMap((b) => subjectList(b.subject)))).sort(
    (a, b) => a.localeCompare(b, "tr")
  );
  subjects.forEach((subject) => {
    const opt = document.createElement("option");
    opt.value = subject;
    opt.textContent = subject;
    els.subjectFilter.appendChild(opt);
  });
}

function bindEvents() {
  els.gradeFilter.addEventListener("change", (e) => {
    state.grade = e.target.value;
    render();
  });
  els.examFilter.addEventListener("change", (e) => {
    state.examType = e.target.value;
    render();
  });
  els.subjectFilter.addEventListener("change", (e) => {
    state.subject = e.target.value;
    render();
  });
  els.sortFilter.addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
  els.searchInput.addEventListener("input", (e) => {
    state.search = e.target.value.trim().toLowerCase();
    render();
  });
  els.hideSoldCheckbox.addEventListener("change", (e) => {
    state.hideSold = e.target.checked;
    render();
  });
  els.resetBtn.addEventListener("click", () => {
    state.grade = "all";
    state.examType = "all";
    state.subject = "all";
    state.sort = "default";
    state.search = "";
    state.hideSold = true;

    els.gradeFilter.value = "all";
    els.examFilter.value = "all";
    els.subjectFilter.value = "all";
    els.sortFilter.value = "default";
    els.searchInput.value = "";
    els.hideSoldCheckbox.checked = true;

    render();
  });

  els.modalClose.addEventListener("click", closeModal);
  els.modalBackdrop.addEventListener("click", closeModal);
  els.modalPrev.addEventListener("click", () => stepGallery(-1));
  els.modalNext.addEventListener("click", () => stepGallery(1));
  els.modalAddToCart.addEventListener("click", () => {
    if (currentModalBook) toggleCartItem(currentModalBook);
  });

  els.cartFab.addEventListener("click", openCartModal);
  els.cartModalClose.addEventListener("click", closeCartModal);
  els.cartModalBackdrop.addEventListener("click", closeCartModal);
  els.cartClearBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    updateCartUI();
  });
  els.cartWhatsappBtn.addEventListener("click", (e) => {
    if (els.cartWhatsappBtn.getAttribute("aria-disabled") === "true") {
      e.preventDefault();
    }
  });
  els.cartCopyBtn.addEventListener("click", copyOrderMessage);

  els.themeToggle.addEventListener("click", toggleTheme);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (els.modal.classList.contains("open")) {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") stepGallery(-1);
      if (e.key === "ArrowRight") stepGallery(1);
    } else if (els.cartModal.classList.contains("open") && e.key === "Escape") {
      closeCartModal();
    }
  });
}

// "TYT-AYT" olarak işaretlenmiş bir kitap hem TYT hem AYT filtresinde
// çıkmalı (ayrı bir "TYT+AYT" seçeneği açmadan) — bu yüzden eşleşme
// sadece birebir değil, "TYT-AYT" için de geçerli.
function matchesExamType(book, filterValue) {
  if (filterValue === "all") return true;
  return book.examType === filterValue || book.examType === "TYT-AYT";
}

// İndirim yüzdesi: orijinal fiyat bilinmiyorsa ya da indirim yoksa null döner.
function getDiscountPercent(book) {
  if (!book.originalPrice || book.originalPrice <= 0) return null;
  if (book.sellPrice >= book.originalPrice) return null;
  return Math.round((1 - book.sellPrice / book.originalPrice) * 100);
}

function getFilteredBooks() {
  let list = BOOKS.filter((book) => {
    if (state.hideSold && book.sold) return false;
    if (state.grade !== "all" && String(book.grade) !== state.grade) return false;
    if (!matchesExamType(book, state.examType)) return false;
    if (state.subject !== "all" && !subjectList(book.subject).includes(state.subject)) return false;
    if (state.search && !book.title.toLowerCase().includes(state.search)) return false;
    return true;
  });

  if (state.sort === "price-asc") {
    list = list.slice().sort((a, b) => a.sellPrice - b.sellPrice);
  } else if (state.sort === "price-desc") {
    list = list.slice().sort((a, b) => b.sellPrice - a.sellPrice);
  } else if (state.sort === "discount-desc") {
    list = list.slice().sort((a, b) => (getDiscountPercent(b) ?? -1) - (getDiscountPercent(a) ?? -1));
  }

  return list;
}

function render() {
  const filtered = getFilteredBooks();
  els.grid.innerHTML = "";

  renderStatsBar(filtered);
  els.empty.style.display = filtered.length === 0 ? "block" : "none";

  filtered.forEach((book) => {
    els.grid.appendChild(buildCard(book));
  });
}

function renderStatsBar(list) {
  if (list.length === 0) {
    els.statsBar.innerHTML = `<span class="stat-pill">0 kitap listeleniyor</span>`;
    return;
  }

  const totalSell = list.reduce((sum, b) => sum + b.sellPrice, 0);
  const discounts = list.map(getDiscountPercent).filter((d) => d !== null);
  const avgDiscount = discounts.length
    ? Math.round(discounts.reduce((sum, d) => sum + d, 0) / discounts.length)
    : null;

  els.statsBar.innerHTML = `
    <span class="stat-pill">📚 <strong>${list.length}</strong> kitap listeleniyor</span>
    <span class="stat-pill">💰 Toplam: <strong>${totalSell} TL</strong></span>
    ${
      avgDiscount !== null
        ? `<span class="stat-pill stat-pill--discount">🎉 Ortalama İndirim: <strong>%${avgDiscount}</strong></span>`
        : ""
    }
  `;
}

function buildCard(book) {
  const card = document.createElement("article");
  card.className = "card" + (book.sold ? " card--sold" : "");
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${book.title} detaylarını gör`);
  card.dataset.bookId = book.id;

  const gradeLabel = book.grade === "Genel" ? "Genel" : `${book.grade}. Sınıf`;
  const discount = getDiscountPercent(book);

  card.innerHTML = `
    <div class="card__imgwrap">
      <img class="card__img" src="${escapeAttr(book.cover)}" alt="${escapeAttr(book.title)} kapak görseli"
           loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}'">
      ${book.sold ? '<span class="ribbon">SATILDI</span>' : ""}
      ${
        !book.sold && discount !== null
          ? `<span class="ribbon ribbon--discount">%${discount} İndirim</span>`
          : ""
      }
    </div>
    <div class="card__body">
      <div class="badges">
        <span class="badge badge--grade">${escapeHtml(gradeLabel)}</span>
        <span class="badge badge--exam badge--${examClass(book.examType)}">${escapeHtml(book.examType)}</span>
        ${subjectList(book.subject)
          .map((s) => `<span class="badge badge--subject">${escapeHtml(s)}</span>`)
          .join("")}
      </div>
      <h3 class="card__title">${escapeHtml(book.title)}</h3>
      ${book.publisher ? `<p class="card__publisher">${escapeHtml(book.publisher)}</p>` : ""}
      <p class="card__condition">📦 ${escapeHtml(book.condition)}</p>
      <div class="price-row">
        ${
          book.originalPrice
            ? `<span class="price price--original">${
                book.originalPriceLink
                  ? `<a href="${escapeAttr(book.originalPriceLink)}" target="_blank" rel="noopener noreferrer" title="Orijinal fiyatı kaynağında gör">${book.originalPrice} TL ↗</a>`
                  : `${book.originalPrice} TL`
              }</span>`
            : ""
        }
        <span class="price price--sell">${book.sellPrice} TL</span>
        ${
          discount !== null
            ? `<span class="discount-badge${discount >= 50 ? " discount-badge--hot" : ""}">${
                discount >= 50 ? "🔥 " : ""
              }-%${discount}</span>`
            : ""
        }
      </div>
      <div class="card__actions">
        <button class="btn btn--detail" type="button">Detayları Gör</button>
        ${
          book.sold
            ? ""
            : `<button class="btn btn--cart" type="button" data-cart-toggle>${
                isInCart(book.id) ? "Sepette ✓" : "Sepete Ekle"
              }</button>`
        }
      </div>
    </div>
  `;

  const open = () => openModal(book);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });

  const cartBtn = card.querySelector("[data-cart-toggle]");
  if (cartBtn) {
    cartBtn.classList.toggle("btn--in-cart", isInCart(book.id));
    cartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleCartItem(book);
    });
  }

  return card;
}

function examClass(examType) {
  if (examType === "TYT") return "tyt";
  if (examType === "AYT") return "ayt";
  return "both";
}

// ---- Modal / Galeri ----
let galleryImages = [];
let galleryIndex = 0;
let currentModalBook = null;

function openModal(book) {
  currentModalBook = book;
  galleryImages = [book.cover, ...(book.images || [])].filter(Boolean);
  if (galleryImages.length === 0) galleryImages = [PLACEHOLDER_IMG];
  galleryIndex = 0;

  const gradeLabel = book.grade === "Genel" ? "Genel" : `${book.grade}. Sınıf`;

  els.modalTitle.textContent = book.title;
  els.modalBadges.innerHTML = `
    <span class="badge badge--grade">${escapeHtml(gradeLabel)}</span>
    <span class="badge badge--exam badge--${examClass(book.examType)}">${escapeHtml(book.examType)}</span>
    ${subjectList(book.subject)
      .map((s) => `<span class="badge badge--subject">${escapeHtml(s)}</span>`)
      .join("")}
    ${book.sold ? '<span class="badge badge--sold">SATILDI</span>' : ""}
  `;
  els.modalCondition.textContent = `Kullanım Durumu: ${book.condition}`;
  els.modalDescription.textContent = book.description || "";

  els.modalOriginalPrice.innerHTML = book.originalPrice
    ? book.originalPriceLink
      ? `Orijinal Fiyat: <a href="${escapeAttr(book.originalPriceLink)}" target="_blank" rel="noopener noreferrer">${book.originalPrice} TL ↗</a>`
      : `Orijinal Fiyat: ${book.originalPrice} TL`
    : "";

  const modalDiscount = getDiscountPercent(book);
  els.modalSellPrice.innerHTML = `İkinci El Fiyatım: ${book.sellPrice} TL${
    modalDiscount !== null
      ? ` <span class="discount-badge${modalDiscount >= 50 ? " discount-badge--hot" : ""}">${
          modalDiscount >= 50 ? "🔥 " : ""
        }-%${modalDiscount}</span>`
      : ""
  }`;

  if (book.sold) {
    els.modalAddToCart.style.display = "none";
  } else {
    els.modalAddToCart.style.display = "";
    setCartButtonState(els.modalAddToCart, book.id);
  }

  renderGallery();

  els.modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function renderGallery() {
  els.modalGalleryImg.src = galleryImages[galleryIndex];
  els.modalGalleryImg.onerror = function () {
    this.onerror = null;
    this.src = PLACEHOLDER_IMG;
  };

  const showNav = galleryImages.length > 1;
  els.modalPrev.style.display = showNav ? "flex" : "none";
  els.modalNext.style.display = showNav ? "flex" : "none";

  els.modalDotContainer.innerHTML = "";
  if (showNav) {
    galleryImages.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === galleryIndex ? " dot--active" : "");
      dot.addEventListener("click", () => {
        galleryIndex = i;
        renderGallery();
      });
      els.modalDotContainer.appendChild(dot);
    });
  }
}

function stepGallery(delta) {
  if (galleryImages.length <= 1) return;
  galleryIndex = (galleryIndex + delta + galleryImages.length) % galleryImages.length;
  renderGallery();
}

function closeModal() {
  els.modal.classList.remove("open");
  document.body.classList.remove("modal-open");
}

// ---- Sepet ----
// Sepette sadece kitap id'leri tutulur, tarayıcının localStorage'ında saklanır
// (sayfa yenilense/kapansa da sepet kaybolmaz).
const CART_STORAGE_KEY = "yksKitapSepeti";

function loadCart() {
  let raw;
  try {
    raw = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
  } catch {
    raw = [];
  }
  if (!Array.isArray(raw)) return [];
  // Satılmış ya da artık listede olmayan kitapları sepette tutma
  return raw.filter((id) => BOOKS.some((b) => b.id === id && !b.sold));
}

let cart = loadCart();

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function isInCart(id) {
  return cart.includes(id);
}

function toggleCartItem(book) {
  if (book.sold) return;
  cart = isInCart(book.id) ? cart.filter((id) => id !== book.id) : [...cart, book.id];
  saveCart();
  updateCartUI();
}

function setCartButtonState(btn, bookId) {
  const inCart = isInCart(bookId);
  btn.textContent = inCart ? "Sepette ✓" : "Sepete Ekle";
  btn.classList.toggle("btn--in-cart", inCart);
}

function updateCartUI() {
  els.cartBadge.textContent = String(cart.length);
  els.cartBadge.hidden = cart.length === 0;

  els.grid.querySelectorAll(".card").forEach((cardEl) => {
    const btn = cardEl.querySelector("[data-cart-toggle]");
    if (btn) setCartButtonState(btn, cardEl.dataset.bookId);
  });

  if (currentModalBook && !currentModalBook.sold) {
    setCartButtonState(els.modalAddToCart, currentModalBook.id);
  }

  if (els.cartModal.classList.contains("open")) {
    renderCartList();
  }
}

function openCartModal() {
  renderCartList();
  els.cartModal.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeCartModal() {
  els.cartModal.classList.remove("open");
  document.body.classList.remove("modal-open");
}

function renderCartList() {
  const items = cart.map((id) => BOOKS.find((b) => b.id === id)).filter(Boolean);

  els.cartList.innerHTML = "";
  els.cartEmpty.style.display = items.length === 0 ? "block" : "none";

  let total = 0;
  items.forEach((book) => {
    total += book.sellPrice;

    const li = document.createElement("li");
    li.className = "cart__item";
    li.innerHTML = `
      <img src="${escapeAttr(book.cover)}" alt="${escapeAttr(book.title)}"
           onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}'">
      <div class="cart__item-info">
        <p class="cart__item-title">${escapeHtml(book.title)}</p>
        <p class="cart__item-price">${book.sellPrice} TL</p>
      </div>
      <button class="cart__item-remove" type="button" aria-label="Sepetten çıkar">✕</button>
    `;
    li.querySelector(".cart__item-remove").addEventListener("click", () => toggleCartItem(book));
    els.cartList.appendChild(li);
  });

  els.cartTotal.textContent = `${total} TL`;

  if (items.length === 0) {
    els.cartMessageText.value = "";
    els.cartWhatsappBtn.setAttribute("aria-disabled", "true");
    els.cartWhatsappBtn.href = "#";
  } else {
    const message = buildOrderMessage(items, total);
    els.cartMessageText.value = message;
    els.cartWhatsappBtn.removeAttribute("aria-disabled");
    // Numara belirtilmez: WhatsApp açılır ve kullanıcı kendi rehberinden
    // mesajı göndermek istediği kişiyi/kişileri kendisi seçer.
    els.cartWhatsappBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  }
}

function buildOrderMessage(items, total) {
  const lines = [
    "Merhaba, YKS Kitap Kataloğu üzerinden şu kitapları almak istiyorum:",
    "",
    ...items.map((b, i) => `${i + 1}. ${b.title} - ${b.sellPrice} TL`),
    "",
    `Toplam: ${total} TL`
  ];
  return lines.join("\n");
}

async function copyOrderMessage() {
  const text = els.cartMessageText.value;
  if (!text) return;

  const originalLabel = els.cartCopyBtn.textContent;
  try {
    await navigator.clipboard.writeText(text);
    els.cartCopyBtn.textContent = "✅ Kopyalandı";
  } catch {
    els.cartMessageText.select();
    els.cartMessageText.setSelectionRange(0, text.length);
  }
  setTimeout(() => {
    els.cartCopyBtn.textContent = originalLabel;
  }, 1500);
}

// ---- Tema (açık/koyu) ----
const THEME_STORAGE_KEY = "yksKatalogTema";

function initTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  const theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(theme);
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, next);
  applyTheme(next);
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  els.themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

// ---- Yardımcılar ----
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}
