import { DayRoutine, Stretch, ForceVector } from './types';

import imgBuggyOneHand from './assets/images/Buggy1Mano_1.png';
import imgBuggyOneHandAlt from './assets/images/Buggy1mano_2.jpg';
import imgOctopusGuard from './assets/images/GuardiaPulpo.jpg';
import imgReverseBuggy from './assets/images/BuggyInvertida.jpg';
import imgReverseBuggyAlt from './assets/images/BuggyInvertidaAngulo2.webp';
import imgBuggyNormal from './assets/images/buggyNormal.jpg';
import imgBuggyNormalAlt from './assets/images/BuggyNormal_Angulo2.jpg';
import imgAdamWardzinski from './assets/images/AdamWardzinski_OctopusGuardEngineering.webp';
import imgBuggyPedia from './assets/images/BuggyPedia.jpg';
import imgGuardiaPulpo from './assets/images/GuardiaPulpo.jpg';
import imgKadeTyeRuotolo from './assets/images/Kade_TyeRuotolo_TheGood_TheBad_TheBuggy.webp';
import imgOctopus2 from './assets/images/octopus2.0cj.jpeg';
import imgOctopusCJ1 from './assets/images/OctopusCJ1.jpg';
import imgOctopusWithPajamas from './assets/images/OctopusWithPajamasEduardoTelles.webp';
import imgPauloMarmund from './assets/images/PauloMarmund_BuggyChoketheWorldfromEverywhere.webp';
import imgReneSousa from './assets/images/ReneSousa_TEACHMEHOWTOBUGGY.webp';
import imgGordonRyan from './assets/images/Systematically Dismantling Octopus Guard Gordon Ryan.webp';

export const IMAGES = {
  buggyOneHand: imgBuggyOneHand,
  buggyOneHandAlt: imgBuggyOneHandAlt,
  octopusGuard: imgOctopusGuard,
  reverseBuggy: imgReverseBuggy,
  reverseBuggyAlt: imgReverseBuggyAlt,
  buggyNormal: imgBuggyNormal,
  buggyNormalAlt: imgBuggyNormalAlt,
  adamWardzinski: imgAdamWardzinski,
  buggyPedia: imgBuggyPedia,
  guardiaPulpo: imgGuardiaPulpo,
  kadeTyeRuotolo: imgKadeTyeRuotolo,
  octopus2: imgOctopus2,
  octopusCJ1: imgOctopusCJ1,
  octopusWithPajamas: imgOctopusWithPajamas,
  pauloMarmund: imgPauloMarmund,
  reneSousa: imgReneSousa,
  gordonRyan: imgGordonRyan
};

// ==========================================
// BJJ FANATICS INSTRUCTIONAL INDICES
// ==========================================
export interface ChapterInfo {
  title: string;
  timestamp: string;
  explanation: string;
}

export interface InstructionalVolume {
  volume: string;
  title?: string;
  chapters: ChapterInfo[];
}

export interface TeacherCollection {
  courseTitle: string;
  instructor: string;
  description: string;
  imageUrl: string;
  bjjFanaticsUrl: string;
  volumes: InstructionalVolume[];
}

export const bjjFanaticsCourses: TeacherCollection[] = [
  {
    courseTitle: "Buggy Choke The World From Everywhere UPDATED",
    instructor: "Paulo Marmund",
    description: "Versión actualizada con nuevas entradas, incluyendo prevención de ataques modernos.",
    imageUrl: IMAGES.pauloMarmund,
    bjjFanaticsUrl: "https://bjjfanatics.com/products/buggy-choke-the-world-from-everywhere-updated-by-paulo-marmund",
    volumes: [
      { volume: "Volume 1", chapters: [
        { title: "Buggies From Bottom - The Mousetrap", timestamp: "0:00", explanation: "Entrada básica." },
        { title: "The Buggy Choke (Reversed)", timestamp: "6:45", explanation: "Variante inversa." },
        { title: "North South Buggy", timestamp: "10:35", explanation: "De norte sur." },
        { title: "Guillotine To Buggy", timestamp: "12:59", explanation: "Transición desde guillotina." },
        { title: "Fly Trap To Buggy Choke", timestamp: "17:12", explanation: "Trampa para mosca al choke." },
        { title: "Buggy Choke To Inverted Triangle", timestamp: "21:02", explanation: "Transición a triángulo invertido." },
        { title: "Kimura To Buggy", timestamp: "25:13", explanation: "Transición desde kimura." },
        { title: "Buggy To Darce", timestamp: "27:34", explanation: "Conexión con Darce." },
        { title: "Buggies From Closed Guard", timestamp: "30:25", explanation: "Desde guardia cerrada." },
        { title: "Buggy To Scarecrow To Triangle", timestamp: "35:02", explanation: "Combinación espantapájaros y triángulo." }
      ]},
      { volume: "Volume 2", chapters: [
        { title: "Buggies From Top - Buggies From Top Kesagatame", timestamp: "0:00", explanation: "Desde posición Kesa Gatame superior." },
        { title: "100kg Americana To Buggy", timestamp: "3:43", explanation: "Desde control lateral con americana." },
        { title: "Double Unders To Buggy", timestamp: "7:25", explanation: "Desde doble underhook." },
        { title: "Buggies From The Back", timestamp: "9:35", explanation: "Desde la espalda." },
        { title: "Buggy From Top Mount", timestamp: "13:13", explanation: "Desde la montada." },
        { title: "Hip Throw Buggy", timestamp: "15:51", explanation: "Lanzamiento de cadera a Buggy." },
        { title: "Double Buggy", timestamp: "17:30", explanation: "Doble Buggy." },
        { title: "Outro - Stretching Routine", timestamp: "22:35", explanation: "Rutina de estiramientos." }
      ]}
    ]
  },
  {
    courseTitle: "The Good, The Bad and The Buggy",
    instructor: "Kade & Tye Ruotolo",
    description: "Los Hermanos Ruotolo exponen su infame sistema de estrangulación no convencional, detallando la alineación milimétrica para proteger la rodilla.",
    imageUrl: IMAGES.kadeTyeRuotolo,
    bjjFanaticsUrl: "https://bjjfanatics.com/products/the-good-the-bad-and-the-buggy-by-kade-tye-ruotolo",
    volumes: [
      { volume: "Volume 1", chapters: [
        { title: "The OG Buggy Choke", timestamp: "0:44", explanation: "El Buggy original." },
        { title: "One Leg Buggy Choke", timestamp: "5:13", explanation: "Buggy con una pierna." },
        { title: "Buggy Choke From Half Guard", timestamp: "11:34", explanation: "Entrada desde media guardia." }
      ]},
      { volume: "Volume 2", chapters: [
        { title: "Buggy Choke From The Back", timestamp: "5:49", explanation: "Desde control de espalda." },
        { title: "Big Guy Buggy Choke", timestamp: "9:20", explanation: "Adaptación para oponentes pesados." }
      ]}
    ]
  },
  {
    courseTitle: "The Buggypedia",
    instructor: "Jacob \"Jay Rod\" Rodriguez",
    description: "El agresivo competidor de B-Team detalla la anatomía completa del Buggy Choke, cubriendo agarres mecánicos, palancas de costillas, setups desde media guardia y prevención del azote.",
    imageUrl: IMAGES.buggyPedia,
    bjjFanaticsUrl: "https://bjjfanatics.com/products/the-buggypedia-by-jacob-rodriguez",
    volumes: [
      { volume: "Volume 1", chapters: [
        { title: "Introduction", timestamp: "0:00", explanation: "Introducción al sistema." },
        { title: "Concepts + Principles - Buggy Enigma", timestamp: "0:38", explanation: "El enigma del Buggy." },
        { title: "Buggy Pathway", timestamp: "3:00", explanation: "Vías de ataque." },
        { title: "Buggy Creates Hesitation", timestamp: "4:42", explanation: "Crear duda en el oponente." },
        { title: "Buggy Pin Reliever", timestamp: "6:09", explanation: "Alivio de inmovilizaciones." },
        { title: "Bottom Side - Buggy Mechanics", timestamp: "8:08", explanation: "Mecánicas desde el control cruzado." },
        { title: "Elbow Post", timestamp: "16:17", explanation: "Poste con el codo." },
        { title: "Entry", timestamp: "20:03", explanation: "Entradas." },
        { title: "Pitpost Buggy", timestamp: "23:29", explanation: "Variante Pitpost." },
        { title: "Punch Buggy", timestamp: "29:14", explanation: "El Punch Buggy." },
        { title: "Near Side Buggy", timestamp: "33:39", explanation: "Buggy lado cercano." },
        { title: "Closed Guard Transition", timestamp: "37:02", explanation: "Transición a guardia cerrada." },
        { title: "Vine Buggy", timestamp: "41:49", explanation: "La enredadera." },
        { title: "To Triangle", timestamp: "45:57", explanation: "Conexión a triángulo." },
        { title: "To Darce", timestamp: "51:14", explanation: "Conexión a Darce." },
        { title: "Buggy Private", timestamp: "55:47", explanation: "Detalles exclusivos." },
        { title: "North South Buggy", timestamp: "57:16", explanation: "Variante norte sur." }
      ]},
      { volume: "Volume 2", chapters: [
        { title: "1/2 Guard - Knee Shield Buggy", timestamp: "0:00", explanation: "Buggy desde escudo de rodilla." },
        { title: "Heist Buggy", timestamp: "5:38", explanation: "Buggy en levantada técnica." },
        { title: "Punch Buggy", timestamp: "10:15", explanation: "Desde media guardia." },
        { title: "Closed Guard Transition", timestamp: "13:41", explanation: "Conexión de guardia cerrada." },
        { title: "Vine Buggy", timestamp: "17:31", explanation: "Variante vine desde media." },
        { title: "To Triangle", timestamp: "20:16", explanation: "Finalización con triángulo." },
        { title: "To Darce", timestamp: "25:45", explanation: "Finalización con Darce." }
      ]},
      { volume: "Volume 3", chapters: [
        { title: "Miscellaneous - Back Buggy", timestamp: "0:00", explanation: "Buggy desde espalda." },
        { title: "Inversion Buggy", timestamp: "3:53", explanation: "Versión invertida." },
        { title: "Bait Buggy", timestamp: "7:31", explanation: "Buggy como cebo." },
        { title: "Closed Guard", timestamp: "12:04", explanation: "En guardia cerrada." },
        { title: "Buggycana", timestamp: "13:55", explanation: "Conexión a americana." },
        { title: "Re-Buggy", timestamp: "16:50", explanation: "Segundo ataque." },
        { title: "Re-Buggy Defense", timestamp: "20:16", explanation: "Defender el setup." }
      ]},
      { volume: "Volume 4", chapters: [
        { title: "Defense - Centerline", timestamp: "0:00", explanation: "Defensa del eje central." },
        { title: "Framing", timestamp: "2:04", explanation: "Marcos defensivos." },
        { title: "Head Misalignment", timestamp: "3:38", explanation: "Desalineación de la cabeza." },
        { title: "Leg Misalignment", timestamp: "5:06", explanation: "Desalineación de piernas." },
        { title: "Back Roll", timestamp: "6:42", explanation: "Escapes con voltereta hacia atrás." },
        { title: "Mobility Section - Ass To Grass", timestamp: "8:23", explanation: "Movilidad para el set." },
        { title: "90/90 Stretch", timestamp: "11:12", explanation: "Estiramiento 90/90." },
        { title: "Car Stretch", timestamp: "13:54", explanation: "Estiramiento The Car." },
        { title: "The Diaz", timestamp: "15:27", explanation: "Rutina Diaz." },
        { title: "Shoulders To Hip", timestamp: "17:14", explanation: "Acercamiento del hombro a cadera." },
        { title: "Head To Toes", timestamp: "18:45", explanation: "Flexibilidad profunda de cadera." }
      ]}
    ]
  },
  {
    courseTitle: "Teach Me How to Buggy",
    instructor: "Rene Sousa",
    description: "Metodología del 10th Planet BJJ aplicada al Buggy Choke y transiciones flexibles.",
    imageUrl: IMAGES.reneSousa,
    bjjFanaticsUrl: "https://bjjfanatics.com/products/teach-me-how-to-buggy-by-rene-sousa",
    volumes: [
      { volume: "Volume 1", chapters: [
        { title: "Intro", timestamp: "0:00", explanation: "Presentación del sistema." },
        { title: "Intro To Buggy Basics", timestamp: "1:08", explanation: "Principios básicos del Buggy." },
        { title: "Buggy Basics From Side Control", timestamp: "6:59", explanation: "Desde Side Control." },
        { title: "Buggy From Bodylock Pass", timestamp: "12:52", explanation: "Counter contra el Bodylock." },
        { title: "Knee Elbow Escape, Full Guard, Pop Triangle", timestamp: "17:16", explanation: "Fluency de guardia a Triangle." }
      ]},
      { volume: "Volume 2", chapters: [
        { title: "Buggy From D'arce Attempt", timestamp: "0:00", explanation: "Revertir el intento de Darce." },
        { title: "Buggy From Ghost Escape", timestamp: "5:58", explanation: "Combinación con escape fantasma." },
        { title: "Buggy To Darce To Mounted Triangle", timestamp: "11:07", explanation: "Combinaciones encadenadas." },
        { title: "Buggy To Guard Retention To Triangle", timestamp: "16:06", explanation: "Retención de guardia y ofensa." },
        { title: "Armbar Defense", timestamp: "19:34", explanation: "Defensa con armbar." },
        { title: "Buggy Choke Defense", timestamp: "25:55", explanation: "Defendiendo el Buggy del rival." }
      ]},
      { volume: "Volume 3", chapters: [
        { title: "Overhook Triangle", timestamp: "0:00", explanation: "Ataque del Overhook." },
        { title: "Jailbreak Side Control Escape", timestamp: "8:00", explanation: "Escape de Jailbreak." },
        { title: "Lifted Buggy Options", timestamp: "13:37", explanation: "Buggy suspendido y elevado." },
        { title: "Buggy To X Guard", timestamp: "18:12", explanation: "Transición a Guardia X." },
        { title: "Knee On Belly Defense", timestamp: "22:17", explanation: "Defendiendo rodilla en el estómago." },
        { title: "Double Leg To Buggy", timestamp: "24:27", explanation: "De derribo a Buggy." },
        { title: "Outro", timestamp: "26:06", explanation: "Conclusión." }
      ]}
    ]
  },
  {
    courseTitle: "The Reach Around AKA Octopus Guard",
    instructor: "Craig Jones",
    description: "La enciclopedia definitiva del Octopus Guard original. Biomecánica detrás del underhook profundo y escapes.",
    imageUrl: IMAGES.octopusCJ1,
    bjjFanaticsUrl: "https://bjjfanatics.com/products/the-octopus-guard-by-craig-jones",
    volumes: [
      { volume: "Volume 1", chapters: [
        { title: "Intro", timestamp: "0:00", explanation: "Presentación general de la guardia pulpo" },
        { title: "Beat The Crossface", timestamp: "2:23", explanation: "- Hip bump desde guardia — fundamental\n- Desde kosoto hook → (media guardia con pie cut dentro) → Si quiere dejar caer su cadera: agarro su tibia y empujo\n- → Step over las piernas y si intenta subir → espalda\n- 2 en 1 a la muñeca para ganar el crossface y barlo encima" },
        { title: "Beat The Steppover", timestamp: "7:40", explanation: "- Primero conseguir altura y luego alcanzar la cadera suya\n  - → Kosoto hook } depende de cómo coloque la rodilla\n  - → Coger espalda }\n- Pop hips (shrimpo)" },
        { title: "Win The Height Battle", timestamp: "11:36", explanation: "- Cuando usen el crossface para parar pulpo → Buggy → esconder su codo\n  - → Ghost escape D'arce (si quita crossface)\n- Respuesta oponente (Hip-switch):\n  - Empujarlo hacia mí con rodilla y péndulo para sentarme\n  - → Scramble" },
        { title: "Encourage The Scramble", timestamp: "16:01", explanation: "- Desde pulpo (sentado) → Front headlock (standup)\n- Control lateral/pulpo → enganchar pierna y rodar lado pierna\n- Contra resistencia al raspado normal:\n  1. Kosoto hook (presión) → rodar (switch hips)\n  2. Hip bump (cup ankle)" },
        { title: "Where From?", timestamp: "21:12", explanation: "Posiciones de continuación y transiciones" }
      ]},
      { volume: "Volume 2", chapters: [
        { title: "Ko Soto Sweep", timestamp: "0:00", explanation: "- *cambia el kosoto*\n- Gancho mariposa (en pulpo)\n  - → Enforced reach-around (agarrar pierna y brazo)\n  - → Sweeps (extender gancho mariposa)\n  - → Tap near rodilla cercana y elevar\n    - → Raspado → hip switch (para guardia) / underhook\n    - → Espalda" },
        { title: "Ko Soto Hip Bump", timestamp: "5:41", explanation: "- Bolo: poner peso hacia oponente y luego hacia atrás para entrar en berimbolo\n  - → Stomp knee" },
        { title: "Height Scramble", timestamp: "11:00", explanation: "- Control lateral/pulpo → enganchar pierna y rodar lado pierna\n- Kosoto hook (presión) → rodar (switch hips)" },
        { title: "Butterfly Sweep", timestamp: "13:49", explanation: "- Gancho mariposa (en pulpo)\n- → Enforced reach-around (agarrar pierna y brazo)\n- → Sweeps (extender gancho mariposa)\n- → Tap near rodilla cercana y elevar" },
        { title: "Butterfly Option 2", timestamp: "20:41", explanation: "- → Raspado → hip switch (para guardia) / underhook\n- → Espalda" },
        { title: "Butterfly Bolo", timestamp: "24:31", explanation: "- Bolo: poner peso hacia oponente y luego hacia atrás → berimbolo\n  - → Stomp knee" }
      ]},
      { volume: "Volume 3", chapters: [
        { title: "Octopus Buggy", timestamp: "0:00", explanation: "- Cuando usen el crossface → Buggy → esconder su codo\n- → Ghost escape D'arce" },
        { title: "Buggy Darce", timestamp: "5:39", explanation: "- D'arce counter:\n  - → Codo fuera → no aprietan con todo su cuerpo\n  - → Levantar caderas y espalda\n  - → Si cae en guardia con brazo atrapado → pendulum sweep (Caderas altas)\n- → Buggy → mismo pero finaliza con un forward roll\n  - → Import → mantener caderas altas" },
        { title: "Digging Out Of A Hole", timestamp: "9:06", explanation: "- Buggy muñeca → si tienen underhook:\n  - Como no podemos girarnos/levantar, empujar cadera hacia ellos → bait → agarrar handcuff\n  - Levantar rodilla para atrapar su brazo\n- Buggy normal → bait arm triangle → no estar plano\n  - → Post cadera contraria mientras tienes rodillas altas → ghost escape D'arce" },
        { title: "Octopus To Front Head", timestamp: "13:17", explanation: "- Si cuando estaba tortuga/front headlock caen a guillotine → saltar al otro lado\n- (19:30 / Vol.3) Romper agarre D'arce rotar lado contrario\n  - → Mirar lado contrario y rotar pulpo\n  - → Sentarse caderas y raspar (peek out)" },
        { title: "Oklahoma Drill", timestamp: "15:46", explanation: "- (34:25 / Vol.3) Si pisan nuestras piernas → shoulder roll → leg attacks\n- Tortuga (llega desde pulpo) / overcuddle\n  - → Coger su rodilla → saltar (perro)\n  - → Caminar y coger su talón para que no cojan la espalda\n    - → Si se levantan (sientan) desde la posición:\n      - → Scrambles y triángulo\n      - → Ataques a las piernas (kneebar)" },
        { title: "Rolling Footage", timestamp: "19:17", explanation: "Footage de rodadas aplicando las técnicas" }
      ]}
    ]
  },
  {
    courseTitle: "Octopus Guard 2.0",
    instructor: "Craig Jones",
    description: "Sistema completo actualizado para no-gi, expandiendo las transiciones de pierna y escapes preventivos.",
    imageUrl: IMAGES.octopus2,
    bjjFanaticsUrl: "https://bjjfanatics.com/products/octopus-guard-2-0-by-craig-jones",
    volumes: [
      { volume: "Volume 1", chapters: [
        { title: "Craig The King Jones and Hey She's Hotter", timestamp: "0:00", explanation: "Introducción al sistema Octopus 2.0 de Craig Jones" },
        { title: "Half Guard Vs Side Control", timestamp: "4:35", explanation: "- Desde media guardia controlas tus piernas y no tienes posib tortuga\n- Desde el kneecut queremos controlar que no tengan crossface" },
        { title: "Jiu Jitsu VS Wrestling Cross Face", timestamp: "11:33", explanation: "- → Inside wrist control (2on1 o 1on1) (perro mirando)\n- → Para que no vayan a montada → 1º elevar pierna arriba\n- Si consigue crossface → crunch y 2 pulgares en su codo (empujar arriba)" },
        { title: "Side Control Is Not Real", timestamp: "15:06", explanation: "- Llegan a pulpo mano en el muslo y girarse hacia ellos\n- Acercarse a sus caderas; jump → otro codo debajo de nuestro cuerpo para crear altura" },
        { title: "The Only Grips You'll Ever Need", timestamp: "20:38", explanation: "- 1º Subir caderas → colocar rodilla y pisar detrás\n  - → Crear altura → push → enganchar su pierna (underhook)\n    - → pull → agarrar talón y caminar\n    - → Bridge → fat man roll →\n      - → agarrar muñeca" },
        { title: "Piss Like A Dog", timestamp: "26:41", explanation: "- Si cambian base y tiran su cadera encima de la cabeza → cartwheel → caminar hacia sus caderas\n- Si están lejos de la cabeza:\n  - → Post elbow al suelo hip in → coger espalda (sacar rodilla)" },
        { title: "The Modern \"Technical Get The F**K Up\"", timestamp: "32:00", explanation: "- Si cambian cadera al otro lado (scaffold):\n  - → Sentarse — sus caderas bajas →\n    - → Normal standup (no peso en tren sup)\n- Si intentan caminar a montesus → 1º controlar rodilla\n- Siempre bloquear que pisen a la espalda:\n  - 2º caminar hacia ellos y hacer altura en las caderas\n  - 3º otro codo en el suelo (pulpo normal)" }
      ]},
      { volume: "Volume 2", chapters: [
        { title: "Sweep Them Off Their Feet", timestamp: "0:00", explanation: "- Control lateral/pulpo → enganchar pierna y rodar lado pierna\n- Contra resistencia al raspado normal" },
        { title: "Get Them When They're Vulnerable", timestamp: "5:48", explanation: "- Kosoto hook (presión) → rodar (switch hips)\n- Hip bump (cup ankle)" },
        { title: "Why You're Fat? And Yo Makikomi Roll Still Don't Work", timestamp: "10:42", explanation: "- → Buggy → mismo pero finaliza con un forward roll\n- → Import → mantener caderas altas" },
        { title: "Switch Hipper Counter", timestamp: "15:00", explanation: "- Buggy muñeca → si tienen underhook:\n  - Como no podemos girarnos/levantar, empujar cadera hacia ellos → bait → agarrar handcuff\n  - Levantar rodilla para atrapar su brazo" },
        { title: "Dealing With Reverse - Side Control", timestamp: "23:13", explanation: "- Buggy normal → bait arm triangle → no estar plano\n  - → Post cadera contraria mientras tienes rodillas altas → ghost escape D'arce" },
        { title: "Darce Chokes Are Fake", timestamp: "30:07", explanation: "- D'arce counter:\n  - → Codo fuera → no aprietan con todo su cuerpo\n  - → Levantar caderas y espalda\n  - → Si cae en guardia con brazo atrapado → pendulum sweep" },
        { title: "The Infamous Darce Counter Back Take", timestamp: "35:13", explanation: "- Si cuando estaba tortuga/front headlock caen a guillotine → saltar al otro lado\n- Romper agarre D'arce rotar lado contrario\n  - → Mirar lado contrario y rotar pulpo\n  - → Sentarse caderas y raspar (peek out)" },
        { title: "Teach Me How To Buggy - Off The Darce", timestamp: "38:30", explanation: "- Buggy aplicado como counter al D'arce\n- Mantener caderas altas como principio fundamental" }
      ]},
      { volume: "Volume 3", chapters: [
        { title: "Wrist Ride Buggy", timestamp: "0:00", explanation: "- Buggy muñeca → si tienen underhook\n- Empujar cadera hacia ellos → bait → agarrar handcuff\n- Levantar rodilla para atrapar su brazo" },
        { title: "Vintage Buggy", timestamp: "5:50", explanation: "- Buggy normal → bait arm triangle → no estar plano\n- Post cadera contraria mientras tienes rodillas altas" },
        { title: "Buggy Choke To Ghost Darce", timestamp: "11:13", explanation: "- → Ghost escape D'arce\n- Post cadera contraria mientras tienes rodillas altas → ghost escape D'arce" },
        { title: "Front Head Ain't No Thang", timestamp: "14:12", explanation: "- Si cuando estaba tortuga/front headlock caen a guillotine → saltar al otro lado\n- Tortuga (llega desde pulpo) / overcuddle\n  - → Coger su rodilla → saltar (perro)" },
        { title: "Darce Grip Break", timestamp: "17:45", explanation: "- Romper agarre D'arce rotar lado contrario\n  - → Mirar lado contrario y rotar pulpo\n  - → Sentarse caderas y raspar (peek out)" },
        { title: "Peak Out Counter To Darce", timestamp: "21:29", explanation: "- Si pisan nuestras piernas → shoulder roll → leg attacks\n- Tortuga / overcuddle → coger su rodilla → saltar (perro)\n- Caminar y coger su talón para que no cojan la espalda" },
        { title: "Don't Forget Their Legs", timestamp: "24:07", explanation: "- → Si se levantan (sientan) desde la posición:\n  - → Scrambles y triángulo\n  - → Ataques a las piernas (kneebar)" },
        { title: "Turtle Over Wrap", timestamp: "27:27", explanation: "- Crucifijo desde tortuga → fireman's carry\n  - Peso hacia sus piernas para que apoyen resistencia → postura hacia su cabeza\n- Crucifijo normal (ellos abajo):\n  - Enganchan brazo con pierna arriba\n    - → Coger su brazo y nuca y oreja a oreja\n    - → Puente y caminar hacia su cabeza" },
        { title: "Turtle Over Wrap: Armbar And Triangle", timestamp: "33:48", explanation: "- Enganchan brazo pierna abajo\n  - → Nuca y brazo curvo para evitar armbars\n  - → Puente y giran hacia pierna (como calentamiento) / bear hug\n- Giros desde tortuga:\n  - → 1 gancho + cinturón de seguridad\n  - → Alejarse y construir altura al lado contrario" }
      ]},
      { volume: "Volume 4", chapters: [
        { title: "Turtle Overwrap: Leg Attacks", timestamp: "0:00", explanation: "- Si pisan nuestras piernas desde tortuga → shoulder roll → leg attacks\n- Scrambles y triángulo / Ataques a las piernas (kneebar)" },
        { title: "Crucifix = Fireman's Carry", timestamp: "5:50", explanation: "- Crucifijo desde tortuga → fireman's carry\n  - Peso hacia sus piernas para que apoyen resistencia → postura hacia su cabeza" },
        { title: "Crucifixed", timestamp: "8:43", explanation: "- Crucifijo normal (ellos abajo):\n  - Enganchan brazo con pierna arriba → coger su brazo y nuca y oreja a oreja → puente y caminar hacia su cabeza\n  - Enganchan brazo pierna abajo → nuca y brazo curvo para evitar armbars → puente y giran hacia pierna / bear hug" },
        { title: "Turtle Tilts", timestamp: "17:08", explanation: "- Giros desde tortuga:\n  - → 1 gancho + cinturón de seguridad\n  - → Alejarse y construir altura al lado contrario\n  - → Empujo pie sin gancho para que se caiga → busca codo y giro\n- Nos empujan hacia un lado para la espalda:\n  1. Atrapar el gancho PROFUNDO (wrestling deep hook)\n  2. Codo alejado suya\n  3. Si intentan ahogar → mirar hacia ellos" },
        { title: "Always Be On That Lean", timestamp: "23:51", explanation: "Si ponen otros ganchos: coger pie / switch legs / empujar pie, rodillas / scissors" },
        { title: "The Jo Chen Counter", timestamp: "31:08", explanation: "" },
        { title: "Runaway (Feat Priit)", timestamp: "34:50", explanation: "- Reverse side control → controlar muñeca y scissor legs\n  - → Running man → tortuga → desde ellos teniendo front headlock\n  - → Postura cabeza → coger espalda\n  - → Si tienen underhook → caderas hacia ellos → tortuga" }
      ]}
    ]
  },
  {
    courseTitle: "Octopus Guard Engineering",
    instructor: "Adam Wardzinski",
    description: "Sistema desde la media guardia detallando mecánicas de barridos clásicos mediante el uso de la mariposa.",
    imageUrl: IMAGES.adamWardzinski,
    bjjFanaticsUrl: "https://bjjfanatics.com/products/octopus-guard-engineering-by-adam-wardzinski",
    volumes: [
      { volume: "Volume 1", chapters: [
        { title: "Octopus Guard Intro", timestamp: "0:00", explanation: "Mecánica." },
        { title: "Octopus Guard Entries", timestamp: "6:24", explanation: "Entradas y frames." },
        { title: "Countering the Crossface", timestamp: "15:25", explanation: "Aislamiento contra el Crossface lateral." },
        { title: "Dealing with the Crossface Attacking Opponent's Arm", timestamp: "22:50", explanation: "Atacando al brazo durante su crossface." }
      ]},
      { volume: "Volume 2", chapters: [
        { title: "Chasing the Back", timestamp: "0:00", explanation: "Primera variación toma de espalda." },
        { title: "Chasing the Back part 2", timestamp: "5:57", explanation: "Ajuste de segundo nivel." },
        { title: "Chasing the Back part 3", timestamp: "10:06", explanation: "Fijando ganchos efectivos." },
        { title: "Double Leg", timestamp: "12:58", explanation: "Double leg desde abajo." },
        { title: "Countering the Guard Pass with Back Chasing Concepts", timestamp: "15:16", explanation: "Contrarrestando paso guard con caza de espalda." },
        { title: "Hip Bump Sweep", timestamp: "18:35", explanation: "Rasado profundo del Hip bump." },
        { title: "Ways to NOT Get Reoctopussed", timestamp: "26:48", explanation: "Como evitar que te usen Octopus a ti." }
      ]},
      { volume: "Volume 3", chapters: [
        { title: "Hip Bump Option with Hips Sideways", timestamp: "0:00", explanation: "Opciones de hip bump lateral." },
        { title: "Octopus Dogfight Position", timestamp: "6:12", explanation: "Manejando la dogfight (perro vs perro)." },
        { title: "Octopus Back Take Under Opponent's Leg", timestamp: "10:44", explanation: "Gancho bajo pierna para espalda." },
        { title: "Simple Octopus Back Take When Hips are Sideways", timestamp: "16:47", explanation: "Toma de espalda simple." },
        { title: "General Rule to Take the Back From Octopus and How to Avoid Counters", timestamp: "21:32", explanation: "Reglas generales en backtakes y defensa de contraataques." },
        { title: "Octopus Butterfly Guard Sweep", timestamp: "27:40", explanation: "El barrido mariposa adaptado." }
      ]},
      { volume: "Volume 4", chapters: [
        { title: "Attacking the Back and the Arm After Basic Octopus Hook Sweep", timestamp: "0:00", explanation: "Espalda y brazo post gancho de pulpo." },
        { title: "Octopus Butterfly Over the Head Sweep", timestamp: "6:34", explanation: "Gancho arriba de cadera." },
        { title: "Octopus Butterfly Back Take", timestamp: "11:50", explanation: "Butterfly conectado a espalda." },
        { title: "Octopus Butterfly Overview", timestamp: "18:53", explanation: "Integración de componentes." },
        { title: "Octopus Back Take From Turtle Position", timestamp: "21:36", explanation: "De tortuga a espalda." }
      ]},
      { volume: "Volume 5", chapters: [
        { title: "Octopus Concepts From Closed Guard", timestamp: "0:00", explanation: "Principios al estar en guardia cerrada." },
        { title: "Countering the Backstep with the Octopus", timestamp: "6:55", explanation: "Counter al backstep superior." },
        { title: "Top Octopus to Back Take", timestamp: "12:37", explanation: "Toma de espalda de pulpo superior." },
        { title: "Getting Top Octopus From Headquarters Position", timestamp: "25:01", explanation: "Control Headquarters y pases." }
      ]}
    ]
  },
  {
    courseTitle: "Octopus With Pajamas",
    instructor: "Eduardo Telles",
    description: "El creador original de la guardia pulpo expone sus secretos para Gi (pijamas).",
    imageUrl: IMAGES.octopusWithPajamas,
    bjjFanaticsUrl: "https://bjjfanatics.com/products/octopus-with-pajamas-by-eduardo-telles",
    volumes: [
      { volume: "Volume 1", chapters: [
        { title: "Intro", timestamp: "0:00", explanation: "Introducción histórica." },
        { title: "Octopus Sweep From Half Guard", timestamp: "0:44", explanation: "Barrido clásico desde media." },
        { title: "Octopus Sweep From Half Guard Posting The Elbow", timestamp: "2:24", explanation: "Uso del elbow post." },
        { title: "Back Take From Half Guard Using Octopus Guard", timestamp: "3:24", explanation: "Espalda desde media." },
        { title: "Octopus Butterfly Sweep", timestamp: "4:55", explanation: "Mariposa barrido pulpo." },
        { title: "Octopus Butterfly From Ninja Roll To Back Take", timestamp: "5:42", explanation: "Voltereta Ninja a espalda." },
        { title: "Toptopus Giving The Sweep And Take The Back", timestamp: "6:19", explanation: "El pulpo superior (toptopus)." },
        { title: "Octopus Roll", timestamp: "8:12", explanation: "Giro Pulpo." },
        { title: "Faking The Sweep To Back Take", timestamp: "8:44", explanation: "Amague de barrido." },
        { title: "Octopus To Transition To Turtle", timestamp: "9:26", explanation: "Hacia tortuga." },
        { title: "Octopus From Closed Guard Taking The Back", timestamp: "9:58", explanation: "De guardia cerrada a espalda." },
        { title: "Octopus From Closed Guard Grabbing The Sleeve", timestamp: "12:03", explanation: "Uso mangas de gi." },
        { title: "Octopus Hip Bump Sweep", timestamp: "13:58", explanation: "Hip bump sweep de Eduardo." },
        { title: "Octopus Hip Bump Sweep Posting The Elbow", timestamp: "16:53", explanation: "Hip bump con post base." },
        { title: "Octopus From Half Guard With Butterfly Hook Going To The Back", timestamp: "18:07", explanation: "Escudo mariposa." },
        { title: "Butterfly Octopus Sweep", timestamp: "20:25", explanation: "Barrido gancho." },
        { title: "Butterfly Octopus Sweep To Ninja Roll Back Take", timestamp: "21:53", explanation: "Ninja Roll de gancho mariposa." },
        { title: "Toptopus Back Take", timestamp: "23:22", explanation: "Espalda toptopus." },
        { title: "Counter Attacking Toptopus", timestamp: "26:37", explanation: "Defensa contra toptopus." },
        { title: "Cancelling The Octopus With Kata Gatame", timestamp: "29:55", explanation: "Kata gatame counter." },
        { title: "Cancelling The Octopus With Ezekiel", timestamp: "32:41", explanation: "Ezekiel counter." },
        { title: "Octopus From Reverse Half Guard To The Back", timestamp: "34:16", explanation: "Desde media guardia inversa." },
        { title: "Octopus From Reverse Half Guard With Sweep", timestamp: "36:07", explanation: "Barrido desde media inversa." },
        { title: "Outro", timestamp: "39:16", explanation: "Conclusión de Telles." }
      ]}
    ]
  },
  {
    courseTitle: "Systematically Dismantling Octopus Guard & Other Low-Percentage Moves",
    instructor: "Gordon Ryan",
    description: "Perspectiva defensiva y de pase por Gordon Ryan, analizando cómo aplastar a quienes intentan la guardia pulpo.",
    imageUrl: IMAGES.gordonRyan,
    bjjFanaticsUrl: "https://bjjfanatics.com/products/systematically-dismantling-octopus-guard-other-low-percentage-moves-by-gordon-ryan",
    volumes: [
      { volume: "Volume 1", chapters: [
        { title: "Intro", timestamp: "0:00", explanation: "Conceptos iniciales." },
        { title: "Listen To The Best, Dismiss The Rest", timestamp: "2:01", explanation: "Escucha a los mejores." },
        { title: "Over Back Theory", timestamp: "9:29", explanation: "Teoría del overback." },
        { title: "Battle Of The Knees (Top Position)", timestamp: "12:13", explanation: "La pelea de rodillas superior." },
        { title: "Battle Of The Knees (Neutral/Bottom Position)", timestamp: "16:01", explanation: "Pelea de rodillas inferior." },
        { title: "Hips Between Knees", timestamp: "21:04", explanation: "Caderas entre rodillas." },
        { title: "Dilemma Games", timestamp: "24:58", explanation: "El juego del dilema." },
        { title: "Position Threshold", timestamp: "28:31", explanation: "Umbral de posición." },
        { title: "Shoulders Vs Hips", timestamp: "32:08", explanation: "Hombros vs Hombros." },
        { title: "Overview", timestamp: "33:28", explanation: "Resumen." }
      ]},
      { volume: "Volume 2", chapters: [
        { title: "Intro To Overback From Half Guard", timestamp: "0:00", explanation: "Introducción Overback." },
        { title: "Countering Inside Wrist Grip/Overback", timestamp: "1:04", explanation: "Defensa muñeca interna." },
        { title: "Reach Back Crossface", timestamp: "7:46", explanation: "Crossface retrasado." },
        { title: "Passing Half Guard", timestamp: "11:05", explanation: "Pase desde media." },
        { title: "Countering A Secondary Underhook", timestamp: "13:58", explanation: "Counter de esgrima secundario." },
        { title: "Countering A Leg Grab (Moron Move)", timestamp: "17:23", explanation: "Defensa de agarre de pierna." },
        { title: "Countering A Leg Grab Vs Kneeling Opponent", timestamp: "21:20", explanation: "Defensa pierna vs Oponente arrodillado." },
        { title: "Countering Their Hamstring Grab", timestamp: "30:26", explanation: "Defensa contra agarre de isquiotibial." },
        { title: "Turking A Leg", timestamp: "32:57", explanation: "Aplicando el Turk de pierna." },
        { title: "Countering A Bridge - Body Position", timestamp: "37:51", explanation: "Posición contra puente de caderas." }
      ]},
      { volume: "Volume 3", chapters: [
        { title: "Countering A Bridge With A Backtake", timestamp: "0:00", explanation: "Espalda desde escape de pierna." },
        { title: "Failed Backtake Move To Mount", timestamp: "6:00", explanation: "Transición a montada." },
        { title: "Opponent Returns Hips To Floor - Dominate Far Hip", timestamp: "10:15", explanation: "Dominio de cadera lejana." },
        { title: "Elbow Cut", timestamp: "12:12", explanation: "Corte de codo." },
        { title: "Countering Opponent's Elbow Cut", timestamp: "17:12", explanation: "Defendiendo del corte de codo rival." },
        { title: "Recapturing The Bottom Knee", timestamp: "22:52", explanation: "Recuperación de base rotuliana." },
        { title: "Building Height To Far Hip Pin", timestamp: "25:28", explanation: "Escalar a base lejana." },
        { title: "Cross Hip Pin", timestamp: "30:53", explanation: "Pin cruzado." },
        { title: "Elbow Cut", timestamp: "34:19", explanation: "Segunda variación del elbow cut." },
        { title: "Combinations", timestamp: "35:35", explanation: "Combinatorias." },
        { title: "Opponent Heist To Knees/Take The Back", timestamp: "37:13", explanation: "Op retando escape a rodillar." }
      ]},
      { volume: "Volume 4", chapters: [
        { title: "Intro To Butterfly Half Guard", timestamp: "0:00", explanation: "Concepto de mariposa." },
        { title: "Controlling The Space Between The Knees", timestamp: "1:10", explanation: "Administrar tensión interarticular." },
        { title: "Step Over/Cut Through", timestamp: "3:47", explanation: "Paso de compresión." },
        { title: "Bait An Over Extension And Step Over", timestamp: "7:26", explanation: "Engaño de sobre extensíon." },
        { title: "Opponent Brings Knee Inside - Step Over/Cut Through", timestamp: "9:19", explanation: "Frenar la rodilla intrusa." },
        { title: "Countering A Kosoto Hook", timestamp: "15:06", explanation: "Destruyendo el barrido kosoto." }
      ]},
      { volume: "Volume 5", chapters: [
        { title: "Intro To Overback From Side Control", timestamp: "0:00", explanation: "Esgrima en Side." },
        { title: "Control Elements (No Leg To Turk)", timestamp: "1:40", explanation: "Aislando el turk." },
        { title: "Preventing The Overback", timestamp: "3:43", explanation: "Prevenir su underhook lejano." },
        { title: "Harder To Stop A Heist/Easier To Step Over Legs", timestamp: "8:43", explanation: "Paso táctico dinámico." },
        { title: "Easier To Elbow Cut/Harder To Get Knee To Far Hip (If Opponents Knee Is Inside)", timestamp: "11:21", explanation: "Contra medidas rotulianas." },
        { title: "Backtracking Into Half Guard", timestamp: "16:11", explanation: "Retroceder a media." },
        { title: "Flattening An Opponent Without A Turk", timestamp: "18:01", explanation: "Aplastamiento cruzado." },
        { title: "Stepping Over Legs", timestamp: "19:58", explanation: "Paso con ambas piernas." },
        { title: "Opponent Brings Knee Inside/Elbow Cut", timestamp: "21:15", explanation: "Codos como hachas." },
        { title: "Countering A Thigh Post", timestamp: "22:25", explanation: "Neutralizar bloque en muslo." },
        { title: "Countering A Thigh Post To Elbow Cutback", timestamp: "26:08", explanation: "Remate con codo de revés." },
        { title: "Countering A Heist", timestamp: "29:44", explanation: "Bloquear levantadas técnicas." },
        { title: "Opponent Locks Inside Their Own Hamstring", timestamp: "34:00", explanation: "Bloque interior de muslo rival." },
        { title: "Overback Outro", timestamp: "41:22", explanation: "Final de sobre ext." }
      ]},
      { volume: "Volume 6", chapters: [
        { title: "Intro To Buggy Counters", timestamp: "0:00", explanation: "Cómo detener el Buggy." },
        { title: "Low Percentage Move", timestamp: "0:50", explanation: "Gordon explica debilidades del Buggy." },
        { title: "Mechanics Of The Buggy", timestamp: "5:12", explanation: "Biomecánica estructural." },
        { title: "Head Position", timestamp: "7:29", explanation: "Aislamiento cervical." },
        { title: "Pin The Hips", timestamp: "13:52", explanation: "Frenar la cadera (Hip Pin)." },
        { title: "Moving To North South", timestamp: "18:34", explanation: "Transición al norte sur para huir." },
        { title: "Late Escape", timestamp: "20:09", explanation: "Escapes tardíos." },
        { title: "Nearside Buggy", timestamp: "24:11", explanation: "Anular el variante Nearside." },
        { title: "Head Position", timestamp: "25:12", explanation: "Postura alta para quitar Squeeze." },
        { title: "Short Elbow", timestamp: "26:12", explanation: "El codo defensivo." },
        { title: "Leg Ride", timestamp: "28:19", explanation: "Cabalgar el fémur enemigo." },
        { title: "Put Them Belly Down", timestamp: "30:04", explanation: "Fuerza para girarle pecho al suelo." },
        { title: "Late Escapes", timestamp: "31:49", explanation: "Más escapes profundos de emergencia." }
      ]},
      { volume: "Volume 7", chapters: [
        { title: "Intro To D'arce Escapes - Bonus", timestamp: "0:00", explanation: "Revertir el Darce de Pulpo." },
        { title: "Countering D'arce Peak Out", timestamp: "1:27", explanation: "Quitar empuje invertido." },
        { title: "Following Chest Placement", timestamp: "8:00", explanation: "Ubicación torácica." },
        { title: "Closed Guard/Back Take Escape", timestamp: "11:13", explanation: "Desde media atrás." },
        { title: "Inside Wrist Or Elbow Wrap, And Wrist Pull", timestamp: "18:14", explanation: "Pull de mano." },
        { title: "Wrist Pull When Opponent Inverts", timestamp: "23:17", explanation: "Defender a oponente invertido." },
        { title: "Outro", timestamp: "31:34", explanation: "Conclusión Gordon Ryan." }
      ]}
    ]
  }
];

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
  name: string;
  description: string;
  biomechanics: string;
  counterOption: string;
  scramble?: string;
}

export const flowchartNodesDetail: Record<string, FlowNodeInfo[]> = {
  controlLateral: [
    { id: "cl", name: "Control Lateral Bottom", description: "Posición comprometida donde el oponente ha pasado nuestra guardia.", biomechanics: "Postura defensiva basal", counterOption: "Mantener marcos óseos (frames) para evitar aplastamiento.", scramble: "Transición a Knee-Elbow Escape o reposición de guardia." },
    { id: "ke_scape", name: "Escape Knee-Elbow", description: "Fuga de caderas utilizando el antebrazo para recuperar espacio.", biomechanics: "Marco y fuga de cadera", counterOption: "El rival intenta hundir la cadera para anular el espacio.", scramble: "Conectar rodilla y codo para re-incrustar el escudo (Knee Shield)." },
    { id: "head_push", name: "Empujar Cabeza (Cebo)", description: "Obligar al oponente a resistir empujando con más peso hacia adelante.", biomechanics: "Baiting biomecánico", counterOption: "Rival cede la presión u opta por Norte-Sur.", scramble: "Aprovechar la inercia para un reversal." },
    { id: "over_press", name: "Rival Ejerce Sobrepresión", description: "El rival entrega su centro de gravedad sobre nosotros tras el empuje.", biomechanics: "Absorción de inercia", counterOption: "Evadirse hacia media guardia profunda.", scramble: "Preparar brazos para atrapar cuello o extremidad." },
    { id: "ghost_darce", name: "Escape a Darce Fantasma", description: "Atrapar el cuello durante el empuje del oponente.", biomechanics: "Transición directa", counterOption: "Rival defiende encogiendo el cuello.", scramble: "Transición a brabo choke o anaconda." },
    { id: "target_buggy", name: "Lanzamiento de Pierna a Buggy", description: "Al momento de la absorción, la pierna bloquea el brazo sobre su cuello.", biomechanics: "Rotación pélvica invertida", counterOption: "El rival intenta reaccionar enderezando la postura y creando espacio.", scramble: "Candado Buggy inminente." },
    { id: "arm_abdominal", name: "Defensa Brazo Superior", description: "Manejar la amenaza del crossface alejándolo.", biomechanics: "Frame Abdominal", counterOption: "Rival busca deslizar el brazo sobre el rostro.", scramble: "Pinchar brazo para armbar o triángulo." },
    { id: "fns_frame", name: "Frame Norte-Sur", description: "Insertar la tibia para mantener al oponente aislado.", biomechanics: "Distanciamiento por Tibia", counterOption: "Rival hace sprawl.", scramble: "Recuperar guardia cerrada." },
    { id: "triangle_direct", name: "Ataque de Triángulo Directo", description: "Aprovechar el espacio exterior para asfixiar.", biomechanics: "Cierre de piernas", counterOption: "Postura alta defensiva del rival.", scramble: "Ajustar ángulo o pasar a omoplata." },
    { id: "ns_buggy", name: "Buggy Norte-Sur", description: "Transición letal atacando por sobre la cabeza del rival.", biomechanics: "Abrazo invertido", counterOption: "Rival clava la barbilla y gira hacia afuera.", scramble: "Buggy invertido u otras variantes." }
  ],
  halfGuard: [
    { id: "hs_shield", name: "Knee Shield Media Guardia", description: "Escudo estructural usando la rodilla para controlar distancia.", biomechanics: "Base de absorción", counterOption: "Rival hace leg weave o presiona la rodilla al tapiz.", scramble: "Transición a Guardia Z o media mariposa." },
    { id: "frame_bicep", name: "Frame Manual al Bíceps", description: "Frenar embestida cruzada con brazo extendido.", biomechanics: "Palanca articular", counterOption: "Rival rompe el agarre con movimiento circular.", scramble: "Ataque a Bicep Slicer o Kimura." },
    { id: "bicep_slicer", name: "Cortadora de Bíceps", description: "Mecánica destructiva sobre el antebrazo del oponente usando nuestra pierna.", biomechanics: "Compresión doble", counterOption: "Rival extiende el brazo rápidamente.", scramble: "Finalización o raspado por dolor." },
    { id: "arm_over_head", name: "Tirar brazo sobre cabeza", description: "Evadir el frame llevándolo tras tu propia nuca.", biomechanics: "Redirección polar", counterOption: "Rival postea en el suelo.", scramble: "Ataque a espalda o triángulo de brazo." },
    { id: "arm_push_floor", name: "Rival presiona Suelo", description: "Forzar reacción descendente y aislar articulación.", biomechanics: "Aislamiento dinámico", counterOption: "Rival rola o saca el brazo.", scramble: "Omoplata o crucifix." },
    { id: "hip_escape_buggy", name: "Fuga al Buggy", description: "Entrada técnica por debajo del hombro asediado.", biomechanics: "Bypass Escapular", counterOption: "Rival esgrima (underhook) intenso.", scramble: "Cierre de Buggy Choke inminente." },
    { id: "hand_down_post", name: "Posteo Firme Mano Abajo", description: "Aprovechar la inmovilización voluntaria para escalar.", biomechanics: "Tracción estable", counterOption: "Rival retira el brazo.", scramble: "Levantada técnica u Octopus Guard." },
    { id: "octopus_entry", name: "Entrada Octopus Guard", description: "Esgrimar sobre la espalda anulando la presión cruzada.", biomechanics: "Esgrima trasera", counterOption: "Rival aplasta con Whizzer pesado.", scramble: "Raspillar espalda o Kimura trap." },
    { id: "tech_standup", name: "Standup Técnico en Octopus", description: "Levantarse apoyando el codo para imponer superioridad.", biomechanics: "Carga sobre codo", counterOption: "Rival hace guillotine choke.", scramble: "Completar derribo o tomar la espalda." },
    { id: "backtake", name: "Toma de Espalda", description: "Capturar la espalda de inmediato al levantarse.", biomechanics: "Infiltración ganchos", counterOption: "Rival rola hacia adelante.", scramble: "Asegurar body triangle (mochila)." },
    { id: "sweep_seal", name: "Seal Sweep", description: "Rastras a tu oponente hacia el lado ciego.", biomechanics: "Palanca gravitacional", counterOption: "Rival abre base ancha.", scramble: "Estabilizar posición superior o leg drag." }
  ],
  guardia: [
    { id: "guard_active", name: "Guardia Abierta Activa", description: "No permitir proximidad, manejar empuje perimetral.", biomechanics: "Control flotante", counterOption: "Rival tira piernas a un lado (Toreando pass).", scramble: "Inversión o collar-sleeve guard." },
    { id: "scarecrow", name: "Scarecrow Control", description: "Exponer articulación para abrir el control axial.", biomechanics: "Rodilla en codo", counterOption: "Rival cierra los codos y baja caderas.", scramble: "Transición a Triángulo o Gogoplata." },
    { id: "bicep_slicer_g", name: "Slicer, Triangle, Buggycana", description: "Sistemas integrados de finalización desde guardia abierta.", biomechanics: "Torsión / Compresión", counterOption: "Rival se levanta para escapar.", scramble: "Ataque de encadenamiento a extremidades superiores." }
  ],
  defensas: [
    { id: "lock_buggy", name: "Candado Buggy Establecido", description: "Punto de no retorno, el candado principal del asedio.", biomechanics: "Abrazo de la Muerte", counterOption: "Presión en tráquea o intento de Slam.", scramble: "Ajustar ángulo del squeeze abdominal." },
    { id: "def_stand", name: "Prevención de Slam", description: "El rival intenta alzar para golpear.", biomechanics: "Fallo de postura vertical", counterOption: "Enganche de pierna del oponente.", scramble: "Derribo inmediato o finalización aérea." },
    { id: "xguard_entry", name: "Conexión a Guardia X", description: "Llevarlo hacia un sistema de raspado y footlocks agarrando la pierna lejana.", biomechanics: "Agarrar Pierna Lejana", counterOption: "Rival patea la pierna para liberar enganche.", scramble: "Ataques de tobillo y rodilla (Heel hooks)." },
    { id: "buggy_sweep", name: "Raspado Oblicuo (Buggy Sweep)", description: "Obligar a la proyección mientras asfixias.", biomechanics: "Fuerza Isométrica", counterOption: "Rival basa peso y resiste movimiento.", scramble: "Finalizar desde montada." },
    { id: "def_forearm", name: "Defensa Antebrazo al Cuello", description: "Ataque defensivo del rival a nuestra propia tráquea.", biomechanics: "Carga traqueal", counterOption: "Ignorar dolor o redirigir brazo.", scramble: "Transición a Wrist Twist." },
    { id: "wrist_twist", name: "Twist Defense", description: "Controlamos su muñeca rotando fuera del perímetro de peligro.", biomechanics: "Liberación excentrica", counterOption: "Rival tira fuerte de vuelta.", scramble: "Retomar cierre de asfixia profunda." },
    { id: "def_vonflue", name: "Von Flue Counter", description: "Presión abrumadora de hombro a tu cara o cuello.", biomechanics: "Aplaste Frontal", counterOption: "Marco en cuello del rival.", scramble: "Empuje y quiebre de base (Hip Push)." },
    { id: "hip_push_break", name: "Empuje y Quiebre de Cadera", description: "Colapsar su base alejando su centro de gravedad.", biomechanics: "Quiebre de centro base", counterOption: "Rival recupera postura rígidamente.", scramble: "Liberación y scramble hacia posición dominante." }
  ],
  finalizacion: [
    { id: "finish_3p", name: "Mecánica Completa 3-Puntos", description: "1. Squeeze abdominal. 2. Elevación patelar. 3. Vista excéntrica invertida.", biomechanics: "Torque y cierre", counterOption: "Tapeo o pérdida de consciencia (Sleep).", scramble: "Fin del combate." },
    { id: "TAPOUT", name: "Muerte Arterial Hidráulica", description: "Presión isquémica al torrente vascular cerebral -> Sumisión.", biomechanics: "Oclusión Doble", counterOption: "Ninguna.", scramble: "Victoria." }
  ]
};







export const gppRoutines: DayRoutine[] = [
  {
    day: "1/4",
    group: "Empuje (Push)",
    exercises: [
      { name: "Press de Banca", series: 3, reps: "6-8", rest: "2 min" },
      { name: "Press Militar (Mancuerna)", series: 3, reps: "8-10", rest: "90 seg" },
      { name: "Fondos en paralelas", series: 3, reps: "Al fallo técnico", rest: "90 seg" },
      { name: "Elevaciones Laterales", series: 3, reps: "12-15", rest: "60 seg" },
      { name: "Tríceps Polea (Cuerda)", series: 3, reps: "12-15", rest: "60 seg" }
    ]
  },
  {
    day: "2/5",
    group: "Tracción (Pull)",
    exercises: [
      { name: "Dominadas (Lastradas si es fácil)", series: 4, reps: "6-8", rest: "2 min" },
      { name: "Remo con Barra (Prono)", series: 3, reps: "8-10", rest: "90 seg" },
      { name: "Pullover en polea alta (No-Gi)", series: 3, reps: "12-15", rest: "60 seg" },
      { name: "Facepulls", series: 3, reps: "15-20", rest: "60 seg" },
      { name: "Curl de Bíceps (Barra Z)", series: 3, reps: "10-12", rest: "60 seg" },
      { name: "Paseo del Granjero", series: 3, reps: "45 segundos", rest: "90 seg" }
    ]
  },
  {
    day: "3/6",
    group: "Pierna/Core",
    exercises: [
      { name: "Sentadilla Trasera", series: 3, reps: "6-8", rest: "2 min" },
      { name: "Peso Muerto Rumano (RDL)", series: 3, reps: "8-10", rest: "90 seg" },
      { name: "Zancadas con mancuerna", series: 3, reps: "10 por pierna", rest: "90 seg" },
      { name: "Hip Thrust (Puente glúteo)", series: 3, reps: "10-12", rest: "90 seg" },
      { name: "Deadbugs", series: 3, reps: "15 total", rest: "60 seg" },
      { name: "Plancha con arrastre (Anti-rot)", series: 3, reps: "45 segundos", rest: "60 seg" }
    ]
  }
];

export const stretches: Stretch[] = [
  {
    id: "s1",
    name: "1. Ass to grass (deep squat)",
    target: "Movilidad general piernas y cadera",
    duration: "60s",
    description: "Sentadilla profunda buscando el rango máximo de movimiento.",
    bjjTransfer: "Mejora las retenciones y la movilidad general desde cadera.",
    cues: ["Mantener talones en el suelo", "Pecho abierto"]
  },
  {
    id: "s2",
    name: "2. 90/90 stretch",
    target: "Rotación de Cadera",
    duration: "45s x lado",
    description: "Sentado con las piernas flexionadas a 90 grados, rotar el torso sobre la pierna delantera.",
    bjjTransfer: "Ayuda en la retención de guardia e inversiones.",
    cues: ["Pecho arriba", "Evitar redondear zona lumbar"]
  },
  {
    id: "s3",
    name: "3. Car stretch (levantar rodilla 90°)",
    target: "Flexores de cadera",
    duration: "45s x lado",
    description: "Levantar la rodilla a 90°.",
    bjjTransfer: "Mejora la flexibilidad de la cadera para atacar triángulos o buggy.",
    cues: ["Mantener equilibrio", "Tensión controlada"]
  },
  {
    id: "s4",
    name: "4. The Diaz (con cuidado)",
    target: "Cadena posterior / Isquios",
    duration: "45s x lado",
    description: "Estiramiento profundo, requiere precaución al realizarlo.",
    bjjTransfer: "Fundamental para la guardia de goma (Rubber Guard) o Buggy Choke.",
    cues: ["No forzar el límite", "Respiración profunda"]
  },
  {
    id: "s5",
    name: "5. Shoulders to hip",
    target: "Cintura escapular y dorsal",
    duration: "60s",
    description: "Llevar los hombros en dirección a las caderas estirando la zona dorsal.",
    bjjTransfer: "Alivia tensión en los hombros post-entrenamiento.",
    cues: ["Buscar extensión", "Relajar cuello"]
  },
  {
    id: "s6",
    name: "6. Head to toes -> Foot to chest",
    target: "Cadena posterior y glúteos",
    duration: "60s",
    description: "Llevar cabeza a pies, seguido de pie a pecho alternando.",
    bjjTransfer: "Excelente para recuperaciones extremas de guardia.",
    cues: ["Movimiento fluido", "Extensión completa"]
  }
];


export const buggyNormalVectors: ForceVector[] = [
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
];