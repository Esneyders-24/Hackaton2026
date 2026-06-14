import axios from 'axios';
import type { ExpedienteEstado, ExpedienteHistorial } from '../types';

// Base URL — apunta al webhook de Daniel (n8n)
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://your-n8n-webhook.com/webhook';

// ── Mock data para desarrollo ──────────────────────────────────────────────
const MOCK_EXPEDIENTE: ExpedienteEstado = {
  numero_expediente: '2026-0004721',
  tramite: 'Denuncia Administrativa',
  administrado: 'PAREDES RIOS CARLOS EDUARDO',
  estado_actual: 'EN PROCESO',
  detalle_estado:
    'Su expediente se encuentra en proceso de evaluación por el área correspondiente del Despacho Presidencial.',
  origen_canal: 'Asistente Virtual IA - Canal Ligero',
  ultima_actualizacion: '2026-06-14 13:22:55',
  tiempo_estimado_resolucion_dias: 7,
};

const MOCK_HISTORIAL: ExpedienteHistorial[] = [
  { numero_expediente: '2026-0010582', tramite: 'Solicitud de Información', estado_actual: 'EN PROCESO', ultima_actualizacion: '2026-06-10' },
  { numero_expediente: '2026-0001984', tramite: 'Queja Administrativa', estado_actual: 'DOCUMENTO REGISTRADO', ultima_actualizacion: '2026-06-08' },
  { numero_expediente: '2026-0012476', tramite: 'Denuncia Administrativa', estado_actual: 'SE EMITIÓ RESPUESTA', ultima_actualizacion: '2026-06-05' },
  { numero_expediente: '2026-0004721', tramite: 'Denuncia Administrativa', estado_actual: 'EN PROCESO', ultima_actualizacion: '2026-06-14' },
  { numero_expediente: '2026-0008163', tramite: 'Solicitud de Audiencia', estado_actual: 'DOCUMENTO REGISTRADO', ultima_actualizacion: '2026-06-03' },
  { numero_expediente: '2026-0011395', tramite: 'Recurso de Apelación', estado_actual: 'SE EMITIÓ RESPUESTA', ultima_actualizacion: '2026-05-28' },
  { numero_expediente: '2026-0002918', tramite: 'Queja Administrativa', estado_actual: 'EN PROCESO', ultima_actualizacion: '2026-05-25' },
  { numero_expediente: '2026-0006249', tramite: 'Solicitud de Información', estado_actual: 'DOCUMENTO REGISTRADO', ultima_actualizacion: '2026-05-20' },
  { numero_expediente: '2026-0010754', tramite: 'Denuncia Administrativa', estado_actual: 'SE EMITIÓ RESPUESTA', ultima_actualizacion: '2026-05-15' },
  { numero_expediente: '2026-0003576', tramite: 'Recurso de Reconsideración', estado_actual: 'EN PROCESO', ultima_actualizacion: '2026-05-10' },
];

// ── API calls ──────────────────────────────────────────────────────────────

/**
 * Consulta el estado de un expediente por número y clave.
 * Conecta con el webhook de Daniel en n8n.
 */
export async function consultarExpediente(
  numero_expediente: string,
  clave: string
): Promise<ExpedienteEstado> {
  try {
    const { data } = await axios.post(`${API_BASE}/consulta-expediente`, {
      numero_expediente,
      clave,
    });
    return data;
  } catch {
    // Fallback mock — reemplazar cuando el backend de Daniel esté listo
    console.warn('[DEV] Usando mock data para consultarExpediente');
    if (numero_expediente && clave) return MOCK_EXPEDIENTE;
    throw new Error('Expediente o clave incorrectos.');
  }
}

/**
 * Autenticación de ciudadano.
 * Devuelve un token/sesión.
 */
export async function loginCiudadano(
  tipo_documento: string,
  documento: string,
  contrasena: string
): Promise<{ token: string; dni: string }> {
  try {
    const { data } = await axios.post(`${API_BASE}/login`, {
      tipo_documento,
      documento,
      contrasena,
    });
    return data;
  } catch {
    console.warn('[DEV] Usando mock login');
    if (documento && contrasena) {
      return { token: 'mock-token-abc123', dni: documento };
    }
    throw new Error('Credenciales incorrectas.');
  }
}

/**
 * Registro de nuevo ciudadano conectado al backend de Anderson (PHP).
 */
export async function registrarCiudadano(payload: {
  Nombres_y_Apellidos: string;
  DNI: string;
  Correo: string;
  Celular: string;
  Contrasena: string;
}): Promise<{ success: boolean; mensaje: string }> {
  try {
    // 1. Creamos el FormData porque PHP lee variables en $_POST
    const formData = new FormData();
    formData.append('Nombres_y_Apellidos', payload.Nombres_y_Apellidos);
    formData.append('DNI', payload.DNI);
    formData.append('Correo', payload.Correo);
    formData.append('Celular', payload.Celular);
    formData.append('Contrasena', payload.Contrasena);

    // 2. Apuntamos a la URL exacta del PHP de Anderson.
    // REEMPLAZA esta URL de abajo por la IP o ruta local real del backend de Anderson
    const URL_PHP_ANDERSON = 'http://localhost/Hackaton2026/registro.php'; 

    const { data } = await axios.post(URL_PHP_ANDERSON, formData);
    return data;
  } catch (error) {
    console.error('Error conectando con el backend PHP:', error);
    // Fallback de simulación por si el servidor de Anderson está apagado
    console.warn('[DEV] Usando mock registro debido a un error de red');
    return { success: true, mensaje: 'Cuenta creada exitosamente (MOCK).' };
  }
}

/**
 * Recupera el historial de expedientes por DNI.
 * Se usa en la vista 3 tras login exitoso.
 */
export async function obtenerHistorial(
  dni: string,
  token: string
): Promise<ExpedienteHistorial[]> {
  try {
    const { data } = await axios.get(`${API_BASE}/historial`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { dni },
    });
    return data;
  } catch {
    console.warn('[DEV] Usando mock historial para DNI:', dni);
    return MOCK_HISTORIAL;
  }
}
