'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useNormas } from '../../contexts/NormasContext';
import { getTipoNorma, generarReferencia, formatearFecha } from '../../lib/data';

export default function AuditoriaPage() {
  const { normas, loaded } = useNormas();
  const [filtroAccion, setFiltroAccion] = useState('');
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // Recopilar todos los eventos de historial de todas las normas
  const todosLosEventos = useMemo(() => {
    const eventos = [];
    (normas || []).forEach(norma => {
      if (norma.historialCambios) {
        norma.historialCambios.forEach(cambio => {
          eventos.push({
            ...cambio,
            normaId: norma.id,
            normaTitulo: norma.titulo,
            normaRef: generarReferencia(norma),
            normaTipo: norma.tipo,
          });
        });
      }
    });
    // Ordenar por fecha descendente
    return eventos.sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''));
  }, [normas]);

  // Obtener acciones y usuarios únicos
  const accionesUnicas = useMemo(() => [...new Set(todosLosEventos.map(e => e.accion))].sort(), [todosLosEventos]);
  const usuariosUnicos = useMemo(() => [...new Set(todosLosEventos.map(e => e.usuario))].sort(), [todosLosEventos]);

  // Filtrar
  let eventosFiltrados = [...todosLosEventos];
  if (filtroAccion) eventosFiltrados = eventosFiltrados.filter(e => e.accion === filtroAccion);
  if (filtroUsuario) eventosFiltrados = eventosFiltrados.filter(e => e.usuario === filtroUsuario);
  if (busqueda) {
    const q = busqueda.toLowerCase();
    eventosFiltrados = eventosFiltrados.filter(e =>
      (e.normaTitulo || '').toLowerCase().includes(q) ||
      (e.normaRef || '').toLowerCase().includes(q) ||
      (e.detalle || '').toLowerCase().includes(q) ||
      (e.accion || '').toLowerCase().includes(q)
    );
  }

  // Estadísticas
  const stats = {
    totalEventos: todosLosEventos.length,
    normasModificadas: new Set(todosLosEventos.map(e => e.normaId)).size,
    ultimoCambio: todosLosEventos.length > 0 ? formatearFecha(todosLosEventos[0].fecha) : '—',
    usuariosActivos: usuariosUnicos.length,
  };

  if (!loaded) {
    return <div className="loader"><div className="spinner"></div></div>;
  }

  return (
    <>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--verde-oscuro)' }}>
          🕐 Auditoría del Sistema
        </h1>
        <p style={{ color: 'var(--texto-secundario)', fontSize: '0.85rem' }}>
          Historial completo de cambios y acciones realizadas en el catálogo normativo
        </p>
      </div>

      {/* Estadísticas de auditoría */}
      <div className="dashboard-stats" style={{ marginBottom: '1.5rem' }}>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon" style={{ background: 'var(--info-suave)', color: 'var(--info)' }}>
            📊
          </div>
          <div className="dashboard-stat-info">
            <h3>{stats.totalEventos}</h3>
            <p>Total eventos</p>
          </div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon" style={{ background: 'var(--verde-suave)', color: 'var(--verde-oscuro)' }}>
            📜
          </div>
          <div className="dashboard-stat-info">
            <h3>{stats.normasModificadas}</h3>
            <p>Normas afectadas</p>
          </div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon" style={{ background: 'var(--warning-suave)', color: 'var(--warning)' }}>
            👤
          </div>
          <div className="dashboard-stat-info">
            <h3>{stats.usuariosActivos}</h3>
            <p>Usuarios activos</p>
          </div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon" style={{ background: 'var(--success-suave)', color: 'var(--success)' }}>
            📅
          </div>
          <div className="dashboard-stat-info">
            <h3 style={{ fontSize: '0.95rem' }}>{stats.ultimoCambio}</h3>
            <p>Último cambio</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-panel" style={{ marginBottom: '1.5rem' }}>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Buscar</label>
            <input
              type="text"
              placeholder="Norma, acción o detalle..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Acción</label>
            <select value={filtroAccion} onChange={e => setFiltroAccion(e.target.value)}>
              <option value="">Todas las acciones</option>
              {accionesUnicas.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Usuario</label>
            <select value={filtroUsuario} onChange={e => setFiltroUsuario(e.target.value)}>
              <option value="">Todos los usuarios</option>
              {usuariosUnicos.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
        {(busqueda || filtroAccion || filtroUsuario) && (
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--texto-secundario)' }}>
              {eventosFiltrados.length} evento{eventosFiltrados.length !== 1 ? 's' : ''} encontrado{eventosFiltrados.length !== 1 ? 's' : ''}
            </span>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => { setBusqueda(''); setFiltroAccion(''); setFiltroUsuario(''); }}
            >
              ✕ Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Lista de eventos */}
      {eventosFiltrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3>Sin eventos registrados</h3>
          <p>No se encontraron eventos de auditoría con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-container" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Norma</th>
                  <th>Acción</th>
                  <th>Detalle</th>
                  <th>Usuario</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {eventosFiltrados.map((evento, i) => {
                  const tipo = getTipoNorma(evento.normaTipo);
                  return (
                    <tr key={i}>
                      <td style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                        {formatearFecha(evento.fecha)}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--verde-oscuro)' }}>
                          {evento.normaRef}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--texto-terciario)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {evento.normaTitulo}
                        </div>
                      </td>
                      <td>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                          padding: '0.2rem 0.6rem', borderRadius: 'var(--radio-full)',
                          fontSize: '0.7rem', fontWeight: 600,
                          background: evento.accion === 'Registro inicial' ? 'var(--success-suave)' :
                                     evento.accion === 'Actualización' ? 'var(--info-suave)' :
                                     evento.accion === 'Eliminación' ? 'var(--error-suave)' : 'var(--gris-200)',
                          color: evento.accion === 'Registro inicial' ? 'var(--success)' :
                                 evento.accion === 'Actualización' ? 'var(--info)' :
                                 evento.accion === 'Eliminación' ? 'var(--error)' : 'var(--texto-secundario)',
                        }}>
                          {evento.accion === 'Registro inicial' ? '🆕' :
                           evento.accion === 'Actualización' ? '✏️' :
                           evento.accion === 'Eliminación' ? '🗑️' : '📌'} {evento.accion}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--texto-secundario)', maxWidth: '250px' }}>
                        {evento.detalle}
                      </td>
                      <td style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                        {evento.usuario}
                      </td>
                      <td>
                        <Link href={`/admin/normas/${evento.normaId}`} className="btn btn-sm btn-icon" title="Ver norma">
                          👁️
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
