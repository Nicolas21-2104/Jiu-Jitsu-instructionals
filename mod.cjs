const fs = require('fs');

const vectors = `export const buggyNormalVectors: ForceVector[] = [
  {
    id: 'bn-f1',
    name: 'F1 — Tracción del Brazo Inferior (Grip Pull)',
    desc: 'El brazo interior envuelve la axila o espalda del rival hacia tu propia corva o empeine. Los bíceps y dorsales tiran de la pierna hacia el oponente compactando la estructura ósea e impidiendo la evasión.',
    magnitude: 'Tensión isométrica media-alta (400 - 600 N)',
    direction: 'Tracción hacia el pecho/centro del defensor',
    muscles: 'Bíceps braquial, dorsal ancho, braquiorradial.',
    anatomicalTarget: 'Cierre del triángulo de soporte y anulación de la postura superior.'
  },
  {
    id: 'bn-f2',
    name: 'F2 — Compresión Femoral Lateral (Carotid Pinch)',
    desc: 'La pierna superior cruza la nuca, flexionando vigorosamente los isquiotibiales y pantorrilla. Esta pinza carnosa oprime la arteria carótida del rival contra su propio hombro o contra el muslo.',
    magnitude: 'Fuerza de estrangulación transversal (700 - 900 N)',
    direction: 'Compresión lateral directa contra el cartílago tiroides / cuello',
    muscles: 'Isquiotibiales, aductores del muslo, gemelos.',
    anatomicalTarget: 'Oclusión arterial directa paralizando el flujo sanguíneo (Tapeo del estrangulamiento).'
  },
  {
    id: 'bn-f3',
    name: 'F3 — Cierre Abdominal y Extensión de Cadera (The Crunch & Bridge)',
    desc: 'Contracción intensa de los oblicuos para arquearse hacia el hombro de anclaje (crunch lateral) y extensión de cadera para empujar la rodilla estranguladora dentro del cuello rival.',
    magnitude: 'Masa rotacional y puente isométrico (800 - 1000 N)',
    direction: 'Rotación lateral ascendente',
    muscles: 'Oblicuos, recto abdominal, glúteo mayor.',
    anatomicalTarget: 'Eliminación del espacio residual y aumento drástico del Squeeze.'
  }
];

export const buggyInvertedVectors: ForceVector[] = [
  {
    id: 'bi-f1',
    name: 'F1 — Inversión Pélvica y Gravitacional (Pelvic Inversion)',
    desc: 'Inversión de cadera a 180 grados. Al rotar el cuerpo, aprovechas la inercia y gravedad para dejar caer tu tren inferior directamente sobre la nuca del rival desde un ángulo norte-sur.',
    magnitude: 'Carga de masa por gravedad (600 - 800 N)',
    direction: 'Vertical descendente (cabeza abajo)',
    muscles: 'Psoas ilíaco, core rotacional, gravedad ponderada.',
    anatomicalTarget: 'Cambiar el plano de ataque para evadir bloqueos de hombros convencionales.'
  },
  {
    id: 'bi-f2',
    name: 'F2 — Estrangulación Poplítea Inversa (Reverse Squeeze)',
    desc: 'La pierna estranguladora entra desde el sentido opuesto. La tibia o corva presiona la tráquea/carótida por delante mientras el rival intenta defender hacia arriba.',
    magnitude: 'Squeeze flexor invertido (600 - 850 N)',
    direction: 'Perpendicular al eje de la columna del rival',
    muscles: 'Bíceps femoral, isquiosurales.',
    anatomicalTarget: 'Asfixia sorpresa aprovechando la falta de marcos defensivos en la posición inversa.'
  },
  {
    id: 'bi-f3',
    name: 'F3 — Bloqueo Escapular y Anclaje (Reverse Latch)',
    desc: 'El brazo asegura el bloqueo sobre el costado o espalda del rival para evitar que pueda rolar e iniciar una fuga (scramble) y soltar la presión asimétrica de las piernas.',
    magnitude: 'Retención de contención (350 - 500 N)',
    direction: 'Tracción hacia el eje central posterior',
    muscles: 'Manguito rotador, dorsales, trapecio.',
    anatomicalTarget: 'Clavar el torso del adversario al tapiz bajo el peso de tus caderas.'
  }
];

export const buggyOneHandVectors: ForceVector[] = [
  {
    id: 'bh-f1',
    name: 'F1 — Poste de Marco Biomecánico (Mat Post Frame)',
    desc: 'La mano libre se ancla rígidamente al suelo (Mat poste) o en la cadera del oponente, creando un marco esquelético irrompible que evita ser aplastado o sufrir un Slam.',
    magnitude: 'Marco de resistencia ósea (600 - 900 N)',
    direction: 'Ascendente y diagonal contra la gravedad',
    muscles: 'Tríceps, deltoides anterior, bloqueo óseo.',
    anatomicalTarget: 'Proteger las propias costillas y evitar el colapso del cuerpo bajo presión (stacking).'
  },
  {
    id: 'bh-f2',
    name: 'F2 — Candado Profundo Unilateral (Deep Single Hook)',
    desc: 'Al usar una sola mano, el anclaje interior debe sobrepasar ampliamente la línea del cuello, logrando unir la muñeca propia con la fosa poplítea de la pierna estranguladora.',
    magnitude: 'Tracción concentrada de un brazo (450 - 600 N)',
    direction: 'Contracción retractiva pura',
    muscles: 'Bíceps braquial, supinador largo, flexores profundos de la mano.',
    anatomicalTarget: 'Asegurar la asfixia sin la ayuda de la mano externa mediante un anclaje extra-profundo.'
  },
  {
    id: 'bh-f3',
    name: 'F3 — Torque Asimétrico de Oblicuos (Unilateral Crunch)',
    desc: 'Para compensar la pérdida de la doble tracción manual, debes arquear poderosamente el torso de manera asimétrica, clavando la rodilla directo en la vena yugular.',
    magnitude: 'Presión rotatoria concentrada (700 - 850 N)',
    direction: 'Flexión oblicua hacia el interior',
    muscles: 'Oblicuos internos/externos, recto femoral.',
    anatomicalTarget: 'Eliminación del espacio (Slack) en la estrangulación de soporte único.'
  }
];`;

let content = fs.readFileSync('src/data.ts', 'utf8');

const startIdx = content.indexOf('export const buggyNormalVectors: ForceVector[] = [');

if(startIdx !== -1) {
  content = content.substring(0, startIdx) + vectors;
  fs.writeFileSync('src/data.ts', content);
}
