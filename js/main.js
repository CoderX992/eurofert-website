// Main JavaScript for Eurofert Website

document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations
  initAnimations();

  // Handle scrolling effects
  handleScrolling();

  // Initialize mobile menu
  initMobileMenu();

  // Form validation
  initFormValidation();
});

// Animation initialization
function initAnimations() {
  // Set initial state for animations
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-up, .scale-in"
  );

  // Check if element is in viewport
  const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  };

  // Add active class to elements in viewport
  const checkAnimations = () => {
    animatedElements.forEach((el) => {
      if (isInViewport(el)) {
        el.classList.add("active");
      }
    });
  };

  // Check animations on load
  checkAnimations();

  // Check animations on scroll
  window.addEventListener("scroll", checkAnimations);
}

// Handle scrolling effects
function handleScrolling() {
  const header = document.getElementById("header");
  const backToTopButton = document.querySelector(".back-to-top");
  const isMenuOpen = document.body.classList.contains("menu-open");
  let lastScrollY = window.scrollY;

  // NEW header scroll logic (shrink + auto-hide)
  const handleHeaderScroll = () => {
    const currentY = window.scrollY;

    // 1) shrink when past 50px
    if (currentY > 50) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }

    // If mobile menu is open, don't hide the header
    if (isMenuOpen) {
      lastScrollY = currentY; // reset scroll baseline
      return;
    }

    // 2) auto-hide on scroll DOWN, show on scroll UP
    if (currentY > lastScrollY && currentY > 120) {
      // scrolling down
      header.classList.add("header--hidden");
    } else {
      // scrolling up
      header.classList.remove("header--hidden");
    }

    lastScrollY = currentY;
  };

  // Back to top button visibility
  const handleBackToTopVisibility = () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  };

  // Smooth scrolling for anchor links
  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        if (this.getAttribute("href") === "#") return;

        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Close mobile menu if open
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse.classList.contains("show")) {
            const navbarToggler = document.querySelector(".navbar-toggler");
            navbarToggler.click();
          }
        }
      });
    });
  };

  // Back to top button click handler
  if (backToTopButton) {
    backToTopButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Initialize scroll handlers
  window.addEventListener("scroll", handleHeaderScroll);
  window.addEventListener("scroll", handleBackToTopVisibility);
  smoothScroll();

  // Trigger initial check
  handleHeaderScroll();
  handleBackToTopVisibility();
}

// Mobile menu initialization
function initMobileMenu() {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navLinks = document.querySelectorAll(".nav-link");
  const body = document.body;

  if (!navbarCollapse) return;

  // Create Bootstrap Collapse instance
  let bsCollapse;

  // Initialize Bootstrap collapse after a short delay to ensure Bootstrap is ready
  setTimeout(() => {
    if (typeof bootstrap !== "undefined" && bootstrap.Collapse) {
      bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
    }
  }, 100);

  // Listen to Bootstrap's collapse events
  navbarCollapse.addEventListener("show.bs.collapse", function () {
    body.classList.add("menu-open");
  });

  navbarCollapse.addEventListener("hidden.bs.collapse", function () {
    body.classList.remove("menu-open");
    // FIX: Find any open sub-menus and remove the 'open' class
    const openSubmenus = document.querySelectorAll(".nav-item.open");
    openSubmenus.forEach((item) => {
      item.classList.remove("open");
    });
  });

  // Close menu when clicking overlay (the navbar-collapse background)
  navbarCollapse.addEventListener("click", function (e) {
    if (
      e.target === navbarCollapse &&
      navbarCollapse.classList.contains("show")
    ) {
      if (bsCollapse) {
        bsCollapse.hide();
      } else if (navbarToggler) {
        navbarToggler.click();
      }
    }
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach((link) => {
    const parentLi = link.closest(".nav-item");
    link.addEventListener("click", () => {
      // Check if this link belongs to an expandable item. If yes, stop here.
      if (parentLi && parentLi.classList.contains("has-dropdown")) return;

      if (navbarCollapse.classList.contains("show")) {
        if (bsCollapse) bsCollapse.hide();
        else if (navbarToggler) navbarToggler.click();
      }
    });
  });

  // Add active class to current page link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (
      linkHref === currentPage ||
      (currentPage === "" && linkHref === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // ----------------------------------------------------
  // Desktop & Mobile Sub-Menu Logic
  // ----------------------------------------------------
  // ----------------------------------------------------
  // Desktop & Mobile Sub-Menu Logic
  // ----------------------------------------------------
  const dropdownParents = document.querySelectorAll(".nav-item.has-dropdown");

  dropdownParents.forEach((parentItem) => {
    const toggleLink = parentItem.querySelector(".nav-link");
    const opener = parentItem.querySelector(".nav-opener");

    // Unified toggle behavior: same on mobile & desktop
    const toggleSubmenu = (event) => {
      event.preventDefault(); // stop navigation (we only want toggle)
      event.stopPropagation(); // don't bubble up

      // Close all other dropdowns
      dropdownParents.forEach((item) => {
        if (item !== parentItem) {
          item.classList.remove("open");
        }
      });

      // Toggle this dropdown
      parentItem.classList.toggle("open");
    };

    // Clicking the arrow toggles submenu (mobile + desktop)
    if (opener) {
      opener.addEventListener("click", toggleSubmenu);
    }

    // Clicking "Product Categories" text also toggles submenu
    if (toggleLink) {
      toggleLink.addEventListener("click", toggleSubmenu);
    }
  });

  // Desktop: Close dropdown when clicking outside
  if (window.innerWidth > 767.98) {
    document.addEventListener("click", (event) => {
      if (window.innerWidth > 767.98) {
        const isDropdownClick = event.target.closest(".nav-item.has-dropdown");
        if (!isDropdownClick) {
          dropdownParents.forEach((item) => {
            item.classList.remove("open");
          });
        }
      }
    });
  }
}

// Form validation
function initFormValidation() {
  const contactForm = document.querySelector(".contact-form form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("is-invalid");
        } else {
          field.classList.remove("is-invalid");
        }
      });

      // Email validation
      const emailField = contactForm.querySelector("#email");
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.classList.add("is-invalid");
        }
      }

      // If form is valid, simulate submission
      if (isValid) {
        // In a real application, you would send data to server here
        // For demo purposes, we'll just show a success message

        // Clear form
        contactForm.reset();

        // Show success message (you would implement this differently in a real app)
        alert("Thank you! Your message has been sent successfully.");
      }
    });

    // Live validation on input
    const formInputs = contactForm.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("input", function () {
        if (this.hasAttribute("required") && this.value.trim() === "") {
          this.classList.add("is-invalid");
        } else {
          this.classList.remove("is-invalid");
        }

        // Email validation
        if (this.type === "email" && this.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(this.value)) {
            this.classList.add("is-invalid");
          }
        }
      });
    });
  }
}

// Render homepage product categories teaser
// This teaser uses the same category list and slugs defined in CATEGORY_ORDER
function renderHomeProductCategories() {
  const gridContainer = document.getElementById("homeProductsGrid");
  if (!gridContainer) {
    console.warn("homeProductsGrid container not found");
    return;
  }

  if (!window.productData || !window.CATEGORY_ORDER) {
    console.warn("productData or CATEGORY_ORDER not available yet, retrying...");
    setTimeout(renderHomeProductCategories, 100);
    return;
  }

  // Display first 4 MAXIGROW lines as teaser using canonical order
  const categoryKeys = window.CATEGORY_ORDER.slice(0, 4);
  const productImages = [
    "public/product1-placeholder.png",
    "public/product2-placeholder.png",
    "public/product3-placeholder.png",
    "public/product4-placeholder.png",
  ];

  gridContainer.innerHTML = "";

  categoryKeys.forEach((categoryKey, index) => {
    const category = window.productData[categoryKey];
    const delay = index * 200;

    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-3";

    const card = document.createElement("div");
    card.className = "product-category-card card h-100 border-0 shadow-sm slide-up";
    card.setAttribute("data-delay", delay);

    card.innerHTML = `
      <div class="card-media">
        <img
          src="${productImages[index]}"
          class="card-img-top"
          alt="${category.name}"
          loading="lazy"
        />
        <span class="category-chip">Line ${index + 1} of 7</span>
      </div>
      <div class="card-body text-center">
        <h3 class="card-title h5 mb-3">${category.name}</h3>
        <p class="card-text small">${category.description}</p>
        <div class="teaser-meta">${category.products.length}+ tailored formulas</div>
        <a
          href="products.html?category=${categoryKey}"
          class="btn btn-outline-primary btn-sm"
        >View Products</a>
      </div>
    `;

    col.appendChild(card);
    gridContainer.appendChild(col);
  });

  console.log(`Rendered ${categoryKeys.length} category cards on homepage`);
}

// Testimonial carousel custom navigation
document.addEventListener("DOMContentLoaded", function () {
  const testimonialCarousel = document.getElementById("testimonialCarousel");
  const hasBootstrap = typeof bootstrap !== "undefined" && bootstrap?.Carousel;

  if (testimonialCarousel && hasBootstrap) {
    const carousel = new bootstrap.Carousel(testimonialCarousel, {
      interval: 5000,
      wrap: true,
    });
  } else if (testimonialCarousel && !hasBootstrap) {
    console.warn("Bootstrap carousel unavailable - skipping testimonial carousel init");
  }

  // Render homepage categories even if Bootstrap JS is missing
  renderHomeProductCategories();
});
