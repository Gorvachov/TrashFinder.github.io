// Variables globales
let photoFile = null;
let currentLocation = { lat: null, lng: null };

// Referencias DOM
const photoInput = document.getElementById('foto-contenedor');
const photoUploadArea = document.getElementById('photoUploadArea');
const photoPreview = document.getElementById('photoPreview');
const previewImage = document.getElementById('previewImage');
const comentarioTextarea = document.getElementById('comentario');
const charCount = document.getElementById('charCount');
const formContenedor = document.getElementById('formContenedor');
const statusMessage = document.getElementById('statusMessage');
const containerList = document.getElementById('containerList');

window.addEventListener('load', () => {
  obtenerUbicacion();
});

// Click en el área de foto
photoUploadArea.addEventListener('click', () => {
  photoInput.click();
});

// Cuando se selecciona una foto
photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    photoFile = file;
    const reader = new FileReader();
    
    reader.onload = (event) => {
      previewImage.src = event.target.result;
      photoPreview.classList.add('hidden');
      previewImage.classList.remove('hidden');
    };
    
    reader.readAsDataURL(file);
  }
});

// Contador de caracteres
comentarioTextarea.addEventListener('input', () => {
  const length = comentarioTextarea.value.length;
  charCount.textContent = length;
  
  if (length > 280) {
    charCount.style.color = '#FF8C42';
  } else {
    charCount.style.color = '#666';
  }
});

// Obtener ubicación
function obtenerUbicacion() {
  const locationText = document.getElementById('locationText');
  
  if ('geolocation' in navigator) {
    locationText.textContent = '📍 Obteniendo ubicación...';
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation.lat = position.coords.latitude;
        currentLocation.lng = position.coords.longitude;
        
        document.getElementById('latitud').value = currentLocation.lat;
        document.getElementById('longitud').value = currentLocation.lng;
        
        locationText.textContent = `✅ Ubicación obtenida (${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)})`;
      },
      (error) => {
        locationText.textContent = '⚠️ No se pudo obtener ubicación';
        console.error('Error de geolocalización:', error);
      }
    );
  } else {
    locationText.textContent = '⚠️ Geolocalización no disponible';
  }
}

// Botón actualizar ubicación
document.getElementById('btnGetLocation').addEventListener('click', obtenerUbicacion);

// Enviar formulario
formContenedor.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validar que hay foto
  if (!photoFile) {
    mostrarEstado('⚠️ Debes agregar una foto', 'error');
    return;
  }
  // Recopilar datos
  const reporte = {
    id: 'REP-' + Date.now(),
    foto: photoFile.name,
    fotoData: previewImage.src, // Base64 para demo
    categoria: document.getElementById('categoria').value,
    comentario: document.getElementById('comentario').value,
    latitud: currentLocation.lat,
    longitud: currentLocation.lng,
    estado: 'Pendiente',
    fecha: new Date().toLocaleString('es-PE'),
    ciudadano: 'Juan Pérez' // En producción vendría del ciudadano logueado
  };

  console.log('📤 Enviando reporte:', reporte);

  // Simular envío
  const btnEnviar = document.getElementById('btnEnviar');
  btnEnviar.disabled = true;
  btnEnviar.textContent = '⏳ Enviando...';
setTimeout(() => {
    // Guardar reporte en localStorage
    guardarReporte(reporte);
    
    // Mostrar éxito
    mostrarEstado('✅ Gracias, tu reporte se ha enviado a la municipalidad.', 'success');
    
    // Actualizar lista
    cargarReportesGuardados();
    
    // Resetear formulario
    formContenedor.reset();
    photoFile = null;
    previewImage.classList.add('hidden');
    photoPreview.classList.remove('hidden');
    charCount.textContent = '0';
    
    btnEnviar.disabled = false;
    btnEnviar.textContent = '📤 Enviar reporte';
    
    // Scroll al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1500);
});

// Guardar incidencia en localStorage
function guardarReporte(reporte) {
  let reportes = JSON.parse(localStorage.getItem('reportes') || '[]');
  reportes.unshift(reporte); // Agregar al inicio
  localStorage.setItem('reportes', JSON.stringify(reportes));
}

// Cargar reportes guardados
function cargarReportesGuardados() {
  const reportes = JSON.parse(localStorage.getItem('reportes') || '[]');
  
  if (reportes.length === 0) {
    reportList.innerHTML = '<p class="dash-meta">No hay reportes registrados aún.</p>';
    return;
  }
  
  reportList.innerHTML = reportes.slice(0, 5).map(inc => `
    <article class="dash-card incident-card">
      <img src="${inc.fotoData}" alt="Reporte" class="incident-thumb">
      <div class="report-info">
        <p class="dash-route-title">${inc.id} - ${inc.categoria}</p>
        <p class="dash-route-meta">${inc.comentario.substring(0, 60)}...</p>
        <p class="dash-route-meta">📅 ${inc.fecha}</p>
        <span class="status-badge status-${inc.estado.toLowerCase()}">${inc.estado}</span>
      </div>
    </article>
  `).join('');
}

// Mostrar mensaje de estado
function mostrarEstado(mensaje, tipo) {
  statusMessage.textContent = mensaje;
  statusMessage.className = `status-message ${tipo}`;
  statusMessage.classList.remove('hidden');
  
  setTimeout(() => {
    statusMessage.classList.add('hidden');
  }, 4000);
}
