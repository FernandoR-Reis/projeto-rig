const nav = document.getElementById('mainNav');
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const footerThemeToggle = document.getElementById('footerThemeToggle');
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
  if (footerThemeToggle) {
    footerThemeToggle.setAttribute('aria-label', nextLabel);
    footerThemeToggle.setAttribute('title', nextLabel);
    footerThemeToggle.setAttribute('aria-pressed', String(isDark));
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
if (footerThemeToggle) {
  footerThemeToggle.addEventListener('click', toggleTheme);
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

const addressNavLink = document.getElementById('addressNavLink');
if (addressNavLink) {
  addressNavLink.addEventListener('click', (event) => {
    const addressQuery = 'Rua Conceicao, 233 - Sala 916, Centro - Campinas - SP';
    const encodedAddress = encodeURIComponent(addressQuery);
    const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) {
      return;
    }

    event.preventDefault();
    const now = Date.now();

    window.location.href = wazeUrl;

    window.setTimeout(() => {
      // If Waze app did not take over, fallback to Maps in the same tab.
      if (Date.now() - now < 1600) {
        window.location.href = mapsUrl;
      }
    }, 1100);
  });
}

function setupCustomInterestSelect() {
  const select = document.getElementById('finterest');
  if (!select || select.dataset.customized === 'true') {
    return;
  }

  const field = select.closest('.field');
  if (!field) {
    return;
  }

  field.classList.add('field--interest');
  select.classList.add('native-select--hidden');

  const wrapper = document.createElement('div');
  wrapper.className = 'custom-select';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'custom-select__trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');

  const list = document.createElement('div');
  list.className = 'custom-select__list';
  list.setAttribute('role', 'listbox');

  const options = Array.from(select.options);
  const placeholderOption = options.find((option) => option.value === '') || options[0];

  function updateTriggerLabel() {
    const selectedOption = select.options[select.selectedIndex];
    if (!selectedOption || selectedOption.value === '') {
      trigger.textContent = placeholderOption ? placeholderOption.textContent : 'Selecione um servico';
      trigger.classList.add('is-placeholder');
      return;
    }

    trigger.textContent = selectedOption.textContent;
    trigger.classList.remove('is-placeholder');
  }

  function closeList() {
    wrapper.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  function openList() {
    wrapper.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  }

  options
    .filter((option) => option.value !== '')
    .forEach((option) => {
      const optionButton = document.createElement('button');
      optionButton.type = 'button';
      optionButton.className = 'custom-select__option';
      optionButton.setAttribute('role', 'option');
      optionButton.textContent = option.textContent;
      optionButton.dataset.value = option.value || option.textContent;

      optionButton.addEventListener('click', () => {
        const target = Array.from(select.options).find(
          (item) => (item.value || item.textContent) === optionButton.dataset.value
        );

        if (!target) {
          return;
        }

        select.value = target.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));

        list.querySelectorAll('.custom-select__option').forEach((node) => node.classList.remove('is-selected'));
        optionButton.classList.add('is-selected');

        updateTriggerLabel();
        closeList();
      });

      list.appendChild(optionButton);
    });

  trigger.addEventListener('click', () => {
    if (wrapper.classList.contains('is-open')) {
      closeList();
      return;
    }
    openList();
  });

  document.addEventListener('click', (event) => {
    if (!wrapper.contains(event.target)) {
      closeList();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeList();
    }
  });

  updateTriggerLabel();

  wrapper.appendChild(trigger);
  wrapper.appendChild(list);
  field.appendChild(wrapper);

  select.dataset.customized = 'true';
}

setupCustomInterestSelect();
