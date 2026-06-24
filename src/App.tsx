import { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { 
  Shield, 
  Dumbbell, 
  RotateCcw, 
  Cpu, 
  Navigation, 
  Activity, 
  Layers, 
  BookOpen, 
  Eye, 
  ChevronRight, 
  Info, 
  Scale, 
  Compass, 
  Zap, 
  CheckCircle, 
  Flame, 
  Book,
  Anchor,
  Shuffle,
  GitBranch,
  TrendingUp,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  ChevronUp,
  CameraOff
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  IMAGES, 
  bjjFanaticsCourses, 
  technicalExplanations, 
  flowchartNodesDetail, 
  gppRoutines, 
  stretches, 
  buggyNormalVectors, 
  buggyInvertedVectors, 
  buggyOneHandVectors,
  FlowNodeInfo
} from './data';

interface SafeBJJImageProps {
  src: string;
  alt: string;
  placeholderText: string;
  className?: string;
  referrerPolicy?: string;
}

function SafeBJJImage({ src, alt, placeholderText, className = "", referrerPolicy }: SafeBJJImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`bg-slate-950/80 border border-dashed border-[#ff4444]/30 rounded-xl flex flex-col items-center justify-center p-4 text-center min-h-[140px] ${className}`}>
        <div className="p-2.5 rounded-full bg-rose-500/10 text-rose-400 mb-2">
          <CameraOff className="w-4 h-4" />
        </div>
        <span className="text-white font-mono font-extrabold text-[11px] tracking-wider block uppercase">
          {`[${placeholderText}]`}
        </span>
        <span className="text-[9px] text-[#94a3b8]/70 mt-1 font-sans">
          Imagen Real Preservada
        </span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      referrerPolicy={referrerPolicy || "no-referrer"}
      onError={() => {
        setError(true);
      }}
      className={className} 
    />
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('biomechanics');
  
  // Interactive Vectors State
  const [selectedVector, setSelectedVector] = useState<string>('bn-f1');
  const [selectedVectorInv, setSelectedVectorInv] = useState<string>('bi-f1');
  const [selectedVectorHand, setSelectedVectorHand] = useState<string>('bh-f1');
  
  // Interactive Playbook Scramble States
  const [selectedPlaybookCat, setSelectedPlaybookCat] = useState<string>('controlLateral');
  const [activeScrambleNode, setActiveScrambleNode] = useState<string>('cl');

  // GPP States
  const [userWeight, setUserWeight] = useState<number>(78);
  const [selectedCourse, setSelectedCourse] = useState<number>(0);

  // Collapsible BJJ Fanatics Course States
  const [activeInstructorIndex, setActiveInstructorIndex] = useState<number | null>(0);
  const [activeVolumeKey, setActiveVolumeKey] = useState<string | null>(null);
  const [expandedChapterKey, setExpandedChapterKey] = useState<string | null>(null);

  // Flowchart Zoom State
  const [flowchartZoom, setFlowchartZoom] = useState<number>(1.4);

  // Selected Explanation State (Buggy vs Octopus)
  const [selectedExpl, setSelectedExpl] = useState<'buggy' | 'octopus'>('buggy');
  const [activeTransitionStep, setActiveTransitionStep] = useState<'octToBug' | 'bugToOct'>('octToBug');

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    const mqStandAlone = '(display-mode: standalone)';
    if (window.matchMedia(mqStandAlone).matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsStandalone(true);
      }
      setDeferredPrompt(null);
    } else {
      alert("Para instalar la app en su dispositivo:\n\n📱 iOS (Safari): Toque el botón de Compartir y seleccione 'Añadir a la pantalla de inicio'.\n\n🤖 Android (Chrome): Toque el menú de opciones (tres puntos) y seleccione 'Instalar aplicación' o 'Añadir a pantalla de inicio'.");
    }
  };

  // Script to dynamically load and initialize Mermaid.js
  useEffect(() => {
    const loadMermaid = () => {
      // @ts-ignore
      if (window.hasOwnProperty('mermaid')) {
        // @ts-ignore
        window.mermaid.initialize({
          startOnLoad: true,
          theme: 'dark',
          securityLevel: 'loose',
          flowchart: { useMaxWidth: false, htmlLabels: true }
        });
        // @ts-ignore
        window.mermaid.contentLoaded();
      } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js';
        script.async = true;
        script.onload = () => {
          // @ts-ignore
          window.mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            securityLevel: 'loose',
            flowchart: { useMaxWidth: false, htmlLabels: true }
          });
          // @ts-ignore
          window.mermaid.contentLoaded();
        };
        document.head.appendChild(script);
      }
    };
    
    loadMermaid();
  }, [activeTab]);

  // Carotid pressure calculator relative to weight
  const getEstimatedCarotidPressure = (weight: number) => {
    const baselinePSI = (weight * 0.14).toFixed(1);
    const numericPSI = parseFloat(baselinePSI);
    let level = 'Leve (Compresión venosa)';
    let color = 'text-blue-400';
    
    if (numericPSI > 12) {
      level = 'Crítico (Oclusión Carotídea Súbita)';
      color = 'text-rose-500 font-extrabold animate-pulse';
    } else if (numericPSI > 9) {
      level = 'Moderado-Alto (Compresión Arterial Parcial)';
      color = 'text-amber-400 font-bold';
    }
    
    return { psi: numericPSI, level, color };
  };

  const currentEstimatedPressure = getEstimatedCarotidPressure(userWeight);

  // Mermaid.js code dynamically updated to reflect scanned notes and tactics
  const flowchartCode = `
graph TD
    %% Estilos de Nudos
    classDef mainNode fill:#1e1b4b,stroke:#a475f5,stroke-width:2px,color:#fff;
    classDef actionNode fill:#11141d,stroke:#a475f5,stroke-width:1px,color:#94a3b8;
    classDef crucialNode fill:#450a0a,stroke:#f43f5e,stroke-width:2px,color:#fff;
    classDef successNode fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#fff;

    %% Estilos de Líneas
    linkStyle default stroke:#a475f5,stroke-width:2px,fill:none;

    cl[Control Lateral Bottom]:::mainNode --> ke_scape[Knee-Elbow Escape: Brazo en underhook]:::actionNode
    cl --> arm_abdominal[Brazo superior del rival en tu Abdomen]:::actionNode

    ke_scape --> head_push[Empujar su cabeza hacia afuera como Cebo]:::actionNode
    head_push --> over_press[Rival ejerce Sobrepresión]:::actionNode
    over_press --> ghost_darce[Ghost-Escape a D'Arce]:::crucialNode
    over_press --> target_buggy[Lanzar Pierna y Atrapada Buggy]:::crucialNode

    arm_abdominal --> fns_frame[Tirar brazo exterior + Frame Norte-Sur / Tibia Interna]:::actionNode
    fns_frame --> triangle_direct[Transición a Triángulo / Guardia]:::successNode
    fns_frame --> ns_buggy[North-South Buggy]:::successNode

    hs_shield[Media Guardia / Knee-Shield]:::mainNode --> frame_bicep[Frame Manual al Bíceps]:::actionNode
    frame_bicep --> bicep_slicer[Bicep Slicer Inverso]:::crucialNode
    frame_bicep --> arm_over_head[Apoyo de Mano: Tirar brazo del rival sobre tu Cabeza]:::actionNode

    arm_over_head --> arm_push_floor[Rival presiona hacia el Suelo]:::actionNode
    arm_push_floor --> hip_escape_buggy[Hip Escape: Rodilla rodea hombro a la cabeza -> Buggy]:::successNode

    arm_over_head --> hand_down_post[Rival deja Mano Abajo firme]:::actionNode
    hand_down_post --> octopus_entry[Octopus Guard Entry]:::crucialNode
    octopus_entry --> tech_standup[Technical Stand-up: Apoyando codo]:::actionNode
    tech_standup --> backtake[Girar e infiltrar ganchos a la Espalda]:::successNode
    tech_standup --> sweep_seal[Raspado / Seal Slide Sweep]:::successNode

    guard_active[Guardia Abierta Activa]:::mainNode --> scarecrow[Scarecrow Control: Rodilla atrapa codo del rival]:::crucialNode
    scarecrow --> bicep_slicer_g[Bicep Slicer / Triángulo / Buggycana]:::successNode

    target_buggy --> lock_buggy[Candado Buggy Establecido]:::mainNode
    lock_buggy --> def_stand[Rival Superior se Yergue / Intenta Slam]:::actionNode
    def_stand --> xguard_entry[Agarre Pierna Lejana -> X-Guard -> Sweep & Leglocks]:::successNode
    def_stand --> buggy_sweep[Apretón Oblicuo -> Buggy Sweep hacia arriba]:::successNode

    lock_buggy --> def_forearm[Antebrazo al Cuello del defensor]:::actionNode
    def_forearm --> wrist_twist[Control Muñeca + Giro Cabeza excéntrico]:::actionNode

    lock_buggy --> def_vonflue[Presión hombro Von Flue]:::actionNode
    def_vonflue --> hip_push_break[Empujar caderas para romper postura y centro de base]:::actionNode

    lock_buggy --> finish_3p[Mecánica 3-Puntos: 1. Squeeze, 2. Rodilla arriba, 3. Mirar atrás]:::crucialNode
    finish_3p --> TAPOUT[Oclusión de Carótidas: Tapout Hidráulico]:::successNode
  `;

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e8f0] font-sans antialiased selection:bg-[#ff4444] selection:text-white pb-12">
      
      {/* ══ HEADER ESTÉTICA SCI-FI DARK DIALECT ══ */}
      <header className="relative border-b border-white/5 bg-[#0b0d13]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-[#ff4444]/20 animate-ping" />
              <div className="bg-[#ff4444]/10 border border-[#ff4444]/40 p-2.5 rounded-full text-[#ff4444] relative z-10">
                <Shield className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded border border-rose-500/20 font-bold uppercase">NO-GI SYSTEM</span>
                <span className="text-[10px] font-mono tracking-widest bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold uppercase">BIOMECHANICAL ANALYTICS</span>
              </div>
              <h1 className="text-xl font-black text-white tracking-tight mt-0.5">BUGGY CHOKE & OCTOPUS GUARD</h1>
            </div>
          </div>

          {/* INDICADORES ACADÉMICOS Y PWA */}
          <div className="flex items-center gap-4 text-xs font-mono flex-wrap justify-end">
            {!isStandalone && (
              <button
                onClick={handleInstallClick}
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 transition-colors font-bold border border-purple-400/50 shadow-[0_0_10px_rgba(168,85,247,0.3)] animate-pulse"
              >
                <Zap className="w-3.5 h-3.5" />
                INSTALAR APP
              </button>
            )}
            <div className="bg-black/40 border border-white/5 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/60 hidden md:inline">BJJ Fanatics Curriculums:</span> 
              <span className="text-white font-bold">2 Cursos</span>
            </div>
            <div className="bg-black/40 border border-white/5 px-3 py-1.5 rounded-lg hidden sm:flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#ff4444]" />
              <span className="text-white/60 hidden md:inline">OCR Data:</span> 
              <span className="text-rose-400 font-bold">Map</span>
            </div>
          </div>

        </div>
      </header>

      {/* ══ PANEL CENTRAL CON CONTENEDOR FLUIDO ══ */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-8 space-y-8">
        
        {/* NAVEGACIÓN DE TABS EXCLUSIVOS */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#0b0d13] border border-white/5 rounded-xl">
          {[
            { id: 'biomechanics', label: '1. Academia BJJ Fanatics', icon: BookOpen },
            { id: 'dilemma', label: '2. El Dilema Cinético', icon: Shuffle },
            { id: 'scrambles', label: '3. Scrambles & Playbook', icon: GitBranch },
            { id: 'flowchart', label: '4. Flowchart de Conexión', icon: Compass },
            { id: 'vector', label: '5. Análisis de Fuerzas', icon: Activity },
            { id: 'gpp', label: '6. Planificación GPP', icon: Dumbbell },
            { id: 'stretches', label: '7. Rejilla Movilidad PDF', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold font-mono transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#ff4444]/15 text-white border border-[#ff4444]/30 shadow-md shadow-[#ff4444]/5'
                    : 'text-[#94a3b8] hover:text-white hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-[#ff4444]' : 'text-[#94a3b8]'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'biomechanics' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* INTRODUCCIÓN GENERAL ACADÉMICA */}
            <div className="bg-[#11141d] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4444]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-3xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff4444] font-bold">INTRODUCCIÓN TÉCNICA</span>
                <h2 className="text-3xl font-black text-white tracking-tight mt-1 mb-4">La Fusión de la Física de Palancas y el Grappling de Élite</h2>
                <p className="text-sm text-[#94a3b8] leading-relaxed text-justify font-sans">
                  Bienvenido a la enciclopedia técnica definitiva. Este sistema interactivo recopila las estrategias y tácticas de los mayores campeones de sumisión del mundo. Aquí explicamos de forma sumamente sencilla las mecánicas de los cursos de <strong className="text-white">BJJ Fanatics</strong> dictados por <span className="text-rose-400">Jacob &quot;Jay Rod&quot; Rodriguez, Craig Jones, Kade &amp; Tye Ruotolo, Paulo Marmund, Adam Wardzinski, Eduardo Telles, Rene Sousa y Gordon Ryan</span>, junto a tus rutinas de acondicionamiento físico de Excel y estiramientos críticos. Navega usando las pestañas superiores para descubrir todos los detalles.
                </p>
              </div>
            </div>

            {/* CURRICULUMS DETALLADOS BJJ FANATICS - ACORDEÓN INTERACTIVO COMPLETO */}
            <div className="bg-[#11141d] border border-white/5 rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2">
                <Book className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="text-lg font-black text-white">Directorio e Índices de Cursos Especiales (BJJ Fanatics)</h3>
                  <p className="text-xs text-[#94a3b8] mt-0.5 font-sans">Haz clic en cada instructor para ver su manual instructivo y abrir las lecciones en listados desplegables.</p>
                </div>
              </div>

              {/* LISTA ACORDEÓN DE ENTRENADORES */}
              <div className="space-y-4">
                {bjjFanaticsCourses.map((course, idx) => {
                  const isInstructorOpen = activeInstructorIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                        isInstructorOpen 
                          ? 'border-purple-500/35 bg-black/40 shadow-2xl' 
                          : 'border-white/5 bg-black/20 hover:border-white/10 hover:bg-black/30'
                      }`}
                    >
                      {/* ENCABEZADO DEL ACORDEÓN DE ENTRENADOR */}
                      <button
                        onClick={() => setActiveInstructorIndex(isInstructorOpen ? null : idx)}
                        className="w-full text-left p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-start md:items-center gap-4">
                          {/* FOTO MINIATURA DE ACCIÓN DEL PROPIO ENTRENADOR */}
                          <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-black shrink-0">
                            <SafeBJJImage 
                              src={course.imageUrl} 
                              alt={course.instructor}
                              placeholderText={course.instructor.replace(/[^a-zA-Z0-9]/g, "")}
                              className="w-full h-full object-cover filter brightness-95" 
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[9px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded uppercase">
                                {course.instructor.includes("Jones") ? "Octopus Specialist" : "Buggy Expert"}
                              </span>
                              <span className="text-[9px] font-mono font-bold bg-white/5 text-white/50 px-2 py-0.5 rounded uppercase">
                                {course.volumes.length} VOLÚMENES
                              </span>
                            </div>
                            <h4 className="text-white font-extrabold text-sm md:text-md mt-1 mb-0.5">
                              {course.instructor} — <span className="text-purple-400 font-black">{course.courseTitle}</span>
                            </h4>
                            <p className="text-xs text-[#94a3b8] line-clamp-1 max-w-xl font-sans">
                              {course.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-center">
                          <span className="text-xs font-mono text-white/30 hidden sm:inline">
                            {isInstructorOpen ? "Cerrar curso" : "Ver lecciones"}
                          </span>
                          <span className={`p-2 rounded-lg ${isInstructorOpen ? 'bg-purple-500/10 text-purple-400' : 'bg-white/5 text-white/40'}`}>
                            {isInstructorOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </span>
                        </div>
                      </button>

                      {/* CUERPO DEL ACORDEÓN DE ENTRENADOR */}
                      {isInstructorOpen && (
                        <div className="p-6 border-t border-white/5 bg-[#0d0f14]/55 grid lg:grid-cols-12 gap-6 animate-fadeIn">
                          
                          {/* DESCRIPCIÓN E IMAGEN DESTACADA DEL CURSO */}
                          <div className="lg:col-span-4 space-y-4">
                            <div className="bg-[#161a24]/80 p-4 rounded-xl border border-white/5 space-y-3">
                              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">ENFOQUE DEL CURSO:</span>
                              <p className="text-xs text-[#94a3b8] leading-relaxed text-justify font-sans">
                                {course.description}
                              </p>
                            </div>
                            
                            <div className="relative rounded-xl border border-white/10 overflow-hidden bg-black shadow-lg">
                              <SafeBJJImage 
                                src={course.imageUrl} 
                                alt={`${course.instructor} manual`}
                                placeholderText={course.instructor.replace(/[^a-zA-Z0-9]/g, "") + "Manual"}
                                className="w-full h-auto aspect-video object-cover" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-3">
                                <span className="text-[9px] font-mono text-white/60">
                                  Foto real — {course.courseTitle}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* VOLÚMENES DESPLEGABLES INTERNOS */}
                          <div className="lg:col-span-8 space-y-3">
                            <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">PROGRAMA DE LECCIONES:</span>
                            
                            {course.volumes.map((v, vIdx) => {
                              const volumeKey = `${idx}-${vIdx}`;
                              const isVolumeOpen = activeVolumeKey === volumeKey;
                              return (
                                <div 
                                  key={vIdx} 
                                  className={`rounded-xl border transition-all ${
                                    isVolumeOpen 
                                      ? 'bg-[#161a24] border-purple-500/20' 
                                      : 'bg-black/30 border-white/5 hover:border-white/10'
                                  }`}
                                >
                                  {/* BOTÓN TOGGLE DE VOLUMEN */}
                                  <button
                                    onClick={() => setActiveVolumeKey(isVolumeOpen ? null : volumeKey)}
                                    className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <span className="text-xs font-mono text-amber-400 font-extrabold uppercase">
                                        {v.volume.split(':')[0]}
                                      </span>
                                    </div>
                                    <span className="text-purple-400">
                                      {isVolumeOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                    </span>
                                  </button>

                                  {/* DETALLE DEL VOLUMEN (CAPÍTULOS) */}
                                  {isVolumeOpen && (
                                    <div className="p-0 border-t border-white/5 bg-[#080a0e]/95 overflow-hidden animate-fadeIn">
                                      {/* Cabezal de tabla de capítulos estilo BJJ Fanatics */}
                                      <div className="grid grid-cols-12 gap-4 px-5 py-2.5 bg-black/50 border-b border-white/5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#9dacc3]">
                                        <div className="col-span-9 md:col-span-10">Chapter Title</div>
                                        <div className="col-span-3 md:col-span-2 text-right">Start Time</div>
                                      </div>

                                      <div className="divide-y divide-white/[0.03]">
                                        {v.chapters.map((ch, chIdx) => {
                                          const chapterKey = `${volumeKey}-${chIdx}`;
                                          const isChapterExpanded = expandedChapterKey === chapterKey;
                                          return (
                                            <div key={chIdx} className="group transition-all">
                                              
                                              {/* Fila interactiva principal */}
                                              <button
                                                onClick={() => setExpandedChapterKey(isChapterExpanded ? null : chapterKey)}
                                                className={`w-full text-left px-5 py-3.5 grid grid-cols-12 gap-4 items-center cursor-pointer transition-colors ${
                                                  isChapterExpanded 
                                                    ? 'bg-purple-950/20 text-white' 
                                                    : 'hover:bg-white/[0.02] text-white/90'
                                                }`}
                                              >
                                                {/* Título de Capítulo con Número */}
                                                <div className="col-span-9 md:col-span-10 flex items-start gap-3.5">
                                                  <span className="text-xs font-mono font-extrabold text-[#ff4444]">
                                                    {String(chIdx + 1).padStart(2, '0')}
                                                  </span>
                                                  <div className="space-y-0.5">
                                                    <span className="text-xs font-bold leading-normal group-hover:text-purple-300 transition-colors">
                                                      {ch.title}
                                                    </span>
                                                    {/* Indicador sutil debajo para abrir explicación */}
                                                    <span className="text-[9px] text-[#94a3b8]/50 block flex items-center gap-1">
                                                      <Info className="w-2.5 h-2.5 text-purple-400" />
                                                      {isChapterExpanded ? "Haz clic para cerrar el análisis técnico" : "Haz clic para ver qué enseña este capítulo"}
                                                    </span>
                                                  </div>
                                                </div>

                                                {/* Duración badge */}
                                                <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-2.5 text-right">
                                                  <span className="text-[10px] font-mono font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-md">
                                                    {ch.timestamp}
                                                  </span>
                                                </div>
                                              </button>

                                              {/* Panel de Explicación de Capítulo Desplegable */}
                                              {isChapterExpanded && (
                                                <div className="px-5 pb-4 pt-1 bg-purple-950/10 border-l-2 border-purple-500/60 transition-all font-sans">
                                                  <div className="p-3 rounded-lg bg-black/40 border border-purple-500/10 space-y-1.5 animate-fadeIn">
                                                    <span className="text-[9px] font-mono text-purple-400 font-extrabold uppercase tracking-wide block">
                                                      ANÁLISIS DE EJECUCIÓN BIOMECÁNICA:
                                                    </span>
                                                    <p className="text-xs text-[#94a3b8] leading-relaxed text-left whitespace-pre-line">
                                                      {ch.explanation}
                                                    </p>
                                                  </div>
                                                </div>
                                              )}

                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* ════════════════════ TAB 2: EL DILEMA CINÉTICO ════════════════════ */}
        {activeTab === 'dilemma' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* EXPLICACIÓN DETALLADA DEL DILEMA */}
            <div className="bg-[#11141d] border border-white/5 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Shuffle className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">El Dilema Cinético: Buggy Choke contra Octopus Guard</h2>
                  <p className="text-xs text-[#94a3b8] mt-0.5">Análisis biomecánico del contraataque gravitacional ante la opresión del oponente.</p>
                </div>
              </div>

              {/* SECCIÓN COMPARATIVA DE IMÁGENES EXPLICATIVAS GENERADAS */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                
                {/* TARJETA OCTOPUS */}
                <div className="bg-[#161a24] border border-white/5 rounded-xl overflow-hidden group hover:border-purple-500/20 transition-all">
                  <div className="relative h-64 bg-black overflow-hidden">
                    <SafeBJJImage 
                      src={IMAGES.octopusGuard} 
                      alt="Octopus Guard Setup de Craig Jones" 
                      placeholderText="OctopusGuard"
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161a24] via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 bg-purple-500/80 text-white text-[10px] font-mono font-bold px-2 py-1 rounded">
                      DIAGRAMA MULTI-AXIAL OCTOPUS
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-white font-extrabold text-md flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Octopus Guard: Invasión Dorsal
                    </h3>
                    <p className="text-xs text-[#94a3b8] leading-relaxed text-justify">
                      Infiltrarse bajo la axila para conquistar la línea dorsal. Cuando el oponente retrae la cadera y flota para evitar que tomes su espalda (Backtake), se abre el espacio cinético de transición. Si por el contrario baja el centro de masa para aplastarte... asesta el Buggy Choke de forma inmediata.
                    </p>
                  </div>
                </div>

                {/* TARJETA REVERSE BUGGY */}
                <div className="bg-[#161a24] border border-white/5 rounded-xl overflow-hidden group hover:border-[#ff4444]/20 transition-all">
                  <div className="relative h-64 bg-black overflow-hidden">
                    <SafeBJJImage 
                      src={IMAGES.reverseBuggy} 
                      alt="Reverse Buggy Choke Biomechanics" 
                      placeholderText="ReverseBuggy"
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161a24] via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 bg-rose-500/80 text-white text-[10px] font-mono font-bold px-2 py-1 rounded">
                      TORSIÓN REVERSE BUGGY
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-white font-extrabold text-md flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      Reverse Buggy Choke: Candado Cervical
                    </h3>
                    <p className="text-xs text-[#94a3b8] leading-relaxed text-justify">
                      Si el rival busca escapar del candado frontal proyectándose en dirección contraria sobre tu cadera exterior, cruza el candado en sentido opuesto utilizando la pantorrilla superior como vector oclusor del lado contrario (Torsión cervical y cierre espinal asimétrico).
                    </p>
                  </div>
                </div>

              </div>

              {/* DESCRIPCIÒN ADICIONAL DEL DILEMA */}
              <div className="grid md:grid-cols-3 gap-6 bg-black/20 p-6 rounded-xl border border-white/5 text-xs">
                <div className="space-y-4">
                  <h4 className="text-white font-mono font-extrabold uppercase flex items-center gap-1.5 text-rose-400">
                    <Zap className="w-3.5 h-3.5" />
                    La Trampa Posicional del Oponente
                  </h4>
                  <p className="text-[#94a3b8] leading-relaxed text-justify">
                    Craig Jones describe el dilema como un lazo sin escapatoria. Para que el oponente controle el plano inferior en Side Control, está forzado a presionar con su hombro. Al presionar, su cabeza cae inevitablemente abajo. Si se yergue para recuperar la postura, su cuello queda libre pero cede la espalda al defensor inferior mediante el underhook del brazo lejano hacia la Octopus. Es un sistema cerrado de causa-efecto biomecánico.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-mono font-extrabold uppercase flex items-center gap-1.5 text-purple-400">
                    <Anchor className="w-3.5 h-3.5" />
                    Evitando el Von Flue Counter
                  </h4>
                  <p className="text-[#94a3b8] leading-relaxed text-justify">
                    El gran peligro para el defensor de Buggy es el estrangulamiento Von Flue de contraataque (el oponente clava su hombro contra tu cuello utilizando tu propio abrazo tensor como estrangulador). Al comprender la Octopus Guard, puedes anticipar este aplastamiento. Empujas las caderas para romper su base e infiltras la mano libre para la levantada técnica, transformando una defensa oclusora en un backtake dinámico.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-mono font-extrabold uppercase flex items-center gap-1.5 text-amber-400">
                    <Shuffle className="w-3.5 h-3.5" />
                    Mecánica Real de la Transición (Física de Palancas)
                  </h4>
                  <p className="text-[#94a3b8] leading-relaxed text-justify">
                    <strong>De Octopus a Buggy:</strong> El gatillo es la sobrepresión del rival que busca aplastar tus hombros. Al flexionar su columna hacia adelante, reduce el ojal de su cuello, lo que te permite lanzar la corva poplítea sobre su cráneo de inmediato. <strong>De Buggy a Octopus:</strong> Si el rival posturiza y estira la espalda para quitar la asfixia, libera tu pierna al instante, encaja el underhook profundo bajo su axila libre (ganando el flanco) y siéntate hacia su espalda.
                  </p>
                </div>
              </div>

              {/* SECUENCIA INTERACTIVA DE TRANSICIÓN BIDIRECCIONAL - EL FLUJO DEL DILEMA */}
              <div className="mt-8 bg-gradient-to-r from-purple-950/10 via-rose-950/5 to-purple-950/10 border border-purple-500/15 p-6 rounded-2xl space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 font-bold">
                    TÁCTICA INTERACTIVA DE TRANSICIÓN
                  </span>
                  <h3 className="text-lg font-black text-white mt-1.5 flex items-center gap-2">
                    <Shuffle className="w-5 h-5 text-amber-500" />
                    Cómo Cambiar entre Octopus Guard y Buggy Choke
                  </h3>
                  <p className="text-xs text-[#94a3b8] font-sans mt-0.5">
                    Un combate real es fluido. Selecciona el tipo de transición para entender cómo un intento fallido abre el camino para la otra técnica.
                  </p>
                </div>

                {/* BOTONES DIRECTOS SELECTORES DE SECUENCIA */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTransitionStep('octToBug')}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold font-mono transition-all border flex items-center justify-center gap-2.5 cursor-pointer ${
                      activeTransitionStep === 'octToBug'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-lg'
                        : 'bg-[#0d0f14]/85 text-[#94a3b8] border-white/5 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 shrink-0 text-rose-400" />
                    1. Octopus ➔ Buggy Choke (Te aplasta)
                  </button>
                  <button
                    onClick={() => setActiveTransitionStep('bugToOct')}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold font-mono transition-all border flex items-center justify-center gap-2.5 cursor-pointer ${
                      activeTransitionStep === 'bugToOct'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-lg'
                        : 'bg-[#0d0f14]/85 text-[#94a3b8] border-white/5 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 shrink-0 text-purple-400" />
                    2. Buggy ➔ Octopus Guard (Se escapa)
                  </button>
                </div>

                {/* SECUENCIA EXPLICATIVA ACTUAL */}
                <div className="grid md:grid-cols-3 gap-4">
                  {activeTransitionStep === 'octToBug' ? (
                    <>
                      {/* PASO 1 */}
                      <div className="bg-black/35 p-4 rounded-xl border border-white/5 space-y-2 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-rose-500/5 rounded-bl-full pointer-events-none" />
                        <span className="text-[10px] font-mono font-bold text-rose-400 uppercase">Paso 01 — Ataque Inicial</span>
                        <h5 className="text-white font-extrabold text-xs">Súbete por la espalda</h5>
                        <p className="text-[11px] text-[#94a3b8] leading-relaxed font-sans text-justify">
                          Sacas tu brazo libre por debajo de su axila lejana (underhook) para sentarte y sujetar su cadera, buscando subir por su espalda.
                        </p>
                      </div>
                      {/* PASO 2 */}
                      <div className="bg-black/35 p-4 rounded-xl border border-[#ff4444]/20 space-y-2 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-[#ff4444]/10 rounded-bl-full pointer-events-none" />
                        <span className="text-[10px] font-mono font-bold text-[#ff4444] uppercase">Paso 02 — Reacción del Rival</span>
                        <h5 className="text-white font-extrabold text-xs">El rival te hunde</h5>
                        <p className="text-[11px] text-[#94a3b8] leading-relaxed font-sans text-justify">
                          Sintiendo que gana su espalda, el oponente empuja con todo su peso para aplanarte y evitar que te sientes. Su cabeza cae muy abajo.
                        </p>
                      </div>
                      {/* PASO 3 */}
                      <div className="bg-black/40 p-4 rounded-xl border border-yellow-500/20 space-y-2 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-500/5 rounded-bl-full pointer-events-none" />
                        <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase">Paso 03 — Cierre de Trampa</span>
                        <h5 className="text-white font-extrabold text-xs">Lazo instantáneo</h5>
                        <p className="text-[11px] text-[#94a3b8] leading-relaxed font-sans text-justify">
                          Al estar su cuello tan abajo debido a su presión, cancelas la subida, pasas tu muslo por encima de su cabeza y enganchas tu pierna. ¡Buggy!
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* PASO 1 */}
                      <div className="bg-black/35 p-4 rounded-xl border border-white/5 space-y-2 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-purple-500/5 rounded-bl-full pointer-events-none" />
                        <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">Paso 01 — Ataque Inicial</span>
                        <h5 className="text-white font-extrabold text-xs">Intruduces Buggy</h5>
                        <p className="text-[11px] text-[#94a3b8] leading-relaxed font-sans text-justify">
                          Cierras el lazo/candado del Buggy Choke alrededor de su hombro y cuello, aplicando el estrangulamiento con todas tus fuerzas.
                        </p>
                      </div>
                      {/* PASO 2 */}
                      <div className="bg-black/35 p-4 rounded-xl border border-[#ff4444]/20 space-y-2 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-[#ff4444]/10 rounded-bl-full pointer-events-none" />
                        <span className="text-[10px] font-mono font-bold text-[#ff4444] uppercase">Paso 02 — Reacción del Rival</span>
                        <h5 className="text-white font-extrabold text-xs">Posturiza y rompe ángulo</h5>
                        <p className="text-[11px] text-[#94a3b8] leading-relaxed font-sans text-justify">
                          El rival estira su espalda y levanta la cabeza para quitar presión oclusora. Al levantarse, abre una brecha enorme debajo de su axila.
                        </p>
                      </div>
                      {/* PASO 3 */}
                      <div className="bg-black/40 p-4 rounded-xl border border-green-500/20 space-y-2 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-green-500/5 rounded-bl-full pointer-events-none" />
                        <span className="text-[10px] font-mono font-bold text-green-400 uppercase">Paso 03 — Cierre de Trampa</span>
                        <h5 className="text-white font-extrabold text-xs">Subes por la brecha vacía</h5>
                        <p className="text-[11px] text-[#94a3b8] leading-relaxed font-sans text-justify">
                          Liberas de inmediato tus piernas para evitar lesionarte, metes tu mano profunda en el hueco de su axila y te sientas por su costado.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* CONSEJO DIRECTO DE LOS PROFESORES */}
                <div className="bg-black/45 rounded-xl p-4 border border-purple-500/10 flex items-start gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-amber-400 shrink-0 mt-0.5">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase block">CONSEJO FÁCIL DE CRAIG JONES & JAY ROD:</span>
                    <p className="text-xs text-[#94a3b8] leading-relaxed mt-1 italic font-sans">
                      "No te aferres jamás a una sumisión si el rival cambia su peso. Si el oponente te empuja con fuerza para aplastarte, tu respuesta es el Buggy Choke. Pero si el oponente intenta alejarse para salvar su cuello, libéralo al instante y sube por su espalda con la Octopus. Son la cara y cruz de la misma moneda física."
                    </p>
                  </div>
                </div>
              </div>

              {/* SECCIÓN INTERACTIVA DE GUÍAS EXPLICATIVAS CON IMÁGENES REALES */}
              <div className="mt-8 border-t border-white/5 pt-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-white font-extrabold text-lg flex items-center gap-2">
                      <Book className="w-5 h-5 text-rose-500" />
                      Guías Prácticas de Ejecución (Imágenes de Internet Reales)
                    </h3>
                    <p className="text-xs text-[#94a3b8] font-sans mt-0.5 font-sans">
                      Analiza el paso a paso detallado para ambas técnicas con demostraciones gráficas reales.
                    </p>
                  </div>
                  
                  {/* SELECTOR DE TÉCNICA */}
                  <div className="flex bg-[#0d0f14] p-1 rounded-xl border border-white/5 self-start">
                    <button
                      onClick={() => setSelectedExpl('buggy')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                        selectedExpl === 'buggy'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'text-[#94a3b8] hover:text-white'
                      }`}
                    >
                      Buggy Choke
                    </button>
                    <button
                      onClick={() => setSelectedExpl('octopus')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                        selectedExpl === 'octopus'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'text-[#94a3b8] hover:text-white'
                      }`}
                    >
                      Octopus Guard
                    </button>
                  </div>
                </div>

                {/* CONTENIDO DE LA EXPLICACIÓN SELECCIONADA */}
                {(() => {
                  const data = selectedExpl === 'buggy' ? technicalExplanations.buggyNormal : technicalExplanations.octopusGuard;
                  const imageUrl = selectedExpl === 'buggy' ? IMAGES.buggyNormal : IMAGES.octopusGuard;
                  return (
                    <div className="grid lg:grid-cols-12 gap-8 bg-[#161a24]/50 border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                      {/* INTRODUCCIÓN Y PASOS */}
                      <div className="lg:col-span-7 space-y-6">
                        <div>
                          <span className="text-[10px] font-mono uppercase bg-rose-500/10 text-[#ff4444] px-2 py-1 rounded border border-rose-500/20 font-bold">
                            Mecánica de Sumisión
                          </span>
                          <h4 className="text-xl font-black text-white mt-3">{data.title}</h4>
                          <p className="text-xs text-[#94a3b8] leading-relaxed text-justify mt-2 font-sans">
                            {data.introduction}
                          </p>
                        </div>

                        {/* PASOS */}
                        <div className="space-y-4">
                          {data.details.map((step, sIdx) => (
                            <div key={sIdx} className="flex gap-4 items-start bg-black/20 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                              <span className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                                0{sIdx + 1}
                              </span>
                              <div className="space-y-1">
                                <h5 className="text-white font-extrabold text-xs">{step.subtitle}</h5>
                                <p className="text-xs text-[#94a3b8] leading-relaxed text-justify font-sans">{step.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* IMAGEN DE REFERENCIA REAL DE INTERNET */}
                      <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-white/40 block uppercase">Fotografía Real Demostrativa:</span>
                          <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-black shadow-xl group">
                            <SafeBJJImage 
                              src={imageUrl} 
                              alt="Demostración real de la técnica recopilada de internet" 
                              placeholderText={selectedExpl === 'buggy' ? "BuggyNormal" : "OctopusGuard"}
                              className="w-full h-auto aspect-video object-cover transition-all duration-300 group-hover:scale-102 filter brightness-95" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                              <span className="text-[9px] font-mono text-white/60">
                                Captura técnica extraída de archivo BJJ
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-[#ff4444]/5 border border-[#ff4444]/15 rounded-xl p-4 flex gap-3 items-start">
                          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-rose-400 uppercase block">NOTA DE SEGURIDAD</span>
                            <p className="text-[11px] text-[#94a3b8] leading-normal font-sans">
                              {selectedExpl === 'buggy' 
                                ? "Evita jalar tu propio pie con rudeza. El ajuste debe venir de la flexión abdominal y de acomodar la cadera para no torcer ni lastimar tus ligamentos de rodilla."
                                : "No expongas tu cuello de forma estática al pasar el brazo. El movimiento de escape debe ser explosivo y continuo para que no te atrapen en guillotina."
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>

          </div>
        )}

        {/* ════════════════════ TAB 3: SPARS & SCRAMBLES PLAYBOOK EXPLORER ════════════════════ */}
        {activeTab === 'scrambles' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="bg-[#11141d] border border-white/5 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Activity className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Spars & Scrambles Interactivo: Guía de Movimientos Escaneados</h2>
                  <p className="text-xs text-[#94a3b8] mt-0.5">Haz clic en cada categoría técnica para explorar el paso a paso, biomecánica y transiciones a otras sumisiones.</p>
                </div>
              </div>

              {/* SELECTOR DE ENTRADA / SCENARIO OCRIZADO DE LAS FOTOS */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
                {[
                  { id: 'controlLateral', label: 'Control Lateral', color: 'border-rose-500/20' },
                  { id: 'halfGuard', label: 'Media Guardia', color: 'border-purple-500/20' },
                  { id: 'guardia', label: 'Guardia Activa', color: 'border-emerald-500/20' },
                  { id: 'defensas', label: 'Defensas / Slams', color: 'border-amber-500/20' },
                  { id: 'finalizacion', label: 'Finalización 3-P', color: 'border-blue-500/20' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedPlaybookCat(cat.id);
                      setActiveScrambleNode(flowchartNodesDetail[cat.id][0].id);
                    }}
                    className={`p-3 rounded-lg text-xs font-bold font-mono transition-all text-center border ${
                      selectedPlaybookCat === cat.id
                        ? 'bg-amber-500/15 border-amber-400 text-white'
                        : 'bg-black/30 border-white/5 text-[#94a3b8] hover:bg-black/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* DETALLE MULTI-VENTANA INTERACTIVO DEL SCRAMBLE ESPECÍFICO */}
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                
                {/* LISTADO DE SUB-MOVIMIENTOS / HISTORIAS DEL PDF */}
                <div className="lg:col-span-5 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 block">SUB-MOVIMIENTOS DE LA POSICIÓN</span>
                  
                  {flowchartNodesDetail[selectedPlaybookCat]?.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setActiveScrambleNode(node.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all space-y-1 block ${
                        activeScrambleNode === node.id
                          ? 'bg-[#161a24] border-amber-500/40 text-white'
                          : 'bg-black/20 border-white/5 text-[#94a3b8] hover:bg-black/35'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs">{node.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* VISUALIZADOR DE MÉTODOS Y DETALLES BIOMECÁNICOS */}
                <div className="lg:col-span-7 bg-[#161a24] rounded-2xl border border-white/5 p-6 space-y-4">
                  {(() => {
                    const node = flowchartNodesDetail[selectedPlaybookCat]?.find(n => n.id === activeScrambleNode);
                    if (!node) return null;
                    return (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                          <span className="text-xs font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/25">
                            ID: {node.id.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-[#94a3b8] font-mono uppercase">Detalle del Scramble</span>
                        </div>

                        <div>
                          <h3 className="text-white text-lg font-black">{node.name}</h3>
                          <p className="text-xs text-[#94a3b8] leading-relaxed mt-2 text-justify">
                            {node.description}
                          </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 pt-2">
                          <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1.5">
                            <span className="text-[10px] text-amber-400 font-mono font-bold uppercase block">FUNCIONAMIENTO BIOMECÁNICO</span>
                            <p className="text-xs text-[#94a3b8] leading-relaxed text-justify">{node.biomechanics}</p>
                          </div>
                          
                          <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1.5">
                            <span className="text-[10px] text-[#ff4444] font-mono font-bold uppercase block">CONTRARREMEDIO / VARIACIÓN TÁCTICA</span>
                            <p className="text-xs text-[#94a3b8] leading-relaxed text-justify">{node.counterOption}</p>
                          </div>
                        </div>

                        {node.scramble && (
                          <div className="bg-purple-500/5 p-4 rounded-xl border border-purple-500/20 space-y-1.5">
                            <div className="flex items-center gap-1.5 text-purple-400">
                              <Shuffle className="w-4 h-4" />
                              <span className="text-[10px] font-mono font-bold uppercase">ENCADENAMIENTO DE SUMISIONES & ESCAPE (OCRIZADO)</span>
                            </div>
                            <p className="text-xs text-[#e2e8f0]/90 leading-relaxed text-justify">
                              {node.scramble}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ════════════════════ TAB 4: DIAGRAMA TÁCTICO FLOWCHART (MERMAID) ════════════════════ */}
        {activeTab === 'flowchart' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="bg-[#11141d] border border-white/5 rounded-2xl p-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-[#ff4444]/10 text-[#ff4444]">
                    <GitBranch className="w-5 h-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Flowchart Biomecánico del Ecosistema de Grappling</h2>
                    <p className="text-xs text-[#94a3b8] mt-0.5">Hitos de decisión cinemática destilados de las notas tácticas del usuario.</p>
                  </div>
                </div>
                <div className="hidden sm:block text-[10px] text-white/40 font-mono">
                  RENDERED DYNAMICALLY WITH MERMAID.JS
                </div>
              </div>

              {/* CONTROLES DE ZOOM DEL DIAGRAMA Y CONTENEDOR */}
              <div className="p-4 bg-[#090b11] border border-white/5 rounded-xl min-h-[480px] relative overflow-hidden group">
                <TransformWrapper
                  initialScale={1}
                  minScale={0.1}
                  maxScale={8}
                  centerOnInit={true}
                  wheel={{ step: 0.1 }}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      <div className="absolute top-4 right-4 z-10 flex gap-2 bg-black/60 p-2 rounded-lg border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => zoomOut()}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 text-white transition-all cursor-pointer"
                          title="Alejar"
                        >
                          <ZoomOut className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => resetTransform()}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white font-mono text-[10px] uppercase font-bold tracking-wider transition-all"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => zoomIn()}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 text-white transition-all cursor-pointer"
                          title="Acercar"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                      </div>

                      <TransformComponent wrapperStyle={{ width: "100%", height: "100%", minHeight: "480px" }}>
                        <div 
                          className="mermaid text-sm cursor-grab active:cursor-grabbing inline-block"
                        >
                          {flowchartCode}
                        </div>
                      </TransformComponent>
                    </>
                  )}
                </TransformWrapper>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6 text-xs text-[#94a3b8] leading-relaxed">
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <strong className="text-white font-mono block mb-1">MÉTODO DE LECTURA</strong>
                  Siga los nodos de color púrpura oscuro para entradas fundamentales del sistema, y examine las ramificaciones de reacción del oponente.
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <strong className="text-white font-mono block mb-1">CÓDIGO DE COLOR ROJO</strong>
                  Los cuadros de contorno rojo denotan puntos críticos donde suspender o pivotar la mecánica para evitar sumisiones letales en contra.
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <strong className="text-white font-mono block mb-1">CÓDIGO VERDE EXTRAS</strong>
                  Los cuadros verdes representan sumisiones oclusoras exitosas secundarias, barridos y escapes limpios a la espalda.
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ════════════════════ TAB 5: ANÁLISIS DE FUERZAS VECTORIALES (INTERACTIVO COMPLETO) ════════════════════ */}
        {activeTab === 'vector' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="bg-[#11141d] border border-white/5 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-[#ff4444]/10 text-[#ff4444]">
                  <Activity className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Análisis de Vectores, Comoresiones y Torques Mecánicos</h2>
                  <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">SELECCIONE CADA FUERZA EN LAS TRES VARIANTES PARA DIAGNOSTICAR EL APALANCAMIENTO FISIOLÓGICO</p>
                </div>
              </div>

              {/* REJILLA DE LAS TRES VARIANTES */}
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* VARIANTE 1: BUGGY NORMAL */}
                <div className="bg-[#161a24] p-5 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h3 className="text-white font-extrabold text-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                      Variante 1: Buggy Normal
                    </h3>
                    <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-1 rounded uppercase font-extrabold">Ortodoxo</span>
                  </div>

                  {/* IMAGEN DE COMPRENSIÓN SQUEEZE */}
                  <div className="relative rounded-xl border border-white/10 overflow-hidden bg-[#0d0f14] shadow-2xl h-48 flex items-center justify-center">
                    <SafeBJJImage 
                      src={IMAGES.buggyNormal} 
                      alt="Buggy Choke Normal" 
                      placeholderText="BuggyNormal"
                      className="w-full h-full object-cover object-center filter brightness-100" 
                    />
                    {/* SVG Flechas Biomecánicas (Vector Analysis Overlays) */}
                    <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <marker id="arrowhead-rose" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                            <polygon points="0 0, 6 3, 0 6" fill="#f43f5e" />
                          </marker>
                        </defs>
                        {/* Principal vector - Squeeze Abdominal */}
                        <path d="M 80 80 Q 50 60 40 40" stroke="#f43f5e" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-rose)" className="animate-pulse" />
                        {/* Vector de contención de Cadera/Pierna */}
                        <path d="M 20 80 Q 30 50 60 40" stroke="#f43f5e" strokeWidth="1.5" fill="none" strokeDasharray="4 4" markerEnd="url(#arrowhead-rose)" opacity="0.6" />
                      </svg>
                    </div>
                  </div>

                  {/* MINI SELECTOR DE BOTONES VECTORIALES */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {buggyNormalVectors.slice(0, 6).map(v => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVector(v.id)}
                        className={`text-[9px] font-mono font-bold px-1 py-1 rounded border transition-all text-center truncate ${
                          selectedVector === v.id ? 'bg-rose-500/25 border-rose-500 text-white font-extrabold' : 'bg-black/30 border-white/5 text-white/50 hover:text-white'
                        }`}
                      >
                        {v.name.split(' — ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* MOSTRADOR DE BIOMECÁNICA DEL VECTOR */}
                  {(() => {
                    const vec = buggyNormalVectors.find(v => v.id === selectedVector);
                    return vec ? (
                      <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-xs space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-rose-400 font-mono font-bold uppercase">{vec.name}</span>
                          <span className="text-[#94a3b8] font-semibold">{vec.magnitude}</span>
                        </div>
                        <p className="text-[#94a3b8] text-[11px] leading-relaxed text-justify">{vec.desc}</p>
                        <div className="border-t border-white/5 pt-2 grid grid-cols-2 gap-1 text-[10px]">
                          <div>
                            <span className="text-white/40 block">Músculos:</span>
                            <span className="text-white/80 font-bold font-mono">{vec.muscles}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">Objetivo:</span>
                            <span className="text-white/80 font-bold font-mono">{vec.anatomicalTarget}</span>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()}

                </div>

                {/* VARIANTE 2: REVERSE BUGGY */}
                <div className="bg-[#161a24] p-5 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h3 className="text-white font-extrabold text-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                      Variante 2: Reverse Buggy
                    </h3>
                    <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1 rounded uppercase font-extrabold font-mono">Invertido</span>
                  </div>

                  {/* IMAGEN DE COMPRENSIÓN SQUEEZE CORREGIDO CON REVERSE IMAGE */}
                  <div className="relative rounded-xl border border-white/10 overflow-hidden bg-[#0d0f14] shadow-2xl h-48 flex items-center justify-center">
                    <SafeBJJImage 
                      src={IMAGES.reverseBuggy} 
                      alt="Buggy Invertido Mecánica" 
                      placeholderText="BuggyInvertido"
                      className="w-full h-full object-cover object-center filter brightness-100" 
                    />
                    <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <marker id="arrowhead-amber" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                            <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                          </marker>
                        </defs>
                        <path d="M 50 20 Q 30 50 40 80" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-amber)" className="animate-pulse" />
                        <path d="M 80 50 Q 50 40 20 50" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="4 4" markerEnd="url(#arrowhead-amber)" opacity="0.6" />
                      </svg>
                    </div>
                  </div>

                  {/* MINI SELECTOR DE BOTONES VECTORIALES */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {buggyInvertedVectors.map(v => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVectorInv(v.id)}
                        className={`text-[9px] font-mono font-bold px-1.5 py-1 rounded border transition-all text-center truncate ${
                          selectedVectorInv === v.id ? 'bg-amber-500/25 border-amber-500 text-white font-extrabold' : 'bg-black/30 border-white/5 text-white/50 hover:text-white'
                        }`}
                      >
                        {v.name.split(' — ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* MOSTRADOR DE BIOMECÁNICA DEL VECTOR */}
                  {(() => {
                    const vec = buggyInvertedVectors.find(v => v.id === selectedVectorInv);
                    return vec ? (
                      <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-xs space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-amber-400 font-mono font-bold uppercase">{vec.name}</span>
                          <span className="text-[#94a3b8] font-semibold">{vec.magnitude}</span>
                        </div>
                        <p className="text-[#94a3b8] text-[11px] leading-relaxed text-justify">{vec.desc}</p>
                        <div className="border-t border-white/5 pt-2 grid grid-cols-2 gap-1 text-[10px]">
                          <div>
                            <span className="text-white/40 block">Músculos:</span>
                            <span className="text-white/80 font-bold font-mono">{vec.muscles}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">Objetivo:</span>
                            <span className="text-white/80 font-bold font-mono">{vec.anatomicalTarget}</span>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()}

                </div>

                {/* VARIANTE 3: BUGGY A UNA MANO (CORREGIDO - IMAGEN VISIBLE) */}
                <div className="bg-[#161a24] p-5 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h3 className="text-white font-extrabold text-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                      Variante 3: Buggy 1 Mano
                    </h3>
                    <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-1 rounded uppercase font-extrabold font-mono">One Hand</span>
                  </div>

                  {/* IMAGEN DE COMPRENSIÓN SQUEEZE CORREGIDO CON IMAGEN EXPLICATIVA VISIBLE */}
                  <div className="relative rounded-xl border border-white/10 overflow-hidden bg-[#0d0f14] shadow-2xl h-48 flex items-center justify-center">
                    <SafeBJJImage 
                      src={IMAGES.buggyOneHand} 
                      alt="Buggy Choke a Una Mano" 
                      placeholderText="Buggy1mano"
                      className="w-full h-full object-cover object-center filter brightness-100" 
                    />
                    <div className="absolute inset-0 z-10 pointer-events-none mix-blend-screen">
                      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <marker id="arrowhead-purple" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                            <polygon points="0 0, 6 3, 0 6" fill="#a855f7" />
                          </marker>
                        </defs>
                        <path d="M 60 70 Q 40 50 30 20" stroke="#a855f7" strokeWidth="2" fill="none" markerEnd="url(#arrowhead-purple)" className="animate-pulse" />
                        <path d="M 20 40 Q 50 60 80 50" stroke="#a855f7" strokeWidth="1.5" fill="none" strokeDasharray="4 4" markerEnd="url(#arrowhead-purple)" opacity="0.6" />
                      </svg>
                    </div>
                  </div>

                  {/* MINI SELECTOR DE BOTONES VECTORIALES */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {buggyOneHandVectors.map(v => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVectorHand(v.id)}
                        className={`text-[9px] font-mono font-bold px-1 py-1 rounded border transition-all text-center truncate ${
                          selectedVectorHand === v.id ? 'bg-purple-500/25 border-purple-500 text-white font-extrabold' : 'bg-black/30 border-white/5 text-white/50 hover:text-white'
                        }`}
                      >
                        {v.name.split(' — ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* MOSTRADOR DE BIOMECÁNICA DEL VECTOR */}
                  {(() => {
                    const vec = buggyOneHandVectors.find(v => v.id === selectedVectorHand);
                    return vec ? (
                      <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-xs space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-purple-400 font-mono font-bold uppercase">{vec.name}</span>
                          <span className="text-[#94a3b8] font-semibold">{vec.magnitude}</span>
                        </div>
                        <p className="text-[#94a3b8] text-[11px] leading-relaxed text-justify">{vec.desc}</p>
                        <div className="border-t border-white/5 pt-2 grid grid-cols-2 gap-1 text-[10px]">
                          <div>
                            <span className="text-white/40 block">Músculos:</span>
                            <span className="text-white/80 font-bold font-mono">{vec.muscles}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block">Objetivo:</span>
                            <span className="text-white/80 font-bold font-mono">{vec.anatomicalTarget}</span>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ════════════════════ TAB 6: PREPARACIÓN GPP (EXCEL) ════════════════════ */}
        {activeTab === 'gpp' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="bg-[#11141d] border border-white/5 rounded-2xl p-8">
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 border-b border-white/5 pb-6">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-[#ff4444]/10 text-[#ff4444]">
                    <Dumbbell className="w-5 h-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Rutina de Fuerza GPP (Excel Transcrito)</h2>
                    <p className="text-xs text-[#94a3b8] mt-0.5">Control de cargas estables del excel y simulador dinámico de presión carotídea.</p>
                  </div>
                </div>

                {/* CALCULADOR FÉRETRO DE SQUEEZE SENSOR */}
                <div className="bg-[#161a24] border border-white/10 p-4 rounded-xl flex gap-4 text-xs font-mono">
                  <div>
                    <span className="text-white/40 block uppercase text-[9px] tracking-wider">PESO DEL DEFENSOR</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <input 
                        type="number" 
                        value={userWeight} 
                        onChange={(e) => setUserWeight(Number(e.target.value))} 
                        className="w-14 bg-black/40 border border-white/10 text-white font-bold p-1 rounded font-mono text-center focus:border-[#ff4444]"
                      />
                      <span className="text-white/60">kg</span>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <span className="text-white/40 block uppercase text-[9px] tracking-wider">PRESIÓN CAROTÍDEA ESTIMADA</span>
                    <span className={`${currentEstimatedPressure.color} block mt-1`}>
                      {currentEstimatedPressure.psi} PSI — {currentEstimatedPressure.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* TABLA PRINCIPAL EXCEL */}
              <div className="overflow-x-auto border border-white/10 rounded-xl bg-black/20">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#161a24] border-b border-white/10">
                      <th className="p-4 text-white uppercase font-bold tracking-wider font-mono">Día</th>
                      <th className="p-4 text-white uppercase font-bold tracking-wider font-mono">Grupo Muscular</th>
                      <th className="p-4 text-white uppercase font-bold tracking-wider font-mono">Ejercicio</th>
                      <th className="p-4 text-white uppercase font-bold tracking-wider font-mono text-center">Series</th>
                      <th className="p-4 text-white uppercase font-bold tracking-wider font-mono text-center">Repeticiones</th>
                      <th className="p-4 text-white uppercase font-bold tracking-wider font-mono">Descanso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {gppRoutines.map((routine) => (
                      routine.exercises.map((ex, exIdx) => (
                        <tr key={`${routine.day}-${exIdx}`} className="hover:bg-white/[0.02] transition-colors">
                          {exIdx === 0 && (
                            <td 
                              rowSpan={routine.exercises.length} 
                              className="p-4 bg-[#161a24]/40 font-black text-[#ff4444] font-mono text-center border-r border-white/5 align-middle"
                            >
                              {routine.day}
                            </td>
                          )}
                          {exIdx === 0 && (
                            <td 
                              rowSpan={routine.exercises.length} 
                              className="p-4 font-bold text-white/95 border-r border-white/5 align-middle font-mono text-[10px] uppercase tracking-wider"
                            >
                              {routine.group}
                            </td>
                          )}
                          <td className="p-4 font-medium text-white flex items-center gap-2">
                            {ex.name}
                            {ex.isRedAlert && (
                              <span className="inline-flex px-1.5 py-0.5 rounded bg-rose-500/10 text-[#ff4444] border border-[#ff4444]/20 text-[9px] font-bold font-mono uppercase">
                                Red Note
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center font-bold text-[#94a3b8] font-mono">{ex.series}</td>
                          <td className="p-4 text-center">
                            <span className={ex.isRedAlert ? 'text-[#ff4444] font-black font-mono' : 'text-white font-mono font-medium'}>
                              {ex.reps}
                            </span>
                          </td>
                          <td className="p-4 text-[#94a3b8] font-mono">{ex.rest}</td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>

              {/* COMENTARIO CRÍTICO DE LOS FONDOS EN PARALELAS Y RED NOTES */}
              <div className="my-6 grid md:grid-cols-2 gap-4">
                <div className="bg-rose-500/5 border border-[#ff4444]/20 p-5 rounded-xl">
                  <h4 className="text-[#ff4444] font-bold text-sm mb-2 flex items-center gap-1.5 font-mono uppercase tracking-wider">
                    <Flame className="w-4 h-4" />
                    Fallo Técnico en Paralelas:
                  </h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed text-justify">
                    A diferencia del fallo muscular concéntrico total (donde el codo cede), el <strong className="text-white">fallo técnico</strong> en los fondos en paralelas exige frenar en el momento exacto en el que el hombro pierde rotación neutra y viaja hacia una anteversión anterior. Continuar más allá de ese punto es un disparador de pinzamiento del manguito rotador, inhabilitando para el sparring de No-Gi.
                  </p>
                </div>

                <div className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-xl">
                  <h4 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-1.5 font-mono uppercase tracking-wider">
                    <Scale className="w-4 h-4" />
                    Farmer&apos;s Walk & Retención Poplítea:
                  </h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed text-justify">
                    Ejecutado con cargas sumamente elevadas. Es el estabilizador estrella para el Buggy Choke: un agarre manual débil destruye la estructura tensora del bíceps mucho antes de que tus piernas logren forzar el ángulo oclusor sobre la nuca del oponente superior.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ════════════════════ TAB 7: ESTIRAMIENTOS & REJILLA VISUAL ════════════════════ */}
        {activeTab === 'stretches' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="bg-[#11141d] border border-white/5 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Layers className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Rejilla de Movilidad y Elongación Crítica del PDF</h2>
                  <p className="text-xs text-[#94a3b8] mt-0.5">La transcripción fiel de tu mapa de ruta de estiramientos del PDF para asegurar flexión y rotación externa coxofemoral segura.</p>
                </div>
              </div>

              {/* GRID VISUAL DE ESTIRAMIENTOS */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stretches.map((s) => (
                  <div key={s.id} className="bg-[#161a24] border border-white/5 hover:border-emerald-500/25 p-6 rounded-2xl flex flex-col justify-between transition-all group">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          {s.duration}
                        </span>
                        <span className="text-[10px] text-white/40 block font-mono">MÉTODO PDF</span>
                      </div>
                      
                      <h3 className="text-white font-extrabold text-md tracking-tight group-hover:text-emerald-400 transition-colors">
                        {s.name}
                      </h3>
                      
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-white/30 block">Zona Fisiológica de Impacto</span>
                        <span className="text-xs text-amber-400 font-semibold">{s.target}</span>
                      </div>

                      <div className="h-px bg-white/5" />

                      <p className="text-xs text-[#94a3b8] leading-relaxed text-justify">
                        {s.description}
                      </p>

                      <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                        <span className="text-[10px] text-[#ff4444] font-mono font-bold uppercase block mb-1">Cues posturales de origen:</span>
                        <ul className="list-disc list-inside text-[11px] text-white/60 space-y-1">
                          {s.cues.map((cue, cIdx) => (
                            <li key={cIdx}>{cue}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 space-y-1">
                      <span className="text-[9px] uppercase font-mono tracking-wider text-emerald-400 block font-black">Transfer al Tatami No-Gi:</span>
                      <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                        {s.bjjTransfer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ══ FOOTER ACADÉMICO PREMIUM ══ */}
      <footer className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-xs text-[#94a3b8] font-mono flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          © 2026 Manual Enciclopédico de Grappling de Élite y Biomecánica Co. Todos los derechos reservados.
        </div>
        <div className="flex items-center gap-4 justify-center text-white/50">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> BIOESTADÍSTICA ACCREDITED</span>
          <span>SYSTEM V2.0</span>
        </div>
      </footer>

    </div>
  );
}
