'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="header">
      <div className="header-top">
        <Link href="/" className="header-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          {/* Escudo institucional SVG inline */}
          <svg className="header-logo" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28" cy="28" r="27" fill="#1B5E20" stroke="#D4A844" strokeWidth="2"/>
            <circle cx="28" cy="28" r="22" fill="#FFFFFF" stroke="#D4A844" strokeWidth="1.5"/>
            {/* Shield shape */}
            <path d="M28 10 L42 18 L42 32 Q42 44 28 48 Q14 44 14 32 L14 18 Z" fill="#1B5E20" stroke="#D4A844" strokeWidth="1"/>
            {/* SA letters */}
            <text x="28" y="30" textAnchor="middle" fill="#D4A844" fontSize="12" fontWeight="bold" fontFamily="serif">SA</text>
            {/* Bridge symbol */}
            <path d="M20 36 Q24 32 28 36 Q32 32 36 36" stroke="#D4A844" strokeWidth="1.5" fill="none"/>
            {/* Stars */}
            <circle cx="20" cy="14" r="1.5" fill="#D4A844"/>
            <circle cx="28" cy="11" r="1.5" fill="#D4A844"/>
            <circle cx="36" cy="14" r="1.5" fill="#D4A844"/>
            {/* Laurel branches */}
            <path d="M16 42 Q20 38 22 44" stroke="#43A047" strokeWidth="1" fill="none"/>
            <path d="M40 42 Q36 38 34 44" stroke="#43A047" strokeWidth="1" fill="none"/>
          </svg>
          <div className="header-titles">
            <span className="header-subtitle">Gobierno Autónomo Municipal</span>
            <span className="header-title">San Andrés</span>
            <span className="header-slogan">Unidos avanzamos, San Andrés progresa</span>
          </div>
        </Link>

        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            🏛️ Inicio
          </Link>
          <Link href="/normas" className={`nav-link ${isActive('/normas') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            📜 Gaceta
          </Link>
          <Link href="/catalogo" className={`nav-link ${isActive('/catalogo') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            📚 Catálogo
          </Link>
          <Link href="/acerca" className={`nav-link ${isActive('/acerca') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
            ℹ️ Acerca de
          </Link>
          <Link href="/admin" className="nav-link nav-admin-btn" onClick={() => setMenuOpen(false)}>
            ⚙️ Administrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
