// Ajusta el tiempo de splash (ms)
const SPLASH_MS = 1800;

window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const auth   = document.getElementById('auth');
  const body   = document.body;

  setTimeout(() => {
    splash.classList.add('hidden');   // oculta la pantalla verde
    auth.classList.remove('hidden');  // muestra el login
    auth.setAttribute('aria-hidden', 'false');
    body.classList.remove('lock');    // vuelve a permitir scroll
    auth.querySelector('input[type="email"]')?.focus();
  }, SPLASH_MS);
});

// === Mostrar/ocultar contraseña (botón ojo) ===
const togglePwd = document.getElementById('togglePwd');
const pwdInput  = document.getElementById('passwordInput');

if (togglePwd && pwdInput) {
  togglePwd.addEventListener('click', () => {
    const mostrar = pwdInput.type === 'password';
    pwdInput.type = mostrar ? 'text' : 'password';
    togglePwd.setAttribute('aria-label', mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña');
    togglePwd.title = mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña';
    // (opcional) cambia el ícono
    togglePwd.textContent = mostrar ? '🙈' : '👁️';
  });
}
