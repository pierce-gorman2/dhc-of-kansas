const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const revealItems = document.querySelectorAll(".reveal");
const partnerForm = document.querySelector("[data-partner-form]");
const heroSlideshow = document.querySelector("[data-hero-slideshow]");

function setupMobileMenu() {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupRevealAnimations() {
  if (!revealItems.length || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupPartnerForm() {
  if (!partnerForm) {
    return;
  }

  partnerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(partnerForm);
    const name = String(formData.get("name") || "").trim();
    const organization = String(formData.get("organization") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const partnershipType = String(formData.get("partnership_type") || "").trim();
    const details = String(formData.get("details") || "").trim();

    const subject = encodeURIComponent(`Partner With Us Inquiry${organization ? ` - ${organization}` : ""}`);
    const body = encodeURIComponent(
      [
        "Partner With Us Inquiry",
        "",
        `Name: ${name}`,
        `Organization: ${organization}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `City: ${city || "Not provided"}`,
        `Partnership Type: ${partnershipType}`,
        "",
        "Details:",
        details
      ].join("\n")
    );

    window.location.href = `mailto:pierce@lcpsa.net?subject=${subject}&body=${body}`;
  });
}

function setupHeroSlideshow() {
  if (!heroSlideshow) {
    return;
  }

  const images = String(heroSlideshow.dataset.images || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const primarySlide = heroSlideshow.querySelector(".hero-slide-primary");
  const secondarySlide = heroSlideshow.querySelector(".hero-slide-secondary");

  if (images.length < 2 || !primarySlide || !secondarySlide) {
    return;
  }

  let activeSlide = primarySlide;
  let inactiveSlide = secondarySlide;
  let currentIndex = 0;

  primarySlide.style.backgroundImage = `url("${images[0]}")`;
  secondarySlide.style.backgroundImage = `url("${images[1]}")`;

  window.setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    inactiveSlide.style.backgroundImage = `url("${images[currentIndex]}")`;

    inactiveSlide.classList.add("is-active");
    activeSlide.classList.remove("is-active");

    const previousActive = activeSlide;
    activeSlide = inactiveSlide;
    inactiveSlide = previousActive;
  }, 5200);
}

setupMobileMenu();
setupRevealAnimations();
setupPartnerForm();
setupHeroSlideshow();
