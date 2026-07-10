const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const header = document.querySelector("[data-header]");
const scoreInputs = Array.from(document.querySelectorAll("[data-score-input]"));
const scoreOutput = document.querySelector("[data-score-output]");
const scoreMessage = document.querySelector("[data-score-message]");
const auditForm = document.querySelector("[data-audit-form]");
const formNote = document.querySelector("[data-form-note]");
const interestGrid = document.querySelector("[data-interest-grid]");
const interestCta = document.querySelector("[data-interest-cta]");
const rotator = document.querySelector("[data-rotator]");
const caseSlides = Array.from(document.querySelectorAll(".case-slide"));
const casePrev = document.querySelector("[data-case-prev]");
const caseNext = document.querySelector("[data-case-next]");

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

if (interestGrid && interestCta) {
  const updateInterestCta = () => {
    const selected = Array.from(interestGrid.querySelectorAll("input:checked"))
      .map((input) => input.value);

    interestCta.textContent = selected.length ? `Get started with ${selected.length} selected` : "Get started";
    interestCta.href = "#contact";
    interestCta.dataset.selectedServices = selected.join(", ");
  };

  interestGrid.addEventListener("change", updateInterestCta);
  updateInterestCta();
}

if (rotator) {
  const words = ["Think bigger.", "Own the outcome.", "Build for search demand."];
  let wordIndex = 0;

  window.setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    rotator.textContent = words[wordIndex];
  }, 2600);
}

if (caseSlides.length > 0) {
  let activeCase = caseSlides.findIndex((slide) => slide.classList.contains("is-active"));
  if (activeCase < 0) activeCase = 0;

  const showCase = (index) => {
    activeCase = (index + caseSlides.length) % caseSlides.length;
    caseSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeCase);
    });
  };

  casePrev?.addEventListener("click", () => showCase(activeCase - 1));
  caseNext?.addEventListener("click", () => showCase(activeCase + 1));
  showCase(activeCase);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
