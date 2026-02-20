
export interface ResonanceAnalysis {
  edad_mental: number;
  edad_mental_rango: string; // Ej: "22-25 años (95% CI)"
  theta_score: number;
  frecuencia_cromatica: string;
  descripcion: string;
  animal_espiritual: string;
  hex_color: string;
  indices_aptitud: {
    razonamiento_fluido: number;
    velocidad_procesamiento: number;
    flexibilidad_cognitiva: number;
    resiliencia_ejecutiva: number;
  };
  perfil_experimental: {
    coherencia: string;
    areas_regresion: string;
    fortalezas_emocionales: string;
    brain_age_gap: string;
    debilidades_identificadas: string; // Se usará como "Zonas de Expansión"
    estrategia_superacion: string;
    reserva_cognitiva_proyectada: string;
    indice_latencia_esfuerzo: string;
    trayectoria_longitudinal: string; // Nueva: proyección a 10 años
  };
}

export interface QuizAnswer {
  pregunta: string;
  respuesta: string;
  latencia_ms: number;
}

export interface UserFormData {
  nombre: string;
  edad_real: number;
  respuestas: QuizAnswer[];
}
