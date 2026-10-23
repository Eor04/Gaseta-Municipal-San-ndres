'use client';
import Link from 'next/link';
import { useNormas } from './contexts/NormasContext';
import { obtenerEstadisticas, getTipoNorma, generarReferencia } from './lib/data';

export default function HomePage() {
  const { normas, loaded } = useNormas();

  if (!loaded) {
    return <div className="loader"><div className="spinner"></div></div>;
  }

  const stats = obtenerEstadisticas(normas);
  const ultimasNormas = normas
    .filter(n => n.estado === 'publicado')
    .sort((a, b) => b.fechaPublicacion?.localeCompare(a.fechaPublicacion))
    .slice(0, 4);

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-institution">Gobierno Autónomo Municipal</p>
            <h1>
              Gaceta Municipal
              <span className="highlight">San Andrés</span>
            </h1>
            <p>
              Consulte la normativa emitida por el Concejo Municipal y el Órgano Ejecutivo 
              del Gobierno Autónomo Municipal de San Andrés, provincia Marbán, departamento del Beni.
            </p>
            <div className="hero-actions">
              <Link href="/normas" className="btn btn-primary btn-lg">
                📜 Consultar Gaceta
              </Link>
              <Link href="/acerca" className="btn btn-secondary btn-lg">
                ℹ️ Sobre el Proyecto
              </Link>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Normas registradas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.publicadas}</div>
              <div className="stat-label">Publicadas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Object.keys(stats.porTipo).length}</div>
              <div className="stat-label">Tipos de norma</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Object.keys(stats.porGestion).length}</div>
              <div className="stat-label">Gestiones</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Buscador rápido ─── */}
      <section style={{ background: 'var(--blanco)', padding: '2.5rem 2rem', marginTop: '-2rem', position: 'relative', zIndex: 5, borderRadius: '24px 24px 0 0' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <form className="search-bar" action="/normas" method="get">
            <input
              type="text"
              name="q"
              placeholder="Buscar por número, título o materia de norma..."
              aria-label="Buscar normas"
            />
            <button type="submit" className="btn btn-green">
              🔍 Buscar
            </button>
          </form>
        </div>
      </section>

      {/* ─── Últimas normas publicadas ─── */}
      <section className="section">
        <div className="section-header">
          <h2>Últimas Normas Publicadas</h2>
          <div className="section-divider"></div>
          <p>Normativa municipal más reciente disponible para consulta</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', maxWidth: '1200px', margin: '0 auto' }}>
          {ultimasNormas.map(norma => {
            const tipo = getTipoNorma(norma.tipo);
            return (
              <Link key={norma.id} href={`/normas/${norma.id}`} style={{ textDecoration: 'none' }}>
                <div className="card card-norma">
                  <div className="card-norma-header">
                    <span className="card-norma-tipo">
                      {tipo?.nombre || norma.tipo}
                    </span>
                    <span className="card-norma-ref">{generarReferencia(norma)}</span>
                  </div>
                  <h3 className="card-norma-titulo">{norma.titulo}</h3>
                  <p className="card-norma-resumen">{norma.resumen}</p>
                  <div className="card-norma-meta">
                    <span>📅 {norma.gestion}</span>
                    <span>🏛️ {tipo?.organo}</span>
                    <span>📂 {norma.materia}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/normas" className="btn btn-outline">
            Ver todas las normas →
          </Link>
        </div>
      </section>

      {/* ─── Características ─── */}
      <section style={{ background: 'var(--gris-100)', padding: '4rem 2rem' }}>
        <div className="section" style={{ padding: 0 }}>
          <div className="section-header">
            <h2>Sistema de Gaceta Municipal</h2>
            <div className="section-divider"></div>
            <p>Funcionalidades del sistema propuesto para la gestión normativa</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">📜</span>
              <h3>Catálogo Normativo</h3>
              <p>Registro organizado de leyes, decretos, resoluciones y ordenanzas municipales con metadatos completos.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔍</span>
              <h3>Búsqueda Avanzada</h3>
              <p>Localice normas por número, tipo, gestión, órgano emisor, materia o texto libre.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">✅</span>
              <h3>Verificación Documental</h3>
              <p>Cada registro distingue datos verificados de pendientes, con constancias de publicación.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔗</span>
              <h3>Relaciones entre Normas</h3>
              <p>Identifique modificaciones, derogaciones, abrogaciones y complementaciones.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📱</span>
              <h3>Acceso desde Móviles</h3>
              <p>Consulta optimizada para teléfonos y condiciones de conectividad limitadas.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔒</span>
              <h3>Seguridad y Auditoría</h3>
              <p>Perfiles de acceso, historial de cambios y trazabilidad de cada registro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Institucional ─── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--verde-oscuro) 0%, var(--verde-medio) 100%)',
        color: 'var(--texto-invertido)',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1rem' }}>
            Transparencia y acceso a la normativa municipal
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            La Constitución Política del Estado reconoce el derecho al acceso a la información. 
            Este sistema busca facilitar la consulta verificable de la normativa del municipio 
            de San Andrés conforme a las reglas oficiales aplicables.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/normas" className="btn btn-primary btn-lg">
              📜 Explorar Normativa
            </Link>
            <Link href="/admin" className="btn btn-secondary btn-lg">
              ⚙️ Panel de Administración
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
