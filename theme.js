/* ============================================================
   Theme toggle — dark default, persisted in localStorage.
   Apply BEFORE first paint to avoid the flash by setting the
   class on <html> in the inline boot script of each page.
============================================================ */
(function () {
  const KEY = 'it-hub-theme';
  const root = document.documentElement;

  // Initial application is done inline in each page's <head> for
  // zero-flash. This file only handles the runtime toggle.

  function current() {
    return root.classList.contains('theme-light') ? 'light' : 'dark';
  }

  function apply(mode) {
    if (mode === 'light') root.classList.add('theme-light');
    else root.classList.remove('theme-light');
    try { localStorage.setItem(KEY, mode); } catch {}
    updateBtn();
  }

  function updateBtn() {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      const isLight = current() === 'light';
      btn.textContent = isLight ? '☀' : '☾';
      btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      btn.title = isLight ? 'Light mode (click for dark)' : 'Dark mode (click for light)';
    });
  }

  function toggle() {
    apply(current() === 'light' ? 'dark' : 'light');
  }

  // Wire up on DOM ready
  function init() {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
    updateBtn();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for manual use if needed
  window.__theme = { toggle, apply, current };
})();
