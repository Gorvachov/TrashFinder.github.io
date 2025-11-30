// HU-019 – Participación en eventos ecológicos

const listaEventos = document.getElementById("listaEventos");

const USERS_KEY = "tf_users";
const SESSION_KEY = "tf_session";

function getSessionEmail() {
  return localStorage.getItem(SESSION_KEY);
}

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function findCurrentUser() {
  const email = getSessionEmail();
  if (!email) return null;
  return getUsers().find((u) => u.email === email) || null;
}

function saveUser(updatedUser) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.email === updatedUser.email);
  if (idx === -1) return null;
  users[idx] = updatedUser;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return updatedUser;
}

function addPointsToCurrentUser(amount) {
  const user = findCurrentUser();
  if (!user) return null;
  const total = Number(user.puntos || 0) + amount;
  user.puntos = total;
  saveUser(user);
  return total;
}

// Puntos del usuario
let puntos = Number(findCurrentUser()?.puntos || 0);

// Lista fija de eventos ecológicos
const eventos = [
  {
    id: 1,
    nombre: "Limpieza de parque central",
    fecha: "25 de noviembre",
    inscrito: false,
  },
  {
    id: 2,
    nombre: "Recolección de plásticos en la playa",
    fecha: "30 de noviembre",
    inscrito: false,
  },
  {
    id: 3,
    nombre: "Campaña de reciclaje comunitario",
    fecha: "5 de diciembre",
    inscrito: false,
  },
];

// Cargar estado previo si existe
const eventosKey = getSessionEmail()
  ? `eventosUsuario:${getSessionEmail()}`
  : "eventosUsuario";

const guardado = JSON.parse(localStorage.getItem(eventosKey) || "null");
if (guardado) {
  guardado.forEach((e, i) => {
    eventos[i].inscrito = e.inscrito;
  });
}

function renderEventos() {
  listaEventos.innerHTML = "";

  eventos.forEach((evento) => {
    const div = document.createElement("div");
    div.className = "evento-card";

    div.innerHTML = `
      <h3>${evento.nombre}</h3>
      <p><strong>Fecha:</strong> ${evento.fecha}</p>

      <button class="btn-evento"
        data-id="${evento.id}"
        data-action="toggle"
      >
        ${evento.inscrito ? "Cancelar inscripción" : "Inscribirme"}
      </button>

      <button class="btn-evento secondary"
        data-id="${evento.id}"
        data-action="finalizar"
      >
        Finalizar evento
      </button>

      ${evento.inscrito ? `<div class="estado-inscrito">Inscrito ✔</div>` : ""}
    `;

    listaEventos.appendChild(div);
  });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = parseInt(btn.dataset.id);
  const action = btn.dataset.action;

  const evento = eventos.find((ev) => ev.id === id);

  if (action === "toggle") {
    evento.inscrito = !evento.inscrito;
    localStorage.setItem(eventosKey, JSON.stringify(eventos));
    renderEventos();
  }

  if (action === "finalizar") {
    if (!findCurrentUser()) {
      alert("Debes iniciar sesión para acumular puntos.");
      return;
    }
    if (evento.inscrito) {
      const total = addPointsToCurrentUser(20);
      puntos = Number(total || puntos);
      alert(
        `✔ Evento completado. Has ganado 20 puntos.\nTotal: ${puntos} puntos`
      );
    } else {
      alert("❌ No estabas inscrito. No ganas puntos.");
    }
  }
});

renderEventos();
