'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: '📊 Dashboard', exact: true },
    { href: '/admin/normas', label: '📜 Gestión de Normas', exact: false },
    { href: '/admin/nueva', label: '➕ Nueva Norma', exact: true },
    { href: '/admin/usuarios', label: '👥 Usuarios', exact: true },
    { href: '/admin/auditoria', label: '🕐 Auditoría', exact: true },
  ];

  const isActive = (href, exact) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-title">Administración</div>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`admin-nav-link ${isActive(link.href, link.exact) ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <div style={{ borderTop: '1px solid var(--gris-200)', margin: '1rem 1.5rem', paddingTop: '1rem' }}>
          <div className="admin-sidebar-title">Portal Público</div>
          <Link href="/" className="admin-nav-link">🏠 Ir al Inicio</Link>
          <Link href="/normas" className="admin-nav-link">📜 Ver Gaceta</Link>
        </div>
      </aside>
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}
