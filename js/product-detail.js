// Product Detail JavaScript for Eurofert Website

document.addEventListener("DOMContentLoaded", function () {
  loadProductDetail();
  initProductDrawer();
});

function loadProductDetail() {
  // Get product data from sessionStorage
  const productData = sessionStorage.getItem("currentProduct");

  if (!productData) {
    // If no product data, redirect to products page
    window.location.href = "product-categories.html";
    return;
  }

  const product = JSON.parse(productData);

  // Update page elements
  updateProductInfo(product);
  updateBreadcrumb(product);
}

function updateProductInfo(product) {
  // Update product image
  const productImage = document.getElementById("productImage");
  productImage.src = generateLargeProductImage(product);
  productImage.alt = product.name;

  // Update product title
  document.getElementById("productTitle").textContent = product.name;
  document.title = `${product.name} - Eurofert`;

  // Update formula
  document.getElementById("productFormula").textContent = product.formula;

  // Update description
  document.getElementById("productDescription").textContent =
    product.description;

  // Update brands
  const brandsContainer = document.getElementById("productBrandsContent");
  brandsContainer.innerHTML = "";
  product.brands.forEach((brand) => {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.style.backgroundColor = "var(--primary)";
    badge.style.color = "white";
    badge.textContent = brand;
    brandsContainer.appendChild(badge);
  });

  // Update packaging
  const packagingContainer = document.getElementById("productPackagingContent");
  packagingContainer.innerHTML = "";
  product.packaging.forEach((pack) => {
    const badge = document.createElement("span");
    badge.className = "badge bg-outline-primary";
    badge.style.border = "1px solid var(--primary)";
    badge.style.color = "var(--primary)";
    badge.textContent = pack;
    packagingContainer.appendChild(badge);
  });
}

function updateBreadcrumb(product) {
  const categoryNames = {
    maxigrow: "MaxiGrow Power Paste",
    colfert: "Colfert Liquid",
    seagull: "Seagull Liquid",
    agrivell: "Agrivell",
  };

  document.getElementById("breadcrumbCategory").textContent =
    categoryNames[product.category];
  document.getElementById("breadcrumbProduct").textContent = product.name;
}

function generateLargeProductImage(product) {
  // Using provided product images for detail view
  const productImages = [
    "public/product1-placeholder.png",
    "public/product2-placeholder.png",
    "public/product3-placeholder.png",
    "public/product4-placeholder.png",
  ];

  const productIndex = parseInt(product.id.split("-")[1]) - 1;
  return productImages[productIndex % productImages.length];
}

function initProductDrawer() {
  const drawer = document.getElementById("mobileProductDrawer");
  const drawerToggle = document.getElementById("mobileDrawerToggle");
  const drawerClose = document.getElementById("closeDrawer");
  const drawerLinks = document.querySelectorAll(".drawer-link");
  const body = document.body;

  let overlay;

  function createOverlay() {
    overlay = document.createElement("div");
    overlay.className = "drawer-overlay";
    document.body.appendChild(overlay);

    overlay.addEventListener("click", closeDrawer);
  }

  function openDrawer() {
    drawer.classList.add("open");
    body.classList.add("drawer-open");
    if (!overlay) createOverlay();
    setTimeout(() => overlay.classList.add("active"), 10);
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    body.classList.remove("drawer-open");
    if (overlay) overlay.classList.remove("active");
  }

  if (drawerToggle) {
    drawerToggle.addEventListener("click", openDrawer);
  }

  if (drawerClose) {
    drawerClose.addEventListener("click", closeDrawer);
  }

  drawerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        closeDrawer();
        setTimeout(() => {
          const headerHeight = document.querySelector("header").offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight - 20;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 300);
      }
    });
  });

  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  drawer.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    false
  );

  drawer.addEventListener(
    "touchend",
    function (e) {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    },
    false
  );

  function handleSwipe() {
    const swipeDistanceX = touchEndX - touchStartX;
    const swipeDistanceY = Math.abs(touchEndY - touchStartY);

    if (swipeDistanceX > 100 && swipeDistanceY < 100) {
      closeDrawer();
    }
  }
}

// Navigation functions
function showCategories() {
  window.location.href = "product-categories.html";
}

function showCategoryProducts(category) {
  window.location.href = `products.html?category=${category}`;
}

function getCurrentCategory() {
  const productData = sessionStorage.getItem("currentProduct");
  if (productData) {
    const product = JSON.parse(productData);
    return product.category;
  }
  // Fallback if currentProduct is not set, maybe from URL or default
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("category") || "maxigrow"; // Default to maxigrow if nothing found
}

// Export functions for global access
window.showCategories = showCategories;
window.showCategoryProducts = showCategoryProducts;
window.getCurrentCategory = getCurrentCategory;
