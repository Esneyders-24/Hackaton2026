import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { registrarCiudadano } from '../services/api';

const Registro: React.FC = () => {
  const navigate = useNavigate();
  
  // Estados alineados con el backend de PHP de Anderson
  const [nombres, setNombres] = useState('');
  const [dni, setDni] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validación según las reglas del backend (empty($_POST[...]))
    if (!nombres || !dni || !correo || !celular || !contrasena) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }
    if (!aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones para continuar.');
      return;
    }

    setLoading(true);
    try {
      // Enviamos exactamente las llaves que espera el PHP en $_POST
      const result = await registrarCiudadano({
        Nombres_y_Apellidos: nombres,
        DNI: dni,
        Correo: correo,
        Celular: celular,
        Contrasena: contrasena
      });

      if (result.success) {
        setSuccess('¡Usuario registrado correctamente! Serás redirigido al login.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(result.mensaje || 'Error al registrar el usuario.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo completar el registro. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gov-gray-bg">
      <Header compact />

      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          {/* Botón Volver */}
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 text-sm text-gov-blue hover:underline mb-5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al login
          </button>

          <div className="card">
            {/* Header de la tarjeta */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gov-blue">Crear cuenta</h1>
              <p className="text-sm text-slate-500 mt-1">
                Regístrate para acceder al historial de tus trámites ciudadanos.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombres y Apellidos */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Nombres y Apellidos <span className="text-gov-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ingrese sus nombres y apellidos completos"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* DNI */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  DNI <span className="text-gov-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ingrese su número de DNI"
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  className="input-field"
                />

                
              </div>

              {/* Correo Electrónico */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Correo Electrónico <span className="text-gov-red">*</span>
                </label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Celular */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Número de Celular <span className="text-gov-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="987654321"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  className="input-field"
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Contraseña <span className="text-gov-red">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Cree una contraseña segura"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* Términos y Condiciones */}
              <div className="border-t border-gov-gray-border pt-4">
                <button
                  type="button"
                  onClick={() => window.open('#', '_blank')}
                  className="btn-ghost text-sm mb-3 block"
                >
                  Ver términos y condiciones →
                </button>
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={aceptaTerminos}
                    onChange={(e) => setAceptaTerminos(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gov-gray-border text-gov-blue focus:ring-gov-blue"
                  />
                  <span className="text-sm text-gray-700">
                    Acepto los términos y condiciones
                  </span>
                </label>
              </div>

              {/* Alertas de error */}
              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Alertas de éxito */}
              {success && (
                <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              )}

              {/* Botón de Envió */}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                style={{ backgroundColor: loading ? '#6b7a8d' : '#22a849' }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Procesando...
                  </>
                ) : (
                  'Registrarse'
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-gov-gray-text py-6 border-t border-gov-gray-border bg-white">
        © {new Date().getFullYear()} Plataforma Única de Trámites del Estado. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Registro;