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

  // Header scrolling effect
  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
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
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        if (bsCollapse) {
          bsCollapse.hide();
        } else if (navbarToggler) {
          navbarToggler.click();
        }
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

// Testimonial carousel custom navigation
document.addEventListener("DOMContentLoaded", function () {
  const testimonialCarousel = document.getElementById("testimonialCarousel");
  if (testimonialCarousel) {
    const carousel = new bootstrap.Carousel(testimonialCarousel, {
      interval: 5000,
      wrap: true,
    });
  }
});
