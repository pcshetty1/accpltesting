
/* ==========================================
   NAVBAR
========================================== */

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

// Transparent at top, white after scrolling
function updateNavbar() {
  if (!navbar) return;

  navbar.classList.toggle("scrolled", window.scrollY > 40);
}

updateNavbar();

window.addEventListener("scroll", updateNavbar, {
  passive: true
});

// Mobile navigation
function closeMenu() {
  if (!navLinks || !menuToggle) return;

  navLinks.classList.remove("show");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute(
    "aria-label",
    "Open navigation menu"
  );
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");

    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );
  });

  document.addEventListener("click", (event) => {
    if (
      navbar &&
      !navbar.contains(event.target) &&
      navLinks.classList.contains("show")
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navLinks.classList.contains("show")
    ) {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

// Active navigation link
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
    closeMenu();
  });
});


/* ==========================================
   HERO IMAGE: 3D CURSOR ROTATION
========================================== */

const heroImage = document.getElementById("heroImageCard");

if (heroImage) {
  const heroVisual = heroImage.closest(".hero-visual");

  const hoverQuery = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  const motionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let frameId = null;

  // Store the most recent pointer coordinates
  let pointerX = 0;
  let pointerY = 0;

  function applyRotation() {
    frameId = null;

    if (!hoverQuery.matches || motionQuery.matches) {
      return;
    }

    /*
      Horizontal rotation:
      Left edge  = -90 degrees
      Center     =   0 degrees
      Right edge = +90 degrees

      Total horizontal rotation range = 180 degrees.
      No scale() is used, so there is no zoom effect.
    */

    const rotateY = (pointerX - 0.5) * 180;

    // Vertical movement is intentionally more subtle
    const rotateX = (0.5 - pointerY) * 30;

    heroImage.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Move the floating details in the opposite direction
    // to add depth without changing the image size.
    if (heroVisual) {
      const decorations = heroVisual.querySelectorAll(
        ".floating-element"
      );

      decorations.forEach((element, index) => {
        const direction = index === 0 ? -1 : 1;

        const moveX = (pointerX - 0.5) * 18 * direction;
        const moveY = (pointerY - 0.5) * 12 * direction;

        element.style.translate =
          `${moveX}px ${moveY}px`;
      });
    }
  }

  function handlePointerMove(event) {
    if (!hoverQuery.matches || motionQuery.matches) {
      return;
    }

    const rect = heroImage.getBoundingClientRect();

    if (!rect.width || !rect.height) return;

    // Pointer position, normalized from 0 to 1
    pointerX = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width)
    );

    pointerY = Math.max(
      0,
      Math.min(1, (event.clientY - rect.top) / rect.height)
    );

    if (frameId === null) {
      frameId = requestAnimationFrame(applyRotation);
    }
  }

  function resetRotation() {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }

    // Return the image to its original position
    heroImage.style.transform =
      "rotateX(0deg) rotateY(0deg)";

    if (heroVisual) {
      heroVisual
        .querySelectorAll(".floating-element")
        .forEach((element) => {
          element.style.translate = "";
        });
    }
  }

  heroImage.addEventListener(
    "pointermove",
    handlePointerMove
  );

  heroImage.addEventListener(
    "pointerleave",
    resetRotation
  );

  heroImage.addEventListener(
    "pointercancel",
    resetRotation
  );

  hoverQuery.addEventListener("change", resetRotation);
  motionQuery.addEventListener("change", resetRotation);
}


document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  // Display content immediately when reduced motion is preferred
  // or IntersectionObserver is unavailable.
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
});


/* =========================================
   OUR JOURNEY: SCROLL REVEAL + TIMELINE
========================================= */

(() => {
  const section = document.querySelector(".journey-section");

  if (!section) return;

  const revealItems = section.querySelectorAll(".about-reveal");
  const progressLine = section.querySelector(".journey-line-progress");

  // Reveal elements when they enter the viewport.
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Fill the timeline line according to scroll progress.
  if (!progressLine) return;

  let ticking = false;

  function updateTimelineProgress() {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionHeight = section.offsetHeight;

    const travelled = viewportHeight * 0.55 - rect.top;
    const available = sectionHeight - viewportHeight * 0.15;

    const progress = Math.max(
      0,
      Math.min(1, travelled / Math.max(available, 1))
    );

    progressLine.style.height = `${progress * 100}%`;
    ticking = false;
  }

  function requestTimelineUpdate() {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(updateTimelineProgress);
  }

  window.addEventListener("scroll", requestTimelineUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestTimelineUpdate);

  updateTimelineProgress();
})();

