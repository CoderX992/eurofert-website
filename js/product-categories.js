// Product Categories JavaScript for Eurofert Website

// Show category products in grid
function showCategoryProducts(category) {
  // Store category in sessionStorage for product-details page
  sessionStorage.setItem("currentCategory", category);
  // Navigate to the products page with the category as a query parameter
  window.location.href = `products.html?category=${category}`;
}

// Show product detail
function showProductDetail(product) {
  // Store product data in sessionStorage
  sessionStorage.setItem("currentProduct", JSON.stringify(product));

  // Navigate to product detail page
  window.location.href = "product-details.html";
}

// Initialize product data when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // productData is now generated and available from product-data.js
  // No need for generateProducts() call here, it's in product-data.js
});

// Export functions for global access
window.showCategoryProducts = showCategoryProducts;
window.showProductDetail = showProductDetail;
