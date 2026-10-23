'use client';
import { useState, useEffect } from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useNormas } from '../../../contexts/NormasContext';
import { TIPOS_NORMA, ORGANOS, MATERIAS, ESTADOS_NORMA, ESTADOS_VERIFICACION, getTipoNorma, generarReferencia } from '../../../lib/data';

export default function EditarNormaPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { normas, loaded, actualizarNorma, obtenerNorma } = useNormas();

  const [form, setForm] = useState(null);
  const [nuevoAnexo, setNuevoAnexo] = useState('');
  const [saved, setSaved] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    if (loaded) {
      const norma = obtenerNorma(id);
      if (norma) {
        setForm({ ...norma });
      }
    }
  }, [loaded, id]);

  if (!loaded) {
    return <div className="loader"><div className="spinner"></div></div>;
  }

  if (!form) {
    return (
      <>
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>Norma no encontrada</h3>
          <p>No se encontró la norma con el identificador proporcionado.</p>
          <Link href="/admin/normas" className="btn btn-green">← Volver a Gestión</Link>
        </div>
      </>
    );
  }

  const handleChange = (campo, valor) => {
    setForm(prev => ({ ...prev, [campo]: valor }));
    setSaved(false);

    // Auto-set organo emisor based on tipo
    if (campo === 'tipo') {
      const tipo = TIPOS_NORMA.find(t => t.id === valor);
      if (tipo) {
        const organoId = tipo.organo === 'Concejo Municipal' ? 'concejo' : 'ejecutivo';
        setForm(prev => ({ ...prev, [campo]: valor, organoEmisor: organoId }));
      }
    }
  };

  const agregarAnexo = () => {
    if (nuevoAnexo.trim()) {
      setForm(prev => ({ ...prev, anexos: [...(prev.anexos || []), nuevoAnexo.trim()] }));
      setNuevoAnexo('');
      setSaved(false);
    }
  };

  const eliminarAnexo = (i) => {
    setForm(prev => ({ ...prev, anexos: prev.anexos.filter((_, idx) => idx !== i) }));
    setSaved(false);
  };

  // Flujo de revisión: borrador → en_revision → autorizado → publicado
  const FLUJO_ESTADOS = {
    borrador: { siguiente: 'en_revision', label: '📤 Enviar a Revisión', color: 'var(--warning)' },
    en_revision: { siguiente: 'autorizado', label: '✅ Autorizar', color: 'var(--info)' },
    autorizado: { siguiente: 'publicado', label: '🌐 Publicar', color: 'var(--success)' },
    publicado: { siguiente: null, label: null, color: null },
  };

  const estadoActual = FLUJO_ESTADOS[form.estado] || {};

  const avanzarEstado = () => {
    if (estadoActual.siguiente) {
      setShowTransition(true);
      const nuevoEstado = estadoActual.siguiente;
      const estadoInfo = ESTADOS_NORMA.find(e => e.id === nuevoEstado);
      setForm(prev => ({
        ...prev,
        estado: nuevoEstado,
      }));
      setSaved(false);
      setTimeout(() => setShowTransition(false), 600);
    }
  };

  const retrocederEstado = () => {
    const orden = ['borrador', 'en_revision', 'autorizado', 'publicado'];
    const idx = orden.indexOf(form.estado);
    if (idx > 0) {
      setForm(prev => ({
        ...prev,
        estado: orden[idx - 1],
      }));
      setSaved(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.numero || !form.titulo) {
      alert('Complete al menos el número y el título de la norma.');
      return;
    }
    actualizarNorma(id, form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const ref = generarReferencia(form);
  const tipo = getTipoNorma(form.tipo);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--verde-oscuro)' }}>
              ✏️ Editar Norma
            </h1>
            <span className={`badge badge-${form.estado}`} style={{ fontSize: '0.75rem' }}>
              {ESTADOS_NORMA.find(e => e.id === form.estado)?.nombre || form.estado}
            </span>
          </div>
          <p style={{ color: 'var(--texto-secundario)', fontSize: '0.85rem' }}>
            {ref} – {form.titulo}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href={`/normas/${id}`} className="btn btn-outline btn-sm">
            👁️ Ver en Gaceta
          </Link>
          <Link href="/admin/normas" className="btn btn-outline btn-sm">
            ← Volver
          </Link>
        </div>
      </div>

      {/* Flujo de revisión */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--gris-50) 0%, var(--blanco) 100%)' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1rem' }}>
          🔄 Flujo de Revisión
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {ESTADOS_NORMA.map((estado, i) => {
            const isActive = form.estado === estado.id;
            const orden = ['borrador', 'en_revision', 'autorizado', 'publicado'];
            const isPast = orden.indexOf(form.estado) > orden.indexOf(estado.id);
            return (
              <div key={estado.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radio-full)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? estado.color : isPast ? `${estado.color}22` : 'var(--gris-200)',
                  color: isActive ? 'var(--blanco)' : isPast ? estado.color : 'var(--texto-terciario)',
                  border: isActive ? 'none' : `1px solid ${isPast ? estado.color + '44' : 'var(--gris-300)'}`,
                  transition: 'all 0.3s ease',
                  transform: isActive && showTransition ? 'scale(1.1)' : 'scale(1)',
                }}>
                  {isPast ? '✓ ' : ''}{estado.nombre}
                </div>
                {i < ESTADOS_NORMA.length - 1 && (
                  <span style={{ color: isPast ? 'var(--verde-medio)' : 'var(--gris-400)', fontSize: '1rem' }}>→</span>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {form.estado !== 'borrador' && (
            <button type="button" className="btn btn-sm btn-outline" onClick={retrocederEstado}>
              ← Retroceder Estado
            </button>
          )}
          {estadoActual.siguiente && (
            <button
              type="button"
              className="btn btn-sm"
              style={{ background: estadoActual.color, color: 'var(--blanco)' }}
              onClick={avanzarEstado}
            >
              {estadoActual.label}
            </button>
          )}
          {form.estado === 'publicado' && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--success)', fontWeight: 600 }}>
              ✅ Norma publicada
            </span>
          )}
        </div>
      </div>

      {saved && (
        <div className="notice notice-success" style={{ animation: 'slideUp 0.3s ease' }}>
          <span>✅</span>
          <div><strong>Cambios guardados correctamente.</strong> La norma ha sido actualizada en el sistema.</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1.25rem' }}>
            📋 Identificación
          </h3>
          <div className="form-row">
            <div className="form-group">
              <label>Tipo de norma <span className="required">*</span></label>
              <select className="form-select" value={form.tipo} onChange={e => handleChange('tipo', e.target.value)}>
                {TIPOS_NORMA.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Número <span className="required">*</span></label>
              <input className="form-input" type="text" value={form.numero} onChange={e => handleChange('numero', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Gestión <span className="required">*</span></label>
              <input className="form-input" type="text" value={form.gestion} onChange={e => handleChange('gestion', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Título o denominación <span className="required">*</span></label>
            <input className="form-input" type="text" value={form.titulo} onChange={e => handleChange('titulo', e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Órgano emisor</label>
              <select className="form-select" value={form.organoEmisor} onChange={e => handleChange('organoEmisor', e.target.value)}>
                {ORGANOS.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Materia</label>
              <select className="form-select" value={form.materia} onChange={e => handleChange('materia', e.target.value)}>
                <option value="">Seleccionar materia</option>
                {MATERIAS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1.25rem' }}>
            📅 Fechas y publicación
          </h3>
          <div className="form-row">
            <div className="form-group">
              <label>Fecha de aprobación</label>
              <input className="form-input" type="date" value={form.fechaAprobacion || ''} onChange={e => handleChange('fechaAprobacion', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Fecha de promulgación</label>
              <input className="form-input" type="date" value={form.fechaPromulgacion || ''} onChange={e => handleChange('fechaPromulgacion', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Fecha de publicación</label>
              <input className="form-input" type="date" value={form.fechaPublicacion || ''} onChange={e => handleChange('fechaPublicacion', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Fecha de entrada en vigencia</label>
              <input className="form-input" type="date" value={form.fechaVigencia || ''} onChange={e => handleChange('fechaVigencia', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Medio de publicación</label>
              <input className="form-input" type="text" value={form.medioPublicacion || ''} onChange={e => handleChange('medioPublicacion', e.target.value)} placeholder="Ej: Gaceta Oficial Municipal" />
            </div>
            <div className="form-group">
              <label>Constancia de publicación</label>
              <input className="form-input" type="text" value={form.constanciaPublicacion || ''} onChange={e => handleChange('constanciaPublicacion', e.target.value)} placeholder="Referencia de constancia" />
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1.25rem' }}>
            📝 Descripción y estado
          </h3>
          <div className="form-group">
            <label>Resumen</label>
            <textarea className="form-textarea" value={form.resumen || ''} onChange={e => handleChange('resumen', e.target.value)} placeholder="Breve descripción del contenido y objeto de la norma" />
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea className="form-textarea" value={form.observaciones || ''} onChange={e => handleChange('observaciones', e.target.value)} placeholder="Observaciones sobre el registro, la fuente o pendientes de verificación" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Estado del registro</label>
              <select className="form-select" value={form.estado} onChange={e => handleChange('estado', e.target.value)}>
                {ESTADOS_NORMA.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Estado de verificación</label>
              <select className="form-select" value={form.estadoVerificacion} onChange={e => handleChange('estadoVerificacion', e.target.value)}>
                {ESTADOS_VERIFICACION.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1.25rem' }}>
            📎 Anexos
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              className="form-input"
              type="text"
              value={nuevoAnexo}
              onChange={e => setNuevoAnexo(e.target.value)}
              placeholder="Nombre del anexo"
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), agregarAnexo())}
            />
            <button type="button" className="btn btn-green btn-sm" onClick={agregarAnexo}>Agregar</button>
          </div>
          {form.anexos && form.anexos.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {form.anexos.map((anexo, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.3rem 0.75rem', background: 'var(--gris-100)', borderRadius: 'var(--radio-full)',
                  fontSize: '0.82rem'
                }}>
                  📄 {anexo}
                  <button type="button" onClick={() => eliminarAnexo(i)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', fontSize: '0.9rem'
                  }}>×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Historial de cambios */}
        {form.historialCambios && form.historialCambios.length > 0 && (
          <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1.25rem' }}>
              🕐 Historial de cambios
            </h3>
            <div className="timeline">
              {form.historialCambios.map((cambio, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-date">{cambio.fecha}</div>
                  <div className="timeline-action">{cambio.accion}</div>
                  <div className="timeline-detail">{cambio.detalle}</div>
                  <div className="timeline-user">Por: {cambio.usuario}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-green btn-lg">
            💾 Guardar Cambios
          </button>
          <Link href="/admin/normas" className="btn btn-outline">
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}
