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
  populateSubjectFilter();
  bindEvents();
  render();
});

function cacheElements() {
  els.grid = document.getElementById("bookGrid");
  els.empty = document.getElementById("emptyState");
  els.count = document.getElementById("resultCount");

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
}

function populateSubjectFilter() {
  const subjects = Array.from(new Set(BOOKS.map((b) => b.subject))).sort((a, b) =>
    a.localeCompare(b, "tr")
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
  document.addEventListener("keydown", (e) => {
    if (els.modal.classList.contains("open")) {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") stepGallery(-1);
      if (e.key === "ArrowRight") stepGallery(1);
    }
  });
}

function getFilteredBooks() {
  let list = BOOKS.filter((book) => {
    if (state.hideSold && book.sold) return false;
    if (state.grade !== "all" && String(book.grade) !== state.grade) return false;
    if (state.examType !== "all" && book.examType !== state.examType) return false;
    if (state.subject !== "all" && book.subject !== state.subject) return false;
    if (state.search && !book.title.toLowerCase().includes(state.search)) return false;
    return true;
  });

  if (state.sort === "price-asc") {
    list = list.slice().sort((a, b) => a.sellPrice - b.sellPrice);
  } else if (state.sort === "price-desc") {
    list = list.slice().sort((a, b) => b.sellPrice - a.sellPrice);
  }

  return list;
}

function render() {
  const filtered = getFilteredBooks();
  els.grid.innerHTML = "";

  els.count.textContent = `${filtered.length} kitap listeleniyor`;
  els.empty.style.display = filtered.length === 0 ? "block" : "none";

  filtered.forEach((book) => {
    els.grid.appendChild(buildCard(book));
  });
}

function buildCard(book) {
  const card = document.createElement("article");
  card.className = "card" + (book.sold ? " card--sold" : "");
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${book.title} detaylarını gör`);

  const gradeLabel = book.grade === "Genel" ? "Genel" : `${book.grade}. Sınıf`;

  card.innerHTML = `
    <div class="card__imgwrap">
      <img class="card__img" src="${escapeAttr(book.cover)}" alt="${escapeAttr(book.title)} kapak görseli"
           loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}'">
      ${book.sold ? '<span class="ribbon">SATILDI</span>' : ""}
    </div>
    <div class="card__body">
      <div class="badges">
        <span class="badge badge--grade">${escapeHtml(gradeLabel)}</span>
        <span class="badge badge--exam badge--${examClass(book.examType)}">${escapeHtml(book.examType)}</span>
        <span class="badge badge--subject">${escapeHtml(book.subject)}</span>
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
      </div>
      <button class="btn btn--detail" type="button">Detayları Gör</button>
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

function openModal(book) {
  galleryImages = [book.cover, ...(book.images || [])].filter(Boolean);
  if (galleryImages.length === 0) galleryImages = [PLACEHOLDER_IMG];
  galleryIndex = 0;

  const gradeLabel = book.grade === "Genel" ? "Genel" : `${book.grade}. Sınıf`;

  els.modalTitle.textContent = book.title;
  els.modalBadges.innerHTML = `
    <span class="badge badge--grade">${escapeHtml(gradeLabel)}</span>
    <span class="badge badge--exam badge--${examClass(book.examType)}">${escapeHtml(book.examType)}</span>
    <span class="badge badge--subject">${escapeHtml(book.subject)}</span>
    ${book.sold ? '<span class="badge badge--sold">SATILDI</span>' : ""}
  `;
  els.modalCondition.textContent = `Kullanım Durumu: ${book.condition}`;
  els.modalDescription.textContent = book.description || "";

  els.modalOriginalPrice.innerHTML = book.originalPrice
    ? book.originalPriceLink
      ? `Orijinal Fiyat: <a href="${escapeAttr(book.originalPriceLink)}" target="_blank" rel="noopener noreferrer">${book.originalPrice} TL ↗</a>`
      : `Orijinal Fiyat: ${book.originalPrice} TL`
    : "";
  els.modalSellPrice.textContent = `İkinci El Fiyatım: ${book.sellPrice} TL`;

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
