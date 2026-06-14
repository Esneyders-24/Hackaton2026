import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import EstadoBadge from '../components/EstadoBadge';
import { obtenerHistorial } from '../services/api';
import type { ExpedienteHistorial } from '../types';

const formatFechaCorta = (fecha: string) => {
  try {
    return new Date(fecha).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return fecha;
  }
};

const Historial: React.FC = () => {
  const navigate = useNavigate();
  const [expedientes, setExpedientes] = useState<ExpedienteHistorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState('');

  const dni = sessionStorage.getItem('auth_dni') ??'';
  const token = sessionStorage.getItem('auth_token') ?? '';
  

  useEffect(() => {
    if (!token) {
      navigate('/historial');
      return;
    }
    obtenerHistorial(dni, token)
      .then(setExpedientes)
      .catch((err) => setError(err instanceof Error ? err.message : 'Error al cargar historial.'))
      .finally(() => setLoading(false));
  }, [dni, token, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_dni');
    navigate('/');
  };

  const filtered = expedientes.filter(
    (e) =>
      filtro === '' ||
      e.numero_expediente.toLowerCase().includes(filtro.toLowerCase()) ||
      e.tramite.toLowerCase().includes(filtro.toLowerCase()) ||
      e.estado_actual.toLowerCase().includes(filtro.toLowerCase())
  );

  const counts = {
    total: expedientes.length,
    enProceso: expedientes.filter((e) => e.estado_actual === 'EN PROCESO').length,
    respondidos: expedientes.filter((e) => e.estado_actual === 'SE EMITIÓ RESPUESTA').length,
    registrados: expedientes.filter((e) => e.estado_actual === 'DOCUMENTO REGISTRADO').length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gov-gray-bg">
      <Header compact />

      {/* Top bar with user info */}
      <div className="bg-white border-b border-gov-gray-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="text-gov-gray-text hover:text-gov-blue transition-colors mr-1"
              aria-label="Inicio"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <span className="text-sm">
              <span className="text-gov-blue font-semibold">Historial de expedientes</span>
              {dni && <span className="text-gov-gray-text"> · DNI {dni}</span>}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-gov-gray-text hover:text-gov-red transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <svg className="animate-spin w-10 h-10 text-gov-blue" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-gov-gray-text text-sm">Cargando historial...</p>
          </div>
        ) : error ? (
          <div className="card text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Volver al inicio
            </button>
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Total', value: counts.total, color: 'text-gov-blue', bg: 'bg-gov-blue/5 border-gov-blue/15' },
                { label: 'En proceso', value: counts.enProceso, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
                { label: 'Respondidos', value: counts.respondidos, color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
                { label: 'Registrados', value: counts.registrados, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
              ].map((item) => (
                <div key={item.label} className={`border rounded-xl px-4 py-3 ${item.bg}`}>
                  <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                  <div className={`text-xs font-medium ${item.color} opacity-80`}>{item.label}</div>
                </div>
              ))}
            </div>

            {/* Table card */}
            <div className="card p-0 overflow-hidden">
              {/* Table header with search */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gov-gray-border">
                <h2 className="font-bold text-gov-blue">Historial de expedientes</h2>
                <div className="relative sm:w-64">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gov-gray-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Filtrar expedientes..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="input-field pl-9 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gov-gray-bg border-b border-gov-gray-border">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gov-gray-text uppercase tracking-wider">
                        Expediente
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gov-gray-text uppercase tracking-wider">
                        Trámite
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gov-gray-text uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gov-gray-text uppercase tracking-wider">
                        Actualización
                      </th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gov-gray-border">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center text-gov-gray-text py-10 text-sm">
                          No se encontraron expedientes.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((exp) => (
                        <tr key={exp.numero_expediente} className="hover:bg-gov-gray-bg/60 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs font-semibold text-gov-blue">
                            {exp.numero_expediente}
                          </td>
                          <td className="px-4 py-4 text-gray-700">{exp.tramite}</td>
                          <td className="px-4 py-4">
                            <EstadoBadge estado={exp.estado_actual} size="sm" />
                          </td>
                          <td className="px-4 py-4 text-gov-gray-text text-xs">
                            {formatFechaCorta(exp.ultima_actualizacion)}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button
                              onClick={() => navigate(`/detalle/${exp.numero_expediente}`)}
                              className="text-gov-blue text-xs font-semibold hover:underline"
                            >
                              Ver detalle →
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden divide-y divide-gov-gray-border">
                {filtered.length === 0 ? (
                  <p className="text-center text-gov-gray-text py-10 text-sm">No se encontraron expedientes.</p>
                ) : (
                  filtered.map((exp) => (
                    <div key={exp.numero_expediente} className="px-5 py-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-gov-blue">{exp.numero_expediente}</span>
                        <EstadoBadge estado={exp.estado_actual} size="sm" />
                      </div>
                      <p className="text-sm text-gray-700">{exp.tramite}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gov-gray-text">{formatFechaCorta(exp.ultima_actualizacion)}</span>
                        <button
                          onClick={() => navigate(`/detalle/${exp.numero_expediente}`)}
                          className="text-gov-blue text-xs font-semibold hover:underline"
                        >
                          Ver detalle →
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {filtered.length > 0 && (
                <div className="px-6 py-3 bg-gov-gray-bg border-t border-gov-gray-border">
                  <p className="text-xs text-gov-gray-text">
                    Mostrando {filtered.length} de {expedientes.length} expedientes
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <footer className="text-center text-xs text-gov-gray-text py-6 border-t border-gov-gray-border bg-white mt-4">
        © {new Date().getFullYear()} Despacho Presidencial del Perú. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Historial;
