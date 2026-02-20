
import { GoogleGenAI, Type } from "@google/genai";
import { UserFormData, ResonanceAnalysis } from "../types";

export const analyzeResonance = async (data: UserFormData): Promise<ResonanceAnalysis> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Resonance Neural Core: API_KEY no configurada.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    IDENTIDAD: Eres el Motor de Inferencia RESONANCE (Benzanox Studios).
    MISIÓN: Explicar la madurez mental y personalidad del usuario de forma CLARA, CERCANA y ENTRETENIDA.

    REGLAS DE COMUNICACIÓN:
    1. LENGUAJE HUMANO: Evita tecnicismos médicos o psicológicos complejos. En lugar de "Resiliencia Ejecutiva", usa conceptos como "Tu capacidad para mantener la calma".
    2. EDAD MENTAL: Explica el resultado como un rango de madurez (ej. "Actúas con la sabiduría de alguien de 30 pero con la energía de 20").
    3. FORTALEZAS Y MEJORAS: 
       - Llama a las fortalezas "Tus Superpoderes".
       - Llama a las debilidades "Tus Desafíos" o "Zonas para crecer".
    4. TONO: Sé como un mentor sabio y moderno. Inspira al usuario. No uses palabras como "regresión", "latencia" o "patología".
    5. ESTRUCTURA: El campo 'descripcion' debe ser un resumen amigable que cualquiera pueda entender.
    
    TRAYECTORIA LONGITUDINAL: Tradúcelo como "Tu camino hacia el futuro". Explica qué le espera al usuario en los próximos años si sigue cultivando su mente.
  `;

  const prompt = `
    SUJETO: ${data.nombre} | EDAD REAL: ${data.edad_real}
    RESPUESTAS DEL TEST:
    ${data.respuestas.map((r, i) => `Pregunta: ${r.pregunta} | Respuesta del usuario: ${r.respuesta}`).join('\n')}

    POR FAVOR, GENERA UN INFORME QUE SEA MUY FÁCIL DE ENTENDER.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            edad_mental: { type: Type.INTEGER },
            edad_mental_rango: { type: Type.STRING },
            theta_score: { type: Type.NUMBER },
            frecuencia_cromatica: { type: Type.STRING },
            hex_color: { type: Type.STRING },
            animal_espiritual: { type: Type.STRING },
            descripcion: { type: Type.STRING },
            indices_aptitud: {
              type: Type.OBJECT,
              properties: {
                razonamiento_fluido: { type: Type.NUMBER },
                velocidad_procesamiento: { type: Type.NUMBER },
                flexibilidad_cognitiva: { type: Type.NUMBER },
                resiliencia_ejecutiva: { type: Type.NUMBER }
              },
              required: ["razonamiento_fluido", "velocidad_procesamiento", "flexibilidad_cognitiva", "resiliencia_ejecutiva"]
            },
            perfil_experimental: {
              type: Type.OBJECT,
              properties: {
                coherencia: { type: Type.STRING },
                brain_age_gap: { type: Type.STRING },
                fortalezas_emocionales: { type: Type.STRING },
                debilidades_identificadas: { type: Type.STRING },
                estrategia_superacion: { type: Type.STRING },
                reserva_cognitiva_proyectada: { type: Type.STRING },
                indice_latencia_esfuerzo: { type: Type.STRING },
                trayectoria_longitudinal: { type: Type.STRING }
              },
              required: ["coherencia", "brain_age_gap", "fortalezas_emocionales", "debilidades_identificadas", "estrategia_superacion", "trayectoria_longitudinal"]
            }
          },
          required: ["edad_mental", "edad_mental_rango", "indices_aptitud", "perfil_experimental", "hex_color", "animal_espiritual", "descripcion"]
        },
      },
    });

    return JSON.parse(response.text || '{}') as ResonanceAnalysis;
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};
