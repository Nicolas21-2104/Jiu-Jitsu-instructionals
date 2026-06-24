export interface Exercise {
  name: string;
  series: number;
  reps: string;
  rest: string;
  isRedAlert?: boolean;
}

export interface DayRoutine {
  day: string;
  group: string;
  exercises: Exercise[];
}

export interface Stretch {
  id: string;
  name: string;
  target: string;
  duration: string;
  description: string;
  bjjTransfer: string;
  cues: string[];
}

export interface ForceVector {
  id: string;
  name: string;
  desc: string;
  magnitude: string;
  direction: string;
  muscles: string;
  anatomicalTarget: string;
}
