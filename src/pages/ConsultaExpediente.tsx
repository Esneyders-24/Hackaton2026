import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import IniciarSesionBanner from '../components/IniciarSesionBanner';
import { consultarExpediente } from '../services/api';

const ConsultaExpediente: React.FC = () => {
  const navigate = useNavigate();
  const [numeroExpediente, setNumeroExpediente] = useState('');
  const [clave, setClave] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConsultar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!numeroExpediente.trim() || !clave.trim()) {
      setError('Por favor ingrese el número de expediente y la clave.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await consultarExpediente(numeroExpediente.trim(), clave.trim());
      navigate('/estado-expediente', { state: { expediente: data } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se encontró el expediente. Verifique los datos ingresados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gov-gray-bg">
      <Header />

      {/* Hero strip */}
      <div className="bg-gradient-to-r from-gov-blue to-gov-blue-light text-white py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Consulta el estado de tu trámite
          </h1>
          <p className="text-blue-200 text-sm md:text-base">
            Accede desde cualquier lugar, sin necesidad de crear una cuenta.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        {/* Main card */}
        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gov-red/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-gov-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-gov-blue font-bold text-lg leading-tight">Consulta de expediente</h2>
              <p className="text-gov-gray-text text-xs">Ingresa tus datos para conocer el estado actual</p>
            </div>
          </div>

          <form onSubmit={handleConsultar} className="space-y-4">
            <div>
              <label htmlFor="expediente" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Número de expediente <span className="text-gov-red">*</span>
              </label>
              <input
                id="expediente"
                type="text"
                placeholder="Ej. 2026-0004721"
                value={numeroExpediente}
                onChange={(e) => setNumeroExpediente(e.target.value)}
                className="input-field"
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="clave" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Clave de seguimiento <span className="text-gov-red">*</span>
              </label>
              <input
                id="clave"
                type="password"
                placeholder="Ingresa tu clave"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="input-field"
              />
              <p className="text-xs text-gov-gray-text mt-1">
                La clave fue proporcionada al registrar tu trámite.
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Consultando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Consultar estado
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {[
            { icon: '📋', label: 'Sin registro', desc: 'No necesitas una cuenta' },
            { icon: '🔒', label: 'Seguro', desc: 'Datos cifrados SSL' },
            { icon: '⚡', label: 'Inmediato', desc: 'Resultado al instante' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gov-gray-border px-4 py-3 text-center">
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="text-xs font-bold text-gov-blue">{item.label}</div>
              <div className="text-xs text-gov-gray-text">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Login banner */}
        <IniciarSesionBanner />
      </main>

      <footer className="text-center text-xs text-gov-gray-text py-6 border-t border-gov-gray-border bg-white">
        © {new Date().getFullYear()} Despacho Presidencial del Perú. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default ConsultaExpediente;
