// ===================================================================
// Agüera Podología — comportamiento del sitio
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {
  initHeroKenBurns();
  initStickyHeader();
  initMobileMenu();
  initScrollReveal();
  initBgZoom();
  initAccessibilityToggle();
});

/**
 * Efecto Ken Burns del header: hace crossfade + zoom lento entre las
 * imágenes de .hero__image, cada 7s, alternando el origen del zoom
 * para dar sensación de movimiento continuo (casi vídeo).
 */
function initHeroKenBurns() {
  const images = document.querySelectorAll(".hero__image img");
  if (!images.length) return;

  images[0].classList.add("fx");

  let i = 1;
  const total = images.length;

  function tick() {
    if (i === total) i = 0;

    images[i].classList.add("fx");

    if (i === 0) {
      images[total - 2]?.classList.remove("fx");
    } else if (i === 1) {
      images[total - 1]?.classList.remove("fx");
    } else {
      images[i - 2]?.classList.remove("fx");
    }

    i++;
  }

  window.setInterval(tick, 7000);
}

function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const closeBtn = document.querySelector(".nav-menu-close");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.add("is-open");
  });

  closeBtn?.addEventListener("click", () => {
    menu.classList.remove("is-open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("is-open"));
  });
}

/**
 * Botón flotante de accesibilidad: aumenta el tamaño de letra y el
 * interlineado de toda la web. Se recuerda entre visitas.
 */
function initAccessibilityToggle() {
  const btn = document.querySelector(".fab-accessibility");
  if (!btn) return;

  let enabled = false;
  try {
    enabled = localStorage.getItem("aguera-accesible") === "1";
  } catch (e) {
    /* almacenamiento no disponible, se ignora */
  }
  document.documentElement.classList.toggle("accessible-mode", enabled);
  btn.setAttribute("aria-pressed", String(enabled));

  btn.addEventListener("click", () => {
    enabled = !enabled;
    document.documentElement.classList.toggle("accessible-mode", enabled);
    btn.setAttribute("aria-pressed", String(enabled));
    try {
      localStorage.setItem("aguera-accesible", enabled ? "1" : "0");
    } catch (e) {
      /* almacenamiento no disponible, se ignora */
    }
  });
}

/**
 * Efecto "zoomOutBg" de Gotham: la imagen de fondo de una sección pasa
 * de scale(1.1) a scale(1) UNA sola vez, al entrar en pantalla.
 */
function initBgZoom() {
  const sections = document.querySelectorAll(".bg-zoom");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-animated");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}
