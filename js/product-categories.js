// Product Categories JavaScript for Eurofert Website

// Show category products in grid
function showCategoryProducts(category) {
  sessionStorage.setItem("currentCategory", category);
  window.location.href = `products.html?category=${category}`;
}

// Show product detail
function showProductDetail(product) {
  sessionStorage.setItem("currentProduct", JSON.stringify(product));
  window.location.href = "product-details.html";
}

// Render categories grid dynamically
function renderCategoriesGrid() {
  const gridContainer = document.getElementById("categoriesGrid");
  if (!gridContainer) return;

  const categoryKeys = Object.keys(window.productData);
  const productImages = [
    "public/product1-placeholder.png",
    "public/product2-placeholder.png",
    "public/product3-placeholder.png",
    "public/product4-placeholder.png",
  ];

  categoryKeys.forEach((categoryKey, index) => {
    const category = window.productData[categoryKey];
    const imageIndex = index % productImages.length;
    const delay = index * 100;

    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6";

    const card = document.createElement("div");
    card.className = "category-card card h-100 border-0 shadow-sm fade-in";
    card.setAttribute("data-delay", delay);
    card.style.cursor = "pointer";
    card.onclick = () => showCategoryProducts(categoryKey);

    card.innerHTML = `
      <img
        src="${productImages[imageIndex]}"
        class="card-img-top"
        alt="${category.name}"
        loading="lazy"
      />
      <div class="card-body text-center">
        <h3 class="card-title h4 mb-3">${category.name}</h3>
        <p class="card-text">${category.description}</p>
        <div class="category-stats mt-3">
          <small class="text-muted">${category.products.length} Products Available</small>
        </div>
        <button class="btn btn-primary">View Products</button>
      </div>
    `;

    col.appendChild(card);
    gridContainer.appendChild(col);
  });
}

// Initialize product data when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  renderCategoriesGrid();
});

// Export functions for global access
window.showCategoryProducts = showCategoryProducts;
window.showProductDetail = showProductDetail;
