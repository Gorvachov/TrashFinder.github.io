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

if (typeof me.puntos === 'undefined') {
  me.puntos = 80; // valor por defecto para demo
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

// --- 4) Vista RECOLECTOR: saludo + fecha + resumen ---
  if (isRecolector && vRecolector) {
    const nombre = me.nombres || me.username || 'Recolector';

    const titulo = document.getElementById('collector-name');
    if (titulo) titulo.textContent = `Hola, ${nombre} 👋`;

    const hoy = new Date();
    const opts = { day: '2-digit', month: 'short', year: 'numeric' };
    let fecha = hoy.toLocaleDateString('es-ES', opts).replace('.', '');
    const parts = fecha.split(' ');
    if (parts[1]) parts[1] = parts[1][0].toUpperCase() + parts[1].slice(1);
    fecha = parts.join(' ');

    const meta = document.getElementById('collector-meta');
    if (meta) meta.innerHTML = `Turno: Mañana | Fecha: ${fecha}`;

    const stats = me.stats || { rutas: 3, tachosAtendidos: 27, tachosTotal: 45, alertas: 2, progreso: 0.6 };
    const pct = typeof stats.progreso === 'number'
      ? Math.round(stats.progreso * 100)
      : Math.round((stats.tachosAtendidos / Math.max(stats.tachosTotal || 1, 1)) * 100);

    const $ = id => document.getElementById(id);
    $('sum-rutas')    && ($('sum-rutas').textContent    = String(stats.rutas));
    $('sum-tachos')   && ($('sum-tachos').textContent   = `${stats.tachosAtendidos}/${stats.tachosTotal}`);
    $('sum-alertas')  && ($('sum-alertas').textContent  = String(stats.alertas));
    $('sum-progreso') && ($('sum-progreso').textContent = `${pct}%`);
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
}











