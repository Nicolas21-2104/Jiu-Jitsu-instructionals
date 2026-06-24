const fs = require('fs');

const ext = `
export interface ExplanationDetail {
  subtitle: string;
  text: string;
}

export interface Explanations {
  title: string;
  introduction: string;
  details: ExplanationDetail[];
}

export const technicalExplanations: Record<string, Explanations> = {
  buggyNormal: {
    title: "Mecánica Básica de Ejecución del Buggy Normal",
    introduction: "Inmovilización sorpresiva desde abajo que busca asfixiar al rival superior mediante un aplastamiento femoral contra el hombro del atacante.",
    details: [
      { subtitle: "Entrada y Set-up", text: "Cruzar el brazo bajo la pierna ipsilateral mientras el oponente descansa su peso en lado cruzado." },
      { subtitle: "Cierre Arterial", text: "Asegurar el candado por sobre el hombro del contrario y traccionar fuertemente usando oblicuos." }
    ]
  },
  octopusGuard: {
    title: "Entrada al Octopus Guard",
    introduction: "Una guardia basada en dominar el flanco ciego del oponente mediante esgrima y presión.",
    details: [
      { subtitle: "Bypass del Crossface", text: "Al momento de sentir la presión sobre la nuca, evitar la estabilización moviendo los hombros." },
      { subtitle: "Toma de Espalda", text: "Aislar el brazo que queda corto para poder pasar la cabeza por debajo y buscar el underhook lejano." }
    ]
  }
};

export interface FlowNodeInfo {
  id: string;
  label: string;
  title: string;
  mechanics: string;
  details: string;
  level: string;
}

export const flowchartNodesDetail: Record<string, FlowNodeInfo[]> = {
  controlLateral: [
    { id: "ke_scape", label: "Knee-Elbow Escape", title: "Escape Knee-Elbow", mechanics: "Marco y fuga de cadera", details: "Fuga de caderas utilizando el antebrazo", level: "Crucial" },
    { id: "ghost_darce", label: "Ghost Darce", title: "Escape a Darce Fantasma", mechanics: "Transición directa", details: "Pescando el cuello durante la presión del rival", level: "Success" }
  ],
  halfGuard: [
    { id: "frame_bicep", label: "Marco Bíceps", title: "Frenar embestida", mechanics: "Palanca articular", details: "Manejo de distancia mediante brazo extendido", level: "Action" },
    { id: "octopus_entry", label: "Octopus Entry", title: "Entrada a Octopus", mechanics: "Esgrimar por la espalda", details: "Asegurar el underhook profundo.", level: "Crucial" }
  ],
  guardia: [
    { id: "scarecrow", label: "Scarecrow", title: "Scarecrow Control", mechanics: "Rodilla en codo", details: "Exponer articulación usando la extremidad inferior", level: "Action" },
    { id: "bicep_slicer_g", label: "Bicep Slicer", title: "Cortadora de Bíceps", mechanics: "Torsión / Compresión", details: "Finalización asegurando la pantorrilla sobre el hombro", level: "Success" }
  ],
  defensas: [
    { id: "def_stand", label: "Defensa Slam", title: "Prevent Slam", mechanics: "Agarre pierna lejana", details: "Evitar el alzado previniendo proyección al suelo", level: "Crucial" },
    { id: "def_vonflue", label: "Von Flue Defense", title: "Evitar presión de hombro", mechanics: "Pushear caderas", details: "Deshacer el empuje axial del atacante.", level: "Crucial" }
  ],
  finalizacion: [
    { id: "finish_3p", label: "Finalización 3-P", title: "Mecánica Completa 3-P", mechanics: "Torque y cierre", details: "Tres puntos simultáneos para Tapeo inminente", level: "Success" },
    { id: "TAPOUT", label: "Tapeo Garantizado", title: "Muerte Arterial", mechanics: "Oclusión doble", details: "Fallo hidráulico logrando la sumisión.", level: "Terminal" }
  ]
};
\`;

let file = fs.readFileSync('src/data.ts', 'utf8');

// Insert after bjjFanaticsCourses
const endOfCourses = file.indexOf('export const buggyNormalVectors');

if (endOfCourses !== -1) {
  file = file.substring(0, endOfCourses) + ext + '\n\n' + file.substring(endOfCourses);
  fs.writeFileSync('src/data.ts', file);
  console.log('Restored missed objects');
}
