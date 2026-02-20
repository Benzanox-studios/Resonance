
import React, { useState, useEffect } from 'react';
import ResonanceForm from './components/ResonanceForm';
import ResultView from './components/ResultView';
import { UserFormData, ResonanceAnalysis } from './types';
import { analyzeResonance } from './services/geminiService';

type AppState = 'DISCLAIMER' | 'INTRO' | 'LANDING' | 'SYNC' | 'HOME' | 'QUIZ' | 'LOADING' | 'RESULT';

const TermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className="glass-card w-full max-w-3xl max-h-[85vh] rounded-[3rem] p-8 md:p-14 overflow-y-auto relative border-purple-500/30 shadow-[0_0_80px_rgba(168,85,247,0.15)]">
        <button onClick={onClose} className="absolute top-10 right-10 text-white/40 hover:text-white text-2xl transition-all z-20" aria-label="Cerrar">✕</button>
        
        <div className="space-y-10 text-white/80 text-sm leading-relaxed font-light pr-4 custom-scrollbar">
          <header className="border-b border-white/10 pb-8 sticky top-0 bg-black/40 backdrop-blur-md z-10 -mt-2 pt-2">
            <h2 className="text-4xl font-serif italic text-white mb-2">TÉRMINOS Y CONDICIONES DE USO</h2>
            <p className="text-[10px] uppercase tracking-[0.5em] text-purple-400 font-black">Última actualización: Enero 2026</p>
          </header>

          <div className="space-y-8 prose prose-invert max-w-none">
            <p className="text-lg text-white/90">
              Bienvenido/a a <strong>RESONANCE</strong>, una experiencia interactiva experimental desarrollada bajo la identidad creativa de <strong>Benzanox Studios</strong>. Al acceder, registrarte o utilizar esta aplicación, aceptás plenamente los presentes Términos y Condiciones. Si no estás de acuerdo, te invitamos a no utilizar la plataforma.
            </p>

            <div className="h-px w-full bg-gradient-to-r from-purple-500/50 to-transparent"></div>

            <section className="space-y-4">
              <h3 className="text-xl font-serif italic text-white/90">1. Naturaleza del Servicio</h3>
              <p>RESONANCE es una <strong>plataforma digital experimental, artística y narrativa</strong>, diseñada para ofrecer una <strong>experiencia interactiva de autoexploración cognitiva y de personalidad</strong> mediante el uso de inteligencia artificial generativa.</p>
              <p>Los resultados proporcionados por la aplicación:</p>
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                <li><strong>NO constituyen diagnósticos médicos, psicológicos ni psiquiátricos</strong>.</li>
                <li><strong>NO sustituyen evaluaciones profesionales realizadas por psicólogos, médicos u otros especialistas habilitados</strong>.</li>
                <li>Tienen un <strong>carácter simbólico, orientativo y recreativo</strong>.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-serif italic text-white/90">2. Terminología y Alcance</h3>
              <p>Los conceptos utilizados dentro de la aplicación, tales como:</p>
              <ul className="list-disc pl-5 space-y-2 opacity-80 italic">
                <li>“Edad Mental”, “Edad Cognitiva”, “Índice Resonance”, “Brain Age Index”,</li>
                <li>“Animal Espiritual”, “Color de Aura”, “Score Theta”, “Frecuencia Cromática”,</li>
              </ul>
              <p>son <strong>denominaciones narrativas y experimentales</strong>, empleadas con fines expresivos y de visualización, <strong>sin validez clínica ni científica formal</strong>.</p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-serif italic text-white/90">3. Edad del Usuario</h3>
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                <li>La aplicación está destinada a <strong>usuarios de 13 años en adelante</strong>.</li>
                <li>Los menores de 18 años declaran contar con el <strong>consentimiento expreso de su madre, padre o tutor legal</strong> para utilizar la plataforma.</li>
                <li>Benzanox Studios <strong>no se responsabiliza</strong> por el uso de la aplicación por parte de menores sin dicha autorización.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-serif italic text-white/90">4. Uso de Inteligencia Artificial</h3>
              <p>RESONANCE utiliza modelos de inteligencia artificial de terceros para:</p>
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                <li>Analizar respuestas ingresadas por el usuario.</li>
                <li>Generar interpretaciones narrativas y visuales personalizadas.</li>
              </ul>
              <p>Estos resultados:</p>
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                <li>Se generan de forma <strong>automatizada</strong>.</li>
                <li>Pueden contener <strong>imprecisiones, generalizaciones o interpretaciones creativas</strong>.</li>
                <li>No deben ser utilizados para la toma de decisiones médicas, legales, educativas o personales relevantes.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-serif italic text-white/90">5. Responsabilidad del Usuario</h3>
              <p>El usuario acepta:</p>
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                <li>Utilizar la aplicación de forma responsable.</li>
                <li>No interpretar los resultados como verdades absolutas.</li>
                <li>No usar la información obtenida para etiquetar, discriminar o perjudicar a sí mismo/a o a terceros.</li>
              </ul>
              <p>El uso de RESONANCE es <strong>bajo su propia responsabilidad</strong>.</p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-serif italic text-white/90">6. Limitación de Responsabilidad</h3>
              <p>Benzanox Studios no será responsable por:</p>
              <ul className="list-disc pl-5 space-y-2 opacity-80">
                <li>Daños directos o indirectos derivados del uso de la aplicación.</li>
                <li>Decisiones personales tomadas a partir de los resultados.</li>
                <li>Malinterpretaciones del contenido generado por la IA.</li>
              </ul>
              <p>La plataforma se ofrece <strong>“tal cual”</strong>, sin garantías explícitas ni implícitas.</p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-serif italic text-white/90">7. Propiedad Intelectual</h3>
              <p>Todos los elementos de RESONANCE, incluyendo el diseño visual, estético, narrativa, textos, conceptos, código fuente y arquitectura, son propiedad de <strong>Benzanox Studios</strong>, salvo que se indique lo contrario. Queda prohibida su reproducción, modificación o distribución sin autorización expresa.</p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-serif italic text-white/90">8. Privacidad y Datos</h3>
              <p>RESONANCE ha sido diseñada bajo una filosofía de <strong>“Privacidad por Diseño”</strong>.</p>
              <ul className="list-disc pl-5 space-y-4 opacity-80">
                <li><strong>Volatilidad:</strong> La aplicación <strong>no recopila ni almacena datos personales de forma permanente</strong>. La información se procesa de forma <strong>local y volátil</strong>, existiendo únicamente en la memoria del navegador durante la sesión activa.</li>
                <li><strong>IA de Terceros:</strong> Los datos se envían de forma <strong>cifrada</strong> a servicios de IA para generar la narrativa técnica puntual. Benzanox Studios <strong>no crea perfiles</strong> ni mantiene historiales comerciales.</li>
                <li><strong>Sin registro:</strong> No se crean cuentas ni se solicita email. El usuario participa como <strong>visitante anónimo</strong>.</li>
                <li><strong>Cookies:</strong> Se utilizan únicamente archivos temporales estrictamente técnicos necesarios para el funcionamiento de la interfaz.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-serif italic text-white/90">9. Modificaciones</h3>
              <p>Benzanox Studios se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento.</p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-serif italic text-white/90">10. Legislación Aplicable</h3>
              <p>Estos Términos y Condiciones se rigen por las leyes vigentes de la <strong>República del Paraguay</strong>.</p>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-serif italic text-white/90">11. Aceptación</h3>
              <p>El uso continuado de RESONANCE implica la <strong>aceptación plena y consciente</strong> de estos Términos y Condiciones.</p>
            </section>

            <footer className="pt-12 text-center border-t border-white/5 space-y-4">
              <p className="text-2xl font-serif italic text-white/40">RESONANCE</p>
              <p className="text-[10px] tracking-widest opacity-30">UNA EXPERIENCIA. NO UN DIAGNÓSTICO.</p>
              <p className="text-[10px] tracking-widest opacity-30">© BENZANOX STUDIOS</p>
            </footer>
          </div>
          
          <div className="sticky bottom-0 bg-black/80 backdrop-blur-md pt-8 pb-2">
            <button 
              onClick={onClose} 
              className="w-full py-6 bg-white text-black font-black text-[12px] tracking-[0.6em] uppercase rounded-2xl hover:bg-purple-600 hover:text-white transition-all shadow-2xl"
            >
              ACEPTAR PROTOCOLO
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.3); border-radius: 10px; }
      `}</style>
    </div>
  );
};

const SyncSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[600] bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)] animate-pulse"></div>
      <div className="relative z-10 flex flex-col items-center space-y-8">
        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-purple-500 w-full animate-[shimmer_2s_infinite] origin-left scale-x-0 animation-delay-500" style={{ animation: 'syncProgress 2.5s ease-in-out forwards' }}></div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-white text-[11px] tracking-[1em] uppercase font-black animate-pulse">Sincronizando Red Neuronal</h2>
          <p className="text-purple-400/50 text-[9px] font-mono">BZNX_VIRTUAL_CORE_STABLE</p>
        </div>
      </div>
      <style>{`
        @keyframes syncProgress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); opacity: 0.8; }
          100% { transform: scaleX(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const LegalDisclaimer: React.FC<{ onAccept: () => void }> = ({ onAccept }) => (
  <div className="fixed inset-0 z-[400] bg-black flex items-center justify-center p-8">
    <div className="max-w-md text-center space-y-12 animate-in fade-in zoom-in duration-1000">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 animate-pulse"></div>
        <div className="relative text-5xl">⌬</div>
      </div>
      <div className="space-y-4">
        <h2 className="text-[10px] font-black tracking-[0.8em] uppercase text-white/50">Advertencia de Seguridad</h2>
        <p className="text-sm text-white/40 font-light leading-relaxed px-4">
          Está a punto de acceder a una simulación de análisis profundo. Los resultados son narrativos y no clínicos. 
          Benzanox Studios no se responsabiliza por la precisión del "espejo digital" proyectado.
        </p>
      </div>
      <button 
        onClick={onAccept}
        className="group relative px-14 py-5 bg-transparent border border-white/10 overflow-hidden rounded-xl"
      >
        <span className="relative z-10 text-[10px] font-black tracking-[0.5em] text-white group-hover:text-black transition-colors duration-500">AUTORIZAR ACCESO</span>
        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      </button>
    </div>
  </div>
);

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="max-w-5xl w-full mx-auto px-6 py-20 space-y-48 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <section className="text-center space-y-10 relative">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-purple-500/50"></div>
        <div className="space-y-4">
          <span className="text-[9px] font-black tracking-[1em] uppercase text-purple-400/60 block mb-4">The Next Frontier of Self</span>
          <h2 className="text-5xl md:text-8xl font-serif italic text-white/90 leading-[0.9] tracking-tight">
            Descifra la <br/> arquitectura <span className="text-purple-500">invisible.</span>
          </h2>
        </div>
        <p className="text-lg md:text-xl text-white/30 font-light max-w-3xl mx-auto leading-relaxed italic">
          RESONANCE utiliza pulsos de lógica y semántica para cartografiar tu madurez mental a través de un prisma digital único en su clase.
        </p>
      </section>

      {/* Core Features Grid */}
      <div className="grid md:grid-cols-3 gap-12 relative">
        {[
          { title: "Quantum Analysis", desc: "Algoritmos que interpretan el subtexto de tus decisiones más allá de lo evidente.", code: "0x33A2" },
          { title: "Neural Mirror", desc: "Una proyección simbólica de tu 'yo' digital procesada en tiempo real.", code: "BZNX_MIR" },
          { title: "Legacy Core", desc: "Basado en los protocolos de evaluación de madurez de Benzanox Studios v.2.6.", code: "SYS_LEG" }
        ].map((item, i) => (
          <div key={i} className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-purple-500/40 transition-all duration-700 group relative overflow-hidden">
            <div className="absolute top-4 right-6 text-[8px] font-mono text-white/10 group-hover:text-purple-400/30 transition-colors">{item.code}</div>
            <h3 className="text-[11px] font-black tracking-[0.4em] uppercase mb-6 text-white group-hover:text-purple-400 transition-colors">{item.title}</h3>
            <p className="text-sm text-white/40 leading-relaxed font-light">{item.desc}</p>
            <div className="mt-8 h-px w-0 bg-purple-500 group-hover:w-full transition-all duration-1000"></div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onStart} 
          className="group relative px-24 py-10 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
        >
          <div className="absolute inset-0 bg-white transition-all duration-500 group-hover:bg-purple-600"></div>
          <span className="relative z-10 text-black group-hover:text-white font-black tracking-[1em] uppercase text-xs transition-colors duration-500">INICIAR RESONANCIA</span>
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-400/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
        </button>
      </div>

      {/* Future Functions Section */}
      <section className="space-y-20">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <h3 className="text-[12px] font-black tracking-[1em] uppercase text-white/80">Future Neural Nodes</h3>
          <p className="text-sm text-white/20 italic font-light">Evolución en desarrollo por Benzanox Labs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              id: "01", 
              title: "Personalidad", 
              desc: "Analiza rasgos profundos para verificar si tu carácter coincide con tu edad cronológica.", 
              status: "Neural Locked",
              accent: "from-blue-500/20"
            },
            { 
              id: "02", 
              title: "Progreso", 
              desc: "Visualiza mediante gráficas biométricas cómo evoluciona tu madurez mental con el tiempo.", 
              status: "Data Mining",
              accent: "from-purple-500/20"
            },
            { 
              id: "03", 
              title: "Juegos", 
              desc: "Desafía tu sinapsis con puzles de lógica y memoria diseñados para ejercitar el núcleo cerebral.", 
              status: "Core Testing",
              accent: "from-emerald-500/20"
            },
            { 
              id: "04", 
              title: "Retos", 
              desc: "Protocolos diarios de optimización para mejorar hábitos y agilidad mental reactiva.", 
              status: "Behavioral Sync",
              accent: "from-orange-500/20"
            }
          ].map((item, i) => (
            <div key={i} className="group relative glass-card p-8 rounded-[2rem] border-white/5 overflow-hidden transition-all duration-500 hover:translate-y-[-5px]">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-purple-400/40">NODE_{item.id}</span>
                  <span className="text-[8px] px-2 py-1 border border-white/10 rounded-full text-white/30 uppercase tracking-widest">{item.status}</span>
                </div>
                
                <h4 className="text-2xl font-serif italic text-white/90 group-hover:text-white transition-colors">{item.title}</h4>
                <p className="text-[11px] leading-relaxed text-white/40 group-hover:text-white/60 transition-colors font-light">
                  {item.desc}
                </p>

                <div className="pt-4 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-purple-500 animate-pulse"></div>
                  <div className="h-[1px] flex-grow bg-white/5"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center opacity-20">
        <p className="text-[9px] tracking-[0.6em] uppercase text-white font-thin">Protocolo Experimental // Acceso Restringido</p>
      </div>
    </div>
  );
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('DISCLAIMER');
  const [result, setResult] = useState<ResonanceAnalysis | null>(null);
  const [userName, setUserName] = useState('');
  const [ageConsent, setAgeConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Date states
  const [birthDay, setBirthDay] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  
  const [showAgeCheck, setShowAgeCheck] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const calculatePreciseAge = () => {
    const day = parseInt(birthDay);
    const month = parseInt(birthMonth);
    const year = parseInt(birthYear);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) return 0;
    
    const today = new Date();
    let age = today.getFullYear() - year;
    const m = today.getMonth() + 1 - month;
    if (m < 0 || (m === 0 && today.getDate() < day)) {
        age--;
    }
    return age;
  };

  const isMinor = () => {
    const age = calculatePreciseAge();
    return age >= 13 && age < 18;
  };

  const handleReset = () => {
    setBirthDay('');
    setBirthMonth('');
    setBirthYear('');
    setAgeConsent(false);
    setShowAgeCheck(false);
    setUserName('');
    setResult(null);
    setAppState('HOME');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartEvaluation = () => {
    const day = parseInt(birthDay);
    const month = parseInt(birthMonth);
    const year = parseInt(birthYear);
    const currentYear = new Date().getFullYear();
    
    // Validation
    if (!birthDay || !birthMonth || !birthYear) return;
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > currentYear) {
      alert("Por favor, ingresa una fecha válida.");
      return;
    }
    
    const age = calculatePreciseAge();
    if (age < 13) {
      alert("Lo sentimos, RESONANCE está disponible para mayores de 13 años.");
      return;
    }
    if (!termsAccepted) { 
      alert("Debes aceptar los Términos para continuar."); 
      return; 
    }
    if (isMinor() && !ageConsent) { 
      alert("Se requiere consentimiento parental."); 
      return; 
    }
    setAppState('QUIZ');
  };

  const handleFormSubmit = async (formData: { nombre: string; respuestas: any[] }) => {
    setAppState('LOADING');
    setUserName(formData.nombre);
    const age = calculatePreciseAge();
    
    try {
      const payload: UserFormData = {
        nombre: formData.nombre,
        edad_real: age,
        respuestas: formData.respuestas
      };

      const analysis = await analyzeResonance(payload);
      if (isMinor()) {
         analysis.theta_score = 0;
         analysis.perfil_experimental.brain_age_gap = "Análisis Exploratorio (Protocolo Juvenil)";
      }
      setTimeout(() => {
        setResult(analysis);
        setAppState('RESULT');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 4000);
    } catch (err) {
      console.error(err);
      setAppState('QUIZ');
    }
  };

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <div className="min-h-screen relative flex flex-col items-center py-12 px-4 md:px-8">
      {appState === 'DISCLAIMER' && <LegalDisclaimer onAccept={() => setAppState('INTRO')} />}
      {appState === 'INTRO' && <SyncSequence onComplete={() => setAppState('LANDING')} />}
      {appState === 'SYNC' && <SyncSequence onComplete={() => setAppState('HOME')} />}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      
      <header className="relative text-center mb-8 z-20 flex flex-col items-center mt-12 transition-all duration-1000">
        <div className="relative group select-none">
          <div className="logo-halo opacity-40 group-hover:opacity-80 transition-all duration-1000"></div>
          
          <div className="absolute -top-10 -right-16 md:-top-4 md:-right-24 px-3 py-1 bg-purple-500/10 border border-purple-500/30 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(168,85,247,0.2)] animate-pulse z-30 transform rotate-12 pointer-events-none select-none">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-purple-400">BETA</span>
          </div>

          <h1 
            className="resonance-logo cursor-pointer" 
            onClick={() => handleReset()}
          >
            RESONANCE
          </h1>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="h-px w-4 bg-purple-500/40"></div>
          <p className="text-[9px] tracking-[1.2em] uppercase opacity-60 font-black text-white ml-2">Experimental Neuro-Core</p>
          <div className="h-px w-4 bg-purple-500/40"></div>
        </div>
      </header>

      <main className="w-full max-w-5xl z-10 relative flex-grow flex flex-col justify-center">
        {appState === 'LANDING' && <LandingPage onStart={() => setAppState('SYNC')} />}
        
        {appState === 'HOME' && (
          <div className="flex flex-col items-center space-y-12 py-10 animate-in fade-in slide-in-from-top-4 duration-1000 max-w-2xl mx-auto w-full">
            {!showAgeCheck ? (
              <div className="w-full flex flex-col items-center space-y-8">
                 <div className="text-center space-y-4">
                    <h3 className="text-3xl font-serif italic text-white/90">Bienvenido al Portal</h3>
                    <p className="text-sm text-white/40 font-light italic">Inicia el escaneo cronológico para calibrar el motor.</p>
                 </div>
                 <button 
                  onClick={() => setShowAgeCheck(true)} 
                  className="group relative overflow-hidden bg-white py-8 px-24 rounded-2xl text-[12px] font-black tracking-[0.6em] uppercase text-black transition-all hover:bg-purple-600 hover:text-white"
                >
                  CONFIGURAR ACCESO
                </button>
              </div>
            ) : (
              <div className="glass-card p-12 rounded-[3.5rem] w-full space-y-10 border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[60px]"></div>
                <div className="text-center space-y-3 relative z-10">
                  <h3 className="text-[10px] font-black tracking-[0.5em] uppercase text-purple-400">Verificación Biométrica</h3>
                  <p className="text-xs text-white/30 italic">Determina tu posición exacta en la línea temporal.</p>
                </div>
                
                <div className="space-y-8 text-white relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] opacity-40 ml-2 font-bold">Día</label>
                      <input 
                        type="number" 
                        min="1" max="31"
                        placeholder="DD" 
                        className="w-full bg-white/5 border-b-2 border-white/10 p-4 text-2xl text-center focus:outline-none focus:border-purple-500 transition-colors font-serif italic" 
                        value={birthDay} 
                        onChange={(e) => setBirthDay(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] opacity-40 ml-2 font-bold">Mes</label>
                      <select 
                        className="w-full bg-white/5 border-b-2 border-white/10 p-4 text-xl text-center focus:outline-none focus:border-purple-500 transition-colors font-serif italic appearance-none cursor-pointer" 
                        value={birthMonth} 
                        onChange={(e) => setBirthMonth(e.target.value)}
                      >
                        <option value="" className="bg-black">Seleccionar</option>
                        {months.map((m, i) => (
                          <option key={i+1} value={i+1} className="bg-black">{m}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] opacity-40 ml-2 font-bold">Año</label>
                      <input 
                        type="number" 
                        placeholder="YYYY" 
                        className="w-full bg-white/5 border-b-2 border-white/10 p-4 text-2xl text-center focus:outline-none focus:border-purple-500 transition-colors font-serif italic" 
                        value={birthYear} 
                        onChange={(e) => setBirthYear(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-5 p-5 bg-white/[0.03] rounded-3xl border border-white/5 hover:border-white/20 transition-all">
                      <input type="checkbox" id="terms-check" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 accent-purple-500 h-5 w-5 rounded-full" />
                      <label htmlFor="terms-check" className="text-[10px] uppercase tracking-[0.2em] text-white/50 cursor-pointer select-none leading-relaxed">ACEPTO LOS <button onClick={(e) => { e.preventDefault(); setIsTermsOpen(true); }} className="text-purple-400 underline decoration-purple-500/30 underline-offset-4 font-black">Términos del Portal</button></label>
                    </div>
                    
                    {birthYear && isMinor() && (
                      <div className="flex items-start gap-5 p-5 bg-purple-500/10 border border-purple-500/20 rounded-3xl animate-in slide-in-from-top-4">
                        <input type="checkbox" id="parent-check" checked={ageConsent} onChange={(e) => setAgeConsent(e.target.checked)} className="mt-1 accent-purple-500 h-5 w-5" />
                        <label htmlFor="parent-check" className="text-[10px] uppercase tracking-[0.2em] text-white/60 cursor-pointer leading-relaxed italic">Autorización parental confirmada para sujeto menor de edad.</label>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4 space-y-4">
                    <button 
                      onClick={handleStartEvaluation} 
                      disabled={!birthDay || !birthMonth || !birthYear || !termsAccepted || (isMinor() && !ageConsent)} 
                      className="w-full py-7 bg-white text-black font-black tracking-[0.4em] uppercase rounded-2xl disabled:opacity-5 transition-all hover:bg-purple-600 hover:text-white active:scale-95 shadow-2xl"
                    >
                      ABRIR RESONANCIA
                    </button>
                    <button onClick={() => setShowAgeCheck(false)} className="w-full text-[9px] tracking-[0.4em] text-white/20 uppercase hover:text-white/40 transition-colors">Volver</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {appState === 'QUIZ' && (
          <section className="glass-card p-12 rounded-[3.5rem] max-w-2xl mx-auto w-full border-white/5 shadow-2xl">
            <ResonanceForm onSubmit={handleFormSubmit} />
          </section>
        )}

        {appState === 'LOADING' && (
          <div className="flex flex-col items-center py-24 space-y-12 text-white">
            <div className="relative">
              <div className="w-32 h-32 border-2 border-purple-500/5 rounded-full animate-ping absolute inset-0"></div>
              <div className="w-32 h-32 border-4 border-t-purple-500 border-white/5 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center space-y-3">
              <p className="text-[12px] tracking-[0.8em] uppercase opacity-70 animate-pulse font-black">Procesando Espectro</p>
              <p className="text-[9px] tracking-[0.3em] uppercase opacity-30 font-mono">Desfragmentando arquetipos emocionales...</p>
            </div>
          </div>
        )}

        {appState === 'RESULT' && result && (
          <div className="max-w-2xl mx-auto w-full animate-in fade-in duration-1000">
            <ResultView analysis={result} nombre={userName} onReset={() => handleReset()} isMinor={isMinor()} />
          </div>
        )}
      </main>

      <footer className="mt-auto pt-24 pb-12 flex flex-col items-center w-full max-w-5xl text-center space-y-10 border-t border-white/5">
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.3em] text-white/30 font-light leading-relaxed">
            © 2026 BENZANOX STUDIOS. TECNOLOGÍA EXPERIMENTAL PARA LA CONCIENCIA HUMANA.
          </p>
          <div className="flex gap-8 justify-center">
             <button onClick={() => setIsTermsOpen(true)} className="text-[9px] tracking-[0.5em] text-white/20 uppercase hover:text-purple-400 transition-colors">Legal</button>
             <span className="text-white/5">|</span>
             <span className="text-[9px] tracking-[0.5em] text-white/20 uppercase">Beta 0.9.8</span>
          </div>
        </div>
        <div className="text-2xl opacity-10 font-serif italic tracking-widest">Benzanox</div>
      </footer>
    </div>
  );
};

export default App;
