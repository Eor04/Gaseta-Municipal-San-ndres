'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useNormas } from '../../contexts/NormasContext';
import { TIPOS_NORMA, ORGANOS, MATERIAS, ESTADOS_NORMA, ESTADOS_VERIFICACION } from '../../lib/data';

export default function NuevaNormaPage() {
  const router = useRouter();
  const { agregarNorma } = useNormas();

  const [form, setForm] = useState({
    tipo: 'ley_municipal',
    numero: '',
    gestion: '2026',
    titulo: '',
    materia: '',
    organoEmisor: 'concejo',
    fechaAprobacion: '',
    fechaPromulgacion: '',
    fechaPublicacion: '',
    fechaVigencia: '',
    medioPublicacion: '',
    constanciaPublicacion: '',
    estado: 'borrador',
    estadoVerificacion: 'pendiente',
    resumen: '',
    observaciones: '',
    anexos: [],
    relacionesNormas: [],
  });

  const [nuevoAnexo, setNuevoAnexo] = useState('');

  const handleChange = (campo, valor) => {
    setForm(prev => ({ ...prev, [campo]: valor }));

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
      setForm(prev => ({ ...prev, anexos: [...prev.anexos, nuevoAnexo.trim()] }));
      setNuevoAnexo('');
    }
  };

  const eliminarAnexo = (i) => {
    setForm(prev => ({ ...prev, anexos: prev.anexos.filter((_, idx) => idx !== i) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.numero || !form.titulo) {
      alert('Complete al menos el número y el título de la norma.');
      return;
    }
    agregarNorma(form);
    router.push('/admin/normas');
  };

  return (
    <>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--verde-oscuro)' }}>
          ➕ Registrar Nueva Norma
        </h1>
        <p style={{ color: 'var(--texto-secundario)', fontSize: '0.85rem' }}>
          Complete los campos para incorporar una norma al catálogo
        </p>
      </div>

      <div className="notice notice-info">
        <span>ℹ️</span>
        <div>
          Los campos marcados con <span style={{ color: 'var(--error)' }}>*</span> son obligatorios. 
          Los datos no verificados deben marcarse como pendientes. La fecha de carga al sistema 
          no sustituye la fecha de publicación oficial.
        </div>
      </div>

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
              <input className="form-input" type="text" value={form.numero} onChange={e => handleChange('numero', e.target.value)} placeholder="Ej: 121" />
            </div>
            <div className="form-group">
              <label>Gestión <span className="required">*</span></label>
              <input className="form-input" type="text" value={form.gestion} onChange={e => handleChange('gestion', e.target.value)} placeholder="Ej: 2025" />
            </div>
          </div>
          <div className="form-group">
            <label>Título o denominación <span className="required">*</span></label>
            <input className="form-input" type="text" value={form.titulo} onChange={e => handleChange('titulo', e.target.value)} placeholder="Título descriptivo de la norma" />
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
              <input className="form-input" type="date" value={form.fechaAprobacion} onChange={e => handleChange('fechaAprobacion', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Fecha de promulgación</label>
              <input className="form-input" type="date" value={form.fechaPromulgacion} onChange={e => handleChange('fechaPromulgacion', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Fecha de publicación</label>
              <input className="form-input" type="date" value={form.fechaPublicacion} onChange={e => handleChange('fechaPublicacion', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Fecha de entrada en vigencia</label>
              <input className="form-input" type="date" value={form.fechaVigencia} onChange={e => handleChange('fechaVigencia', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Medio de publicación</label>
              <input className="form-input" type="text" value={form.medioPublicacion} onChange={e => handleChange('medioPublicacion', e.target.value)} placeholder="Ej: Gaceta Oficial Municipal" />
            </div>
            <div className="form-group">
              <label>Constancia de publicación</label>
              <input className="form-input" type="text" value={form.constanciaPublicacion} onChange={e => handleChange('constanciaPublicacion', e.target.value)} placeholder="Referencia de constancia" />
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1.25rem' }}>
            📝 Descripción y estado
          </h3>
          <div className="form-group">
            <label>Resumen</label>
            <textarea className="form-textarea" value={form.resumen} onChange={e => handleChange('resumen', e.target.value)} placeholder="Breve descripción del contenido y objeto de la norma" />
          </div>
          <div className="form-group">
            <label>Observaciones</label>
            <textarea className="form-textarea" value={form.observaciones} onChange={e => handleChange('observaciones', e.target.value)} placeholder="Observaciones sobre el registro, la fuente o pendientes de verificación" />
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
          {form.anexos.length > 0 && (
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

        <div className="form-actions">
          <button type="submit" className="btn btn-green btn-lg">
            💾 Guardar Norma
          </button>
          <Link href="/admin/normas" className="btn btn-outline">
            Cancelar
          </Link>
        </div>
      </form>
    </>
  );
}
