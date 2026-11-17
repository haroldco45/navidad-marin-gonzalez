/* Navidad Familia Marín González — Vibras Positivas HM */
const ZONA = 'America/Bogota';
const WHATSAPP = '573117700431';
const NOCHEBUENA = new Date('2026-12-24T00:00:00-05:00');

const T = {
  es: {
    navHoy:'Hoy', navAgenda:'Agenda', navRecuerdos:'Recuerdos', navFamilia:'Familia',
    ante:'Navidad 2026', familia:'Familia', frase:'Para nosotros la época más hermosa del año es la Navidad.',
    dias:'días', horas:'horas', min:'min', seg:'seg', paraNochebuena:'para la Nochebuena', yaNochebuena:'¡Feliz Navidad, familia!',
    verAgenda:'Ver la agenda', hoyTitulo:'Hoy en familia', actualizar:'Actualizar',
    agendaAnte:'Lo que vamos a vivir juntos', agendaTitulo:'Agenda de actividades',
    fTodas:'Todas', fProximas:'Próximas', fHechas:'Ya vividas', fPendientes:'Por definir',
    recAnte:'Así quedó la casa', recTitulo:'Recuerdos de esta Navidad',
    videoPie:'El recorrido por la casa, decorada por Marleny con ayuda de Alejo, Isaac e Iris.',
    famAnte:'Los que hacen la Navidad', famTitulo:'Nuestra familia',
    propAnte:'Entre todos la alimentamos', propTitulo:'Proponer una actividad',
    propIntro:'Escriba la idea y se le envía a Harold por WhatsApp para agregarla a la agenda.',
    lQue:'¿Qué haremos?', lCuando:'¿Cuándo?', lHora:'Hora', lDonde:'¿Dónde?', lQuienes:'¿Quiénes van?', lPropone:'¿Quién lo propone?',
    enviar:'Enviar por WhatsApp', pie1:'Hecha con cariño para la familia Marín González.', cerrar:'Cerrar',
    eHecho:'Ya la vivimos', eProximo:'Próxima', ePorDefinir:'Por definir',
    hoyEs:'Hoy es el día', manana:'Es mañana', faltan:n=>`Faltan ${n} días`, enCurso:'En curso',
    proxima:'La próxima actividad', nadaHoy:'Hoy no hay actividad en la agenda.',
    calendario:'Agregar a mi calendario', verFotos:'Ver fotos', con:'Con',
    actualizadoA:h=>`Actualizado: ${h} (hora de Colombia)`, sinConexion:'Sin conexión: mostrando la última agenda guardada.',
    msg:'Hola Harold, propongo esta actividad para la agenda de Navidad de la familia:'
  },
  en: {
    navHoy:'Today', navAgenda:'Schedule', navRecuerdos:'Memories', navFamilia:'Family',
    ante:'Christmas 2026', familia:'The', frase:'For us, the most beautiful time of the year is Christmas.',
    dias:'days', horas:'hours', min:'min', seg:'sec', paraNochebuena:'until Christmas Eve', yaNochebuena:'Merry Christmas, family!',
    verAgenda:'See the schedule', hoyTitulo:'Today as a family', actualizar:'Refresh',
    agendaAnte:"What we'll live together", agendaTitulo:'Family activities',
    fTodas:'All', fProximas:'Upcoming', fHechas:'Already lived', fPendientes:'To be set',
    recAnte:'How the house turned out', recTitulo:'Memories of this Christmas',
    videoPie:'A walk through the house, decorated by Marleny with help from Alejo, Isaac and Iris.',
    famAnte:'The ones who make Christmas', famTitulo:'Our family',
    propAnte:'We all keep it growing', propTitulo:'Suggest an activity',
    propIntro:'Write your idea and it is sent to Harold on WhatsApp to add it to the schedule.',
    lQue:'What will we do?', lCuando:'When?', lHora:'Time', lDonde:'Where?', lQuienes:"Who's coming?", lPropone:'Suggested by',
    enviar:'Send via WhatsApp', pie1:'Made with love for the Marín González family.', cerrar:'Close',
    eHecho:'Already lived', eProximo:'Upcoming', ePorDefinir:'To be set',
    hoyEs:'Today is the day', manana:"It's tomorrow", faltan:n=>`${n} days to go`, enCurso:'Happening now',
    proxima:'Next activity', nadaHoy:'No activity scheduled for today.',
    calendario:'Add to my calendar', verFotos:'See photos', con:'With',
    actualizadoA:h=>`Updated: ${h} (Colombia time)`, sinConexion:'Offline: showing the last saved schedule.',
    msg:'Hi Harold, I suggest this activity for the family Christmas schedule:'
  }
};

const FAMILIA = [
  { n:'Harold', es:'Papá y abuelo', en:'Dad and grandpa' },
  { n:'Marleny', es:'El alma de la Navidad en casa', en:'The heart of Christmas at home' },
  { n:'Alejo', es:'Hijo, ayudante en la decoración', en:'Son, decorating helper' },
  { n:'Isaac', es:'Hijo, ayudante en la decoración', en:'Son, decorating helper' },
  { n:'Iris', es:'La infaltable; con nosotros hace muchos años', en:'Always there; with us for many years' },
  { n:'Mauricio', es:'Hijo, papá de Alaia', en:"Son, Alaia's dad" },
  { n:'Valeria', es:'Hija', en:'Daughter' },
  { n:'Alaia', es:'La nieta, la nueva alegría', en:'Granddaughter, our new joy' }
];
const CINTA = ['foto-4','foto-2','foto-3','foto-1','foto-7','foto-5','foto-9','foto-8','foto-10','foto-6','foto-11','foto-12','alaia','creare','paseo-oriente'];

let lang = 'es';
try { lang = localStorage.getItem('nmg-lang') || 'es'; } catch(e) {}
let datos = { actividades: [] };
let filtro = 'todas';

const $ = s => document.querySelector(s);
const t = k => T[lang][k];
const txt = v => (v && typeof v === 'object') ? (v[lang] || v.es) : (v || '');

/* Fecha de hoy en Colombia (AAAA-MM-DD) */
function hoyCO() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: ZONA, year:'numeric', month:'2-digit', day:'2-digit' }).format(new Date());
}
function diasEntre(a, b) { return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 864e5); }
function fechaLarga(iso) {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', { timeZone:'UTC', weekday:'long', day:'numeric', month:'long', year:'numeric' })
    .format(new Date(iso + 'T12:00:00Z'));
}
function textoFecha(a) {
  if (!a.fecha) return txt(a.fechaTexto);
  let s = fechaLarga(a.fecha);
  if (a.fechaFin) s += (lang === 'es' ? ' al ' : ' to ') + fechaLarga(a.fechaFin);
  if (a.hora) s += ' · ' + a.hora;
  return s;
}

/* Textos fijos */
function pintarTextos() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-t]').forEach(el => { const v = t(el.dataset.t); if (typeof v === 'string') el.textContent = v; });
  $('#idioma').textContent = lang === 'es' ? 'EN' : 'ES';
  $('#hoyFecha').textContent = fechaLarga(hoyCO());
}

/* Cuenta regresiva */
function tic() {
  const ms = NOCHEBUENA - Date.now();
  if (ms <= 0) { $('#cuenta').style.display = 'none'; $('#cuentaPie').textContent = t('yaNochebuena'); return; }
  const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
  $('#cDias').textContent = d; $('#cHoras').textContent = String(h).padStart(2,'0');
  $('#cMin').textContent = String(m).padStart(2,'0'); $('#cSeg').textContent = String(s).padStart(2,'0');
}

/* Estado según la fecha de hoy */
function estadoReal(a, hoy) {
  if (a.estado === 'por-definir' || !a.fecha) return a.estado;
  const fin = a.fechaFin || a.fecha;
  if (diasEntre(fin, hoy) > 0) return 'hecho';
  return 'proximo';
}
function faltaTexto(a, hoy) {
  if (!a.fecha) return '';
  const d = diasEntre(hoy, a.fecha), fin = a.fechaFin ? diasEntre(hoy, a.fechaFin) : d;
  if (d <= 0 && fin >= 0) return d === 0 ? t('hoyEs') : t('enCurso');
  if (d === 1) return t('manana');
  if (d > 1) return t('faltan')(d);
  return '';
}

/* Sección Hoy */
function pintarHoy() {
  const hoy = hoyCO();
  const deHoy = datos.actividades.filter(a => a.fecha && diasEntre(a.fecha, hoy) >= 0 && diasEntre(hoy, a.fechaFin || a.fecha) >= 0);
  const proximas = datos.actividades.filter(a => a.fecha && diasEntre(hoy, a.fecha) > 0).sort((x,y) => x.fecha.localeCompare(y.fecha));
  let html = '';
  const item = (a, etiqueta) => `<div class="hoy-item">
      <img src="${a.foto || 'img/foto-4.jpg'}" alt="">
      <div><span class="etiqueta">${etiqueta}</span><h3>${txt(a.titulo)}</h3><p>${textoFecha(a)} · ${a.lugar || ''}</p></div></div>`;
  if (deHoy.length) html = deHoy.map(a => item(a, faltaTexto(a, hoy))).join('');
  else html = `<p class="nota">${t('nadaHoy')}</p>`;
  if (proximas[0]) html += item(proximas[0], `${t('proxima')} · ${faltaTexto(proximas[0], hoy)}`);
  $('#hoyContenido').innerHTML = html;
}

/* Agenda */
function pintarLista() {
  const hoy = hoyCO();
  const orden = { proximo:0, 'por-definir':1, hecho:2 };
  const lista = datos.actividades
    .map(a => ({ ...a, _e: estadoReal(a, hoy) }))
    .filter(a => filtro === 'todas' || a._e === filtro)
    .sort((x,y) => (orden[x._e] - orden[y._e]) || (x.fecha || '9').localeCompare(y.fecha || '9'));
  const nombreEstado = { hecho:t('eHecho'), proximo:t('eProximo'), 'por-definir':t('ePorDefinir') };
  $('#lista').innerHTML = lista.map(a => {
    const falta = a._e === 'proximo' ? faltaTexto(a, hoy) : '';
    const foto = a.foto
      ? `<img src="${a.foto}" alt="${txt(a.titulo)}" loading="lazy">`
      : `<div class="sinfoto">${txt(a.titulo).charAt(0)}</div>`;
    return `<article class="act" data-id="${a.id}">
      <div class="act-foto"${a.foto ? ` style="--bg:url('${a.foto}')"` : ''}>${foto}<span class="estado ${a._e}">${nombreEstado[a._e]}</span></div>
      <div class="act-cuerpo">
        <span class="act-fecha">${textoFecha(a)}</span>
        <h3>${txt(a.titulo)}</h3>
        <p>${txt(a.detalle)}</p>
        <span class="quienes">${t('con')}: ${(a.quienes || []).join(', ')}${a.lugar ? ' · ' + a.lugar : ''}</span>
        ${falta ? `<span class="faltan">${falta}</span>` : ''}
        <div class="acciones">
          ${a.fecha && a._e !== 'hecho' ? `<button data-ics="${a.id}">${t('calendario')}</button>` : ''}
          ${(a.fotos && a.fotos.length > 1) ? `<button data-fotos="${a.id}">${t('verFotos')}</button>` : ''}
        </div>
      </div></article>`;
  }).join('');
  observar();
}

/* Animación al aparecer */
let obs;
function observar() {
  if (!('IntersectionObserver' in window)) { document.querySelectorAll('.act').forEach(e => e.classList.add('visible')); return; }
  obs = obs || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }), { threshold:.12 });
  document.querySelectorAll('.act:not(.visible)').forEach(e => obs.observe(e));
}

/* Recuerdos y familia */
function pintarCinta() {
  $('#cinta').innerHTML = CINTA.map(f => `<img src="img/${f}.jpg" alt="" loading="lazy">`).join('');
}
function pintarFamilia() {
  $('#personas').innerHTML = FAMILIA.map(p => `<div class="persona"><div class="inicial">${p.n.charAt(0)}</div><h3>${p.n}</h3><p>${p[lang]}</p></div>`).join('');
}

/* Visor de fotos */
let galeria = [], gi = 0;
function abrirVisor(fotos, i) {
  galeria = fotos; gi = i || 0;
  $('#visor img').src = galeria[gi]; $('#visor').hidden = false;
}
$('#visor').addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') { $('#visor').hidden = true; return; }
  if (galeria.length > 1) { gi = (gi + 1) % galeria.length; $('#visor img').src = galeria[gi]; }
});
$('#cinta').addEventListener('click', e => {
  if (e.target.tagName !== 'IMG') return;
  const fotos = [...document.querySelectorAll('#cinta img')].map(i => i.getAttribute('src'));
  abrirVisor(fotos, fotos.indexOf(e.target.getAttribute('src')));
});

/* Calendario (.ics) */
function ics(a) {
  const d = a.fecha.replace(/-/g,'');
  let ini, fin;
  if (a.hora) {
    const h = a.hora.replace(':','') + '00';
    ini = `DTSTART;TZID=America/Bogota:${d}T${h}`;
    const finDia = (a.fechaFin || a.fecha).replace(/-/g,'');
    const hf = String((+a.hora.slice(0,2) + 2) % 24).padStart(2,'0') + a.hora.slice(3) + '00';
    fin = `DTEND;TZID=America/Bogota:${a.fechaFin ? d : finDia}T${hf}`;
  } else {
    const sig = new Date(Date.parse((a.fechaFin || a.fecha) + 'T00:00:00Z') + 864e5).toISOString().slice(0,10).replace(/-/g,'');
    ini = `DTSTART;VALUE=DATE:${d}`; fin = `DTEND;VALUE=DATE:${sig}`;
  }
  const rrule = (a.fechaFin && a.hora) ? `RRULE:FREQ=DAILY;UNTIL=${a.fechaFin.replace(/-/g,'')}T235959Z\r\n` : '';
  const cuerpo = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Vibras Positivas HM//Navidad MG//ES\r\nBEGIN:VEVENT\r\nUID:${a.id}-navidad-mg\r\nDTSTAMP:20261116T000000Z\r\n${ini}\r\n${fin}\r\n${rrule}SUMMARY:${txt(a.titulo)} — Familia Marín González\r\nLOCATION:${a.lugar || ''}\r\nDESCRIPTION:${txt(a.detalle)}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
  const url = URL.createObjectURL(new Blob([cuerpo], { type:'text/calendar' }));
  const enlace = document.createElement('a'); enlace.href = url; enlace.download = a.id + '.ics';
  document.body.appendChild(enlace); enlace.click(); enlace.remove();
}
$('#lista').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const a = datos.actividades.find(x => x.id === (b.dataset.ics || b.dataset.fotos));
  if (b.dataset.ics) ics(a);
  if (b.dataset.fotos) abrirVisor(a.fotos, 0);
});

/* Filtros */
$('#filtros').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  filtro = b.dataset.f;
  document.querySelectorAll('#filtros button').forEach(x => x.classList.toggle('activo', x === b));
  pintarLista();
});

/* Proponer actividad por WhatsApp */
$('#formulario').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const lineas = [t('msg'), '',
    `${t('lQue')} ${f.get('que')}`,
    f.get('cuando') ? `${t('lCuando')} ${fechaLarga(f.get('cuando'))}` : '',
    f.get('hora') ? `${t('lHora')}: ${f.get('hora')}` : '',
    f.get('donde') ? `${t('lDonde')} ${f.get('donde')}` : '',
    f.get('quienes') ? `${t('lQuienes')} ${f.get('quienes')}` : '',
    `${t('lPropone')} ${f.get('propone')}`].filter(Boolean);
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lineas.join('\n'))}`, '_blank');
});

/* Cargar agenda */
async function cargar() {
  const ahora = new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', { timeZone: ZONA, dateStyle:'medium', timeStyle:'short' }).format(new Date());
  try {
    const r = await fetch('actividades.json?v=' + Date.now(), { cache:'no-store' });
    datos = await r.json();
    $('#actualizado').textContent = t('actualizadoA')(ahora);
  } catch (err) {
    try { const r = await caches.match('actividades.json'); if (r) datos = await r.json(); } catch(e) {}
    $('#actualizado').textContent = t('sinConexion');
  }
  pintarHoy(); pintarLista();
}
$('#actualizar').addEventListener('click', cargar);

/* Idioma */
$('#idioma').addEventListener('click', () => {
  lang = lang === 'es' ? 'en' : 'es';
  try { localStorage.setItem('nmg-lang', lang); } catch(e) {}
  pintarTextos(); pintarFamilia(); pintarHoy(); pintarLista(); tic();
});

/* Lucecitas de Navidad */
(function luces() {
  const c = $('#luces'), x = c.getContext('2d');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let w, h, puntos;
  const colores = ['232,196,120','250,243,228','255,214,150','190,220,255'];
  function medir() {
    w = c.width = innerWidth; h = c.height = innerHeight;
    puntos = Array.from({ length: Math.min(70, Math.floor(w / 14)) }, () => ({
      x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.8 + .6,
      v: Math.random()*.35 + .1, f: Math.random()*6.28, c: colores[Math.floor(Math.random()*colores.length)]
    }));
  }
  function cuadro() {
    x.clearRect(0,0,w,h);
    for (const p of puntos) {
      p.y += p.v; p.f += .03; if (p.y > h + 5) { p.y = -5; p.x = Math.random()*w; }
      const a = .35 + .45 * Math.abs(Math.sin(p.f));
      x.beginPath(); x.fillStyle = `rgba(${p.c},${a})`; x.shadowBlur = 10; x.shadowColor = `rgba(${p.c},1)`;
      x.arc(p.x + Math.sin(p.f)*6, p.y, p.r, 0, 6.28); x.fill();
    }
    requestAnimationFrame(cuadro);
  }
  addEventListener('resize', medir); medir(); cuadro();
})();

/* Inicio */
pintarTextos(); pintarFamilia(); pintarCinta(); tic(); setInterval(tic, 1000); cargar();
document.addEventListener('visibilitychange', () => { if (!document.hidden) cargar(); });
if ('serviceWorker' in navigator) addEventListener('load', () => navigator.serviceWorker.register('sw.js').then(r => r.update()).catch(() => {}));
