'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [anioActual, setAnioActual] = useState(2026);

  useEffect(() => {
    setAnioActual(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Gaceta Municipal de San Andrés</h3>
          <p>
            Sistema de publicación y consulta de normativa del Gobierno Autónomo Municipal 
            de San Andrés, provincia Marbán, departamento del Beni, Bolivia.
          </p>
          <p style={{ marginTop: '0.5rem', fontStyle: 'italic', color: '#D4A844' }}>
            «Unidos avanzamos, San Andrés progresa»
          </p>
        </div>

        <div className="footer-links">
          <h4>Navegación</h4>
          <Link href="/">Inicio</Link>
          <Link href="/normas">Consultar Gaceta</Link>
          <Link href="/catalogo">Catálogo de Normas</Link>
          <Link href="/acerca">Acerca del Proyecto</Link>
        </div>

        <div className="footer-links">
          <h4>Institucional</h4>
          <a href="https://sea.gob.bo" target="_blank" rel="noopener noreferrer">Servicio Estatal de Autonomías</a>
          <a href="https://www.economiayfinanzas.gob.bo" target="_blank" rel="noopener noreferrer">Min. Economía y Finanzas</a>
          <Link href="/admin">Panel de Administración</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {anioActual} <span className="dorado">Gobierno Autónomo Municipal de San Andrés</span> · 
          Provincia Marbán, Departamento del Beni, Bolivia
        </p>
        <p style={{ marginTop: '0.4rem' }}>
          Sistema propuesto por Dussan Amin Claure Raduan y Edson Orihuela Roca
        </p>
      </div>
    </footer>
  );
}
