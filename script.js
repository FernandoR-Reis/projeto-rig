const nav = document.getElementById('mainNav');
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const logoImages = document.querySelectorAll('[data-logo-light][data-logo-dark]');

function resolveInitialTheme() {
  const storedTheme = localStorage.getItem('vertice-theme');
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }
  return 'dark';
}

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('vertice-theme', theme);

  const isDark = theme === 'dark';
  const nextLabel = isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro';

  if (themeToggle) {
    themeToggle.setAttribute('aria-label', nextLabel);
    themeToggle.setAttribute('title', nextLabel);
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
  if (themeToggleMobile) {
    themeToggleMobile.setAttribute('aria-label', nextLabel);
    themeToggleMobile.setAttribute('title', nextLabel);
    themeToggleMobile.setAttribute('aria-pressed', String(isDark));
  }

  logoImages.forEach((image) => {
    const lightSrc = image.getAttribute('data-logo-light');
    const darkSrc = image.getAttribute('data-logo-dark');
    image.setAttribute('src', isDark ? lightSrc : darkSrc);
  });
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme') || 'dark';
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

applyTheme(resolveInitialTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}
if (themeToggleMobile) {
  themeToggleMobile.addEventListener('click', toggleTheme);
}

if (nav) {
  window.addEventListener(
    'scroll',
    () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
    },
    { passive: true }
  );
}

const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
const navClose = document.getElementById('navClose');

function openMenu() {
  if (!navMobile || !navToggle) {
    return;
  }
  navMobile.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  if (!navMobile || !navToggle) {
    return;
  }
  navMobile.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle) {
  navToggle.addEventListener('click', openMenu);
}
if (navClose) {
  navClose.addEventListener('click', closeMenu);
}
if (navMobile) {
  navMobile.querySelectorAll('a').forEach((anchor) => anchor.addEventListener('click', closeMenu));
}

const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
if (revealEls.length > 0) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => io.observe(el));
}

const methodSteps = document.querySelectorAll('.method__step');
if (methodSteps.length > 0) {
  const ioSteps = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), index * 90);
          ioSteps.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  methodSteps.forEach((el) => ioSteps.observe(el));
}

const form = document.getElementById('contactForm');
const confirmMessage = document.getElementById('formConfirm');
if (form && confirmMessage) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('is-hidden');
    confirmMessage.classList.add('is-shown');
  });
}
