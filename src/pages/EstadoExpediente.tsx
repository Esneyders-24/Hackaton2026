import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import EstadoBadge from '../components/EstadoBadge';
import IniciarSesionBanner from '../components/IniciarSesionBanner';
import type { ExpedienteEstado } from '../types';

const formatFecha = (fecha: string) => {
  try {
    return new Date(fecha).toLocaleString('es-PE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return fecha;
  }
};

const EstadoExpediente: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const expediente = location.state?.expediente as ExpedienteEstado | undefined;

  if (!expediente) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gov-gray-bg px-4">
        <p className="text-gov-gray-text">No hay datos de expediente. Regresa a la consulta.</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Volver al inicio
        </button>
      </div>
    );
  }

  const diasRestantes = expediente.tiempo_estimado_resolucion_dias;

  return (
    <div className="min-h-screen flex flex-col bg-gov-gray-bg">
      <Header compact />

      {/* Status bar */}
      <div className="bg-white border-b border-gov-gray-border px-4 py-3">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="text-gov-gray-text hover:text-gov-blue transition-colors"
              aria-label="Volver"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gov-gray-text">
              <span className="text-gov-blue font-semibold">Estado del Expediente</span>
              {' · '}
              {expediente.numero_expediente}
            </span>
          </div>
          <EstadoBadge estado={expediente.estado_actual} size="md" />
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 space-y-5">

        {/* Header card */}
        <div className="card">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-gov-gray-text uppercase tracking-widest mb-1">
                Expediente
              </p>
              <h1 className="text-2xl font-bold text-gov-blue">
                {expediente.numero_expediente}
              </h1>
              <p className="text-gov-gray-text text-sm mt-1">
                {expediente.tramite}
              </p>
            </div>
            <div className="shrink-0">
              <EstadoBadge estado={expediente.estado_actual} size="lg" />
            </div>
          </div>

          {/* Detail message */}
          <div className="mt-5 bg-gov-blue/5 border-l-4 border-gov-blue rounded-r-xl px-5 py-4">
            <p className="text-sm text-gov-blue leading-relaxed font-medium">
              {expediente.detalle_estado}
            </p>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Ciudadano */}
          <div className="card">
            <p className="text-xs font-semibold text-gov-gray-text uppercase tracking-widest mb-3">Ciudadano</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gov-blue/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-gov-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm leading-tight">{expediente.administrado}</p>
                <p className="text-xs text-gov-gray-text">Administrado</p>
              </div>
            </div>
          </div>

          {/* Canal de origen */}
          <div className="card">
            <p className="text-xs font-semibold text-gov-gray-text uppercase tracking-widest mb-3">Canal de ingreso</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm leading-tight">{expediente.origen_canal}</p>
                <p className="text-xs text-gov-gray-text">Origen</p>
              </div>
            </div>
          </div>

          {/* Última actualización */}
          <div className="card">
            <p className="text-xs font-semibold text-gov-gray-text uppercase tracking-widest mb-3">Última actualización</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm leading-tight">
                  {formatFecha(expediente.ultima_actualizacion)}
                </p>
                <p className="text-xs text-gov-gray-text">Fecha y hora</p>
              </div>
            </div>
          </div>

          {/* Tiempo estimado */}
          <div className="card">
            <p className="text-xs font-semibold text-gov-gray-text uppercase tracking-widest mb-3">
              Tiempo estimado de resolución
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gov-blue text-xl leading-tight">{diasRestantes} días hábiles</p>
                <p className="text-xs text-gov-gray-text">Plazo estimado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="card">
          <p className="text-xs font-semibold text-gov-gray-text uppercase tracking-widest mb-4">Progreso del trámite</p>
          <div className="flex items-center gap-0">
            {[
              { key: 'DOCUMENTO REGISTRADO', label: 'Registrado' },
              { key: 'EN PROCESO', label: 'En proceso' },
              { key: 'SE EMITIÓ RESPUESTA', label: 'Respondido' },
            ].map((step, idx, arr) => {
              const estadoOrder = ['DOCUMENTO REGISTRADO', 'EN PROCESO', 'SE EMITIÓ RESPUESTA'];
              const currentIdx = estadoOrder.indexOf(expediente.estado_actual);
              const stepIdx = estadoOrder.indexOf(step.key);
              const isPast = stepIdx < currentIdx;
              const isCurrent = stepIdx === currentIdx;

              return (
                <React.Fragment key={step.key}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                      ${isCurrent ? 'bg-gov-blue text-white ring-4 ring-gov-blue/20' : ''}
                      ${isPast ? 'bg-green-500 text-white' : ''}
                      ${!isCurrent && !isPast ? 'bg-gov-gray-border text-gov-gray-text' : ''}
                    `}>
                      {isPast ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span className={`text-xs mt-2 font-medium text-center max-w-[70px] leading-tight
                      ${isCurrent ? 'text-gov-blue' : isPast ? 'text-green-600' : 'text-gov-gray-text'}
                    `}>
                      {step.label}
                    </span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 mb-5 ${stepIdx < currentIdx ? 'bg-green-400' : 'bg-gov-gray-border'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Next step suggestion */}
        {expediente.estado_actual === 'EN PROCESO' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-blue-800 mb-0.5">Próximo paso sugerido</p>
              <p className="text-sm text-blue-700">
                Tu expediente está siendo evaluado. Recibirás una notificación cuando haya una actualización.
                Si tu trámite supera el plazo estimado, puedes contactar al área correspondiente.
              </p>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Nueva consulta
          </button>
          <button
            onClick={() => window.print()}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir / Guardar
          </button>
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

export default EstadoExpediente;
