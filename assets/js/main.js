/* Home Split Text */
const { animate, text, stagger } = anime;

const { chars: chars1 } = text.split(".home__profession-1", {
  chars: true,
});
const { chars: chars2 } = text.split(".home__profession-2", {
  chars: true,
});

animate(chars1, {
  y: [{ to: ["100%", "0%"] }, { to: "-100%", delay: 4000, ease: "in(3)" }],
  duration: 900,
  ease: "out(3)",
  delay: stagger(80),
  loop: true,
});

animate(chars2, {
  y: [{ to: ["100%", "0%"] }, { to: "-100%", delay: 4000, ease: "in(3)" }],
  duration: 900,
  ease: "out(3)",
  delay: stagger(80),
  loop: true,
});

/* Mobile Navigation */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

const closeNavigation = () => {
  if (!navToggle || !navMenu) return;

  navMenu.classList.remove('show-menu');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
  navToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
  document.body.classList.remove('menu-open');
};

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('show-menu');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    navToggle.innerHTML = isOpen
      ? '<i class="ri-close-line"></i>'
      : '<i class="ri-menu-3-line"></i>';
    document.body.classList.toggle('menu-open', isOpen);
  });

  navLinks.forEach((link) => link.addEventListener('click', closeNavigation));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavigation();
  });
}

/* Swiper Projects */
const swiperProjects = new Swiper(".projects__swiper", {
  loop: true,
  spaceBetween: 24,
  slidesPerView: "auto",
  grabCursor: true,
  speed: 600,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

/* Work Tabs */
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetSelector = tab.dataset.target,
      targetContent = document.querySelector(targetSelector);

    // Disable all content and active tabs
    tabContents.forEach((content) => content.classList.remove("work-active"));
    tabs.forEach((t) => t.classList.remove("work-active"));

    // Active the tab and corresponding content
    tab.classList.add("work-active");
    targetContent.classList.add("work-active");
  });
});

/* Services */
const buttons = document.querySelectorAll(".services__button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const cards = document.querySelectorAll(".services__card");
    const card = button.closest(".services__card");
    const info = card.querySelector(".services__info");

    const isOpen = card.classList.contains("services__open");

    // Close all cards first
    cards.forEach((c) => {
      c.classList.remove("services__open");
      c.classList.add("services__close");

      const i = c.querySelector(".services__info");
      i.style.height = "0px";
    });

    // Open the clicked card
    if (!isOpen) {
      info.style.height = "auto";
      let height = info.scrollHeight + "px";

      card.classList.remove("services__close");
      card.classList.add("services__open");

      info.style.height = height;
    }
  });
});

/* Testimonials of Duplicate Cards */
// Duplicate images to make the animation work
const tracks = document.querySelectorAll(".testimonials__content");

tracks.forEach((track) => {
  const cards = [...track.children]; // spread to make a static copy

  // Duplicate cards only once
  for (const card of cards) {
    track.appendChild(card.cloneNode(true));
  }
});

/* Current Year of Footer */
const textYear = document.getElementById("footer-year"),
  currentYear = new Date().getFullYear();

//Each year it is updated to the current year
textYear.textContent = currentYear;

/* Scroll Section Active Link */
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  // We get the position by scrolling down
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const id = section.id, //id of each section
      top = section.offsetTop - 50, // Distance from the top edge
      height = section.offsetHeight, //Element height
      link = document.querySelector(".nav__menu a[href*=" + id + "]"); //id nav link

    if (!link) return;
    link.classList.toggle(
      "active-link",
      scrollY > top && scrollY <= top + height
    );
  });
};
window.addEventListener("scroll", scrollActive);

/* Custom Cursor */
const cursor = document.querySelector(".cursor");
let mouseX = 0,
  mouseY = 0; // Store mouse position

const cursorMove = () => {
  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;
  cursor.style.transform = "translate(-50%, -50%)";

  //update the cursor animation
  requestAnimationFrame(cursorMove);
};
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
cursorMove();

/* Hide custom cursor on links */
const a = document.querySelectorAll("a");

a.forEach((item) => {
  item.addEventListener("mouseover", () => {
    cursor.classList.add("hide-cursor");
  });
  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("hide-cursor");
  });
});

/* Audio Player Functionality */
document.addEventListener('DOMContentLoaded', () => {
  const audioPlayer = document.getElementById('bg-audio');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioIcon = document.getElementById('audio-icon');
  
  if (audioToggleBtn && audioPlayer && audioIcon) {
    audioToggleBtn.addEventListener('click', () => {
      if (audioPlayer.paused) {
        audioPlayer.play();
        audioIcon.classList.remove('ri-play-fill');
        audioIcon.classList.add('ri-pause-fill');
        audioToggleBtn.classList.add('playing');
      } else {
        audioPlayer.pause();
        audioIcon.classList.remove('ri-pause-fill');
        audioIcon.classList.add('ri-play-fill');
        audioToggleBtn.classList.remove('playing');
      }
    });
  }
});

/* Scroll Reveal Animation */
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 300,
  reset: false,
});

sr.reveal(
  `.home__image, .projects__container, .work__container, .testimonials__container, .contact__container`
);
sr.reveal(`.home__data`, { delay: 900, origin: "bottom" });
sr.reveal(`.home__info`, { delay: 1200, origin: "bottom" });
sr.reveal(`.home__social, .home__cv`, { delay: 1200 });
sr.reveal(`.about__data`, { origin: "left" });
sr.reveal(`.about__image`, { origin: "right" });
sr.reveal(`.services__card`, { interval: 100 });

/* Project Card Click Handler */
document.addEventListener('click', (e) => {
  const card = e.target.closest('.projects__card[data-project]');
  if (!card) return;
  
  const projectId = card.getAttribute('data-project');
  window.location.href = `project-${projectId}.html`;
});

/* Scroll to Top Button */
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

