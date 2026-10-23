'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { NORMAS_DEMO } from '../lib/data';

const NormasContext = createContext();

export function NormasProvider({ children }) {
  const [normas, setNormas] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('gaceta_normas');
    if (stored) {
      setNormas(JSON.parse(stored));
    } else {
      setNormas(NORMAS_DEMO);
      localStorage.setItem('gaceta_normas', JSON.stringify(NORMAS_DEMO));
    }
    setLoaded(true);
  }, []);

  const guardarNormas = (nuevasNormas) => {
    setNormas(nuevasNormas);
    localStorage.setItem('gaceta_normas', JSON.stringify(nuevasNormas));
  };

  const agregarNorma = (norma) => {
    const nueva = {
      ...norma,
      id: Date.now().toString(),
      fechaCreacion: new Date().toISOString().split('T')[0],
      historialCambios: [
        { fecha: new Date().toISOString().split('T')[0], usuario: 'Administrador', accion: 'Registro inicial', detalle: 'Norma creada en el sistema' }
      ]
    };
    guardarNormas([nueva, ...normas]);
    return nueva;
  };

  const actualizarNorma = (id, datos, infoAuditoria = null) => {
    const actualizadas = normas.map(n => {
      if (n.id === id) {
        const cambioEstado = datos.estado && datos.estado !== n.estado;
        let accion = 'Actualización';
        let detalle = 'Registro actualizado';

        if (cambioEstado) {
          accion = 'Cambio de estado';
          const estadoNombres = {
            borrador: 'Borrador',
            en_revision: 'En Revisión',
            autorizado: 'Autorizado',
            publicado: 'Publicado',
          };
          const de = estadoNombres[n.estado] || n.estado;
          const a = estadoNombres[datos.estado] || datos.estado;
          detalle = `Estado modificado: de "${de}" a "${a}"`;
        }

        if (infoAuditoria) {
          if (infoAuditoria.accion) accion = infoAuditoria.accion;
          if (infoAuditoria.detalle) detalle = infoAuditoria.detalle;
        }

        const actualizada = { ...n, ...datos };
        actualizada.historialCambios = [
          ...(n.historialCambios || []),
          {
            fecha: new Date().toISOString().split('T')[0],
            usuario: infoAuditoria?.usuario || 'Administrador',
            accion,
            detalle,
          }
        ];
        return actualizada;
      }
      return n;
    });
    guardarNormas(actualizadas);
  };

  const eliminarNorma = (id) => {
    guardarNormas(normas.filter(n => n.id !== id));
  };

  const obtenerNorma = (id) => normas.find(n => n.id === id);

  return (
    <NormasContext.Provider value={{
      normas, loaded,
      agregarNorma, actualizarNorma, eliminarNorma, obtenerNorma
    }}>
      {children}
    </NormasContext.Provider>
  );
}

export function useNormas() {
  const context = useContext(NormasContext);
  if (!context) throw new Error('useNormas debe usarse dentro de NormasProvider');
  return context;
}
