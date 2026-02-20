
import React, { useState, useEffect, useRef } from 'react';
import { ResonanceAnalysis } from '../types';
import { GoogleGenAI } from "@google/genai";

interface ResultViewProps {
  analysis: ResonanceAnalysis;
  nombre: string;
  onReset: () => void;
  isMinor: boolean;
}

const ResultView: React.FC<ResultViewProps> = ({ analysis, nombre, onReset, isMinor }) => {
  const [visible, setVisible] = useState(false);
  const [interpreting, setInterpreting] = useState(false);
  const [humanSummary, setHumanSummary] = useState<string | null>(null);
  
  const mainHeaderRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setVisible(true);
    mainHeaderRef.current?.focus();
  }, []);

  const getInterpretation = async () => {
    setInterpreting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `
        Genera un mensaje muy amigable y fácil de entender para ${nombre}.
        Su perfil es ${analysis.animal_espiritual} y su edad mental parece de ${analysis.edad_mental_rango}.
        Dile por qué es genial ser así y qué pequeño consejo le darías para mejorar hoy mismo.
        Usa un lenguaje sencillo, sin palabras difíciles. Máximo 60 palabras.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      setHumanSummary(response.text || "");
    } catch (err) {
      setHumanSummary("¡Tu perfil es increíble! Sigue confiando en tu intuición.");
    } finally {
      setInterpreting(false);
    }
  };

  return (
    <div className={`space-y-16 pb-32 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <header className="text-center space-y-4">
        <div className="inline-block px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-2">
           <span className="text-[9px] font-black tracking-[0.4em] uppercase text-purple-400">
             Análisis de Personalidad Finalizado
           </span>
        </div>
        <h3 ref={mainHeaderRef} tabIndex={-1} className="text-6xl font-serif italic text-white/95 focus:outline-none tracking-tight">
          {nombre}
        </h3>
        <p className="text-white/40 text-sm font-light italic">Tu esencia digital ha sido revelada.</p>
      </header>

      {/* Hero Section: Mental Age */}
      <section 
        className="relative overflow-hidden glass-card p-16 rounded-[4rem] border-none shadow-[0_0_120px_rgba(0,0,0,0.6)] text-center flex flex-col items-center space-y-8"
        style={{ background: `radial-gradient(circle at top, ${analysis.hex_color}30, transparent), rgba(255,255,255,0.01)` }}
      >
        <div className="absolute top-0 left-0 w-full h-1 opacity-30" style={{ background: `linear-gradient(90deg, transparent, ${analysis.hex_color}, transparent)` }}></div>
        
        <div className="relative z-10 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-white/30 block">Tu Edad Mental es de:</span>
          <div className="text-9xl md:text-[10rem] font-bold tracking-tighter leading-none" style={{ color: analysis.hex_color }}>
            {analysis.edad_mental}
          </div>
          <div className="px-6 py-2 bg-white/5 rounded-full backdrop-blur-md border border-white/5 inline-block">
             <span className="text-sm font-medium text-white/60 tracking-widest uppercase">{analysis.edad_mental_rango}</span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-2xl pt-12 border-t border-white/5">
           {[
             { label: 'Ingenio', val: analysis.indices_aptitud.razonamiento_fluido },
             { label: 'Agilidad', val: analysis.indices_aptitud.velocidad_procesamiento },
             { label: 'Adaptación', val: analysis.indices_aptitud.flexibilidad_cognitiva },
             { label: 'Calma', val: analysis.indices_aptitud.resiliencia_ejecutiva }
           ].map((idx, i) => (
             <div key={i} className="space-y-3">
               <div className="text-[8px] font-black tracking-widest uppercase opacity-40">{idx.label}</div>
               <div className="text-2xl font-light text-white/90">{idx.val}%</div>
               <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-purple-500/50 to-purple-400" style={{ width: `${idx.val}%` }}></div>
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-card p-10 rounded-[3rem] border-emerald-500/20 bg-emerald-500/[0.02] min-h-[220px]">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
               <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-emerald-400">Tu Mayor Superpoder</h4>
            </div>
            <p className="text-lg leading-relaxed text-white/80 italic font-light">{analysis.perfil_experimental.fortalezas_emocionales}</p>
          </div>
          
          <div className="px-10 py-4 border-l-2 border-emerald-500/10 space-y-2">
            <h5 className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">Cómo sacarle provecho:</h5>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              {analysis.perfil_experimental.reserva_cognitiva_proyectada}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-10 rounded-[3rem] border-orange-500/20 bg-orange-500/[0.02] min-h-[220px]">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-2 h-2 rounded-full bg-orange-400"></div>
               <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-orange-400">Tu Próximo Desafío</h4>
            </div>
            <p className="text-lg leading-relaxed text-white/80 italic font-light">{analysis.perfil_experimental.debilidades_identificadas}</p>
          </div>

          <div className="px-10 py-4 border-l-2 border-orange-500/10 space-y-2">
            <h5 className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">Un consejo para ti:</h5>
            <p className="text-sm text-white/50 leading-relaxed font-light">
              {analysis.perfil_experimental.estrategia_superacion}
            </p>
          </div>
        </div>
      </div>

      {/* Long-term Trajectory */}
      <section className="glass-card p-12 rounded-[4rem] border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent space-y-6 text-center">
        <h4 className="text-[10px] font-black tracking-[0.5em] uppercase text-purple-400">Mirando hacia el futuro</h4>
        <p className="text-2xl font-serif italic text-white/90 max-w-2xl mx-auto leading-relaxed">
          {analysis.perfil_experimental.trayectoria_longitudinal}
        </p>
      </section>

      {/* AI Interpretation Action */}
      {!humanSummary ? (
        <button 
          onClick={getInterpretation}
          disabled={interpreting}
          className="group relative w-full py-10 bg-white text-black rounded-[3rem] font-black tracking-[0.5em] uppercase overflow-hidden transition-all hover:scale-[1.01] active:scale-95 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="relative z-10 group-hover:text-white transition-colors">{interpreting ? "Cargando mensaje..." : "Ver mi mensaje personal"}</span>
        </button>
      ) : (
        <div className="glass-card p-14 rounded-[4rem] border-purple-500/30 bg-purple-500/[0.03] animate-in fade-in zoom-in duration-1000 relative">
           <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-black border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 font-serif italic text-2xl shadow-xl">“</div>
           <p className="text-2xl md:text-3xl leading-snug text-white/90 font-light italic font-serif text-center">{humanSummary}</p>
        </div>
      )}

      {/* Footer Actions */}
      <div className="pt-12 flex flex-col items-center gap-8">
        <button onClick={onReset} className="group flex items-center gap-4 px-12 py-5 border border-white/5 rounded-full hover:bg-white/5 transition-all">
          <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/40 group-hover:text-white transition-colors">Volver a empezar</span>
        </button>
      </div>
    </div>
  );
};

export default ResultView;
