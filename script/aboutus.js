
document.addEventListener("DOMContentLoaded", () => {
  const milestones = document.querySelectorAll(".story-item");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    milestones.forEach((item) => {
      item.classList.add("is-visible");
    });
    return;
  }

  const timelineObserver = new IntersectionObserver(
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

  milestones.forEach((item) => {
    timelineObserver.observe(item);
  });
});
