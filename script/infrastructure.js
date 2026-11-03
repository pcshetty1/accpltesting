
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("infraGallery");
  const galleryItems = Array.from(
    gallery.querySelectorAll(".infra-gallery__item")
  );

  const filters = document.querySelectorAll(".infra-filter");
  const galleryCount = document.getElementById("galleryCount");

  const lightbox = document.getElementById("infraLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDescription = document.getElementById(
    "lightboxDescription"
  );
  const lightboxCounter = document.getElementById("lightboxCounter");

  const closeButton = lightbox.querySelector(".infra-lightbox__close");
  const previousButton = lightbox.querySelector(".infra-lightbox__prev");
  const nextButton = lightbox.querySelector(".infra-lightbox__next");

  let visibleItems = [...galleryItems];
  let currentIndex = 0;
  let lastFocusedElement = null;

  // CATEGORY FILTERING
  function filterGallery(category) {
    filters.forEach((filter) => {
      const active = filter.dataset.filter === category;

      filter.classList.toggle("is-active", active);
      filter.setAttribute("aria-pressed", String(active));
    });

    galleryItems.forEach((item) => {
      const matches =
        category === "all" || item.dataset.category === category;

      item.hidden = !matches;
    });

    visibleItems = galleryItems.filter((item) => !item.hidden);

    galleryCount.textContent = String(visibleItems.length).padStart(2, "0");
  }

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filterGallery(filter.dataset.filter);
    });
  });

  // LIGHTBOX CONTENT
  function showImage(index) {
    if (!visibleItems.length) return;

    currentIndex =
      (index + visibleItems.length) % visibleItems.length;

    const item = visibleItems[currentIndex];
    const image = item.querySelector("img");

    lightboxImage.src = item.dataset.full || image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = item.dataset.title || "";
    lightboxDescription.textContent =
      item.dataset.description || "";

    lightboxCounter.textContent =
      `${String(currentIndex + 1).padStart(2, "0")} / ` +
      `${String(visibleItems.length).padStart(2, "0")}`;
  }

  // OPEN LIGHTBOX
  function openLightbox(item) {
    visibleItems = galleryItems.filter((galleryItem) => !galleryItem.hidden);

    currentIndex = visibleItems.indexOf(item);
    if (currentIndex < 0) return;

    lastFocusedElement = document.activeElement;

    showImage(currentIndex);

    lightbox.inert = false;
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");

    closeButton.focus();
  }

  // CLOSE LIGHTBOX
  function closeLightbox() {
    if (!lightbox.classList.contains("is-open")) return;

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.inert = true;
    document.body.classList.remove("lightbox-open");

    lightboxImage.removeAttribute("src");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // IMAGE CLICK
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      openLightbox(item);
    });
  });

  // NEXT AND PREVIOUS
  nextButton.addEventListener("click", () => {
    showImage(currentIndex + 1);
  });

  previousButton.addEventListener("click", () => {
    showImage(currentIndex - 1);
  });

  closeButton.addEventListener("click", closeLightbox);

  // CLOSE WHEN THE BACKDROP IS CLICKED
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // KEYBOARD CONTROLS
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowRight") {
      showImage(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    }

    // Keep keyboard focus inside the open lightbox.
    if (event.key === "Tab") {
      const controls = [
        closeButton,
        previousButton,
        nextButton
      ];

      const first = controls[0];
      const last = controls[controls.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    reduceMotion ||
    !("IntersectionObserver" in window)
  ) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  } else {
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
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  // INITIAL STATE
  filterGallery("all");
});
