const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const header = document.querySelector("[data-header]");
const scoreInputs = Array.from(document.querySelectorAll("[data-score-input]"));
const scoreOutput = document.querySelector("[data-score-output]");
const scoreMessage = document.querySelector("[data-score-message]");
const auditForm = document.querySelector("[data-audit-form]");
const formNote = document.querySelector("[data-form-note]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 10);
};

const updateScore = () => {
  if (!scoreOutput || !scoreMessage || scoreInputs.length === 0) return;

  const total = scoreInputs.reduce((sum, input) => sum + Number(input.value), 0);
  const score = Math.round(total / scoreInputs.length);
  scoreOutput.value = String(score);
  scoreOutput.textContent = String(score);

  if (score < 45) {
    scoreMessage.textContent = "Your site likely needs a focused technical and local SEO review.";
  } else if (score < 72) {
    scoreMessage.textContent = "You have a base to build on. Content depth and authority may be the next wins.";
  } else {
    scoreMessage.textContent = "Your foundation looks strong. The next step is competitor gap and conversion work.";
  }
};

scoreInputs.forEach((input) => input.addEventListener("input", updateScore));
updateScore();

if (auditForm && formNote) {
  auditForm.addEventListener("submit", () => {
    formNote.textContent = "Opening your email client with the audit details.";
  });
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
