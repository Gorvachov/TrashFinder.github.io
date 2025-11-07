const users = JSON.parse(localStorage.getItem('tf_users') || '[]');
const sessionEmail = localStorage.getItem('tf_session');
const me = users.find(u => u.email === sessionEmail);

if (!me) {
  // si no hay sesión válida, vuelve a login
  window.location.href = 'login.html';
} else {
  // saludar y mostrar puntos
  document.getElementById('greet').textContent = `Hola, ${me.nombres || me.username} 👋`;
  document.getElementById('meta').innerHTML =
    `Tienes <strong>${me.puntos ?? 0}</strong> puntos acumulados 🌱`;

  // mostrar vista según tipo
  const isCiudadano  = me.tipo === 'ciudadano';
  const isRecolector = me.tipo === 'recolector';
  document.getElementById('view-ciudadano').classList.toggle('hidden', !isCiudadano);
  document.getElementById('view-recolector').classList.toggle('hidden', !isRecolector);

  // logout
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('tf_session');
    window.location.href = 'login.html';
  });
}
