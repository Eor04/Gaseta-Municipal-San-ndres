'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useNormas } from '../contexts/NormasContext';
import {
  TIPOS_NORMA, ORGANOS, MATERIAS,
  getTipoNorma, generarReferencia, formatearFecha, buscarNormas
} from '../lib/data';

function NormasContent() {
  const { normas, loaded } = useNormas();
  const searchParams = useSearchParams();
  const queryInicial = searchParams.get('q') || '';

  const [filtros, setFiltros] = useState({
    busqueda: queryInicial,
    tipo: '',
    gestion: '',
    organo: '',
    materia: '',
  });

  const gestiones = useMemo(() => {
    const g = [...new Set(normas.map(n => n.gestion))].sort((a, b) => b.localeCompare(a));
    return g;
  }, [normas]);

  const resultado = useMemo(() => {
    return buscarNormas(normas.filter(n => n.estado === 'publicado'), filtros);
  }, [normas, filtros]);

  const actualizarFiltro = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  if (!loaded) {
    return <div className="loader"><div className="spinner"></div></div>;
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>›</span>
            <span>Gaceta Municipal</span>
          </div>
          <h1>📜 Gaceta Municipal</h1>
          <p>Consulte la normativa del Gobierno Autónomo Municipal de San Andrés</p>
        </div>
      </div>

      <section className="section">
        {/* Notice */}
        <div className="notice notice-info">
          <span>ℹ️</span>
          <div>
            <strong>Catálogo piloto.</strong> Este sistema muestra datos de demostración. 
            Los registros y constancias deberán verificarse con los documentos originales 
            del municipio antes de considerarse oficiales.
          </div>
        </div>

        {/* Filtros */}
        <div className="filters-panel">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Búsqueda</label>
              <input
                type="text"
                placeholder="Número, título o materia..."
                value={filtros.busqueda}
                onChange={e => actualizarFiltro('busqueda', e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Tipo de norma</label>
              <select value={filtros.tipo} onChange={e => actualizarFiltro('tipo', e.target.value)}>
                <option value="">Todos los tipos</option>
                {TIPOS_NORMA.map(t => (
                  <option key={t.id} value={t.id}>{t.nombre}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Gestión</label>
              <select value={filtros.gestion} onChange={e => actualizarFiltro('gestion', e.target.value)}>
                <option value="">Todas las gestiones</option>
                {gestiones.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Órgano emisor</label>
              <select value={filtros.organo} onChange={e => actualizarFiltro('organo', e.target.value)}>
                <option value="">Todos los órganos</option>
                {ORGANOS.map(o => (
                  <option key={o.id} value={o.id}>{o.nombre}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Materia</label>
              <select value={filtros.materia} onChange={e => actualizarFiltro('materia', e.target.value)}>
                <option value="">Todas las materias</option>
                {MATERIAS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {(filtros.busqueda || filtros.tipo || filtros.gestion || filtros.organo || filtros.materia) && (
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--texto-secundario)' }}>
                {resultado.length} resultado{resultado.length !== 1 ? 's' : ''} encontrado{resultado.length !== 1 ? 's' : ''}
              </span>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setFiltros({ busqueda: '', tipo: '', gestion: '', organo: '', materia: '' })}
              >
                ✕ Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Resultados */}
        {resultado.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>No se encontraron normas</h3>
            <p>Intente con otros términos de búsqueda o ajuste los filtros aplicados.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {resultado.map(norma => {
              const tipo = getTipoNorma(norma.tipo);
              return (
                <Link key={norma.id} href={`/normas/${norma.id}`} style={{ textDecoration: 'none' }}>
                  <div className="card card-norma">
                    <div className="card-norma-header">
                      <span className="card-norma-tipo">
                        {tipo?.nombre}
                      </span>
                      <span className="card-norma-ref">{generarReferencia(norma)}</span>
                    </div>
                    <h3 className="card-norma-titulo">{norma.titulo}</h3>
                    <p className="card-norma-resumen">{norma.resumen}</p>
                    <div className="card-norma-meta">
                      <span>📅 {formatearFecha(norma.fechaPublicacion)}</span>
                      <span>🏛️ {tipo?.organo}</span>
                      <span>📂 {norma.materia}</span>
                      {norma.anexos?.length > 0 && (
                        <span>📎 {norma.anexos.length} anexo{norma.anexos.length > 1 ? 's' : ''}</span>
                      )}
                      <span className={`badge badge-${norma.estadoVerificacion}`}>
                        {norma.estadoVerificacion === 'verificado' ? '✓ Verificado' :
                         norma.estadoVerificacion === 'pendiente' ? '⏳ Pendiente' : '⚠ No verificable'}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default function NormasPage() {
  return (
    <Suspense fallback={<div className="loader"><div className="spinner"></div></div>}>
      <NormasContent />
    </Suspense>
  );
}
