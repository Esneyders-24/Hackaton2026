import React from 'react';
import { useNavigate } from 'react-router-dom';

const IniciarSesionBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gov-blue/5 border border-gov-blue/15 rounded-xl px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gov-blue/10 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-gov-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <p className="text-sm text-gov-blue font-medium">
          ¿Quieres revisar tus trámites pasados?
        </p>
      </div>
      <button
         onClick={() => window.location.href = "http://localhost/hackaton1/index.html"}

        className="shrink-0 bg-gov-blue hover:bg-gov-blue-light text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gov-blue focus:ring-offset-2"
      >
        Iniciar sesión
      </button>
    </div>
  );
};

export default IniciarSesionBanner;
