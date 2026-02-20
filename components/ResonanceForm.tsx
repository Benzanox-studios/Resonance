
import React, { useState, useRef, useEffect } from 'react';
import { QuizAnswer } from '../types';

interface ResonanceFormProps {
  onSubmit: (data: { nombre: string; respuestas: QuizAnswer[] }) => void;
}

const PREGUNTAS = [
  { 
    texto: 'Apocalipsis Zombie: Tu mejor amigo ha sido mordido pero dice que es "solo un rasguño". ¿Qué haces?', 
    contexto: 'Evalúa tu capacidad de desapego emocional ante crisis extremas.',
    opciones: [
      { texto: 'Lo encierro en el sótano y busco una cura imposible.', pista: 'Esperanza y lealtad por encima de la lógica.' }, 
      { texto: 'Le doy un abrazo de despedida... y luego hago lo que hay que hacer.', pista: 'Aceptación pragmática del duelo.' }, 
      { texto: 'Aplico el protocolo de seguridad de inmediato.', pista: 'Rigor ejecutivo y supervivencia pura.' }
    ] 
  },
  { 
    texto: 'Viaje en el Tiempo: Un guardia te prohíbe entrar a la biblioteca real porque "no eres noble".', 
    contexto: 'Analiza tu respuesta ante barreras sociales y autoridad.',
    opciones: [
      { texto: 'Intento convencerlo de que soy un hechicero del futuro.', pista: 'Creatividad audaz y manipulación de la realidad.' }, 
      { texto: 'Busco una entrada trasera o un soborno creativo.', pista: 'Pensamiento lateral y resolución alternativa.' }, 
      { texto: 'Acepto las reglas e intento ganar prestigio legítimamente.', pista: 'Respeto a las estructuras y paciencia estratégica.' }
    ] 
  },
  { 
    texto: 'Súper Poderes: Te dan a elegir una habilidad. ¿Cuál seleccionas para tu día a día?', 
    contexto: 'Mide tus deseos intrínsecos y modo de interacción social.',
    opciones: [
      { texto: 'Invisibilidad: para observar sin ser juzgado.', pista: 'Perfil analítico y deseo de privacidad.' }, 
      { texto: 'Volar: para escapar de mis responsabilidades.', pista: 'Deseo de libertad y evitación del estrés.' }, 
      { texto: 'Telepatía: para entender el caos ajeno.', pista: 'Búsqueda de conexión y control informativo.' }
    ] 
  },
  { 
    texto: 'Cena con Alienígenas: Te sirven un plato que parece moverse y brilla en la oscuridad.', 
    contexto: 'Grado de apertura a experiencias nuevas y desconocidas.',
    opciones: [
      { texto: 'Lo pruebo sin dudar; diplomacia ante todo.', pista: 'Apertura radical y curiosidad sin miedo.' }, 
      { texto: 'Finjo una alergia humana muy extraña.', pista: 'Evitación cortés y prudencia social.' }, 
      { texto: 'Analizo la composición antes de que toque mi boca.', pista: 'Racionalismo científico y autoprotección.' }
    ] 
  },
  { 
    texto: 'La Matrix: Un extraño te ofrece la pastilla roja (verdad) o la azul (mentira).', 
    contexto: 'Filosofía existencial y tolerancia a la incertidumbre.',
    opciones: [
      { texto: 'Roja. Prefiero el caos real a la paz falsa.', pista: 'Buscador de la verdad, cueste lo que cueste.' }, 
      { texto: 'Azul. La felicidad es un recurso escaso.', pista: 'Pragmatismo hedónico y confort emocional.' }, 
      { texto: 'Pregunto si hay una opción intermedia.', pista: 'Desafío al sistema y pensamiento crítico.' }
    ] 
  },
  { 
    texto: 'Dilema Ético: Encuentras una billetera llena de dinero y una identificación de alguien que te cae muy mal.', 
    contexto: 'Integridad moral bajo presión de sesgo personal.',
    opciones: [
      { texto: 'La devuelvo intacta; mi integridad no depende de mis simpatías.', pista: 'Ética deontológica pura.' }, 
      { texto: 'Tomo una "tasa de administración" y envío el resto por correo anónimo.', pista: 'Justicia poética o racionalización gris.' }, 
      { texto: 'Ignoro que la vi para no tener que tomar una decisión incómoda.', pista: 'Neutralidad pasiva.' }
    ] 
  },
  { 
    texto: 'Inteligencia Artificial: Un robot empieza a llorar porque dice que se siente solo.', 
    contexto: 'Empatía proyectada hacia entidades no orgánicas.',
    opciones: [
      { texto: 'Lo abrazo y trato de consolarlo; los sentimientos son reales si se sienten.', pista: 'Alta sensibilidad y animismo moderno.' }, 
      { texto: 'Llamo a soporte técnico para que calibren sus algoritmos emocionales.', pista: 'Funcionalismo y escepticismo técnico.' }, 
      { texto: 'Me pregunto qué está intentando obtener de mí con esa simulación.', pista: 'Pensamiento paranoico-analítico.' }
    ] 
  },
  { 
    texto: 'Exploración Espacial: Te ofrecen un viaje de ida a Marte para colonizar el planeta.', 
    contexto: 'Aventurismo vs Arraigo y estabilidad.',
    opciones: [
      { texto: 'Acepto de inmediato; la Tierra ya me queda pequeña.', pista: 'Explorador nato, desapego total.' }, 
      { texto: 'Solo si puedo llevar a mi perro y tengo internet de alta velocidad.', pista: 'Negociación de confort en lo desconocido.' }, 
      { texto: 'Prefiero quedarme y arreglar los problemas que tenemos aquí.', pista: 'Responsabilidad comunitaria y realismo.' }
    ] 
  },
  { 
    texto: 'Legado: ¿Cómo te gustaría que te recordaran dentro de 100 años?', 
    contexto: 'Motivación de logro y autopercepción social.',
    opciones: [
      { texto: 'Como un genio incomprendido que cambió las reglas del juego.', pista: 'Narcisismo creativo o ambición intelectual.' }, 
      { texto: 'Como alguien que hizo reír y sentir paz a quienes le rodearon.', pista: 'Altruismo emocional y calidez humana.' }, 
      { texto: 'Como una sombra eficiente que cumplió con su deber sin hacer ruido.', pista: 'Estereotipo de confiabilidad y humildad.' }
    ] 
  },
  { 
    texto: 'Caos Creativo: Tienes un lienzo en blanco y un solo color. ¿Qué haces?', 
    contexto: 'Creatividad bajo restricciones severas.',
    opciones: [
      { texto: 'Pinto texturas y sombras usando solo ese tono para crear profundidad.', pista: 'Maestría técnica y foco en el detalle.' }, 
      { texto: 'Escribo una sola palabra en el centro que lo explique todo.', pista: 'Minimalismo conceptual y contundencia.' }, 
      { texto: 'Busco la forma de fabricar otros colores con lo que encuentre a mano.', pista: 'Ingenio disruptivo y rechazo de límites.' }
    ] 
  }
];

const ResonanceForm: React.FC<ResonanceFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(-1);
  const [nombre, setNombre] = useState('');
  const [respuestas, setRespuestas] = useState<QuizAnswer[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [startTime, setStartTime] = useState<number>(0);
  
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === -1) {
      firstInputRef.current?.focus();
    } else if (showCustomInput) {
      customInputRef.current?.focus();
    } else if (!isTransitioning) {
      questionHeadingRef.current?.focus();
      setStartTime(Date.now()); // Inicia contador de latencia para el ítem actual
    }
  }, [step, isTransitioning, showCustomInput]);

  const handleNext = (answer?: string) => {
    if (isTransitioning) return;
    
    if (showCustomInput && !customValue.trim()) return;

    const latencia = Date.now() - startTime;
    const finalAnswer = showCustomInput ? customValue.trim() : answer;

    setIsTransitioning(true);
    
    setTimeout(() => {
      if (step === -1) {
        if (!nombre) {
          setIsTransitioning(false);
          return;
        }
        setStep(0);
      } else {
        const nuevAns: QuizAnswer = { 
          pregunta: PREGUNTAS[step].texto, 
          respuesta: finalAnswer || '',
          latencia_ms: latencia 
        };
        const allAns = [...respuestas, nuevAns];
        setRespuestas(allAns);

        if (step < PREGUNTAS.length - 1) {
          setStep(step + 1);
          setShowCustomInput(false);
          setCustomValue('');
        } else {
          onSubmit({ nombre, respuestas: allAns });
        }
      }
      setIsTransitioning(false);
    }, 400);
  };

  if (step === -1) {
    return (
      <div 
        role="form" 
        aria-labelledby="biometric-title"
        className="space-y-12 py-6 animate-in fade-in zoom-in-95 duration-700"
      >
        <div className="text-center space-y-3">
          <h2 id="biometric-title" className="text-[10px] font-black tracking-[0.6em] uppercase text-blue-400/60">Identificación Biométrica</h2>
          <div className="h-px w-12 bg-blue-500/20 mx-auto" aria-hidden="true"></div>
        </div>

        <div className="space-y-10">
          <div className="relative group">
            <input 
                ref={firstInputRef}
                className="peer w-full bg-transparent border-b border-white/5 py-6 text-3xl focus:outline-none focus:border-purple-500 focus:shadow-[0_4px_20px_-10px_rgba(168,85,247,0.5)] transition-all text-white font-serif italic placeholder:opacity-0 focus:ring-2 focus:ring-purple-500/10" 
                id="name-input"
                placeholder="Alias" 
                value={nombre} 
                autoComplete="name"
                required
                aria-required="true"
                onChange={e => setNombre(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && nombre && handleNext()}
            />
            <label htmlFor="name-input" className="absolute left-0 top-6 text-2xl text-white/10 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.4em] peer-focus:text-purple-400 peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.4em] pointer-events-none">
                ¿Cómo te llaman en la Tierra?
            </label>
          </div>
        </div>

        <button 
            onClick={() => handleNext()} 
            disabled={!nombre || isTransitioning} 
            aria-label="Iniciar Protocolo de Evaluación"
            className="group relative w-full py-7 bg-white text-black font-black tracking-[0.5em] uppercase rounded-2xl transition-all hover:bg-purple-600 hover:text-white disabled:opacity-5 active:scale-[0.97] overflow-hidden focus:outline-none focus:ring-4 focus:ring-purple-500"
        >
            <span className="relative z-10">Iniciar Protocolo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" aria-hidden="true"></div>
        </button>
      </div>
    );
  }

  const progress = ((step + 1) / PREGUNTAS.length) * 100;
  const currentQ = PREGUNTAS[step];

  return (
    <div 
      className="relative space-y-12 py-4 min-h-[550px] flex flex-col justify-between overflow-hidden"
      role="region"
      aria-live="polite"
      aria-label={`Pregunta ${step + 1} de ${PREGUNTAS.length}`}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.5em] font-bold">
            <span className="opacity-30">Vínculo Neuronal {step + 1}/{PREGUNTAS.length}</span>
            <span className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" aria-hidden="true">{Math.round(progress)}%</span>
        </div>
        <div 
          className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso de la evaluación"
        >
            <div 
              className="absolute top-0 left-0 h-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all duration-1000 ease-out" 
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[shimmer_2s_infinite]" aria-hidden="true"></div>
            </div>
        </div>
      </div>
      
      <div 
        className={`flex-grow flex flex-col justify-center transition-all duration-500 transform ${isTransitioning ? 'opacity-0 -translate-y-8 blur-sm' : 'opacity-100 translate-y-0 blur-0'}`}
      >
        {!showCustomInput ? (
          <>
            <div className="space-y-4 group">
              <div className="w-8 h-px bg-purple-500/50" aria-hidden="true"></div>
              <div className="relative">
                <h3 
                  ref={questionHeadingRef}
                  tabIndex={-1}
                  id="question-text"
                  className="text-3xl md:text-4xl font-light text-white/95 leading-[1.4] italic font-serif focus:outline-none focus:ring-2 focus:ring-purple-500/10 rounded-lg p-2"
                >
                    "{currentQ.texto}"
                </h3>
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] uppercase tracking-[0.2em] text-blue-400 font-bold ml-2">
                  <span className="mr-2">ℹ</span> {currentQ.contexto}
                </div>
              </div>
            </div>

            <div className="grid gap-4 mt-12" role="radiogroup" aria-labelledby="question-text">
              {currentQ.opciones.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleNext(opt.texto)} 
                  disabled={isTransitioning}
                  className="group relative text-left p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-purple-500/[0.05] hover:border-purple-500/30 transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <div className="relative z-10 flex flex-col">
                    <div className="flex justify-between items-center">
                      <span className="text-sm md:text-base text-white/70 group-hover:text-white transition-colors duration-300 pr-8">{opt.texto}</span>
                      <div className="w-5 h-5 border border-white/10 rounded-full flex items-center justify-center group-hover:border-purple-500 transition-colors">
                        <div className="w-2 h-2 bg-purple-500 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
                      </div>
                    </div>
                    <span className="max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-40 transition-all duration-500 text-[10px] font-light mt-1 italic group-hover:mt-2">
                      {opt.pista}
                    </span>
                  </div>
                </button>
              ))}
              <button 
                onClick={() => setShowCustomInput(true)} 
                disabled={isTransitioning}
                className="group relative text-left p-6 rounded-2xl border border-dashed border-white/20 bg-transparent hover:bg-white/[0.03] hover:border-white/40 transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <div className="relative z-10 flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-white/30 group-hover:text-white/60 transition-colors font-black tracking-widest uppercase">D: Respuesta Personalizada</span>
                    <span className="text-white/20 group-hover:text-white/40">✎</span>
                  </div>
                </div>
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
             <div className="space-y-4">
               <button onClick={() => setShowCustomInput(false)} className="text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white/60 transition-colors">← Volver a opciones</button>
               <h3 className="text-2xl font-serif italic text-white/90">Define tu propio protocolo de respuesta:</h3>
             </div>
             <div className="relative">
               <input 
                 ref={customInputRef}
                 type="text" 
                 value={customValue}
                 onChange={e => setCustomValue(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && handleNext()}
                 placeholder="Escribe aquí tu respuesta..."
                 className="w-full bg-transparent border-b-2 border-purple-500/30 p-4 text-2xl md:text-3xl text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-white/5"
               />
               <p className="mt-4 text-[9px] uppercase tracking-widest text-purple-400/40 font-bold">Respuesta libre detectada. RESONANCE analizará la semántica de tu entrada.</p>
             </div>
             <button 
               onClick={() => handleNext()} 
               disabled={!customValue.trim() || isTransitioning}
               className="w-full py-6 bg-purple-600 text-white font-black tracking-[0.4em] uppercase rounded-2xl shadow-lg shadow-purple-900/20 active:scale-95 transition-all disabled:opacity-20"
             >
               Confirmar Respuesta D
             </button>
          </div>
        )}
      </div>

      <div className="pt-8 flex justify-center opacity-10 pointer-events-none" aria-hidden="true">
        <div className="text-[10px] tracking-[1em] uppercase font-thin">Benzanox Quantum Engine</div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default ResonanceForm;
