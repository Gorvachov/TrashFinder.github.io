// Helpers de storage
const loadUsers = () => JSON.parse(localStorage.getItem('tf_users') || '[]');
const saveUsers = (u) => localStorage.setItem('tf_users', JSON.stringify(u));
const setSession = (email) => localStorage.setItem('tf_session', email);

const byId = (id) => document.getElementById(id);

function toggleEye(btnId, inputId){
  const btn = byId(btnId), inp = byId(inputId);
  btn?.addEventListener('click', () => {
    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    btn.textContent = show ? '🙈' : '👁️';
    btn.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
  });
}
toggleEye('r-toggle1','r-pass');
toggleEye('r-toggle2','r-pass2');

byId('registerForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = {
    id: Date.now(),
    username: byId('r-username').value.trim(),
    nombres:  byId('r-nombres').value.trim(),
    apepat:   byId('r-apepat').value.trim(),
    apemat:   byId('r-apemat').value.trim(),
    telefono: byId('r-telefono').value.trim(),
    email:    byId('r-email').value.trim().toLowerCase(),
    pass:     byId('r-pass').value,
    tipo:     byId('r-tipo').value,         // 'ciudadano' | 'recolector'
    puntos:   0
  };
  const pass2 = byId('r-pass2').value;

  if (user.pass.length < 6) { alert('La contraseña debe tener al menos 6 caracteres.'); return; }
  if (user.pass !== pass2) { alert('Las contraseñas no coinciden.'); return; }

  const users = loadUsers();
  if (users.some(u => u.email === user.email)) {
    alert('Ya existe una cuenta con este correo.');
    return;
  }

  users.push(user);
  saveUsers(users);
  setSession(user.email);           // inicia sesión automáticamente
  window.location.href = 'dashboard.html';
});
