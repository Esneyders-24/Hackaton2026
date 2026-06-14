export interface ExpedienteEstado {
  numero_expediente: string;
  tramite: string;
  administrado: string;
  estado_actual: string;
  detalle_estado: string;
  origen_canal: string;
  ultima_actualizacion: string;
  tiempo_estimado_resolucion_dias: number;
}

export interface ExpedienteHistorial {
  numero_expediente: string;
  tramite: string;
  estado_actual: string;
  ultima_actualizacion: string;
}

export interface LoginCredentials {
  tipo_documento: string;
  documento: string;
  contrasena: string;
  captcha: string;
}

export interface RegisterData {
  tipo_documento: string;
  dni: string;
  ubigeo: string;
  fecha_caducidad: string;
  no_caduca: boolean;
  fecha_nacimiento: string;
}
