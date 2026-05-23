/* RoadRules - Shared UI (common.js) */
/* Theme, mobile menu, accessibility, tailwind config - used by all pages */

function initTailwind() {
  if (window.tailwind) {
    tailwind.config = { darkMode: 'class' };
  }
}

function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (document.documentElement.classList.contains('dark')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    icon.style.color = '#facc15';
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    icon.style.color = '';
  }
}

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark);
  localStorage.setItem('roadRulesTheme', dark ? 'dark' : 'light');
  updateThemeIcon();
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  applyTheme(!isDark);
}

function initTheme() {
  updateThemeIcon();
  if (!localStorage.getItem('roadRulesTheme') && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', e => {
      if (!localStorage.getItem('roadRulesTheme')) {
        document.documentElement.classList.toggle('dark', e.matches);
        updateThemeIcon();
      }
    });
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('mobile-menu-button');
  if (!menu || !btn) return;
  const icon = btn.querySelector('i');
  const isHidden = menu.classList.contains('hidden');
  menu.classList.toggle('hidden', !isHidden);
  if (icon) {
    icon.classList.toggle('fa-bars', !isHidden);
    icon.classList.toggle('fa-times', isHidden);
  }
}

function initAccessibility() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const m = document.getElementById('auth-modal');
      const mm = document.getElementById('mobile-menu');
      if (m && !m.classList.contains('hidden')) {
        m.classList.add('hidden');
        m.classList.remove('flex');
      } else if (mm && !mm.classList.contains('hidden')) {
        mm.classList.add('hidden');
      }
    }
  });
}

// Optional: expose for pages that need to call
window.RoadRulesCommon = { initTailwind, initTheme, toggleTheme, toggleMobileMenu, initAccessibility };
