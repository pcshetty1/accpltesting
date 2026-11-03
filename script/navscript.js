
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

// Change navbar background on scroll
function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}

updateNavbar();

window.addEventListener("scroll", updateNavbar, {
  passive: true
});

// Toggle mobile menu
function closeMenu() {
  navLinks.classList.remove("show");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");

  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

// Close menu and update active link
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navItems.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    closeMenu();
  });
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
  if (
    !navbar.contains(event.target) &&
    navLinks.classList.contains("show")
  ) {
    closeMenu();
  }
});

// Close menu with Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    menuToggle.focus();
  }
});

// Reset mobile menu when returning to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});
