const puntosEl = document.getElementById("total-puntos");
const historialList = document.getElementById("historial-list");
const historialVacio = document.getElementById("historial-vacio");
let puntos = 320;

// Cargar historial al inicio
window.addEventListener('load', () => {
  cargarHistorial();
});

document.querySelectorAll(".canjear-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const costo = parseInt(btn.dataset.cost);
    if (puntos < costo) {
      alert("❌ No tienes puntos suficientes");
      return;
    }
    
    puntos -= costo;
    puntosEl.textContent = puntos;
    
    // Guardar canje en localStorage
    const recompensa = btn.parentElement.querySelector(".dash-route-title").textContent;
    const canje = {
      recompensa: recompensa,
      puntos: costo,
      fecha: new Date().toLocaleDateString('es-PE'),
      codigo: 'TF-' + Date.now().toString().slice(-6)
    };
    
    guardarCanje(canje);
    cargarHistorial();
    
    alert("✅ Canje realizado con éxito\nCódigo: " + canje.codigo);
  });
});

// Guardar canje en localStorage
function guardarCanje(canje) {
  let historial = JSON.parse(localStorage.getItem('historial-canjes') || '[]');
  historial.unshift(canje);
  localStorage.setItem('historial-canjes', JSON.stringify(historial));
}

// Cargar y mostrar historial
function cargarHistorial() {
  const historial = JSON.parse(localStorage.getItem('historial-canjes') || '[]');
  
  if (historial.length === 0) {
    historialVacio.style.display = 'block';
    historialList.innerHTML = '';
    return;
  }
  
  historialVacio.style.display = 'none';
  historialList.innerHTML = historial.map((item, index) => `
    <article class="dash-card dash-route">
      <div style="flex: 1;">
        <p class="dash-route-title">${item.recompensa}</p>
        <p class="dash-route-meta">
          Canjeado el ${item.fecha}<br>
          Código: <strong>${item.codigo}</strong><br>
          Puntos: ${item.puntos}
        </p>
      </div>
      <button class="btn btn-primary dash-small-btn compartir-btn" 
              data-index="${index}"
              data-recompensa="${item.recompensa}"
              data-puntos="${item.puntos}">
        🎉 Compartir
      </button>
    </article>
  `).join('');
  
  // Agregar event listeners a los botones de compartir
  document.querySelectorAll('.compartir-btn').forEach(btn => {
    btn.addEventListener('click', () => compartirLogro(btn));
  });
}

// Función para compartir logro
function compartirLogro(button) {
  const recompensa = button.dataset.recompensa;
  const puntos = button.dataset.puntos;
  mostrarModalCompartir(recompensa, puntos);
}

// Crear y mostrar modal de compartir
function mostrarModalCompartir(recompensa, puntos) {
  let modal = document.getElementById('modalCompartir');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modalCompartir';
    modal.className = 'modal-compartir';
    modal.innerHTML = `
      <div class="modal-compartir-content">
        <button class="modal-close" id="btnCerrarModal">&times;</button>
        
        <h2 style="text-align: center; font-size: 1.5rem; margin-bottom: 0.5rem;">🎉 ¡Comparte tu logro!</h2>
        <p style="text-align: center; color: #666; margin-bottom: 1.5rem;">Motiva a tus amigos y vecinos</p>
        
        <!-- Preview de la insignia -->
        <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
          <div class="logro-badge">
            <span style="font-size: 3rem; display: block; margin-bottom: 0.5rem;">🏅</span>
            <h3 id="preview-recompensa" style="font-size: 1.2rem; margin-bottom: 0.3rem;">${recompensa}</h3>
            <p id="preview-puntos" style="font-size: 0.9rem; opacity: 0.9;">Canjeado por ${puntos} puntos</p>
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding-top: 0.8rem; border-top: 1px solid rgba(255,255,255,0.3); margin-top: 0.8rem; font-size: 0.85rem; font-weight: 600;">
              <span>🗑️</span>
              <span>TRASH FINDER</span>
            </div>
          </div>
        </div>
        
        <!-- Mensaje personalizado -->
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.95rem;">💬 Agrega un mensaje (opcional)</label>
          <textarea 
            id="mensaje-compartir" 
            rows="3" 
            placeholder="Ej: ¡Sigue limpiando tu ciudad y gana recompensas! #TrashFinder"
            maxlength="150"
            style="width: 100%; padding: 0.8rem; border: 2px solid #e0e0e0; border-radius: 8px; font-family: inherit; font-size: 1rem; resize: vertical;"></textarea>
          <span style="display: block; text-align: right; font-size: 0.85rem; color: #666; margin-top: 0.3rem;">
            <span id="charCountModal">0</span>/150
          </span>
        </div>
        
        <!-- Opciones de compartir -->
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1rem; margin-bottom: 0.8rem;">Compartir en:</h3>
          <div class="social-buttons-grid">
            <button class="btn-social-share facebook" id="btnFacebook" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            
            <button class="btn-social-share twitter" id="btnTwitter" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </button>
            
            <button class="btn-social-share whatsapp" id="btnWhatsapp" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </button>
          </div>
        </div>
        
        <div style="display: flex; gap: 0.8rem; margin-top: 1rem;">
          <button class="btn btn-secondary" id="btnCancelar" type="button" style="flex: 1;">Cancelar</button>
          <button class="btn btn-outline" id="btnCopiarEnlace" type="button" style="flex: 1;">📋 Copiar enlace</button>
        </div>
        
        <!-- Mensaje de estado -->
        <div id="statusCompartir" class="status-compartir hidden"></div>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Event Listeners DESPUÉS de crear el modal
    document.getElementById('btnCerrarModal').addEventListener('click', cerrarModalCompartir);
    document.getElementById('btnCancelar').addEventListener('click', cerrarModalCompartir);
    document.getElementById('btnFacebook').addEventListener('click', () => compartirEnRed('facebook'));
    document.getElementById('btnTwitter').addEventListener('click', () => compartirEnRed('twitter'));
    document.getElementById('btnWhatsapp').addEventListener('click', () => compartirEnRed('whatsapp'));
    document.getElementById('btnCopiarEnlace').addEventListener('click', copiarEnlace);
    
    // Contador de caracteres
    const mensajeTextarea = document.getElementById('mensaje-compartir');
    const charCountModal = document.getElementById('charCountModal');
    
    mensajeTextarea.addEventListener('input', function() {
      const length = this.value.length;
      charCountModal.textContent = length;
      charCountModal.style.color = length > 130 ? '#FF8C42' : '#666';
    });
  } else {
    // Actualizar contenido si el modal ya existe
    document.getElementById('preview-recompensa').textContent = recompensa;
    document.getElementById('preview-puntos').textContent = `Canjeado por ${puntos} puntos`;
    document.getElementById('mensaje-compartir').value = '';
    document.getElementById('charCountModal').textContent = '0';
  }
  
  // Mostrar modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Cerrar modal
function cerrarModalCompartir() {
  const modal = document.getElementById('modalCompartir');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }
}

// Compartir en redes sociales (simulado)
function compartirEnRed(red) {
  const mensaje = document.getElementById('mensaje-compartir').value;
  const recompensa = document.getElementById('preview-recompensa').textContent;
  const statusDiv = document.getElementById('statusCompartir');
  
  const tieneConexion = navigator.onLine;
  
  if (!tieneConexion) {
    statusDiv.textContent = '⚠️ No hay conexión a internet. Por favor, intenta más tarde.';
    statusDiv.className = 'status-compartir error';
    statusDiv.classList.remove('hidden');
    
    setTimeout(() => statusDiv.classList.add('hidden'), 4000);
    return;
  }
  
  const texto = mensaje || `¡Acabo de canjear "${recompensa}" en Trash Finder! 🎉 #TrashFinder #EcoHéroe`;
  console.log(`📱 Compartiendo en ${red}:`, texto);
  
  statusDiv.textContent = `✅ ¡Logro compartido en ${red.charAt(0).toUpperCase() + red.slice(1)}!`;
  statusDiv.className = 'status-compartir success';
  statusDiv.classList.remove('hidden');
  
  setTimeout(() => {
    cerrarModalCompartir();
    statusDiv.classList.add('hidden');
  }, 2000);
}

// Copiar enlace
function copiarEnlace() {
  const enlace = 'https://trashfinder.app/logros/' + Date.now();
  const statusDiv = document.getElementById('statusCompartir');
  
  navigator.clipboard.writeText(enlace).then(() => {
    statusDiv.textContent = '✅ Enlace copiado al portapapeles';
    statusDiv.className = 'status-compartir success';
    statusDiv.classList.remove('hidden');
    setTimeout(() => statusDiv.classList.add('hidden'), 2000);
  }).catch(() => {
    alert('📋 Enlace: ' + enlace);
  });
}

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(event) {
  const modal = document.getElementById('modalCompartir');
  if (event.target === modal) {
    cerrarModalCompartir();
  }
});

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('modalCompartir');
    if (modal && modal.classList.contains('active')) {
      cerrarModalCompartir();
    }
  }
});

/* ================================
   📌 CONFIGURACIÓN DEL USUARIO
   ================================ */
// Usa estos valores reales cuando tengas backend
const puntosUsuario = 320;
const puestoUsuario = 12;             // Ejemplo: NO está en top 10
const distritoUsuario = "San Miguel"; // Ejemplo: NO ganador

// Configuraciones del mes
const distritoGanador = "Miraflores";
const limitePuesto = 10;



/* ================================
   📌 MANEJO DE HISTORIAL
   ================================ */
function agregarAlHistorial(nombreRecompensa) {
    const lista = document.getElementById("historial-list");
    const vacio = document.getElementById("historial-vacio");

    if (vacio) vacio.style.display = "none";

    const card = document.createElement("article");
    card.classList.add("dash-card");
    card.innerHTML = `
        <p class="dash-route-title">🎁 ${nombreRecompensa}</p>
        <p class="dash-route-meta">Canjeado hoy</p>
    `;

    lista.appendChild(card);
}

//   🥇 RECOMPENSAS POR MEJORES PUESTOS

document.querySelector(".recompensa-premium-btn")?.addEventListener("click", () => {

    const usuarioCalifica = false; 
    const recompensaNombre = " 50% de descuento en 5 artículos de Oeschle";

    // ❌ No califica
    if (!usuarioCalifica) {
        alert("🚫 Aún no estás entre los primeros. ¡Sigue adelante!.");
        return;
    }

    // ✅ Sí califica → canje directo
    agregarAlHistorial(recompensaNombre);

    alert("🎉 ¡Felicidades! Has canjeado la recompensa por mejores puestos.");
});




//   🏙️ RECOMPENSAS PARA EL MEJOR DISTRITO

document.querySelector(".recompensa-distrito-btn")?.addEventListener("click", () => {

    const usuarioCalifica = distritoUsuario === distritoGanador;
    const recompensaNombre = "3 cupones gratis de Frutix";

    // ❌ No califica
    if (!usuarioCalifica) {
        alert("🚫 Tu distrito aún no está entre los mejores puestos ¡Ayúdalo a alcanzarlo!");
        return;
    }

    // ✅ Sí califica → canje directo
    agregarAlHistorial(recompensaNombre);

    alert("🎉 ¡Felicidades! Has canjeado la recompensa del mejor distrito.");
});

