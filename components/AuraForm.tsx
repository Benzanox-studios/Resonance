
import React, { useState } from 'react';
import { UserFormData, QuizAnswer } from '../types';

interface AuraFormProps {
  onSubmit: (data: UserFormData) => void;
  isLoading: boolean;
}

const PREGUNTAS = [
  {
    id: 'p1',
    texto: 'Gestión de Crisis: Estás bajo mucha presión y algo sale mal por un error ajeno.',
    opciones: [
      { id: 'A', text: 'Expreso mi enfado abiertamente hacia el responsable para que aprenda.' },
      { id: 'B', text: 'Me bloqueo emocionalmente y me cuesta seguir con mis tareas.' },
      { id: 'C', text: 'Priorizo la resolución del problema y pospongo la discusión sobre la culpa.' }
    ]
  }
];

const AuraForm: React.FC<AuraFormProps> = ({ onSubmit, isLoading }) => {
  const [step, setStep] = useState(-1);
  const [nombre, setNombre] = useState('');
  const [edadReal, setEdadReal] = useState(25);
  const [respuestas, setRespuestas] = useState<QuizAnswer[]>([]);

  const handleNext = (answer?: string) => {
    if (step === -1) {
      if (!nombre) return;
      setStep(0);
      return;
    }
    // Para simplificar esta variante, enviamos datos directos si se implementara la lógica de preguntas aquí.
    onSubmit({ nombre, edad_real: edadReal, respuestas });
  };

  if (step === -1) {
    return (
      <div 
        className="space-y-8 animate-in fade-in duration-500"
        role="form"
        aria-labelledby="aura-registration-title"
      >
        <div className="space-y-6">
          <h2 id="aura-registration-title" className="sr-only">Registro de Sujeto</h2>
          <div>
            <label htmlFor="aura-name" className="block text-[10px] font-black tracking-[0.3em] uppercase opacity-40 mb-4">Registro de Sujeto</label>
            <input 
              id="aura-name"
              required
              aria-required="true"
              className="w-full bg-white/5 border-b border-white/10 p-4 text-2xl focus:outline-none focus:border-purple-500 focus:shadow-[0_4px_20px_-10px_rgba(168,85,247,0.5)] transition-all placeholder:opacity-20 rounded-t-lg focus:ring-2 focus:ring-purple-500/20"
              placeholder="Nombre completo"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && nombre && handleNext()}
            />
          </div>
          <div>
            <label htmlFor="aura-age" className="block text-[10px] font-black tracking-[0.3em] uppercase opacity-40 mb-4">Edad Cronológica</label>
            <input 
              id="aura-age"
              type="number"
              min="1"
              max="120"
              className="w-full bg-white/5 border-b border-white/10 p-4 text-2xl focus:outline-none focus:border-purple-500 focus:shadow-[0_4px_20px_-10px_rgba(168,85,247,0.5)] transition-all focus:ring-2 focus:ring-purple-500/20"
              value={edadReal}
              onChange={e => setEdadReal(parseInt(e.target.value) || 0)}
              onKeyDown={(e) => e.key === 'Enter' && nombre && handleNext()}
            />
          </div>
        </div>
        <button 
          onClick={() => handleNext()}
          disabled={!nombre || isLoading}
          aria-busy={isLoading}
          className="w-full py-6 bg-white text-black font-black tracking-widest uppercase rounded-full hover:bg-purple-500 hover:text-white transition-all disabled:opacity-20 focus:outline-none focus:ring-4 focus:ring-purple-500/50 active:scale-95"
        >
          {isLoading ? 'Procesando...' : 'Comenzar Evaluación'}
        </button>
      </div>
    );
  }

  return (
    <div role="status" aria-live="polite" className="text-center py-10 italic opacity-50">
      Evaluación en curso...
    </div>
  );
};

export default AuraForm;
