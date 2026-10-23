// ============================================================
// Sistema de Gaceta Municipal – GAM San Andrés
// Datos de demostración y utilidades
// ============================================================

export const TIPOS_NORMA = [
  { id: 'ley_municipal', nombre: 'Ley Municipal', organo: 'Concejo Municipal', abreviatura: 'L.M.' },
  { id: 'resolucion_concejo', nombre: 'Resolución del Concejo', organo: 'Concejo Municipal', abreviatura: 'R.C.' },
  { id: 'decreto_municipal', nombre: 'Decreto Municipal', organo: 'Órgano Ejecutivo', abreviatura: 'D.M.' },
  { id: 'decreto_edil', nombre: 'Decreto Edil', organo: 'Órgano Ejecutivo', abreviatura: 'D.E.' },
  { id: 'resolucion_administrativa', nombre: 'Resolución Administrativa Municipal', organo: 'Órgano Ejecutivo', abreviatura: 'R.A.M.' },
  { id: 'ordenanza', nombre: 'Ordenanza Municipal (histórica)', organo: 'Concejo Municipal', abreviatura: 'O.M.' },
];

export const ORGANOS = [
  { id: 'concejo', nombre: 'Concejo Municipal' },
  { id: 'ejecutivo', nombre: 'Órgano Ejecutivo' },
];

export const ESTADOS_NORMA = [
  { id: 'borrador', nombre: 'Borrador', color: '#78909C' },
  { id: 'en_revision', nombre: 'En Revisión', color: '#FFA726' },
  { id: 'autorizado', nombre: 'Autorizado', color: '#42A5F5' },
  { id: 'publicado', nombre: 'Publicado', color: '#66BB6A' },
];

export const ESTADOS_VERIFICACION = [
  { id: 'verificado', nombre: 'Verificado', color: '#2E7D32' },
  { id: 'pendiente', nombre: 'Pendiente de verificación', color: '#F57F17' },
  { id: 'no_verificable', nombre: 'No verificable', color: '#C62828' },
];

export const MATERIAS = [
  'Administración Municipal',
  'Catastro y Bienes',
  'Educación',
  'Finanzas y Tributación',
  'Medio Ambiente',
  'Obras Públicas',
  'Participación Ciudadana',
  'Planificación',
  'Salud',
  'Seguridad Ciudadana',
  'Servicios Básicos',
  'Transporte y Vialidad',
];

// Datos de demostración
export const NORMAS_DEMO = [
  {
    id: '1',
    tipo: 'ley_municipal',
    numero: '121',
    gestion: '2025',
    titulo: 'Creación de Tasas Administrativas Vehiculares',
    materia: 'Transporte y Vialidad',
    organoEmisor: 'concejo',
    fechaAprobacion: '2025-09-10',
    fechaPromulgacion: '2025-09-12',
    fechaPublicacion: '2025-09-15',
    fechaVigencia: '2025-09-15',
    medioPublicacion: 'Gaceta Oficial Municipal / Medio de prensa',
    constanciaPublicacion: 'Pendiente de verificación',
    estado: 'publicado',
    estadoVerificacion: 'pendiente',
    resumen: 'Establece tasas administrativas para trámites vehiculares en la jurisdicción del municipio de San Andrés, provincia Marbán, departamento del Beni.',
    observaciones: 'Copia digital disponible en portal del MEFP. La constancia del medio específico de publicación requiere verificación institucional.',
    relacionesNormas: [],
    anexos: ['Tabla de tasas vehiculares'],
    creadoPor: 'Sistema (demo)',
    fechaCreacion: '2026-10-01',
    historialCambios: [
      { fecha: '2026-10-01', usuario: 'Sistema', accion: 'Registro inicial', detalle: 'Incorporación desde fuentes públicas del MEFP' }
    ]
  },
  {
    id: '2',
    tipo: 'ley_municipal',
    numero: '83',
    gestion: '2023',
    titulo: 'Impuestos Municipales',
    materia: 'Finanzas y Tributación',
    organoEmisor: 'concejo',
    fechaAprobacion: '2023-07-15',
    fechaPromulgacion: '2023-07-18',
    fechaPublicacion: '2023-07-20',
    fechaVigencia: '2023-07-20',
    medioPublicacion: 'Por confirmar',
    constanciaPublicacion: 'Pendiente de verificación',
    estado: 'publicado',
    estadoVerificacion: 'pendiente',
    resumen: 'Regula los impuestos municipales aplicables en la jurisdicción del Gobierno Autónomo Municipal de San Andrés.',
    observaciones: 'Registro y archivo digital disponible en portal del MEFP. Medio oficial de publicación por confirmar con el municipio.',
    relacionesNormas: [],
    anexos: ['Tabla de alícuotas'],
    creadoPor: 'Sistema (demo)',
    fechaCreacion: '2026-10-01',
    historialCambios: [
      { fecha: '2026-10-01', usuario: 'Sistema', accion: 'Registro inicial', detalle: 'Incorporación desde fuentes públicas del MEFP' }
    ]
  },
  {
    id: '3',
    tipo: 'decreto_municipal',
    numero: '15',
    gestion: '2025',
    titulo: 'Reglamento de Uso de Espacios Públicos Municipales',
    materia: 'Administración Municipal',
    organoEmisor: 'ejecutivo',
    fechaAprobacion: '2025-06-10',
    fechaPromulgacion: '',
    fechaPublicacion: '2025-06-15',
    fechaVigencia: '2025-06-15',
    medioPublicacion: 'Por confirmar',
    constanciaPublicacion: 'Pendiente de verificación',
    estado: 'publicado',
    estadoVerificacion: 'pendiente',
    resumen: 'Establece las condiciones y requisitos para el uso de plazas, parques y otros espacios públicos municipales.',
    observaciones: 'Documento de demostración para el sistema piloto.',
    relacionesNormas: [],
    anexos: [],
    creadoPor: 'Sistema (demo)',
    fechaCreacion: '2026-10-01',
    historialCambios: [
      { fecha: '2026-10-01', usuario: 'Sistema', accion: 'Registro inicial', detalle: 'Dato de demostración' }
    ]
  },
  {
    id: '4',
    tipo: 'resolucion_concejo',
    numero: '42',
    gestion: '2024',
    titulo: 'Aprobación del Programa Operativo Anual 2025',
    materia: 'Planificación',
    organoEmisor: 'concejo',
    fechaAprobacion: '2024-11-20',
    fechaPromulgacion: '',
    fechaPublicacion: '2024-11-25',
    fechaVigencia: '2025-01-01',
    medioPublicacion: 'Por confirmar',
    constanciaPublicacion: 'Pendiente de verificación',
    estado: 'publicado',
    estadoVerificacion: 'pendiente',
    resumen: 'Aprueba el Programa Operativo Anual del Gobierno Autónomo Municipal de San Andrés para la gestión 2025.',
    observaciones: 'Documento de demostración para el sistema piloto.',
    relacionesNormas: [],
    anexos: ['POA 2025'],
    creadoPor: 'Sistema (demo)',
    fechaCreacion: '2026-10-01',
    historialCambios: [
      { fecha: '2026-10-01', usuario: 'Sistema', accion: 'Registro inicial', detalle: 'Dato de demostración' }
    ]
  },
  {
    id: '5',
    tipo: 'decreto_edil',
    numero: '8',
    gestion: '2025',
    titulo: 'Designación de Responsable del Archivo Normativo',
    materia: 'Administración Municipal',
    organoEmisor: 'ejecutivo',
    fechaAprobacion: '2025-03-05',
    fechaPromulgacion: '',
    fechaPublicacion: '',
    fechaVigencia: '2025-03-05',
    medioPublicacion: '',
    constanciaPublicacion: '',
    estado: 'publicado',
    estadoVerificacion: 'pendiente',
    resumen: 'Designa al responsable de la custodia y organización del archivo normativo municipal.',
    observaciones: 'Documento de demostración. Sin constancia de publicación registrada.',
    relacionesNormas: [],
    anexos: [],
    creadoPor: 'Sistema (demo)',
    fechaCreacion: '2026-10-01',
    historialCambios: [
      { fecha: '2026-10-01', usuario: 'Sistema', accion: 'Registro inicial', detalle: 'Dato de demostración' }
    ]
  },
  {
    id: '6',
    tipo: 'resolucion_administrativa',
    numero: '22',
    gestion: '2024',
    titulo: 'Procedimiento de Atención de Solicitudes Ciudadanas',
    materia: 'Participación Ciudadana',
    organoEmisor: 'ejecutivo',
    fechaAprobacion: '2024-08-12',
    fechaPromulgacion: '',
    fechaPublicacion: '2024-08-18',
    fechaVigencia: '2024-08-18',
    medioPublicacion: 'Por confirmar',
    constanciaPublicacion: 'Pendiente de verificación',
    estado: 'publicado',
    estadoVerificacion: 'pendiente',
    resumen: 'Establece el procedimiento para la recepción, seguimiento y respuesta de solicitudes ciudadanas ante el Gobierno Autónomo Municipal de San Andrés.',
    observaciones: 'Documento de demostración para el sistema piloto.',
    relacionesNormas: [],
    anexos: ['Formulario de solicitud'],
    creadoPor: 'Sistema (demo)',
    fechaCreacion: '2026-10-01',
    historialCambios: [
      { fecha: '2026-10-01', usuario: 'Sistema', accion: 'Registro inicial', detalle: 'Dato de demostración' }
    ]
  },
  {
    id: '7',
    tipo: 'ley_municipal',
    numero: '95',
    gestion: '2024',
    titulo: 'Regulación del Comercio en Vía Pública',
    materia: 'Administración Municipal',
    organoEmisor: 'concejo',
    fechaAprobacion: '2024-04-20',
    fechaPromulgacion: '2024-04-22',
    fechaPublicacion: '2024-04-25',
    fechaVigencia: '2024-04-25',
    medioPublicacion: 'Por confirmar',
    constanciaPublicacion: 'Pendiente de verificación',
    estado: 'publicado',
    estadoVerificacion: 'pendiente',
    resumen: 'Regula las actividades de comercio en la vía pública del municipio de San Andrés, estableciendo requisitos, autorizaciones y sanciones.',
    observaciones: 'Documento de demostración para el sistema piloto.',
    relacionesNormas: [],
    anexos: [],
    creadoPor: 'Sistema (demo)',
    fechaCreacion: '2026-10-01',
    historialCambios: [
      { fecha: '2026-10-01', usuario: 'Sistema', accion: 'Registro inicial', detalle: 'Dato de demostración' }
    ]
  },
  {
    id: '8',
    tipo: 'decreto_municipal',
    numero: '10',
    gestion: '2024',
    titulo: 'Reglamento de Ferias y Eventos Municipales',
    materia: 'Administración Municipal',
    organoEmisor: 'ejecutivo',
    fechaAprobacion: '2024-02-15',
    fechaPromulgacion: '',
    fechaPublicacion: '2024-02-20',
    fechaVigencia: '2024-02-20',
    medioPublicacion: 'Por confirmar',
    constanciaPublicacion: 'Pendiente de verificación',
    estado: 'publicado',
    estadoVerificacion: 'pendiente',
    resumen: 'Reglamenta la organización de ferias productivas, culturales y eventos oficiales del Gobierno Autónomo Municipal de San Andrés.',
    observaciones: 'Documento de demostración para el sistema piloto.',
    relacionesNormas: [],
    anexos: ['Calendario de ferias 2024'],
    creadoPor: 'Sistema (demo)',
    fechaCreacion: '2026-10-01',
    historialCambios: [
      { fecha: '2026-10-01', usuario: 'Sistema', accion: 'Registro inicial', detalle: 'Dato de demostración' }
    ]
  },
  {
    id: '9',
    tipo: 'ley_municipal',
    numero: '110',
    gestion: '2025',
    titulo: 'Protección y Conservación del Medio Ambiente Municipal',
    materia: 'Medio Ambiente',
    organoEmisor: 'concejo',
    fechaAprobacion: '2025-05-20',
    fechaPromulgacion: '2025-05-22',
    fechaPublicacion: '2025-05-25',
    fechaVigencia: '2025-05-25',
    medioPublicacion: 'Por confirmar',
    constanciaPublicacion: 'Pendiente de verificación',
    estado: 'publicado',
    estadoVerificacion: 'pendiente',
    resumen: 'Establece el marco normativo para la protección, conservación y gestión del medio ambiente en el municipio de San Andrés.',
    observaciones: 'Documento de demostración para el sistema piloto.',
    relacionesNormas: [],
    anexos: ['Áreas protegidas municipales'],
    creadoPor: 'Sistema (demo)',
    fechaCreacion: '2026-10-01',
    historialCambios: [
      { fecha: '2026-10-01', usuario: 'Sistema', accion: 'Registro inicial', detalle: 'Dato de demostración' }
    ]
  },
  {
    id: '10',
    tipo: 'resolucion_concejo',
    numero: '55',
    gestion: '2025',
    titulo: 'Aprobación del Presupuesto Municipal Reformulado Gestión 2025',
    materia: 'Finanzas y Tributación',
    organoEmisor: 'concejo',
    fechaAprobacion: '2025-08-10',
    fechaPromulgacion: '',
    fechaPublicacion: '2025-08-15',
    fechaVigencia: '2025-08-15',
    medioPublicacion: 'Por confirmar',
    constanciaPublicacion: 'Pendiente de verificación',
    estado: 'publicado',
    estadoVerificacion: 'pendiente',
    resumen: 'Aprueba la reformulación presupuestaria del Gobierno Autónomo Municipal de San Andrés para la gestión 2025.',
    observaciones: 'Documento de demostración para el sistema piloto.',
    relacionesNormas: [{ tipo: 'complementa', normaRef: '4', descripcion: 'Complementa la R.C. N.º 42/2024 (POA 2025)' }],
    anexos: ['Cuadro de reformulación presupuestaria'],
    creadoPor: 'Sistema (demo)',
    fechaCreacion: '2026-10-01',
    historialCambios: [
      { fecha: '2026-10-01', usuario: 'Sistema', accion: 'Registro inicial', detalle: 'Dato de demostración' }
    ]
  },
];

// Usuarios de demostración
export const USUARIOS_DEMO = [
  { id: '1', nombre: 'Administrador General', email: 'admin@gaceta.sanandres.gob.bo', rol: 'administrador', activo: true },
  { id: '2', nombre: 'Lic. Carla Méndez (Revisor)', email: 'revisor@gaceta.sanandres.gob.bo', rol: 'revisor', activo: true },
  { id: '3', nombre: 'Ing. Roberto Vaca (Editor)', email: 'editor@gaceta.sanandres.gob.bo', rol: 'editor', activo: true },
  { id: '4', nombre: 'Dr. Mario Suárez (Consultor)', email: 'consultor@gaceta.sanandres.gob.bo', rol: 'consultor', activo: true },
];

// Funciones de utilidad
export function getTipoNorma(tipoId) {
  return TIPOS_NORMA.find(t => t.id === tipoId);
}

export function getOrgano(organoId) {
  return ORGANOS.find(o => o.id === organoId);
}

export function getEstado(estadoId) {
  return ESTADOS_NORMA.find(e => e.id === estadoId);
}

export function getEstadoVerificacion(estadoId) {
  return ESTADOS_VERIFICACION.find(e => e.id === estadoId);
}

export function formatearFecha(fechaStr) {
  if (!fechaStr) return '—';
  const fecha = new Date(fechaStr + 'T00:00:00');
  return fecha.toLocaleDateString('es-BO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generarReferencia(norma) {
  const tipo = getTipoNorma(norma.tipo);
  return `${tipo?.abreviatura || ''} N.º ${norma.numero}/${norma.gestion}`;
}

export function buscarNormas(normas, filtros) {
  let resultado = [...normas];

  if (filtros.busqueda) {
    const q = filtros.busqueda.toLowerCase();
    resultado = resultado.filter(n =>
      n.titulo.toLowerCase().includes(q) ||
      n.numero.includes(q) ||
      n.resumen.toLowerCase().includes(q) ||
      generarReferencia(n).toLowerCase().includes(q)
    );
  }

  if (filtros.tipo) {
    resultado = resultado.filter(n => n.tipo === filtros.tipo);
  }

  if (filtros.gestion) {
    resultado = resultado.filter(n => n.gestion === filtros.gestion);
  }

  if (filtros.organo) {
    resultado = resultado.filter(n => n.organoEmisor === filtros.organo);
  }

  if (filtros.materia) {
    resultado = resultado.filter(n => n.materia === filtros.materia);
  }

  if (filtros.estado) {
    resultado = resultado.filter(n => n.estado === filtros.estado);
  }

  return resultado;
}

export function obtenerEstadisticas(normas) {
  const porTipo = {};
  const porGestion = {};
  const porOrgano = {};
  const porMateria = {};

  normas.forEach(n => {
    porTipo[n.tipo] = (porTipo[n.tipo] || 0) + 1;
    porGestion[n.gestion] = (porGestion[n.gestion] || 0) + 1;
    porOrgano[n.organoEmisor] = (porOrgano[n.organoEmisor] || 0) + 1;
    porMateria[n.materia] = (porMateria[n.materia] || 0) + 1;
  });

  return {
    total: normas.length,
    porTipo,
    porGestion,
    porOrgano,
    porMateria,
    publicadas: normas.filter(n => n.estado === 'publicado').length,
    verificadas: normas.filter(n => n.estadoVerificacion === 'verificado').length,
    pendientes: normas.filter(n => n.estadoVerificacion === 'pendiente').length,
  };
}
