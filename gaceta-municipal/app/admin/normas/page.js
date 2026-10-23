'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useNormas } from '../../contexts/NormasContext';
import { getTipoNorma, generarReferencia, formatearFecha, TIPOS_NORMA, ESTADOS_NORMA } from '../../lib/data';

export default function AdminNormasPage() {
  const { normas, loaded, eliminarNorma } = useNormas();
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  if (!loaded) {
    return <div className="loader"><div className="spinner"></div></div>;
  }

  let normasFiltradas = [...normas];
  if (filtroTipo) normasFiltradas = normasFiltradas.filter(n => n.tipo === filtroTipo);
  if (filtroEstado) normasFiltradas = normasFiltradas.filter(n => n.estado === filtroEstado);
  if (busqueda) {
    const q = busqueda.toLowerCase();
    normasFiltradas = normasFiltradas.filter(n =>
      n.titulo.toLowerCase().includes(q) || n.numero.includes(q) || generarReferencia(n).toLowerCase().includes(q)
    );
  }

  const handleDelete = (id) => {
    eliminarNorma(id);
    setConfirmDelete(null);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--verde-oscuro)' }}>
            Gestión de Normas
          </h1>
          <p style={{ color: 'var(--texto-secundario)', fontSize: '0.85rem' }}>
            {normas.length} normas registradas en el sistema
          </p>
        </div>
        <Link href="/admin/nueva" className="btn btn-green">
          ➕ Nueva Norma
        </Link>
      </div>

      {/* Filtros */}
      <div className="filters-panel" style={{ marginBottom: '1.5rem' }}>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Buscar</label>
            <input
              type="text"
              placeholder="Número o título..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Tipo</label>
            <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
              <option value="">Todos</option>
              {TIPOS_NORMA.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Estado</label>
            <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
              <option value="">Todos</option>
              {ESTADOS_NORMA.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Tabla */}
      {normasFiltradas.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <h3>Sin resultados</h3>
          <p>No se encontraron normas con los filtros aplicados.</p>
        </div>
      ) : (
        <div className="table-container" style={{ background: 'var(--blanco)' }}>
          <table>
            <thead>
              <tr>
                <th>Referencia</th>
                <th>Título</th>
                <th>Materia</th>
                <th>Publicación</th>
                <th>Estado</th>
                <th>Verificación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {normasFiltradas.map(norma => {
                const tipo = getTipoNorma(norma.tipo);
                return (
                  <tr key={norma.id}>
                    <td>
                      <div style={{ fontWeight: 700, whiteSpace: 'nowrap', color: 'var(--verde-oscuro)' }}>
                        {generarReferencia(norma)}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--texto-terciario)' }}>{tipo?.nombre}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500, maxWidth: '250px' }}>{norma.titulo}</div>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--texto-secundario)' }}>{norma.materia}</td>
                    <td style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{formatearFecha(norma.fechaPublicacion)}</td>
                    <td><span className={`badge badge-${norma.estado}`}>{norma.estado}</span></td>
                    <td><span className={`badge badge-${norma.estadoVerificacion}`}>{norma.estadoVerificacion}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <Link href={`/normas/${norma.id}`} className="btn btn-sm btn-icon" title="Ver">👁️</Link>
                        <Link href={`/admin/normas/${norma.id}`} className="btn btn-sm btn-icon" title="Editar">✏️</Link>
                        <button
                          className="btn btn-sm btn-icon"
                          title="Eliminar"
                          onClick={() => setConfirmDelete(norma.id)}
                          style={{ borderColor: 'var(--error)', color: 'var(--error)' }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⚠️ Confirmar eliminación</h2>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--texto-secundario)' }}>
                ¿Está seguro de eliminar esta norma del registro? Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline btn-sm" onClick={() => setConfirmDelete(null)}>Cancelar</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(confirmDelete)}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
