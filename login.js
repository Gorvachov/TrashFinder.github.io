// Ajusta el tiempo de splash (ms)
console.log('login.js CARGÓ ✅');

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

// === Login real (prototipo con localStorage) ===
const form = document.querySelector('.auth-form');
function getUsers(){ return JSON.parse(localStorage.getItem('tf_users') || '[]'); }
function setSession(email){ localStorage.setItem('tf_session', email); }

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = (document.querySelector('input[name="email"]')?.value || '').toLowerCase();
  const pass  = document.getElementById('passwordInput')?.value || '';
  const user  = getUsers().find(u => u.email === email && u.pass === pass);
  if (!user) { alert('Correo o contraseña incorrectos.'); return; }
  setSession(user.email);
  window.location.href = 'dashboard.html';
});

// Ojo de contraseña (si no lo añadiste ya)
const togglePwd = document.getElementById('togglePwd');
const pwdInput  = document.getElementById('passwordInput');
togglePwd?.addEventListener('click', () => {
  const show = pwdInput.type === 'password';
  pwdInput.type = show ? 'text' : 'password';
  togglePwd.textContent = show ? '🙈' : '👁️';
  togglePwd.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
});

