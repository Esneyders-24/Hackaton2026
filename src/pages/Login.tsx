import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { loginCiudadano } from '../services/api';

// Simple deterministic captcha — in production use a real CAPTCHA service
const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [tipodoc, setTipoDoc] = useState('DNI');
  const [documento, setDocumento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (captchaInput.toUpperCase() !== captchaCode) {
      setError('El código CAPTCHA no es correcto. Intente nuevamente.');
      return;
    }

    if (!documento || !contrasena) {
      setError('Complete todos los campos obligatorios.');
      return;
    }

    setLoading(true);
    try {
      const { token, dni } = await loginCiudadano(tipodoc, documento, contrasena);
      // Save to sessionStorage for the session
      sessionStorage.setItem('auth_token', token);
      sessionStorage.setItem('auth_dni', dni);
      navigate('/historial');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Credenciales incorrectas. Verifique sus datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gov-gray-bg">
      <Header compact />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Back link */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-sm text-gov-gray-text hover:text-gov-blue mb-5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </button>

          <div className="card">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gov-blue flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gov-blue">Iniciar sesión</h1>
              <p className="text-sm text-gov-gray-text mt-1">Accede a tu historial de trámites</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Tipo documento */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Tipo Documento <span className="text-gov-red">*</span>
                </label>
                <select
                  value={tipodoc}
                  onChange={(e) => setTipoDoc(e.target.value)}
                  className="input-field"
                >
                  <option value="DNI">DNI</option>
                  <option value="CE">Carné de Extranjería</option>
                  <option value="PASAPORTE">Pasaporte</option>
                </select>
              </div>

              {/* Documento */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Documento de Identidad Registrado <span className="text-gov-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder={tipodoc === 'DNI' ? 'Ej. 72511942' : 'Ingrese su documento'}
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  className="input-field"
                  maxLength={tipodoc === 'DNI' ? 8 : 20}
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Contraseña <span className="text-gov-red">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    className="input-field pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gov-gray-text hover:text-gov-blue transition-colors"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* CAPTCHA */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Complete el siguiente captcha:
                </label>
                <div className="bg-gov-blue rounded-lg px-5 py-3 text-center mb-2 select-none">
                  <span className="text-white text-2xl font-bold tracking-[0.3em] font-mono italic">
                    {captchaCode}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Ingrese el código"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                  className="input-field tracking-widest"
                  maxLength={6}
                />
              </div>

              {/* Forgot password */}
              <div className="text-right -mt-1">
                <button type="button" className="btn-ghost text-sm">
                  ¿Olvidaste tu contraseña?
                </button>
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
                className="btn-primary w-full flex items-center justify-center gap-2 mt-1"
                style={{ backgroundColor: '#22a849' }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Accediendo...
                  </>
                ) : (
                  'Acceder'
                )}
              </button>
            </form>

            <div className="mt-5 text-center border-t border-gov-gray-border pt-5">
              <p className="text-sm text-gov-gray-text">
                ¿No tienes una cuenta?{' '}
                <button
                  onClick={() => navigate('/registro')}
                  className="btn-ghost text-sm text-gov-blue"
                >
                  Crear cuenta
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-gov-gray-text py-6 border-t border-gov-gray-border bg-white">
        © {new Date().getFullYear()} Despacho Presidencial del Perú. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Login;
