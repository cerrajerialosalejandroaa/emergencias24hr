(function () {
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('navList');

  function closeMenu() {
    if (!navList) return;
    navList.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // cerrar al hacer click en un link
    navList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    // cerrar al hacer click afuera
    document.addEventListener('click', (e) => {
      if (!navList.classList.contains('open')) return;
      const target = e.target;
      if (target === toggle || toggle.contains(target)) return;
      if (target === navList || navList.contains(target)) return;
      closeMenu();
    });
  }
})();
