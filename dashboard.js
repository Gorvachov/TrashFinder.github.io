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
  vCiudadano ?.classList.toggle('hidden', !isCiudadano);

  // (Si aún ambas quedaron ocultas, pinta un mensaje para que lo veas)
  if ((vRecolector && vRecolector.classList.contains('hidden')) &&
      (vCiudadano  && vCiudadano .classList.contains('hidden'))) {
    document.body.insertAdjacentHTML('beforeend',
      '<div style="padding:12px;color:#b00;font-weight:700">⚠️ Ninguna vista visible. Revisa el tipo de usuario y los IDs.</div>');
    log('Ambas vistas siguen ocultas: revisa IDs/HTML o el tipo guardado en localStorage.');
  }

  // --- 3) Vista RECOLECTOR: saludo + fecha + resumen ---
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
  }

  // --- 4) Saludo genérico si aún mantienes #greet / #meta ---
  document.getElementById('greet')?.textContent =
    `Hola, ${me.nombres || me.username || ''} 👋`;
  document.getElementById('meta')?.innerHTML =
    `Tienes <strong>${me.puntos ?? 0}</strong> puntos acumulados 🌱`;

  // --- 5) Logout ---
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('tf_session');
    window.location.href = 'login.html';
  });
}
