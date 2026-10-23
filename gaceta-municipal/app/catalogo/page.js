'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useNormas } from '../contexts/NormasContext';
import { TIPOS_NORMA, getTipoNorma, generarReferencia, formatearFecha, getOrgano } from '../lib/data';

export default function CatalogoPage() {
  const { normas, loaded } = useNormas();
  const [vistaActiva, setVistaActiva] = useState('tipo'); // 'tipo' | 'gestion' | 'organo' | 'materia'
  const [expandidos, setExpandidos] = useState({});

  const normasPublicadas = useMemo(() => {
    return (normas || []).filter(n => n.estado === 'publicado');
  }, [normas]);

  // Agrupar por diferentes criterios
  const agrupadoPorTipo = useMemo(() => {
    const grupos = {};
    TIPOS_NORMA.forEach(tipo => {
      const items = normasPublicadas.filter(n => n.tipo === tipo.id);
      if (items.length > 0) {
        grupos[tipo.id] = {
          label: tipo.nombre,
          icono: tipo.organo === 'Concejo Municipal' ? '🏛️' : '⚖️',
          organo: tipo.organo,
          abreviatura: tipo.abreviatura,
          items: items.sort((a, b) => (b.gestion || '').localeCompare(a.gestion || '') || (b.numero || '').localeCompare(a.numero || '')),
        };
      }
    });
    return grupos;
  }, [normasPublicadas]);

  const agrupadoPorGestion = useMemo(() => {
    const grupos = {};
    normasPublicadas.forEach(n => {
      if (!grupos[n.gestion]) {
        grupos[n.gestion] = { label: `Gestión ${n.gestion}`, icono: '📅', items: [] };
      }
      grupos[n.gestion].items.push(n);
    });
    // Ordenar por gestión descendente
    const ordenado = {};
    Object.keys(grupos).sort((a, b) => b.localeCompare(a)).forEach(k => {
      grupos[k].items.sort((a, b) => (a.tipo || '').localeCompare(b.tipo || '') || (a.numero || '').localeCompare(b.numero || ''));
      ordenado[k] = grupos[k];
    });
    return ordenado;
  }, [normasPublicadas]);

  const agrupadoPorOrgano = useMemo(() => {
    const grupos = {
      concejo: { label: 'Concejo Municipal', icono: '🏛️', items: [] },
      ejecutivo: { label: 'Órgano Ejecutivo', icono: '⚖️', items: [] },
    };
    normasPublicadas.forEach(n => {
      if (grupos[n.organoEmisor]) {
        grupos[n.organoEmisor].items.push(n);
      }
    });
    Object.values(grupos).forEach(g => {
      g.items.sort((a, b) => (b.gestion || '').localeCompare(a.gestion || '') || (a.tipo || '').localeCompare(b.tipo || ''));
    });
    return grupos;
  }, [normasPublicadas]);

  const agrupadoPorMateria = useMemo(() => {
    const grupos = {};
    normasPublicadas.forEach(n => {
      const mat = n.materia || 'Sin clasificar';
      if (!grupos[mat]) {
        grupos[mat] = { label: mat, icono: '📂', items: [] };
      }
      grupos[mat].items.push(n);
    });
    const ordenado = {};
    Object.keys(grupos).sort().forEach(k => {
      grupos[k].items.sort((a, b) => (b.gestion || '').localeCompare(a.gestion || ''));
      ordenado[k] = grupos[k];
    });
    return ordenado;
  }, [normasPublicadas]);

  const gruposActivos =
    vistaActiva === 'tipo' ? agrupadoPorTipo :
    vistaActiva === 'gestion' ? agrupadoPorGestion :
    vistaActiva === 'organo' ? agrupadoPorOrgano :
    agrupadoPorMateria;

  if (!loaded) {
    return <div className="loader"><div className="spinner"></div></div>;
  }

  const toggleGrupo = (key) => {
    setExpandidos(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const expandirTodos = () => {
    const todos = {};
    Object.keys(gruposActivos).forEach(k => { todos[k] = true; });
    setExpandidos(todos);
  };

  const colapsarTodos = () => {
    setExpandidos({});
  };

  const vistas = [
    { id: 'tipo', label: '📜 Por Tipo de Norma', desc: 'Leyes, Decretos, Resoluciones...' },
    { id: 'gestion', label: '📅 Por Gestión', desc: 'Año de aprobación' },
    { id: 'organo', label: '🏛️ Por Órgano Emisor', desc: 'Concejo / Ejecutivo' },
    { id: 'materia', label: '📂 Por Materia', desc: 'Tema o área' },
  ];

  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>›</span>
            <span>Catálogo Normativo</span>
          </div>
          <h1>📚 Catálogo Normativo</h1>
          <p>Explore la normativa municipal organizada jerárquicamente</p>
        </div>
      </div>

      <section className="section">
        {/* Selector de vista */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {vistas.map(vista => (
            <button
              key={vista.id}
              onClick={() => { setVistaActiva(vista.id); setExpandidos({}); }}
              className="card"
              style={{
                cursor: 'pointer',
                textAlign: 'left',
                border: vistaActiva === vista.id ? '2px solid var(--verde-medio)' : '1px solid var(--gris-200)',
                background: vistaActiva === vista.id ? 'var(--verde-suave)' : 'var(--blanco)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ fontSize: '1rem', fontWeight: 700, color: vistaActiva === vista.id ? 'var(--verde-oscuro)' : 'var(--texto-principal)', marginBottom: '0.25rem' }}>
                {vista.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--texto-terciario)' }}>
                {vista.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Estadísticas rápidas */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--texto-secundario)' }}>
              <strong style={{ color: 'var(--verde-oscuro)' }}>{normasPublicadas.length}</strong> normas publicadas en <strong style={{ color: 'var(--verde-oscuro)' }}>{Object.keys(gruposActivos).length}</strong> categorías
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-sm btn-outline" onClick={expandirTodos}>Expandir todos</button>
            <button className="btn btn-sm btn-outline" onClick={colapsarTodos}>Colapsar todos</button>
          </div>
        </div>

        {/* Grupos jerárquicos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(gruposActivos).map(([key, grupo]) => {
            const isExpanded = expandidos[key];
            return (
              <div key={key} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Encabezado del grupo */}
                <button
                  onClick={() => toggleGrupo(key)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: isExpanded ? 'linear-gradient(135deg, var(--verde-suave) 0%, var(--blanco) 100%)' : 'var(--blanco)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    transition: 'all 0.3s ease',
                    borderBottom: isExpanded ? '1px solid var(--gris-200)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{grupo.icono}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--verde-oscuro)' }}>
                        {grupo.label}
                      </div>
                      {grupo.organo && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--texto-terciario)' }}>
                          {grupo.organo} · {grupo.abreviatura}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      padding: '0.2rem 0.8rem',
                      borderRadius: 'var(--radio-full)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      background: 'var(--dorado-claro)',
                      color: 'var(--dorado-oscuro)',
                    }}>
                      {grupo.items.length} norma{grupo.items.length !== 1 ? 's' : ''}
                    </span>
                    <span style={{
                      fontSize: '1.2rem',
                      color: 'var(--texto-terciario)',
                      transition: 'transform 0.3s ease',
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)',
                    }}>
                      ▶
                    </span>
                  </div>
                </button>

                {/* Lista de normas del grupo */}
                {isExpanded && (
                  <div style={{ padding: '0.5rem' }}>
                    {grupo.items.map(norma => {
                      const tipo = getTipoNorma(norma.tipo);
                      return (
                        <Link key={norma.id} href={`/normas/${norma.id}`} style={{ textDecoration: 'none' }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.85rem 1rem',
                            borderRadius: 'var(--radio-md)',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            borderLeft: '3px solid transparent',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'var(--gris-50)';
                            e.currentTarget.style.borderLeftColor = 'var(--dorado)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderLeftColor = 'transparent';
                          }}
                          >
                            <div style={{ minWidth: '120px' }}>
                              <span style={{
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                color: 'var(--verde-oscuro)',
                              }}>
                                {generarReferencia(norma)}
                              </span>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--texto-principal)', marginBottom: '0.15rem' }}>
                                {norma.titulo}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--texto-terciario)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {vistaActiva !== 'tipo' && <span>{tipo?.nombre}</span>}
                                {vistaActiva !== 'gestion' && <span>📅 {norma.gestion}</span>}
                                {vistaActiva !== 'materia' && <span>📂 {norma.materia}</span>}
                                {norma.fechaPublicacion && <span>🗓️ {formatearFecha(norma.fechaPublicacion)}</span>}
                              </div>
                            </div>
                            <span className={`badge badge-${norma.estadoVerificacion}`} style={{ fontSize: '0.65rem' }}>
                              {norma.estadoVerificacion === 'verificado' ? '✓' : '⏳'}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {normasPublicadas.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>Sin normas publicadas</h3>
            <p>El catálogo aún no contiene normas en estado publicado.</p>
          </div>
        )}
      </section>
    </>
  );
}
