const puntosEl = document.getElementById("total-puntos");
const historialList = document.getElementById("historial-list");
const historialVacio = document.getElementById("historial-vacio");

let puntos = 320;

document.querySelectorAll(".canjear-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const costo = parseInt(btn.dataset.cost);

    if (puntos < costo) {
      alert("❌ No tienes puntos suficientes");
      return;
    }

    puntos -= costo;
    puntosEl.textContent = puntos;

    historialVacio.style.display = "none";

    // Agregar al historial
    const item = document.createElement("article");
    item.classList.add("dash-card");
    item.innerHTML = `
      <p class="dash-route-title">Canje realizado</p>
      <p class="dash-route-meta">Recompensa: ${btn.parentElement.querySelector(".dash-route-title").textContent}</p>
      <p class="dash-route-meta">Puntos usados: ${costo}</p>
    `;
    historialList.appendChild(item);

    alert("✅ Canje realizado con éxito");
  });
});
