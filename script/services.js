
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".partners-track");
  const originalList = track?.querySelector(".partners-list");

  if (!track || !originalList) return;

  // Prevent duplicate lists if the script runs more than once.
  if (track.children.length > 1) return;

  const duplicateList = originalList.cloneNode(true);

  // Hide duplicate content from screen readers.
  duplicateList.setAttribute("aria-hidden", "true");

  track.appendChild(duplicateList);
});


document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) return;

    // Synchronize initial state with the HTML.
    const initiallyOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(initiallyOpen));
    answer.hidden = !initiallyOpen;
    item.classList.toggle("is-open", initiallyOpen);

    button.addEventListener("click", () => {
      const shouldOpen =
        button.getAttribute("aria-expanded") !== "true";

      // Close all other questions.
      faqItems.forEach((otherItem) => {
        const otherButton = otherItem.querySelector(".faq-question");
        const otherAnswer = otherItem.querySelector(".faq-answer");

        if (!otherButton || !otherAnswer) return;

        otherButton.setAttribute("aria-expanded", "false");
        otherAnswer.hidden = true;
        otherItem.classList.remove("is-open");
      });

      // Open the selected question, if it was previously closed.
      if (shouldOpen) {
        button.setAttribute("aria-expanded", "true");
        answer.hidden = false;
        item.classList.add("is-open");
      }
    });
  });
});
