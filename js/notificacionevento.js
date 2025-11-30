// HU-018 y HU-019
// Simulación de eventos ecológicos y registro de participación

// Eventos de ejemplo
const eventos = [
  {
    id: 1,
    titulo: "Limpieza de playa Costa Verde",
    fecha: "2025-02-20",
    distrito: "San Miguel",
    lugar: "Playa Agua Dulce",
    finalizado: false,
    inscritos: false,
  },
  {
    id: 2,
    titulo: "Recojo comunitario de residuos",
    fecha: "2025-01-25",
    distrito: "Callao",
    lugar: "Plaza Grau",
    finalizado: true,
    inscritos: true,
  },
];

const eventosActivosDiv = document.getElementById("eventosActivos");
const eventosFinalizadosDiv = document.getElementById("eventosFinalizados");

// Render inicial
function renderEventos() {
  eventosActivosDiv.innerHTML = "";
  eventosFinalizadosDiv.innerHTML = "";

  eventos.forEach((ev) => {
    const div = document.createElement("div");
    div.className = "event-card";

    div.innerHTML = `
        <p class="event-title">${ev.titulo}</p>
        <p class="event-meta">📍 ${ev.lugar} — ${ev.distrito}</p>
        <p class="event-meta">📅 ${ev.fecha}</p>
      `;

    // Evento activo
    if (!ev.finalizado) {
      div.innerHTML += `
          <button class="btn-inscribir ${ev.inscritos ? "disabled" : ""}"
            data-id="${ev.id}">
            ${ev.inscritos ? "Ya inscrito" : "Inscribirme"}
          </button>
        `;
      eventosActivosDiv.appendChild(div);
    }

    // Evento finalizado
    else {
      div.innerHTML += `
          <p class="event-meta">✔ Finalizado</p>
        `;
      eventosFinalizadosDiv.appendChild(div);

      // HU-019 → Si estaba inscrito, otorgar puntos
      if (ev.inscritos) {
 const users = JSON.parse(localStorage.getItem("tf_users") || "[]");
        const email = localStorage.getItem("tf_session");
        const idx = users.findIndex((u) => u.email === email);

        if (idx !== -1) {
          const puntos = Number(users[idx].puntos || 0) + 30; // Puntos por evento completado
          users[idx].puntos = puntos;
          localStorage.setItem("tf_users", JSON.stringify(users));
        }
      }
    }
  });
}

renderEventos();

// Interacción: inscribirse
document.addEventListener("click", (e) => {
  if (!e.target.matches(".btn-inscribir")) return;

  const id = Number(e.target.getAttribute("data-id"));
  const evento = eventos.find((ev) => ev.id === id);

  if (evento) {
    evento.inscritos = true;
    alert("Te inscribiste correctamente al evento.");
    renderEventos();
  }
});

