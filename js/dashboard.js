console.log('[dashboard] JS cargado ✅');
// --- Utils ---
const log = (...a) => console.log('[dashboard]', ...a);

// Carga de datos
const users = JSON.parse(localStorage.getItem('tf_users') || '[]');
const sessionEmail = localStorage.getItem('tf_session');
const me = users.find(u => u.email === sessionEmail);

if (!me) {
  log('No hay sesión, regreso a login');
  window.location.href = 'login.html';
} else {
  log('Usuario en sesión:', me);

  const vCiudadano  = document.getElementById('view-ciudadano');
  const vRecolector = document.getElementById('view-recolector');

  // --- 1) Detección de tipo de usuario (simple + robusta) ---
  const rawTipo = String(
    me.tipo ?? me.rol ?? me.role ?? me.userType ?? me.accountType ?? ''
  ).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  let isRecolector =
    rawTipo.includes('reco') || me.isCollector === true || me.esRecolector === true || Number(rawTipo) === 2;
  let isCiudadano  =
    rawTipo.includes('ciud') || me.isCollector === false || me.esRecolector === false || Number(rawTipo) === 1;

  // Si no reconocemos el tipo, mostramos ALGO por defecto (recolector si existe)
  if (!isRecolector && !isCiudadano) {
    isRecolector = !!vRecolector; // si existe la vista de recolector, muéstrala
    log('Tipo no reconocido, forzando vista por defecto → recolector:', isRecolector);
  }

  log({ rawTipo, isRecolector, isCiudadano });

  // --- 2) Mostrar/ocultar vistas ---
  vRecolector?.classList.toggle('hidden', !isRecolector);
  vCiudadano?.classList.toggle('hidden', !isCiudadano);

  // (Si aún ambas quedaron ocultas, pinta un mensaje para que lo veas)
  if ((vRecolector && vRecolector.classList.contains('hidden')) &&
      (vCiudadano  && vCiudadano .classList.contains('hidden'))) {
    document.body.insertAdjacentHTML('beforeend',
      '<div style="padding:12px;color:#b00;font-weight:700">⚠️ Ninguna vista visible. Revisa el tipo de usuario y los IDs.</div>');
    log('Ambas vistas siguen ocultas: revisa IDs/HTML o el tipo guardado en localStorage.');
  }

  // --- 3) Vista CIUDADANO: saludo + fecha + resumen ---
  if (isCiudadano && vCiudadano) {
    const nombre = me.nombres || me.username || 'Ciudadano';
// ===============================
// HU-016 – Canje de puntos por beneficios
// ===============================

if (!me.puntos || me.puntos <= 0) {
  me.puntos = 80; // valor demo inicial
}

// Mostrar puntos en pantalla si existe el span
const puntosSpan = document.getElementById("puntos");
if (puntosSpan) {
  puntosSpan.textContent = me.puntos;
}

window.canjearBeneficio = function () {
  const mensaje = document.getElementById("mensajeCanje");

  if (me.puntos >= 100) {
    me.puntos -= 100;

    // Actualizar visualmente
    if (puntosSpan) puntosSpan.textContent = me.puntos;

    // Guardar en localStorage
    localStorage.setItem('tf_users', JSON.stringify(users));

    mensaje.textContent = "✅ Canje realizado con éxito";
    mensaje.style.color = "green";
  } else {
    mensaje.textContent = "❌ No tienes puntos suficientes para canjear";
    mensaje.style.color = "red";
  }
};

    const titulo = document.getElementById('citizen-name');
    if (titulo) titulo.textContent = `Hola, ${nombre} 👋`;
/*
    const stats = me.stats || { basuraEvitada: "23", rachaDias: "4", nivel: "EcoNovato", progreso: "0.45" };
    const pct = typeof stats.progreso === 'number'
      ? Math.round(stats.progreso * 100)

    const $ = id => document.getElementById(id);
    $('kg-basura-evitada')    && ($('kg-basura-evitada').textContent    = String(stats.basuraEvitada));
    $('racha-dias')   && ($('racha-dias').textContent   = String(stats.rachaDias);
    $('nivel')  && ($('nivel').textContent  = String(stats.nivel));
    $('sum-progreso') && ($('sum-progreso').textContent = `${pct}%`);*/
  }
    // --- 4) Vista RECOLECTOR: saludo + fecha + resumen + alertas ---
  if (isRecolector && vRecolector) {
    const nombre = me.nombres || me.username || 'Recolector';

    const titulo = document.getElementById('collector-name');
    if (titulo) titulo.textContent = `Hola, ${nombre} 👋`;

    const hoy = new Date();
    const opts = { day: '2-digit', month: 'short', year: 'numeric' };
    let fecha = hoy.toLocaleDateString('es-ES', opts).replace('.', '');
    let zona = "San Miguel";
    const parts = fecha.split(' ');
    if (parts[1]) parts[1] = parts[1][0].toUpperCase() + parts[1].slice(1);
    fecha = parts.join(' ');

    const meta = document.getElementById('collector-meta');
    if (meta) meta.innerHTML = `Turno: Mañana | Fecha: ${fecha} | Zona: ${zona}`;

    const stats = me.stats || { rutas: 3, tachosAtendidos: 27, tachosTotal: 45, alertas: 3, progreso: 0.6 };
    const pct = typeof stats.progreso === 'number'
      ? Math.round(stats.progreso * 100)
      : Math.round((stats.tachosAtendidos / Math.max(stats.tachosTotal || 1, 1)) * 100);

    const $ = id => document.getElementById(id);
    $('sum-rutas')    && ($('sum-rutas').textContent    = String(stats.rutas));
    $('sum-tachos')   && ($('sum-tachos').textContent   = `${stats.tachosAtendidos}/${stats.tachosTotal}`);
    $('sum-alertas')  && ($('sum-alertas').textContent  = String(stats.alertas));
    $('sum-progreso') && ($('sum-progreso').textContent = `${pct}%`);

    // ==== HU-60: gestión de alertas ====
    const alertasIniciales = [
  {
    id: 'AL-01',
    tacho: '#01 San Martin De Porres',
    estado: 'Sensor dañado',
    ubicacion: 'Av Canta Callao',
    nivel: 'alta',
    imagen: 'img/map-sanmartindeporres.png'
  },
  {
    id: 'AL-02',
    tacho: '#02 Comas',
    estado: 'Tacho lleno',
    ubicacion: 'Av. Tupac Amaru',
    nivel: 'alta',
    imagen: 'img/map-comas.png'
  },
  {
    id: 'AL-03',
    tacho: '#03 Carabayllo',
    estado: 'Tacho lleno',
    ubicacion: 'Av. Tupac Amaru',
    nivel: 'media',
    imagen: 'img/map-carabayllo.png'
  }
];

    const alertasActivas = [...alertasIniciales];
    const historialAlertasResueltas = [];

    const summarySection  = document.getElementById('alerts-summary-section');
    const summaryList     = document.getElementById('alerts-summary-list');
    const summaryInfo     = document.getElementById('alerts-summary-info');
    const btnVerTodasDash = document.getElementById('btnVerTodasAlertasDashboard');

    const vRecolectorAlertas = document.getElementById('view-recolector-alertas');
    const listaAlertasEl     = document.getElementById('alertas-lista');
    const contadorAlertasEl  = document.getElementById('count-alertas-activas');
    const mapaLabelEl        = document.getElementById('alertas-mapa-label');
    const mapPlaceholderEl   = document.getElementById('alert-map-placeholder');
    const mapImageEl         = document.getElementById('alert-map-img'); // arriba, una sola vez
    const btnVolverPanel     = document.getElementById('btnVolverPanelRecolector');
    // Dos parrafos: panel principal y vista alertas
const historialEls = [
  document.getElementById('historial-alertas-resueltas-main'),
  document.getElementById('historial-alertas-resueltas-alertas'),
].filter(Boolean);

// Dos listas: panel principal y vista alertas
const historialListEls = [
  document.getElementById('historial-alertas-list-main'),
  document.getElementById('historial-alertas-list-alertas'),
].filter(Boolean);

    function mostrarVistaPanelRecolector() {
      vRecolector.classList.remove('hidden');
      vRecolectorAlertas?.classList.add('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function mostrarVistaAlertas(alertaIdSeleccionada) {
      vRecolector.classList.add('hidden');
      vRecolectorAlertas?.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (alertaIdSeleccionada) {
        requestAnimationFrame(() => {
          resaltarAlertaEnLista(alertaIdSeleccionada);
        });
      }
    }

    function actualizarContadorAlertas() {
      if (!contadorAlertasEl) return;
      const n = alertasActivas.length;
      contadorAlertasEl.textContent =
        n === 0
          ? '0 alertas activas'
          : `${n} alerta${n !== 1 ? 's' : ''} activa${n !== 1 ? 's' : ''}`;
    }

function renderHistorial() {
  if (!historialEls.length || !historialListEls.length) return;

  // Limpiar todas las listas
  historialListEls.forEach(ul => {
    ul.innerHTML = '';
  });

  if (historialAlertasResueltas.length === 0) {
    // Mensaje cuando aún no hay nada resuelto
    historialEls.forEach(p => {
      p.textContent = 'No hay alertas resueltas hoy.';
    });
    return;
  }

  const n   = historialAlertasResueltas.length;
  const ult = historialAlertasResueltas[n - 1];

  // Texto resumen en ambos lugares
  historialEls.forEach(p => {
    p.textContent =
      `Hoy has resuelto ${n} alerta${n !== 1 ? 's' : ''}. ` +
      `Última: Tacho ${ult.tacho} (${ult.estado}).`;
  });

  // Lista detallada en ambas listas
  historialAlertasResueltas.forEach(item => {
    const hora = new Date(item.resueltaEn).toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit'
    });

    historialListEls.forEach(ul => {
      const li = document.createElement('li');
      li.textContent = `${hora} – Tacho ${item.tacho} (${item.estado})`;
      ul.appendChild(li);
    });
  });
}



    function resaltarAlertaEnLista(idAlerta) {
      if (!listaAlertasEl) return;
      listaAlertasEl
        .querySelectorAll('.alert-card')
        .forEach(card => card.classList.remove('alert-card-highlight'));
      const seleccionada = listaAlertasEl.querySelector(`[data-alerta-id="${idAlerta}"]`);
      if (seleccionada) {
        seleccionada.classList.add('alert-card-highlight');
      }
    }

    function crearCardAlerta(alerta, opciones = {}) {
      const { modoResumen = false } = opciones;
      const card = document.createElement('article');

      let nivelClass = '';
      if (alerta.nivel === 'media') nivelClass = 'alert-card-warning';
      else if (alerta.nivel === 'baja') nivelClass = 'alert-card-low';

      card.className = `dash-card alert-card ${nivelClass}`;
      card.dataset.alertaId = alerta.id;

      card.innerHTML = `
        <p class="dash-route-title">Tacho ${alerta.tacho}</p>
        <p class="dash-route-meta">Estado: ${alerta.estado}</p>
        <div class="alert-card-actions">
          <button class="btn btn-outline dash-small-btn btn-ver-mapa" type="button">
            Ver en mapa
          </button>
          ${modoResumen ? '' : `
          <button class="btn btn-primary dash-small-btn btn-resolver" type="button">
            Marcar resuelta
          </button>`}
        </div>
      `;

      const btnMapa = card.querySelector('.btn-ver-mapa');
      btnMapa?.addEventListener('click', () => {
        if (mapaLabelEl) {
          mapaLabelEl.textContent =
            `Mostrando en el mapa: Tacho ${alerta.tacho} (${alerta.ubicacion}).`;
        }
        if (mapPlaceholderEl) {
          mapPlaceholderEl.textContent =
            `🗺️ Mapa centrado en Tacho ${alerta.tacho} — ${alerta.ubicacion}`;
        }
        if (mapImageEl && alerta.imagen) {
          mapImageEl.src = alerta.imagen;
        } 

        if (modoResumen) {
          // Desde el dashboard → abre pantalla completa de alertas
          mostrarVistaAlertas(alerta.id);
        } else {
          // Ya estamos en la pantalla de alertas → solo resalta
          resaltarAlertaEnLista(alerta.id);
        }
      });

      if (!modoResumen) {
        const btnResolver = card.querySelector('.btn-resolver');
        btnResolver?.addEventListener('click', () => {
          const idx = alertasActivas.findIndex(a => a.id === alerta.id);
          if (idx !== -1) {
            alertasActivas.splice(idx, 1);
            historialAlertasResueltas.push({
              ...alerta,
              resueltaEn: new Date().toISOString()
            });
            renderAlertasResumen();
            renderAlertasCompleta();
            renderHistorial();
          }
        });
      }

      return card;
    }

    function renderAlertasResumen() {
      if (!summaryList) return;
      summaryList.innerHTML = '';

      const maxMostrar = 2;
      const subset = alertasActivas.slice(0, maxMostrar);

      if (summaryInfo) {
        if (alertasActivas.length === 0) {
          summaryInfo.textContent = 'No hay alertas activas en este momento.';
        } else if (alertasActivas.length <= maxMostrar) {
          summaryInfo.textContent =
            `Mostrando todas las ${alertasActivas.length} alertas activas.`;
        } else {
          summaryInfo.textContent =
            `Mostrando ${subset.length} de ${alertasActivas.length} alertas activas.`;
        }
      }

      subset.forEach(alerta => {
        summaryList.appendChild(crearCardAlerta(alerta, { modoResumen: true }));
      });
    }

    function renderAlertasCompleta() {
      if (!listaAlertasEl) return;
      listaAlertasEl.innerHTML = '';

      if (alertasActivas.length === 0) {
        listaAlertasEl.innerHTML =
          '<p class="dash-meta">🎉 No hay alertas activas en este momento.</p>';
      } else {
        alertasActivas.forEach(alerta => {
          listaAlertasEl.appendChild(crearCardAlerta(alerta, { modoResumen: false }));
        });
      }

      actualizarContadorAlertas();
    }

    // Eventos de navegación entre vistas
    btnVerTodasDash?.addEventListener('click', () => {
      mostrarVistaAlertas();
    });

    btnVolverPanel?.addEventListener('click', () => {
      mostrarVistaPanelRecolector();
    });

    // Inicializar
    renderAlertasResumen();
    renderAlertasCompleta();
    renderHistorial();
    mostrarVistaPanelRecolector();
  }
          // ===== HU-001: Recepción de alertas de emergencia (DEMO) =====
  const MAX_REINTENTOS = 3;
  const RETRY_MS = 2000;

  const btnSimular     = document.getElementById('btnSimularEmergencia');
  const cardEmergencia = document.getElementById('emergencyAlertCard');
  const titleEmerg     = document.getElementById('emergency-title');
  const metaEmerg      = document.getElementById('emergency-meta');
  const statusEmerg    = document.getElementById('emergencyStatus');
  const btnAckEmerg    = document.getElementById('emergency-ack-btn');

  // Para controlar qué escenario se muestra en cada click
  // 1er click  → escenario 1 (éxito directo)
  // 2do click  → escenario 2 (error + reintento correcto)
  // 3er click  → escenario 3 (falla tras 3 intentos)
  let contadorClicksEmerg = 0;
  let escenarioActual = 1;

  const setEstadoEmerg = (msg) => {
    if (statusEmerg) statusEmerg.textContent = msg;
    log('[emergencia]', msg);
  };

  const mostrarAlertaEmergencia = (alerta) => {
    if (!cardEmergencia || !titleEmerg || !metaEmerg) return;
    titleEmerg.textContent = `Emergencia: ${alerta.tipo}`;
    metaEmerg.textContent  = `Ubicación: ${alerta.ubicacion}`;
    cardEmergencia.classList.remove('hidden');

    // Notificación simple para que se note en la demo
    alert(`🚨 EMERGENCIA DETECTADA\n\nTipo: ${alerta.tipo}\nUbicación: ${alerta.ubicacion}`);

    // Opcional: notificación del navegador si está permitido
    try {
      if (Notification && Notification.permission === 'granted') {
        new Notification(`Emergencia: ${alerta.tipo}`, {
          body: `Ubicación: ${alerta.ubicacion}`,
        });
      }
    } catch (e) {
      // ignorar si no lo soporta
    }
  };

  // Determina si hay "problema de red" según el escenario e intento
  const hayProblemaDeRed = (intento) => {
    switch (escenarioActual) {
      case 1:
        // Escenario 1: llega bien al primer intento
        return false;
      case 2:
        // Escenario 2: primer intento falla, segundo funciona
        return intento === 1;
      case 3:
        // Escenario 3: siempre falla (los 3 intentos)
        return true;
      default:
        return false;
    }
  };

  const enviarAlertaConReintentos = (alerta, intento = 1) => {
    setEstadoEmerg(
      `Detectando emergencia en la zona... (intento ${intento}/${MAX_REINTENTOS}, escenario ${escenarioActual})`
    );

    if (!hayProblemaDeRed(intento)) {
      // Éxito
      if (intento === 1) {
        setEstadoEmerg(`✅ Alerta recibida correctamente en el primer intento (escenario ${escenarioActual}).`);
      } else {
        setEstadoEmerg(
          `✅ Alerta recibida correctamente después de reintento ${intento} (escenario ${escenarioActual}).`
        );
      }
      mostrarAlertaEmergencia(alerta);
      return;
    }

    // Hay error de red
    if (intento < MAX_REINTENTOS) {
      setEstadoEmerg(
        `⚠️ Error de red al enviar la alerta. Reintentando (${intento}/${MAX_REINTENTOS})... (escenario 2)`
      );
      setTimeout(() => enviarAlertaConReintentos(alerta, intento + 1), RETRY_MS);
    } else {
      // Después de 3 intentos falla definitivamente
      setEstadoEmerg(
        `❌ No se pudo enviar la alerta tras ${MAX_REINTENTOS} intentos (escenario 2). ` +
        `El trabajador no recibe el mensaje.`
      );
      // No mostramos la card → el recolector nunca ve la alerta
    }
  };

  // Botón de prueba para la demo
  btnSimular?.addEventListener('click', () => {
    contadorClicksEmerg += 1;

    // 1 → esc1, 2 → esc2, 3 → esc3; luego se queda en 3
    escenarioActual = Math.min(contadorClicksEmerg, 3);

    const alertaDemo = {
      tipo: 'Derrame de residuos peligrosos',
      ubicacion: 'Av. La Marina 1234 – San Miguel',
    };

    // Ocultamos alerta anterior y limpiamos estado
    cardEmergencia?.classList.add('hidden');
    setEstadoEmerg(`Iniciando demostración del escenario ${escenarioActual}...`);

    enviarAlertaConReintentos(alertaDemo, 1);
  });

  // Marcar como atendida
  btnAckEmerg?.addEventListener('click', () => {
    cardEmergencia?.classList.add('hidden');
    setEstadoEmerg('✅ La alerta fue marcada como atendida por el recolector.');
  });
  }

  
  // --- 5) Saludo genérico si aún mantienes #greet / #meta ---
  const greetEl = document.getElementById('greet');
  if (greetEl) {
    greetEl.textContent = `Hola, ${me.nombres || me.username || ''} 👋`;
  }

  const metaEl = document.getElementById('meta');
  if (metaEl) {
    metaEl.innerHTML = `Tienes <strong>${me.puntos ?? 0}</strong> puntos acumulados 🌱`;
  }


  // --- 6) Logout ---
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('tf_session');
    window.location.href = 'login.html';
  });
























