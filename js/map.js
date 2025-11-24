let lleno = true;
function cambiarEstado() {
  const estado = document.getElementById("estadoTacho");

  if (lleno) {
    estado.textContent = "Tacho lleno";
    estado.className = "lleno";
  } else {
    estado.textContent = "Aún hay espacio en el tacho";
    estado.className = "disponible";
  }

  lleno = !lleno;
}

function mostrarRuta() {
    const imagen = document.getElementById("mapa-salaverry");

    if (imagen.src.includes("img/map-salaverry.jpg")) {
        imagen.src = "img/map-salaverry-ruta.jpg";
    } else {
        imagen.src = "img/map-salaverry.jpg";
    }
}