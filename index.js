const btn = document.getElementById('mobileMenuBtn');
const body = document.body;
const nav = document.getElementById('primaryNav');

if (btn) {
  btn.addEventListener('click', () => {
    const open = body.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

// Cierra el menú al hacer clic en un enlace de navegación (en móvil)
if (nav) {
  nav.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'A' && body.classList.contains('nav-open')) {
      body.classList.remove('nav-open');
      btn && btn.setAttribute('aria-expanded', 'false');
    }
  });
}
