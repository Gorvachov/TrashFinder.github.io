const tbodyDistritos = document.getElementById("tbody-distritos");
const tbodyUsuarios = document.getElementById("tbody-usuarios");
const resumenUsuario = document.getElementById("resumen-usuario");
const resumenDistrito = document.getElementById("resumen-distrito");
const badgeDistrito = document.getElementById("badge-distrito");
const badgeUsuario = document.getElementById("badge-usuario");
const sectionDistritos = document.getElementById("section-distritos");
const sectionUsuarios = document.getElementById("section-usuarios");
const btnDistritos = document.getElementById("btn-distritos");
const btnUsuarios = document.getElementById("btn-usuarios");

function toggleRanking(target) {
  const showingDistritos = target === "distritos";

  sectionDistritos.classList.toggle("hidden", !showingDistritos);
  sectionDistritos.setAttribute("aria-hidden", (!showingDistritos).toString());
  sectionUsuarios.classList.toggle("hidden", showingDistritos);
  sectionUsuarios.setAttribute("aria-hidden", showingDistritos.toString());

  btnDistritos.classList.toggle("btn-primary", showingDistritos);
  btnDistritos.classList.toggle("btn-secondary", !showingDistritos);
  btnUsuarios.classList.toggle("btn-primary", !showingDistritos);
  btnUsuarios.classList.toggle("btn-secondary", showingDistritos);
}

function setupRankingToggles() {
  const buttons = document.querySelectorAll("[data-ranking-target]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-ranking-target");
      toggleRanking(target);
    });
  });
}

function renderDistrictRanking(districts) {
  tbodyDistritos.innerHTML = districts
    .map(
      (d) => `
        <tr class="${d.nombre === RankingData.SAN_MIGUEL ? "highlight" : ""}">
          <td>${d.puesto}</td>
          <td>${d.nombre}</td>
          <td>${d.puntos} puntos</td>
        </tr>
      `
    )
    .join("");

  const sanMiguel = districts.find((d) => d.nombre === RankingData.SAN_MIGUEL);
  if (sanMiguel) {
    resumenDistrito.textContent = `San Miguel está en el puesto #${sanMiguel.puesto} con ${sanMiguel.puntos} puntos.`;
    badgeDistrito.textContent = sanMiguel.puesto === 1 ? "🥇 Distrito líder" : "";
    badgeDistrito.className = `badge ${sanMiguel.puesto === 1 ? "success" : "info"}`;
  }
}

function renderUserRanking(users) {
  tbodyUsuarios.innerHTML = users
    .map((u) => {
      const nombreCompleto = `${u.nombre} ${u.apellido || ""}`.trim();
      const resaltar = u.esActual ? "highlight" : "";
      return `
        <tr class="${resaltar}">
          <td>${u.puesto}</td>
          <td>${nombreCompleto}</td>
          <td>${u.distrito || RankingData.SAN_MIGUEL}</td>
          <td>${u.puntos} puntos</td>
        </tr>
      `;
    })
    .join("");

  const usuario = users.find((u) => u.esActual);
  if (usuario) {
    resumenUsuario.textContent = `Tu puesto es #${usuario.puesto} con ${usuario.puntos} puntos.`;
    badgeUsuario.textContent = usuario.puesto <= 3 ? "🥉 Elegible top 3" : "📈 Sigue sumando";
    badgeUsuario.className = `badge ${usuario.puesto <= 3 ? "success" : "info"}`;
  } else {
    resumenUsuario.textContent = "Inicia sesión para ver tu posición en el ranking.";
    badgeUsuario.textContent = "";
    badgeUsuario.className = "badge info";
  }
}

(function initRanking() {
  const data = RankingData.getCurrentUserRanking();
  setupRankingToggles();
  renderDistrictRanking(data.districts);
  renderUserRanking(data.users);
})();
