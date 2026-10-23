'use client';
import { use } from 'react';
import Link from 'next/link';
import { useNormas } from '../../contexts/NormasContext';
import { getTipoNorma, getOrgano, formatearFecha, generarReferencia } from '../../lib/data';

export default function NormaDetallePage({ params }) {
  const { id } = use(params);
  const { normas, loaded } = useNormas();

  if (!loaded) {
    return <div className="loader"><div className="spinner"></div></div>;
  }

  const norma = normas.find(n => n.id === id);

  if (!norma) {
    return (
      <>
        <div className="page-header">
          <div className="page-header-content">
            <div className="breadcrumb">
              <Link href="/">Inicio</Link><span>›</span>
              <Link href="/normas">Gaceta</Link><span>›</span>
              <span>No encontrada</span>
            </div>
            <h1>Norma no encontrada</h1>
          </div>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No se encontró la norma solicitada</h3>
          <p>Verifique el identificador o consulte el catálogo completo.</p>
          <Link href="/normas" className="btn btn-green">← Volver a la Gaceta</Link>
        </div>
      </>
    );
  }

  const tipo = getTipoNorma(norma.tipo);
  const organo = getOrgano(norma.organoEmisor);
  const ref = generarReferencia(norma);

  return (
    <>
      <div className="page-header" style={{ paddingBottom: '4rem' }}>
        <div className="page-header-content">
          <div className="breadcrumb">
            <Link href="/">Inicio</Link><span>›</span>
            <Link href="/normas">Gaceta</Link><span>›</span>
            <span>{ref}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <span className="card-norma-tipo" style={{ background: 'rgba(255,255,255,0.2)', color: 'var(--dorado)' }}>
              {tipo?.nombre}
            </span>
            <span className={`badge badge-${norma.estadoVerificacion}`}>
              {norma.estadoVerificacion === 'verificado' ? '✓ Verificado' :
               norma.estadoVerificacion === 'pendiente' ? '⏳ Pendiente de verificación' : '⚠ No verificable'}
            </span>
          </div>
          <h1>{ref} – {norma.titulo}</h1>
        </div>
      </div>

      <div className="norma-detail">
        <div className="norma-detail-card">
          {/* Info de verificación */}
          {norma.estadoVerificacion !== 'verificado' && (
            <div className="notice notice-warning" style={{ margin: '1.5rem 1.5rem 0', borderRadius: 'var(--radio-md)' }}>
              <span>⚠️</span>
              <div>
                <strong>Registro pendiente de verificación.</strong> Los datos de este registro 
                deben cotejarse con el documento original y la constancia de publicación antes de 
                considerarse oficiales. La fecha de carga al sistema no sustituye la fecha de publicación.
              </div>
            </div>
          )}

          {/* Encabezado */}
          <div className="norma-detail-header">
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '0.5rem' }}>
              {norma.titulo}
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--texto-secundario)', lineHeight: 1.6 }}>
              {norma.resumen}
            </p>
          </div>

          <div className="norma-detail-body">
            {/* Metadatos principales */}
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📋 Identificación del documento
            </h3>
            <div className="meta-grid" style={{ marginBottom: '2rem' }}>
              <div className="meta-item">
                <div className="meta-label">Tipo de norma</div>
                <div className="meta-value">{tipo?.nombre}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Número / Gestión</div>
                <div className="meta-value">N.º {norma.numero} / {norma.gestion}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Órgano emisor</div>
                <div className="meta-value">{organo?.nombre}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Materia</div>
                <div className="meta-value">{norma.materia}</div>
              </div>
            </div>

            {/* Fechas */}
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📅 Fechas y publicación
            </h3>
            <div className="meta-grid" style={{ marginBottom: '2rem' }}>
              <div className="meta-item">
                <div className="meta-label">Fecha de aprobación</div>
                <div className="meta-value">{formatearFecha(norma.fechaAprobacion)}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Fecha de promulgación</div>
                <div className="meta-value">{formatearFecha(norma.fechaPromulgacion)}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Fecha de publicación</div>
                <div className="meta-value">{formatearFecha(norma.fechaPublicacion)}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Entrada en vigencia</div>
                <div className="meta-value">{formatearFecha(norma.fechaVigencia)}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Medio de publicación</div>
                <div className="meta-value">{norma.medioPublicacion || '—'}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Constancia</div>
                <div className="meta-value">{norma.constanciaPublicacion || '—'}</div>
              </div>
            </div>

            {/* Anexos */}
            {norma.anexos && norma.anexos.length > 0 && (
              <>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📎 Anexos
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                  {norma.anexos.map((anexo, i) => (
                    <div key={i} className="card" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>📄</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{anexo}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Relaciones */}
            {norma.relacionesNormas && norma.relacionesNormas.length > 0 && (
              <>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🔗 Relaciones con otras normas
                </h3>
                <div style={{ marginBottom: '2rem' }}>
                  {norma.relacionesNormas.map((rel, i) => (
                    <div key={i} className="card" style={{ padding: '0.75rem 1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="badge badge-autorizado" style={{ textTransform: 'capitalize' }}>{rel.tipo}</span>
                      <span style={{ fontSize: '0.85rem' }}>{rel.descripcion}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Observaciones */}
            {norma.observaciones && (
              <>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📝 Observaciones
                </h3>
                <div className="card" style={{ padding: '1rem', marginBottom: '2rem', background: 'var(--gris-50)' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--texto-secundario)', lineHeight: 1.6 }}>
                    {norma.observaciones}
                  </p>
                </div>
              </>
            )}

            {/* Historial */}
            {norma.historialCambios && norma.historialCambios.length > 0 && (
              <>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🕐 Historial de registro
                </h3>
                <div className="timeline">
                  {norma.historialCambios.map((cambio, i) => (
                    <div key={i} className="timeline-item">
                      <div className="timeline-date">{formatearFecha(cambio.fecha)}</div>
                      <div className="timeline-action">{cambio.accion}</div>
                      <div className="timeline-detail">{cambio.detalle}</div>
                      <div className="timeline-user">Por: {cambio.usuario}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Acciones */}
          <div style={{ padding: '1.5rem 2rem', borderTop: '1px solid var(--gris-200)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/normas" className="btn btn-outline">
              ← Volver a la Gaceta
            </Link>
            <Link href={`/admin/normas/${norma.id}`} className="btn btn-sm" style={{ background: 'var(--gris-100)', color: 'var(--texto-secundario)' }}>
              ⚙️ Editar en Administración
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
