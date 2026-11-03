
document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the copyright year.
  const footerYear = document.getElementById("footerYear");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Smoothly scroll to the page top when the back-to-top link is clicked.
  const backToTop = document.querySelector(".footer-back-top");

  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      const target = document.querySelector("#home");

      if (!target) {
        return;
      }

      event.preventDefault();

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  }
});
