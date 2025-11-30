// HU-030 – Notificación de mantenimiento de contenedores

(() => {
  const card = document.getElementById("mantenimientoCard");
  const titulo = document.getElementById("mantenimientoTitulo");
  const meta = document.getElementById("mantenimientoMeta");
  const btnSimular = document.getElementById("btnSimularMantenimiento");
  const btnReactivar = document.getElementById("btnReactivar");

  // Estado simulado del contenedor
  let contenedor = {
    id: 123,
    estado: "operativo", // operativo | mantenimiento
  };

  /** Mostrar card */
  function mostrarCard() {
    card.classList.remove("hidden");
  }

  /** Ocultar card */
  function ocultarCard() {
    card.classList.add("hidden");
  }

  /** Mostrar texto de mantenimiento */
  function mostrarMantenimiento() {
    titulo.textContent = `Contenedor N°${contenedor.id} en mantenimiento`;
    meta.textContent = "Excluir de la ruta hasta nuevo aviso.";
    mostrarCard();
  }

  /** Marcar contenedor como reparado */
  function reactivarContenedor() {
    contenedor.estado = "operativo";
    alert("✔ Contenedor reactivado");

    ocultarCard();
  }

  /** CLICK: Simular mantenimiento */
  btnSimular.addEventListener("click", () => {
    contenedor.estado = "mantenimiento";

    mostrarMantenimiento();
  });

  /** CLICK: Marcar reparado */
  btnReactivar.addEventListener("click", () => {
    reactivarContenedor();
  });
})();
