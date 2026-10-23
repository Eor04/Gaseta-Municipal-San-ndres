'use client';
import Link from 'next/link';
import { useNormas } from '../contexts/NormasContext';
import { obtenerEstadisticas, getTipoNorma, generarReferencia, TIPOS_NORMA } from '../lib/data';

export default function AdminDashboard() {
  const { normas, loaded } = useNormas();

  if (!loaded) {
    return <div className="loader"><div className="spinner"></div></div>;
  }

  const stats = obtenerEstadisticas(normas);

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--verde-oscuro)', marginBottom: '0.25rem' }}>
          Panel de Administración
        </h1>
        <p style={{ color: 'var(--texto-secundario)', fontSize: '0.9rem' }}>
          Resumen del catálogo normativo del GAM San Andrés
        </p>
      </div>

      {/* Estadísticas */}
      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon" style={{ background: 'var(--verde-suave)', color: 'var(--verde-oscuro)' }}>
            📜
          </div>
          <div className="dashboard-stat-info">
            <h3>{stats.total}</h3>
            <p>Total normas</p>
          </div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon" style={{ background: 'var(--success-suave)', color: 'var(--success)' }}>
            ✅
          </div>
          <div className="dashboard-stat-info">
            <h3>{stats.publicadas}</h3>
            <p>Publicadas</p>
          </div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon" style={{ background: 'var(--warning-suave)', color: 'var(--warning)' }}>
            ⏳
          </div>
          <div className="dashboard-stat-info">
            <h3>{stats.pendientes}</h3>
            <p>Pendientes verificación</p>
          </div>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-icon" style={{ background: 'var(--info-suave)', color: 'var(--info)' }}>
            🏛️
          </div>
          <div className="dashboard-stat-info">
            <h3>{Object.keys(stats.porGestion).length}</h3>
            <p>Gestiones</p>
          </div>
        </div>
      </div>

      {/* Distribución por tipo */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1rem' }}>
            📊 Distribución por tipo de norma
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {TIPOS_NORMA.map(tipo => {
              const count = stats.porTipo[tipo.id] || 0;
              const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
              return (
                <div key={tipo.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--texto-secundario)', minWidth: '180px' }}>
                    {tipo.nombre}
                  </span>
                  <div style={{ flex: 1, height: '8px', background: 'var(--gris-200)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(to right, var(--verde-medio), var(--dorado))', borderRadius: '4px', transition: 'width 0.5s ease' }}></div>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--texto-principal)', minWidth: '24px', textAlign: 'right' }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1rem' }}>
            📅 Distribución por gestión
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {Object.entries(stats.porGestion)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([gestion, count]) => {
                const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
                return (
                  <div key={gestion} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--texto-secundario)', minWidth: '180px', fontWeight: 600 }}>
                      Gestión {gestion}
                    </span>
                    <div style={{ flex: 1, height: '8px', background: 'var(--gris-200)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(to right, var(--dorado), var(--verde-medio))', borderRadius: '4px', transition: 'width 0.5s ease' }}></div>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--texto-principal)', minWidth: '24px', textAlign: 'right' }}>
                      {count}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1rem' }}>
          ⚡ Acciones rápidas
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/admin/nueva" className="btn btn-green">
            ➕ Registrar nueva norma
          </Link>
          <Link href="/admin/normas" className="btn btn-outline">
            📋 Gestionar normas
          </Link>
          <Link href="/admin/auditoria" className="btn btn-outline">
            🕐 Ver auditoría
          </Link>
        </div>
      </div>

      {/* Últimas normas */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1rem' }}>
          📝 Últimas normas registradas
        </h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Referencia</th>
                <th>Título</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Verificación</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {normas.slice(0, 5).map(norma => {
                const tipo = getTipoNorma(norma.tipo);
                return (
                  <tr key={norma.id}>
                    <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{generarReferencia(norma)}</td>
                    <td>{norma.titulo}</td>
                    <td><span className="card-norma-tipo" style={{ fontSize: '0.65rem' }}>{tipo?.nombre}</span></td>
                    <td><span className={`badge badge-${norma.estado}`}>{norma.estado}</span></td>
                    <td><span className={`badge badge-${norma.estadoVerificacion}`}>{norma.estadoVerificacion}</span></td>
                    <td>
                      <Link href={`/admin/normas/${norma.id}`} className="btn btn-sm btn-icon" title="Editar">
                        ✏️
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
