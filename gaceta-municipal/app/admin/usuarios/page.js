'use client';
import { useState } from 'react';
import { USUARIOS_DEMO } from '../../lib/data';

const ROLES = [
  { id: 'administrador', nombre: 'Administrador', color: '#1B5E20', icono: '👑', descripcion: 'Acceso total al sistema. Gestión de usuarios, normas y configuración.' },
  { id: 'revisor', nombre: 'Revisor', color: '#1565C0', icono: '🔍', descripcion: 'Revisa y autoriza normas antes de su publicación.' },
  { id: 'editor', nombre: 'Editor', color: '#F57F17', icono: '✏️', descripcion: 'Registra y edita normas. No puede publicar.' },
  { id: 'consultor', nombre: 'Consultor', color: '#616161', icono: '👁️', descripcion: 'Solo consulta. Sin permisos de edición.' },
];

const PERMISOS = {
  administrador: ['Ver normas', 'Crear normas', 'Editar normas', 'Eliminar normas', 'Publicar normas', 'Gestionar usuarios', 'Ver auditoría', 'Configurar sistema'],
  revisor: ['Ver normas', 'Editar normas', 'Autorizar normas', 'Ver auditoría'],
  editor: ['Ver normas', 'Crear normas', 'Editar normas (propias)', 'Enviar a revisión'],
  consultor: ['Ver normas publicadas', 'Descargar documentos'],
};

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState(USUARIOS_DEMO);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nombre: '', email: '', rol: 'editor', activo: true });
  const [showPermisos, setShowPermisos] = useState(null);

  const handleChange = (campo, valor) => {
    setForm(prev => ({ ...prev, [campo]: valor }));
  };

  const abrirCrear = () => {
    setEditando(null);
    setForm({ nombre: '', email: '', rol: 'editor', activo: true });
    setShowModal(true);
  };

  const abrirEditar = (usuario) => {
    setEditando(usuario.id);
    setForm({ ...usuario });
    setShowModal(true);
  };

  const guardar = () => {
    if (!form.nombre || !form.email) {
      alert('Complete nombre y correo electrónico.');
      return;
    }

    if (editando) {
      setUsuarios(prev => prev.map(u => u.id === editando ? { ...u, ...form } : u));
    } else {
      const nuevo = { ...form, id: Date.now().toString() };
      setUsuarios(prev => [...prev, nuevo]);
    }
    setShowModal(false);
    setEditando(null);
  };

  const toggleActivo = (id) => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, activo: !u.activo } : u));
  };

  const eliminar = (id) => {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      setUsuarios(prev => prev.filter(u => u.id !== id));
    }
  };

  const getRolInfo = (rolId) => ROLES.find(r => r.id === rolId) || ROLES[3];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--verde-oscuro)' }}>
            👥 Gestión de Usuarios
          </h1>
          <p style={{ color: 'var(--texto-secundario)', fontSize: '0.85rem' }}>
            Administre los perfiles de acceso al sistema
          </p>
        </div>
        <button className="btn btn-green" onClick={abrirCrear}>
          ➕ Nuevo Usuario
        </button>
      </div>

      <div className="notice notice-info" style={{ marginBottom: '1.5rem' }}>
        <span>ℹ️</span>
        <div>
          <strong>Demo.</strong> La gestión de usuarios es simulada en esta versión de demostración.
          En producción, se conectaría con un sistema de autenticación real.
        </div>
      </div>

      {/* Roles y permisos */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)', marginBottom: '1rem' }}>
          🔐 Roles del Sistema
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {ROLES.map(rol => (
            <div
              key={rol.id}
              className="card"
              style={{
                padding: '1.25rem',
                borderLeft: `4px solid ${rol.color}`,
                cursor: 'pointer',
                background: showPermisos === rol.id ? 'var(--gris-50)' : 'var(--blanco)',
              }}
              onClick={() => setShowPermisos(showPermisos === rol.id ? null : rol.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{rol.icono}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: rol.color }}>{rol.nombre}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--texto-terciario)' }}>
                    {usuarios.filter(u => u.rol === rol.id).length} usuario{usuarios.filter(u => u.rol === rol.id).length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--texto-secundario)', lineHeight: 1.5 }}>
                {rol.descripcion}
              </p>
              {showPermisos === rol.id && (
                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--gris-200)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--texto-terciario)', marginBottom: '0.4rem' }}>
                    Permisos
                  </div>
                  {PERMISOS[rol.id]?.map((permiso, i) => (
                    <div key={i} style={{ fontSize: '0.78rem', color: 'var(--texto-secundario)', padding: '0.15rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ color: rol.color }}>✓</span> {permiso}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--gris-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--verde-oscuro)' }}>
            📋 Usuarios Registrados
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--texto-terciario)' }}>
            {usuarios.length} usuario{usuarios.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo electrónico</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => {
                const rol = getRolInfo(usuario.rol);
                return (
                  <tr key={usuario.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: `linear-gradient(135deg, ${rol.color}22, ${rol.color}44)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1rem', flexShrink: 0
                        }}>
                          {rol.icono}
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{usuario.nombre}</div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--texto-secundario)' }}>{usuario.email}</td>
                    <td>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                        padding: '0.2rem 0.6rem', borderRadius: 'var(--radio-full)',
                        fontSize: '0.7rem', fontWeight: 600,
                        background: `${rol.color}15`, color: rol.color,
                      }}>
                        {rol.icono} {rol.nombre}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleActivo(usuario.id)}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                          padding: '0.2rem 0.6rem', borderRadius: 'var(--radio-full)',
                          fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer',
                          border: 'none',
                          background: usuario.activo ? 'var(--success-suave)' : 'var(--error-suave)',
                          color: usuario.activo ? 'var(--success)' : 'var(--error)',
                        }}
                      >
                        {usuario.activo ? '● Activo' : '○ Inactivo'}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button className="btn btn-sm btn-icon" title="Editar" onClick={() => abrirEditar(usuario)}>
                          ✏️
                        </button>
                        <button
                          className="btn btn-sm btn-icon"
                          title="Eliminar"
                          onClick={() => eliminar(usuario.id)}
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
      </div>

      {/* Modal de crear/editar usuario */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editando ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}</h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--texto-terciario)' }}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre completo <span className="required">*</span></label>
                <input
                  className="form-input"
                  type="text"
                  value={form.nombre}
                  onChange={e => handleChange('nombre', e.target.value)}
                  placeholder="Nombre del usuario"
                />
              </div>
              <div className="form-group">
                <label>Correo electrónico <span className="required">*</span></label>
                <input
                  className="form-input"
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="usuario@gaceta.sanandres.gob.bo"
                />
              </div>
              <div className="form-group">
                <label>Rol</label>
                <select className="form-select" value={form.rol} onChange={e => handleChange('rol', e.target.value)}>
                  {ROLES.map(r => <option key={r.id} value={r.id}>{r.icono} {r.nombre}</option>)}
                </select>
                <p style={{ fontSize: '0.75rem', color: 'var(--texto-terciario)', marginTop: '0.3rem' }}>
                  {getRolInfo(form.rol).descripcion}
                </p>
              </div>
              <div className="form-group">
                <label>Estado</label>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.3rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input type="radio" name="activo" checked={form.activo} onChange={() => handleChange('activo', true)} />
                    Activo
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input type="radio" name="activo" checked={!form.activo} onChange={() => handleChange('activo', false)} />
                    Inactivo
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn btn-green btn-sm" onClick={guardar}>
                {editando ? '💾 Guardar cambios' : '➕ Crear usuario'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
