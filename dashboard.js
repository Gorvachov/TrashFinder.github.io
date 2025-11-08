// Lee usuarios y sesión
const users = JSON.parse(localStorage.getItem('tf_users') || '[]');
const sessionEmail = localStorage.getItem('tf_session');
const me = users.find(u => u.email === sessionEmail);

// Si no hay sesión, vuelve a login
if (!me) {
  window.location.href = 'login.html';
} else {
  // Normaliza una etiqueta de tipo quitando tildes, espacios extra y mayúsculas
  const normalizeType = (value) => {
    if (value == null) return '';
    return value
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  };

  const firstNonEmpty = (...values) => {
    for (const value of values) {
      if (value == null) continue;
      const str = value.toString();
      if (str.trim() !== '') return value;
    }
    return '';
  };

  // Buscamos distintos posibles nombres usados para el rol
  const rawTipo = firstNonEmpty(
    me.tipo,
    me.rol,
    me.role,
    me.accountType,
    me.userType,
    me.perfil,
    me.profile
  );

  const tipoNormalizado = normalizeType(rawTipo);
  const tipoNumero = Number.isFinite(me.tipo)
    ? Number(me.tipo)
    : Number.parseInt(tipoNormalizado, 10);

  let isRecolector =
    /recolect/.test(tipoNormalizado) ||
    me.esRecolector === true ||
    me.isCollector === true ||
    tipoNumero === 2;

  let isCiudadano =
    /ciudadan/.test(tipoNormalizado) ||
    me.esRecolector === false ||
    me.isCollector === false ||
    tipoNumero === 1;

  // Muestra solo la vista que corresponde (y evita dejar la pantalla en blanco)
  const vCiudadano  = document.getElementById('view-ciudadano');
  const vRecolector = document.getElementById('view-recolector');

  if (!isRecolector && !isCiudadano) {
    if (!tipoNormalizado && vRecolector && !vCiudadano) {
      isRecolector = true;
    } else if (!tipoNormalizado && vCiudadano) {
      isCiudadano = true;
    }
  }

  vCiudadano?.classList.toggle('hidden', !isCiudadano);
  vRecolector?.classList.toggle('hidden', !isRecolector);

  // (Opcional) Saludo genérico si todavía tienes #greet / #meta en tu HTML
  document.getElementById('greet')?.textContent =
    `Hola, ${me.nombres || me.username || ''} 👋`;
  document.getElementById('meta')?.innerHTML =
    `Tienes <strong>${me.puntos ?? 0}</strong> puntos acumulados 🌱`;

  // ----- Vista RECOLECTOR -----
  if (isRecolector && vRecolector) {
    // 1) Saludo con nombre
    const nombre = me.nombres || me.username || 'Recolector';
    const elTitulo = document.getElementById('collector-name');
    elTitulo && (elTitulo.textContent = `Hola, ${nombre} 👋`);

    // 2) Fecha de HOY "28 Oct 2025"
    const hoy = new Date();
    const opciones = { day: '2-digit', month: 'short', year: 'numeric' };
    let fecha = hoy.toLocaleDateString('es-ES', opciones).replace('.', '');
    // capitaliza el mes (oct -> Oct)
    const parts = fecha.split(' ');
    if (parts[1]) parts[1] = parts[1][0].toUpperCase() + parts[1].slice(1);
    fecha = parts.join(' ');
    const elMeta = document.getElementById('collector-meta');
    elMeta && (elMeta.innerHTML = `Turno: Mañana | Fecha: ${fecha}`);

    // 3) Resumen del día (mock / o desde me.stats)
    const stats = me.stats || {
      rutas: 3,
      tachosAtendidos: 27,
      tachosTotal: 45,
      alertas: 2,
      progreso: 0.6, // 0–1
    };

    const pct =
      typeof stats.progreso === 'number'
        ? Math.round(stats.progreso * 100)
        : Math.round((stats.tachosAtendidos / Math.max(stats.tachosTotal || 1, 1)) * 100);

    const $ = (id) => document.getElementById(id);
    $('sum-rutas')    &&  ($('sum-rutas').textContent = String(stats.rutas));
    $('sum-tachos')   &&  ($('sum-tachos').textContent = `${stats.tachosAtendidos}/${stats.tachosTotal}`);
    $('sum-alertas')  &&  ($('sum-alertas').textContent = String(stats.alertas));
    $('sum-progreso') &&  ($('sum-progreso').textContent = `${pct}%`);
  }

  // Cerrar sesión
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('tf_session');
    window.location.href = 'login.html';
  });
}

