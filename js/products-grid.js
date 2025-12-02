// Products Grid JavaScript for Eurofert Website

// Create product grid card
function createProductGridCard(product, index) {
  const col = document.createElement("div");
  col.className = "col-lg-3 col-md-4 col-sm-6 mb-3";

  const card = document.createElement("div");
  card.className = "product-grid-item card h-100 border-0 shadow-sm";
  card.style.cursor = "pointer";
  card.onclick = () => showProductDetail(product);

  card.innerHTML = `
    <img src="${product.image}" class="card-img-top" alt="${product.name}">
    <div class="card-body p-3">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text small text-muted mb-2">Formula: ${product.formula}</p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-primary fw-bold">View Details</small>
        <i class="fas fa-arrow-right text-primary"></i>
      </div>
    </div>
  `;

  col.appendChild(card);
  return col;
}

// Show categories (navigate back to product-categories.html)
function showCategories() {
  window.location.href = "product-categories.html";
}

// Show product detail
function showProductDetail(product) {
  sessionStorage.setItem("currentProduct", JSON.stringify(product));
  window.location.href = "product-details.html";
}

// Get current category from URL
function getCurrentCategoryFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("category");
}

// Render all products (exactly 8 per category)
function renderProducts(products) {
  const gridContainer = document.getElementById("productGridContainer");
  gridContainer.innerHTML = "";

  products.forEach((product, index) => {
    const productCard = createProductGridCard(product, index);
    gridContainer.appendChild(productCard);
  });

  setTimeout(() => {
    const items = gridContainer.querySelectorAll(".product-grid-item");
    items.forEach((item) => item.classList.add("animate"));
  }, 100);
}

// Initialize products grid when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const category = getCurrentCategoryFromUrl();
  const categoryTitleElement = document.getElementById("categoryTitle");
  const pageHeaderTitleElement = document.getElementById("pageHeaderTitle");
  const pageHeaderLeadElement = document.getElementById("pageHeaderLead");

  if (category && window.productData[category]) {
    const categoryInfo = window.productData[category];

    // Update titles
    categoryTitleElement.textContent = categoryInfo.name;
    pageHeaderTitleElement.textContent = categoryInfo.fullName || categoryInfo.name;
    pageHeaderLeadElement.textContent = categoryInfo.description;

    // Render all 8 products
    renderProducts(categoryInfo.products);

    // Hide load more button since we show all products
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const loadingSpinner = document.getElementById("loadingSpinner");
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    if (loadingSpinner) loadingSpinner.style.display = "none";
  } else {
    window.location.href = "product-categories.html";
  }
});

// Export functions for global access
window.showCategories = showCategories;
window.showProductDetail = showProductDetail;
