// ---- 1. Mobile nav toggle ----
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// ---- 2. Tutor subject filter ----
const filterButtons = document.querySelectorAll(".filter-btn");
const tutorCards = document.querySelectorAll(".tutor-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    tutorCards.forEach((card) => {
      const matches = filter === "all" || card.dataset.subject === filter;
      card.classList.toggle("is-hidden", !matches);
    });
  });
});

// ---- 3. Animated stat counters (runs once, when hero scrolls into view) ----
const statNumbers = document.querySelectorAll(".stat-number");

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statNumbers.forEach(animateCount);
        observer.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);

if (statNumbers.length) {
  statsObserver.observe(statNumbers[0]);
}