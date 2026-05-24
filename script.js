const projectData = {
  terra: {
    category: "Brand identity",
    title: "Terra Tea Studio",
    image: "assets/portfolio/terra-tea-identity.jpg",
    alt: "Earth-toned tea packaging, cup, and stationery identity system",
    description:
      "A grounding identity for a slow-grown tea studio, pairing botanical illustration with tactile packaging and an adaptable color system.",
    scope: "Strategy, identity, packaging",
    timeline: "8 weeks",
    year: "2026",
  },
  formspace: {
    category: "Editorial design",
    title: "Form / Space",
    image: "assets/portfolio/form-space-editorial.jpg",
    alt: "Architectural editorial layouts in charcoal, cream, and terracotta",
    description:
      "An exhibition catalogue and campaign system shaped by architectural geometry, dramatic scale, and precise editorial rhythm.",
    scope: "Art direction, print",
    timeline: "6 weeks",
    year: "2025",
  },
  wayfinder: {
    category: "Product design",
    title: "Wayfinder",
    image: "assets/portfolio/wayfinder-product.jpg",
    alt: "Travel planning app screens alongside a notebook and route card",
    description:
      "A calm planning experience for meaningful travel, connecting route discovery, saved places, and itinerary building in one interface.",
    scope: "UX/UI, design system",
    timeline: "10 weeks",
    year: "2026",
  },
  vera: {
    category: "Packaging",
    title: "Vera Botanics",
    image: "assets/portfolio/vera-packaging.jpg",
    alt: "Minimal botanical skincare packaging displayed on stone plinths",
    description:
      "A sustainable skincare packaging family that balances natural ingredients with premium shelf presence and refill-friendly forms.",
    scope: "Packaging, illustration",
    timeline: "7 weeks",
    year: "2025",
  },
};

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function closeNavigation() {
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navLinks.classList.toggle("is-open", !isOpen);
  navToggle.setAttribute("aria-expanded", String(!isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

window.matchMedia("(min-width: 769px)").addEventListener("change", (event) => {
  if (event.matches) {
    closeNavigation();
  }
});

const revealItems = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const modal = document.querySelector("#project-modal");
const modalFields = {
  category: document.querySelector("#modal-category"),
  title: document.querySelector("#modal-title"),
  image: document.querySelector("#modal-image"),
  description: document.querySelector("#modal-description"),
  scope: document.querySelector("#modal-scope"),
  timeline: document.querySelector("#modal-timeline"),
  year: document.querySelector("#modal-year"),
};
let lastModalTrigger;

document.querySelectorAll("[data-project]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const project = projectData[trigger.dataset.project];
    if (!project) {
      return;
    }

    modalFields.category.textContent = project.category;
    modalFields.title.textContent = project.title;
    modalFields.image.src = project.image;
    modalFields.image.alt = project.alt;
    modalFields.description.textContent = project.description;
    modalFields.scope.textContent = project.scope;
    modalFields.timeline.textContent = project.timeline;
    modalFields.year.textContent = project.year;
    lastModalTrigger = trigger;
    modal.showModal();
  });
});

document.querySelectorAll("[data-close-modal]").forEach((control) => {
  control.addEventListener("click", () => {
    if (control.matches("a[href]")) {
      lastModalTrigger = null;
    }
    modal.close();
  });
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});

modal.addEventListener("close", () => {
  if (lastModalTrigger) {
    lastModalTrigger.focus();
  }
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstName = new FormData(contactForm).get("name").trim().split(" ")[0];

  formStatus.textContent =
    `Thanks, ${firstName}. This demo inquiry is ready to connect to an email service.`;
  contactForm.reset();
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
