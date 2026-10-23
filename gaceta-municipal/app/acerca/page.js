import Link from 'next/link';

export const metadata = {
  title: 'Acerca del Proyecto – Gaceta Municipal de San Andrés',
  description: 'Información sobre el Sistema de Gaceta Municipal del Gobierno Autónomo Municipal de San Andrés.',
};

export default function AcercaPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>›</span>
            <span>Acerca del Proyecto</span>
          </div>
          <h1>ℹ️ Acerca del Proyecto</h1>
          <p>Sistema de Gaceta Municipal del Gobierno Autónomo Municipal de San Andrés</p>
        </div>
      </div>

      <section className="section" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--verde-oscuro)', marginBottom: '1rem' }}>
            Objeto del proyecto
          </h2>
          <p style={{ color: 'var(--texto-secundario)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Proponer un sistema de Gaceta Municipal que permita organizar, publicar y consultar 
            la normativa emitida por los órganos del Gobierno Autónomo Municipal de San Andrés, 
            conforme al procedimiento oficial que la institución establezca y a la normativa aplicable.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div className="meta-item">
              <div className="meta-label">Institución beneficiaria</div>
              <div className="meta-value">Gobierno Autónomo Municipal de San Andrés</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Ubicación</div>
              <div className="meta-value">Provincia Marbán, Departamento del Beni, Bolivia</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Población (Censo 2024)</div>
              <div className="meta-value">15.570 habitantes</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Modalidad</div>
              <div className="meta-value">Propuesta institucional</div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '0.75rem' }}>
            Proponentes y ejecutores
          </h3>
          <ul style={{ listStyle: 'none', marginBottom: '1.5rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0', borderBottom: '1px solid var(--gris-100)' }}>
              <span style={{ color: 'var(--dorado)', fontSize: '1.2rem' }}>●</span>
              <strong>Dussan Amin Claure Raduan</strong>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0' }}>
              <span style={{ color: 'var(--dorado)', fontSize: '1.2rem' }}>●</span>
              <strong>Edson Orihuela Roca</strong>
            </li>
          </ul>
        </div>

        <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--verde-oscuro)', marginBottom: '1rem' }}>
            Ámbito del proyecto
          </h2>

          <div className="notice notice-info" style={{ marginBottom: '1.5rem' }}>
            <span>📌</span>
            <div>
              <strong>Primera etapa:</strong> Ocho semanas de trabajo parcial, condicionadas a la disponibilidad 
              de contrapartes, documentos y alojamiento. Presupuesto objetivo: Bs 8.000 a Bs 10.000 
              para servicios profesionales.
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '0.75rem' }}>
            Tipos de norma contemplados
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { organo: 'Concejo Municipal', normas: ['Leyes Municipales', 'Resoluciones del Concejo'] },
              { organo: 'Órgano Ejecutivo', normas: ['Decretos Municipales', 'Decretos Ediles', 'Resoluciones Administrativas Municipales'] },
            ].map((grupo, i) => (
              <div key={i} className="card" style={{ padding: '1.25rem', background: 'var(--gris-50)' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--verde-medio)', marginBottom: '0.5rem' }}>
                  🏛️ {grupo.organo}
                </h4>
                <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--texto-secundario)' }}>
                  {grupo.normas.map((n, j) => (
                    <li key={j} style={{ padding: '0.25rem 0' }}>• {n}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--verde-oscuro)', marginBottom: '1rem' }}>
            Base normativa
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { norma: 'Constitución Política del Estado', detalle: 'Arts. 21.6, 283, 302.I.25 – Acceso a la información, gobierno municipal y archivos.' },
              { norma: 'Ley N.º 482 de Gobiernos Autónomos Municipales', detalle: 'Arts. 1, 2, 13, 14, 23 – Tipos de norma, publicación y remisión al SEA.' },
              { norma: 'Ley N.º 341 de Participación y Control Social', detalle: 'Art. 34 – Información efectiva y oportuna a los actores de participación.' },
              { norma: 'Ley N.º 164 General de Telecomunicaciones y TIC', detalle: 'Art. 78 – Documento digital y firma digital.' },
            ].map((ref, i) => (
              <div key={i} style={{ padding: '1rem', borderLeft: '3px solid var(--dorado)', background: 'var(--gris-50)', borderRadius: '0 var(--radio-md) var(--radio-md) 0' }}>
                <strong style={{ color: 'var(--verde-oscuro)', fontSize: '0.9rem' }}>{ref.norma}</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--texto-secundario)', marginTop: '0.25rem' }}>{ref.detalle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="notice notice-warning">
          <span>⚠️</span>
          <div>
            <strong>Nota importante.</strong> Este sistema es una propuesta de demostración. La publicación 
            oficial de normas depende de la decisión municipal sobre el medio oficial y las responsabilidades 
            de autorización. Una plataforma técnica no adquiere carácter de medio oficial por el solo 
            despliegue.
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/normas" className="btn btn-green btn-lg">
            📜 Consultar la Gaceta Municipal
          </Link>
        </div>
      </section>
    </>
  );
}
