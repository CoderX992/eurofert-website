// Products Grid JavaScript for Eurofert Website

// Lazy loading state variables
let productsPerPage = 8;
let currentPage = 0;
let currentCategoryProducts = [];
let totalProducts = 0;

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

// Render products for a specific range
function renderProducts(startIndex, endIndex) {
  const gridContainer = document.getElementById("productGridContainer");

  for (
    let i = startIndex;
    i < endIndex && i < currentCategoryProducts.length;
    i++
  ) {
    const product = currentCategoryProducts[i];
    const productCard = createProductGridCard(product, i);
    gridContainer.appendChild(productCard);
  }

  // Animate newly added grid items
  setTimeout(() => {
    const newItems = gridContainer.querySelectorAll(
      ".product-grid-item:not(.animate)"
    );
    newItems.forEach((item) => item.classList.add("animate"));
  }, 100);
}

// Load more products
function loadMoreProducts() {
  const loadingSpinner = document.getElementById("loadingSpinner");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  // Show loading spinner and hide button
  loadingSpinner.style.display = "block";
  loadMoreBtn.style.display = "none";

  // Simulate loading delay for better UX
  setTimeout(() => {
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    renderProducts(startIndex, endIndex);
    currentPage++;

    // Hide loading spinner
    loadingSpinner.style.display = "none";

    updateLoadMoreButtonVisibility();
  }, 500); // 500ms delay to show loading state
}

// Update load more button visibility
function updateLoadMoreButtonVisibility() {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const loadedProducts = currentPage * productsPerPage;

  if (loadedProducts >= totalProducts) {
    loadMoreBtn.style.display = "none";

    // Show completion message
    if (totalProducts > productsPerPage) {
      const gridContainer = document.getElementById("productGridContainer");
      const completionMessage = document.createElement("div");
      completionMessage.className = "text-center mt-4 text-muted";
      completionMessage.innerHTML =
        '<small><i class="fas fa-check-circle me-2"></i>All products loaded</small>';
      gridContainer.parentNode.appendChild(completionMessage);
    }
  } else {
    loadMoreBtn.style.display = "inline-flex";
  }
}

// Initialize products grid when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const category = getCurrentCategoryFromUrl();
  const categoryTitleElement = document.getElementById("categoryTitle");
  const pageHeaderTitleElement = document.getElementById("pageHeaderTitle");
  const pageHeaderLeadElement = document.getElementById("pageHeaderLead");
  const gridContainer = document.getElementById("productGridContainer");

  if (category && window.productData[category]) {
    const categoryInfo = window.productData[category];

    // Initialize lazy loading state
    currentCategoryProducts = categoryInfo.products;
    totalProducts = currentCategoryProducts.length;
    currentPage = 0;

    // Update titles
    categoryTitleElement.textContent = categoryInfo.name;
    pageHeaderTitleElement.textContent = categoryInfo.name;
    pageHeaderLeadElement.textContent = categoryInfo.description;

    // Clear and populate grid
    gridContainer.innerHTML = "";

    // Load initial batch of products
    loadMoreProducts();

    // Add event listener for load more button
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    loadMoreBtn.addEventListener("click", loadMoreProducts);
  } else {
    // If no valid category, redirect to product categories page
    window.location.href = "product-categories.html";
  }
});

// Export functions for global access
window.showCategories = showCategories;
window.showProductDetail = showProductDetail;
