// ===============================
// 1. Inicializar Firebase (AL INICIO)
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyCaHIdJN4wSfmSpHagfHAp3zSnmfEYZKt0",
  authDomain: "trashfinder-33bfa.firebaseapp.com",
  projectId: "trashfinder-33bfa",
  storageBucket: "trashfinder-33bfa.firebasestorage.app",
  messagingSenderId: "992521259654",
  appId: "1:992521259654:web:42e64a288223b556575f07",
  measurementId: "G-HGW5XHG5NF"
};

firebase.initializeApp(firebaseConfig);

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

// ===============================
//  Login con Google REAL (Firebase)
// ===============================
const googleBtn = document.getElementById("googleLoginBtn");

if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);

      const user = result.user;

      // Guardar sesión
      localStorage.setItem("tf_session", user.email);

      // Si quieres guardar su nombre en tf_users, agrega:
      let users = JSON.parse(localStorage.getItem("tf_users") || "[]");

      if (!users.some(u => u.email === user.email)) {
        users.push({
          email: user.email,
          nombres: user.displayName,
          tipo: "ciudadano", // o recolector si quieres
          pass: null
        });
        localStorage.setItem("tf_users", JSON.stringify(users));
      }

      // Redirigir
      window.location.href = "dashboard.html";

    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      alert("No se pudo iniciar sesión con Google.");
    }
  });
}

// ===============================
// Login con Facebook REAL (Firebase)
// ===============================
facebookBtn.addEventListener("click", async () => {
const provider = new firebase.auth.FacebookAuthProvider();

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;

    // Guardar sesión
    localStorage.setItem("tf_session", user.email);

    // 🔥 Asegurar que sí esté en tf_users
    let users = JSON.parse(localStorage.getItem("tf_users") || "[]");

    let exists = users.find(u => u.email === user.email);

    if (!exists) {
      users.push({
        id: Date.now(),
        email: user.email,
        nombres: user.displayName || "Usuario Facebook",
        tipo: "ciudadano",
        puntos: 0,
        pass: null
      });
      localStorage.setItem("tf_users", JSON.stringify(users));
    }

    //Esperamos un pequeño delay para asegurar escritura
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 200);

  } catch (err) {
    console.error("Error Facebook Login:", err);
    alert("No se pudo iniciar sesion con Facebook.");
  }
});





