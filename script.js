const nav = document.getElementById('mainNav');
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
