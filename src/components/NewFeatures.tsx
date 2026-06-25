// ============================================================
// NUEVAS FUNCIONALIDADES — pegar este archivo en src/components/NewFeatures.tsx
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Trophy, Plus, Minus, CalendarDays, Clock, StickyNote,
  ExternalLink, Radar, CheckSquare, Square, Timer,
  MapPin, Play, Pause, RotateCcw, ChevronDown, ChevronUp,
  Swords, Target, BookMarked, Bell
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar as RechartsRadar, ResponsiveContainer, Tooltip } from 'recharts';

// ─────────────────────────────────────────────
// TIPOS LOCALES
// ─────────────────────────────────────────────
interface TrainingEntry {
  id: string;
  date: string;
  duration: number; // minutos
  areas: string[];
  notes: string;
  feeling: number; // 1-5
}

interface ChecklistItem {
  id: string;
  label: string;
  category: string;
  done: boolean;
}

interface TechNote {
  [techniqueKey: string]: string;
}

// ─────────────────────────────────────────────
// DATOS INICIALES
// ─────────────────────────────────────────────
const INITIAL_CHECKLIST: ChecklistItem[] = [
  // Guardia de Pulpo / Octopus
  { id: 'oct1', label: 'Entrada básica a Octopus Guard', category: 'Octopus Guard', done: false },
  { id: 'oct2', label: 'Technical stand-up desde Octopus', category: 'Octopus Guard', done: false },
  { id: 'oct3', label: 'Sweep / Raspado desde Octopus', category: 'Octopus Guard', done: false },
  { id: 'oct4', label: 'Toma de espalda desde Octopus', category: 'Octopus Guard', done: false },
  // Buggy Choke
  { id: 'bug1', label: 'Buggy desde control lateral (bottom)', category: 'Buggy Choke', done: false },
  { id: 'bug2', label: 'Buggy invertido (North-South)', category: 'Buggy Choke', done: false },
  { id: 'bug3', label: 'Buggy con una mano', category: 'Buggy Choke', done: false },
  { id: 'bug4', label: 'Buggy desde media guardia', category: 'Buggy Choke', done: false },
  { id: 'bug5', label: 'Buggy desde guardia cerrada', category: 'Buggy Choke', done: false },
  { id: 'bug6', label: 'Transición Buggy → Darce', category: 'Buggy Choke', done: false },
  { id: 'bug7', label: 'Transición Buggy → Triángulo', category: 'Buggy Choke', done: false },
  // Top Game
  { id: 'top1', label: 'Pressure passing básico', category: 'Top Game', done: false },
  { id: 'top2', label: 'Torreando la guardia', category: 'Top Game', done: false },
  { id: 'top3', label: 'Control lateral estable', category: 'Top Game', done: false },
  // Defensa
  { id: 'def1', label: 'Elbow-Knee escape desde control lateral', category: 'Defensa', done: false },
  { id: 'def2', label: 'Hip escape / Shrimping', category: 'Defensa', done: false },
  { id: 'def3', label: 'Defensa básica de estrangulaciones', category: 'Defensa', done: false },
  // Scrambles
  { id: 'scr1', label: 'Reconocer y crear scrambles', category: 'Scrambles', done: false },
  { id: 'scr2', label: 'Toma de espalda en scramble', category: 'Scrambles', done: false },
];

const AREAS_ENTRENAMIENTO = [
  'Buggy Choke', 'Octopus Guard', 'Top Game', 'Defensa', 'Scrambles',
  'Guardia Cerrada', 'Media Guardia', 'Espalda', 'Sparring libre'
];

const CATEGORY_COLORS: Record<string, string> = {
  'Octopus Guard': 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  'Buggy Choke': 'text-rose-400 border-rose-500/30 bg-rose-500/10',
  'Top Game': 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  'Defensa': 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  'Scrambles': 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
};

// ─────────────────────────────────────────────
// 1. TRACKER DE CINTURÓN
// ─────────────────────────────────────────────
export function BeltTracker() {
  const BELTS = [
    { name: 'Blanco', color: '#ffffff', textColor: '#000' },
    { name: 'Azul', color: '#1d4ed8', textColor: '#fff' },
    { name: 'Morado', color: '#7e22ce', textColor: '#fff' },
    { name: 'Marrón', color: '#78350f', textColor: '#fff' },
    { name: 'Negro', color: '#111827', textColor: '#fff' },
  ];

  const [beltIndex, setBeltIndex] = useState(() => Number(localStorage.getItem('beltIndex') ?? 0));
  const [stripes, setStripes] = useState(() => Number(localStorage.getItem('stripes') ?? 0));

  const [trainingMonths, setTrainingMonths] = useState<string[]>(() => {
    const saved = localStorage.getItem('trainingMonths');
    return saved ? JSON.parse(saved) : [
      '2024-09', '2024-10', '2024-11', '2024-12',
      '2025-02', '2025-03', '2025-04',
      '2025-09', '2025-10', '2025-11', '2025-12',
      '2026-02', '2026-03', '2026-04',
    ];
  });

  useEffect(() => {
    localStorage.setItem('beltIndex', String(beltIndex));
    localStorage.setItem('stripes', String(stripes));
  }, [beltIndex, stripes]);

  const belt = BELTS[beltIndex];

  const toggleMonth = (key: string) => {
    setTrainingMonths(prev => {
      const updated = prev.includes(key) ? prev.filter(m => m !== key) : [...prev, key].sort();
      localStorage.setItem('trainingMonths', JSON.stringify(updated));
      return updated;
    });
  };

  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const totalMonths = trainingMonths.length;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const addStripe = () => {
    if (stripes < 4) setStripes(s => s + 1);
    else if (beltIndex < BELTS.length - 1) { setBeltIndex(b => b + 1); setStripes(0); }
  };
  const removeStripe = () => {
    if (stripes > 0) setStripes(s => s - 1);
    else if (beltIndex > 0) { setBeltIndex(b => b - 1); setStripes(4); }
  };

  return (
    <div className="bg-[#11141d] border border-white/5 rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400"><Trophy className="w-5 h-5" /></span>
        <div>
          <h2 className="text-xl font-extrabold text-white">Tracker de Cinturón</h2>
          <p className="text-xs text-[#94a3b8]">Iniciaste BJJ el 25 de septiembre de 2024</p>
        </div>
      </div>

      {/* Tiempo en BJJ */}
      <div className="grid grid-cols-2 gap-3">
        {[{ val: years, label: 'Años' }, { val: months, label: 'Meses' }].map(({ val, label }) => (
          <div key={label} className="bg-black/30 rounded-xl p-3 text-center border border-white/5">
            <span className="text-2xl font-black text-white">{val}</span>
            <span className="text-[10px] text-[#94a3b8] block font-mono uppercase tracking-widest">{label}</span>
          </div>
        ))}
      </div>

      {/* Selector de meses entrenados */}
      <div className="space-y-3">
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Meses entrenados — toca para marcar/desmarcar</p>
        {[2024, 2025, 2026].map(year => (
          <div key={year}>
            <span className="text-[10px] font-mono text-white/40 mb-1 block">{year}</span>
            <div className="flex flex-wrap gap-1.5">
              {['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => {
                const key = `${year}-${m}`;
                const isFuture = key > currentMonthKey;
                const isActive = trainingMonths.includes(key);
                const labels = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
                return (
                  <button key={key} onClick={() => !isFuture && toggleMonth(key)} disabled={isFuture}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border transition-all ${
                      isFuture ? 'opacity-20 cursor-not-allowed border-white/5 text-white/20' :
                      isActive ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' :
                      'bg-black/30 border-white/10 text-white/30 hover:border-white/20'
                    }`}>
                    {labels[parseInt(m)-1]}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Cinturón visual */}
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-full h-14 rounded-xl flex items-center justify-center gap-3 border-2 transition-all duration-500 shadow-lg"
          style={{ backgroundColor: belt.color, borderColor: belt.color === '#ffffff' ? '#ccc' : belt.color }}
        >
          <span className="font-black text-lg tracking-widest" style={{ color: belt.textColor }}>
            {belt.name.toUpperCase()}
          </span>
          <div className="flex gap-1.5 ml-2">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="w-4 h-8 rounded-sm border transition-all duration-300"
                style={{
                  backgroundColor: i < stripes ? '#f59e0b' : 'transparent',
                  borderColor: belt.textColor === '#fff' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'
                }}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <span className="text-xs text-[#94a3b8] font-mono">Cinturón {belt.name} — {stripes} stripe{stripes !== 1 ? 's' : ''}</span>
        </div>

        <div className="flex gap-3">
          <button onClick={removeStripe} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161a24] border border-white/10 text-white/70 hover:text-white hover:border-white/20 text-sm font-bold transition-all">
            <Minus className="w-4 h-4" /> Quitar stripe
          </button>
          <button onClick={addStripe} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 text-sm font-bold transition-all">
            <Plus className="w-4 h-4" /> Añadir stripe
          </button>
        </div>

        {beltIndex < BELTS.length - 1 && (
          <div className="w-full">
            <div className="flex justify-between text-[10px] text-[#94a3b8] font-mono mb-1">
              <span>{belt.name}</span>
              <span>{BELTS[beltIndex + 1].name}</span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                style={{ width: `${(stripes / 4) * 100}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 2. CHECKLIST DE MEJORA
// ─────────────────────────────────────────────
export function ImprovementChecklist({ onProgressChange }: { onProgressChange?: (data: { category: string; pct: number }[]) => void }) {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('checklist');
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
  });
  const [openCat, setOpenCat] = useState<string | null>('Buggy Choke');

  useEffect(() => {
    localStorage.setItem('checklist', JSON.stringify(items));
    if (onProgressChange) {
      const cats = [...new Set(INITIAL_CHECKLIST.map(i => i.category))];
      const data = cats.map(cat => {
        const catItems = items.filter(i => i.category === cat);
        const pct = catItems.length ? Math.round((catItems.filter(i => i.done).length / catItems.length) * 100) : 0;
        return { category: cat, pct };
      });
      onProgressChange(data);
    }
  }, [items]);

  const toggle = (id: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, done: !i.done } : i));

  const categories = [...new Set(items.map(i => i.category))];

  return (
    <div className="bg-[#11141d] border border-white/5 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><Target className="w-5 h-5" /></span>
        <div>
          <h2 className="text-xl font-extrabold text-white">Checklist de Mejora</h2>
          <p className="text-xs text-[#94a3b8]">Marca las técnicas que ya dominas — alimenta el gráfico de progreso</p>
        </div>
      </div>

      {categories.map(cat => {
        const catItems = items.filter(i => i.category === cat);
        const done = catItems.filter(i => i.done).length;
        const pct = Math.round((done / catItems.length) * 100);
        const colorClass = CATEGORY_COLORS[cat] ?? 'text-white/60 border-white/10 bg-white/5';
        const isOpen = openCat === cat;

        return (
          <div key={cat} className="border border-white/5 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenCat(isOpen ? null : cat)}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#161a24] hover:bg-[#1a1f2e] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${colorClass}`}>{cat}</span>
                <span className="text-xs text-white/40">{done}/{catItems.length}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-mono text-emerald-400 w-8 text-right">{pct}%</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
              </div>
            </button>

            {isOpen && (
              <div className="divide-y divide-white/5">
                {catItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                  >
                    {item.done
                      ? <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      : <Square className="w-4 h-4 text-white/30 flex-shrink-0" />}
                    <span className={`text-sm ${item.done ? 'text-white/40 line-through' : 'text-white/80'}`}>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// 3. GRÁFICO DE PROGRESO (RADAR)
// ─────────────────────────────────────────────
export function ProgressRadar({ progressData }: { progressData: { category: string; pct: number }[] }) {
  const data = progressData.map(d => ({ subject: d.category, value: d.pct, fullMark: 100 }));

  return (
    <div className="bg-[#11141d] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400"><Radar className="w-5 h-5" /></span>
        <div>
          <h2 className="text-xl font-extrabold text-white">Gráfico de Progreso</h2>
          <p className="text-xs text-[#94a3b8]">Basado en las técnicas marcadas en el checklist</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#ffffff10" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
          <RechartsRadar name="Progreso" dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.25} strokeWidth={2} />
          <Tooltip
            contentStyle={{ backgroundColor: '#11141d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: 12 }}
            formatter={(v: number) => [`${v}%`, 'Progreso']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─────────────────────────────────────────────
// 4. REGISTRO DE ENTRENOS
// ─────────────────────────────────────────────
export function TrainingLog() {
  const [entries, setEntries] = useState<TrainingEntry[]>(() => {
    const s = localStorage.getItem('trainingLog');
    return s ? JSON.parse(s) : [];
  });
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState(60);
  const [areas, setAreas] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [feeling, setFeeling] = useState(3);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { localStorage.setItem('trainingLog', JSON.stringify(entries)); }, [entries]);

  const save = () => {
    if (!date) return;
    const entry: TrainingEntry = {
      id: Date.now().toString(),
      date, duration, areas, notes, feeling
    };
    setEntries(prev => [entry, ...prev]);
    setNotes(''); setAreas([]); setFeeling(3); setShowForm(false);
  };

  const toggleArea = (a: string) => setAreas(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const FEELING_LABELS = ['', '😴 Fatal', '😕 Mal', '😐 Regular', '💪 Bien', '🔥 Excepcional'];

  return (
    <div className="bg-[#11141d] border border-white/5 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><CalendarDays className="w-5 h-5" /></span>
          <div>
            <h2 className="text-xl font-extrabold text-white">Registro de Entrenos</h2>
            <p className="text-xs text-[#94a3b8]">{entries.length} sesiones registradas</p>
          </div>
        </div>
        <button onClick={() => setShowForm(f => !f)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 text-sm font-bold transition-all">
          <Plus className="w-4 h-4" /> Nueva sesión
        </button>
      </div>

      {showForm && (
        <div className="bg-[#161a24] border border-white/10 rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Fecha</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Duración (min)</label>
              <input type="number" value={duration} min={15} max={300} step={15} onChange={e => setDuration(Number(e.target.value))}
                className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">Qué trabajaste</label>
            <div className="flex flex-wrap gap-2">
              {AREAS_ENTRENAMIENTO.map(a => (
                <button key={a} onClick={() => toggleArea(a)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${areas.includes(a) ? 'bg-blue-500/30 border-blue-500/50 text-blue-300' : 'bg-black/30 border-white/10 text-white/50 hover:border-white/20'}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Sensación</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setFeeling(n)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${feeling === n ? 'bg-blue-500/30 border-blue-500/50 text-white' : 'bg-black/30 border-white/10 text-white/40 hover:border-white/20'}`}>
                  {n}
                </button>
              ))}
            </div>
            <p className="text-xs text-blue-400 mt-1 font-mono">{FEELING_LABELS[feeling]}</p>
          </div>

          <div>
            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Notas</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Qué funcionó, qué mejorar..."
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-blue-500/50 placeholder:text-white/20" />
          </div>

          <div className="flex gap-3 justify-end">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg bg-transparent border border-white/10 text-white/50 text-sm hover:border-white/20 transition-all">Cancelar</button>
            <button onClick={save} className="px-4 py-2 rounded-lg bg-blue-500/30 border border-blue-500/50 text-blue-300 text-sm font-bold hover:bg-blue-500/40 transition-all">Guardar sesión</button>
          </div>
        </div>
      )}

      {/* Lista de entrenos */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {entries.length === 0 && (
          <div className="text-center py-8 text-white/20 text-sm font-mono">Aún no hay sesiones registradas</div>
        )}
        {entries.map(e => (
          <div key={e.id} className="bg-[#161a24] border border-white/5 rounded-xl p-4 flex items-start gap-4">
            <div className="text-center min-w-[48px]">
              <div className="text-white font-black text-sm">{new Date(e.date + 'T12:00').toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</div>
              <div className="text-[10px] text-white/30 font-mono">{new Date(e.date + 'T12:00').getFullYear()}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[10px] text-blue-400 font-mono flex items-center gap-1"><Clock className="w-3 h-3" />{e.duration} min</span>
                <span className="text-[10px] text-white/30 font-mono">{FEELING_LABELS[e.feeling]}</span>
              </div>
              {e.areas.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-1">
                  {e.areas.map(a => <span key={a} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">{a}</span>)}
                </div>
              )}
              {e.notes && <p className="text-xs text-[#94a3b8] truncate">{e.notes}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 5. TIMER DE ROUNDS
// ─────────────────────────────────────────────
export function RoundTimer() {
  const [roundDuration, setRoundDuration] = useState(5 * 60);
  const [restDuration, setRestDuration] = useState(60);
  const [totalRounds, setTotalRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isResting, setIsResting] = useState(false);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);

  const beep = useCallback((freq: number, duration: number) => {
    if (!audioCtx.current) audioCtx.current = new AudioContext();
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    osc.connect(gain); gain.connect(audioCtx.current.destination);
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + duration);
    osc.start(); osc.stop(audioCtx.current.currentTime + duration);
  }, []);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          beep(880, 0.5);
          if (!isResting) {
            if (currentRound >= totalRounds) { setRunning(false); setDone(true); clearInterval(intervalRef.current!); return 0; }
            setIsResting(true); return restDuration;
          } else {
            setIsResting(false); setCurrentRound(r => r + 1); return roundDuration;
          }
        }
        if (prev === 4) beep(440, 0.2);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [running, isResting, currentRound, totalRounds, roundDuration, restDuration, beep]);

  const reset = () => {
    clearInterval(intervalRef.current!);
    setRunning(false); setDone(false); setIsResting(false);
    setCurrentRound(1); setTimeLeft(roundDuration);
  };

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const pct = isResting ? (timeLeft / restDuration) * 100 : (timeLeft / roundDuration) * 100;

  return (
    <div className="bg-[#11141d] border border-white/5 rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <span className="p-2 rounded-lg bg-rose-500/10 text-rose-400"><Timer className="w-5 h-5" /></span>
        <div>
          <h2 className="text-xl font-extrabold text-white">Timer de Rounds</h2>
          <p className="text-xs text-[#94a3b8]">Configura y lanza tus intervalos de sparring</p>
        </div>
      </div>

      {/* Config */}
      {!running && !done && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Round (min)', val: roundDuration / 60, min: 1, max: 15, set: (v: number) => { setRoundDuration(v * 60); setTimeLeft(v * 60); } },
            { label: 'Descanso (min)', val: restDuration / 60, min: 0, max: 5, set: (v: number) => setRestDuration(v * 60) },
            { label: 'Rounds', val: totalRounds, min: 1, max: 10, set: setTotalRounds },
          ].map(({ label, val, min, max, set }) => (
            <div key={label} className="bg-black/30 rounded-xl p-3 border border-white/5">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2">{label}</label>
              <div className="flex items-center gap-2">
                <button onClick={() => set(Math.max(min, val - 1))} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                <span className="flex-1 text-center text-white font-black text-lg">{val}</span>
                <button onClick={() => set(Math.min(max, val + 1))} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 flex items-center justify-center"><Plus className="w-3 h-3" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Timer display */}
      <div className="flex flex-col items-center gap-4">
        <div className={`text-7xl font-black tabular-nums transition-colors ${isResting ? 'text-emerald-400' : done ? 'text-amber-400' : 'text-white'}`}>
          {done ? '🏆' : formatTime(timeLeft)}
        </div>

        {!done && (
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${isResting ? 'bg-emerald-500' : 'bg-rose-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        )}

        <div className="flex items-center gap-2 text-sm font-mono text-white/50">
          {done ? <span className="text-amber-400 font-bold">¡Sesión completada!</span> : (
            <>
              <span className={isResting ? 'text-emerald-400 font-bold' : 'text-white font-bold'}>
                {isResting ? 'DESCANSO' : `ROUND ${currentRound}/${totalRounds}`}
              </span>
            </>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm font-bold transition-all">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          {!done && (
            <button onClick={() => setRunning(r => !r)} className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all border ${running ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30' : 'bg-rose-500/20 border-rose-500/40 text-rose-300 hover:bg-rose-500/30'}`}>
              {running ? <><Pause className="w-4 h-4" /> Pausar</> : <><Play className="w-4 h-4" /> {currentRound === 1 && timeLeft === roundDuration ? 'Iniciar' : 'Continuar'}</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 6. NOTAS POR TÉCNICA
// ─────────────────────────────────────────────
export function TechniqueNotes({ techniqueKey, techniqueLabel }: { techniqueKey: string; techniqueLabel: string }) {
  const storageKey = `note_${techniqueKey}`;
  const [note, setNote] = useState(() => localStorage.getItem(storageKey) ?? '');
  const [open, setOpen] = useState(false);

  const save = () => { localStorage.setItem(storageKey, note); setOpen(false); };
  const hasNote = note.trim().length > 0;

  return (
    <div className="mt-2">
      <button onClick={() => setOpen(o => !o)} className={`flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border transition-all ${hasNote ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-white/5 border-white/10 text-white/30 hover:text-white/60'}`}>
        <StickyNote className="w-3 h-3" />
        {hasNote ? 'Ver mis notas' : 'Añadir nota'}
      </button>

      {open && (
        <div className="mt-2 space-y-2">
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={3}
            placeholder={`Tus observaciones sobre "${techniqueLabel}"...`}
            className="w-full bg-black/30 border border-amber-500/20 rounded-lg px-3 py-2 text-white text-xs resize-none focus:outline-none focus:border-amber-500/40 placeholder:text-white/20"
          />
          <div className="flex gap-2 justify-end">
            <button onClick={() => setOpen(false)} className="px-3 py-1 text-xs rounded-lg bg-transparent border border-white/10 text-white/40 hover:border-white/20 transition-all">Cancelar</button>
            <button onClick={save} className="px-3 py-1 text-xs rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold hover:bg-amber-500/30 transition-all">Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// 7. MAPA DE POSICIONES
// ─────────────────────────────────────────────
const POSITION_NODES = [
  { id: 'bottom_side', label: 'Control\nLateral\nBottom', x: 200, y: 280, color: '#f43f5e' },
  { id: 'half_guard', label: 'Media\nGuardia', x: 80, y: 180, color: '#f43f5e' },
  { id: 'open_guard', label: 'Guardia\nAbierta', x: 200, y: 80, color: '#f43f5e' },
  { id: 'octopus', label: 'Octopus\nGuard', x: 360, y: 120, color: '#a855f7' },
  { id: 'buggy', label: 'Buggy\nChoke', x: 360, y: 280, color: '#ff4444' },
  { id: 'back', label: 'Espalda\n(atacando)', x: 520, y: 180, color: '#10b981' },
  { id: 'triangle', label: 'Triángulo', x: 180, y: 380, color: '#10b981' },
  { id: 'darce', label: "D'Arce", x: 380, y: 400, color: '#10b981' },
  { id: 'ns', label: 'Norte\nSur', x: 520, y: 320, color: '#f59e0b' },
];

const POSITION_EDGES = [
  { from: 'bottom_side', to: 'buggy', label: 'Hip escape' },
  { from: 'half_guard', to: 'buggy', label: 'Knee shield' },
  { from: 'half_guard', to: 'octopus', label: 'Mano abajo' },
  { from: 'open_guard', to: 'octopus', label: 'Entrada' },
  { from: 'octopus', to: 'back', label: 'Tech standup' },
  { from: 'octopus', to: 'triangle', label: 'Sweep' },
  { from: 'buggy', to: 'triangle', label: 'Transición' },
  { from: 'buggy', to: 'darce', label: 'Transición' },
  { from: 'buggy', to: 'ns', label: 'Invertido' },
  { from: 'bottom_side', to: 'half_guard', label: 'Recover' },
];

const POSITION_DETAILS: Record<string, string[]> = {
  bottom_side: ['Buggy Choke entrada principal', 'Hip escape al Buggy', 'Knee-elbow escape'],
  half_guard: ['Knee shield Buggy', 'Heist Buggy', 'Octopus entry (mano abajo del rival)'],
  open_guard: ['Scarecrow control', 'Entrada Octopus', 'Triángulo directo'],
  octopus: ['Technical stand-up', 'Toma de espalda', 'Sweep / Raspado'],
  buggy: ['Mecánica 3 puntos', 'Transición a Darce', 'Transición a Triángulo', 'North-South Buggy'],
  back: ['Hooks + RNC', 'Armbar desde espalda'],
  triangle: ['Triángulo cerrado', 'Armbar desde triángulo'],
  darce: ["D'Arce estrangulación"],
  ns: ['North-South Buggy invertido', 'Kimura desde NS'],
};

export function PositionMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const W = 620, H = 500;

  return (
    <div className="bg-[#11141d] border border-white/5 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><MapPin className="w-5 h-5" /></span>
        <div>
          <h2 className="text-xl font-extrabold text-white">Mapa de Posiciones</h2>
          <p className="text-xs text-[#94a3b8]">Toca un nodo para ver las técnicas disponibles desde esa posición</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-2xl mx-auto" style={{ minWidth: 320 }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff20" />
            </marker>
          </defs>

          {/* Edges */}
          {POSITION_EDGES.map((edge, i) => {
            const from = POSITION_NODES.find(n => n.id === edge.from)!;
            const to = POSITION_NODES.find(n => n.id === edge.to)!;
            const mx = (from.x + to.x) / 2;
            const my = (from.y + to.y) / 2;
            return (
              <g key={i}>
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#ffffff15" strokeWidth={1.5} markerEnd="url(#arrow)" />
                <text x={mx} y={my - 4} textAnchor="middle" fill="#ffffff30" fontSize={8} fontFamily="monospace">{edge.label}</text>
              </g>
            );
          })}

          {/* Nodes */}
          {POSITION_NODES.map(node => {
            const isSelected = selected === node.id;
            const lines = node.label.split('\n');
            return (
              <g key={node.id} onClick={() => setSelected(isSelected ? null : node.id)} style={{ cursor: 'pointer' }}>
                <circle cx={node.x} cy={node.y} r={isSelected ? 42 : 36} fill={node.color + '20'} stroke={node.color} strokeWidth={isSelected ? 2.5 : 1.5} />
                {lines.map((line, li) => (
                  <text key={li} x={node.x} y={node.y + (li - (lines.length - 1) / 2) * 13} textAnchor="middle" fill={isSelected ? '#fff' : '#ffffffaa'} fontSize={9} fontFamily="monospace" fontWeight={isSelected ? 'bold' : 'normal'}>
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {selected && POSITION_DETAILS[selected] && (
        <div className="bg-[#161a24] border border-white/10 rounded-xl p-4">
          <h3 className="text-sm font-bold text-white mb-2">
            Desde <span className="text-rose-400">{POSITION_NODES.find(n => n.id === selected)?.label.replace('\n', ' ')}</span>:
          </h3>
          <ul className="space-y-1">
            {POSITION_DETAILS[selected].map((t, i) => (
              <li key={i} className="text-xs text-[#94a3b8] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// 8. GAMEPLAN VISUAL
// ─────────────────────────────────────────────
interface GameplanNode { id: string; label: string; type: 'start' | 'decision' | 'action' | 'finish'; children?: { reaction: string; nextId: string }[] }

const GAMEPLAN_TREE: GameplanNode[] = [
  { id: 'start', label: 'Inicio del combate (bottom)', type: 'start', children: [{ reaction: 'Me pasan la guardia', nextId: 'side_control' }, { reaction: 'Tengo guardia abierta', nextId: 'open_guard' }] },
  { id: 'open_guard', label: 'Guardia Abierta', type: 'decision', children: [{ reaction: 'Rival mete mano abajo', nextId: 'octopus_entry' }, { reaction: 'Rival presiona arriba', nextId: 'scarecrow' }] },
  { id: 'side_control', label: 'Control Lateral (yo abajo)', type: 'decision', children: [{ reaction: 'Rival pesa encima', nextId: 'buggy_entry' }, { reaction: 'Rival sube a montada', nextId: 'half_guard_recover' }] },
  { id: 'octopus_entry', label: 'Octopus Guard activa', type: 'action', children: [{ reaction: 'Se levanta', nextId: 'back_take' }, { reaction: 'Se queda abajo', nextId: 'sweep' }] },
  { id: 'scarecrow', label: 'Scarecrow (rodilla al codo)', type: 'action', children: [{ reaction: 'Ataca mi brazo', nextId: 'triangle' }, { reaction: 'Retira el brazo', nextId: 'buggy_entry' }] },
  { id: 'buggy_entry', label: '🔴 BUGGY CHOKE', type: 'finish' },
  { id: 'half_guard_recover', label: 'Media guardia + knee shield', type: 'action', children: [{ reaction: 'Mano del rival abajo', nextId: 'octopus_entry' }, { reaction: 'Rival presiona', nextId: 'buggy_entry' }] },
  { id: 'back_take', label: '✅ Toma de Espalda', type: 'finish' },
  { id: 'sweep', label: '✅ Raspado / Sweep', type: 'finish' },
  { id: 'triangle', label: '✅ Triángulo', type: 'finish' },
];

const nodeById = (id: string) => GAMEPLAN_TREE.find(n => n.id === id)!;

const NODE_COLORS: Record<GameplanNode['type'], string> = {
  start: 'border-purple-500/60 bg-purple-500/10 text-purple-300',
  decision: 'border-amber-500/50 bg-amber-500/10 text-amber-300',
  action: 'border-blue-500/50 bg-blue-500/10 text-blue-300',
  finish: 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300',
};

export function GameplanTree() {
  const [path, setPath] = useState<string[]>(['start']);
  const current = nodeById(path[path.length - 1]);

  const go = (nextId: string) => setPath(prev => [...prev, nextId]);
  const back = () => setPath(prev => prev.slice(0, -1));
  const restart = () => setPath(['start']);

  return (
    <div className="bg-[#11141d] border border-white/5 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400"><Swords className="w-5 h-5" /></span>
        <div>
          <h2 className="text-xl font-extrabold text-white">Gameplan Interactivo</h2>
          <p className="text-xs text-[#94a3b8]">Árbol de decisiones desde tu posición inicial</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {path.map((id, i) => (
          <span key={id} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-white/20 text-xs">→</span>}
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">{nodeById(id).label.replace(/[🔴✅]/g, '')}</span>
          </span>
        ))}
      </div>

      {/* Current node */}
      <div className={`border rounded-xl p-5 ${NODE_COLORS[current.type]}`}>
        <div className="text-[10px] font-mono uppercase tracking-widest opacity-60 mb-1">
          {{ start: 'Inicio', decision: 'Decisión', action: 'Acción', finish: 'Finalización' }[current.type]}
        </div>
        <div className="text-lg font-black">{current.label}</div>
      </div>

      {/* Children */}
      {current.children && (
        <div className="space-y-2">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">¿Qué hace el rival?</p>
          {current.children.map(child => (
            <button key={child.nextId} onClick={() => go(child.nextId)}
              className="w-full text-left px-4 py-3 rounded-xl bg-[#161a24] border border-white/10 hover:border-white/20 hover:bg-[#1a1f2e] transition-all flex items-center justify-between group">
              <span className="text-sm text-white/80">{child.reaction}</span>
              <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-white/60 rotate-[-90deg]" />
            </button>
          ))}
        </div>
      )}

      {current.type === 'finish' && (
        <div className="text-center py-2">
          <p className="text-xs text-emerald-400 font-mono">¡Posición dominante alcanzada!</p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        {path.length > 1 && (
          <button onClick={back} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-sm hover:border-white/20 transition-all">← Atrás</button>
        )}
        <button onClick={restart} className="px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm hover:bg-purple-500/20 transition-all flex items-center gap-2">
          <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
        </button>
      </div>
    </div>
  );
}
