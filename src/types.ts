export interface Program {
  programId: string;
  title: string;
  phases?: Phase[];
}

export interface Phase {
  phaseId: string;
  title: string;
  weeks: number;
}

export interface Day {
  dayId: string;
  programId: string;
  title: string;
  order: 1 | 2 | 3;
  blocks: Block[];
}

export type BlockType = 'warmup' | 'strength' | 'swole' | 'accessory';
export type TimerType = 'none' | 'interval' | 'work_rest' | 'circuit' | 'tabata' | 'stopwatch';

export interface TimerConfig {
  // For interval timer (EMOM, E2MOM, E4MOM, N90, etc.)
  intervalSec?: number; // 30, 60, 90, 120, 180, 240, etc.
  exercisesPerInterval?: number; // 1-3 for compound sets
  
  // For work/rest timer
  workSec?: number;
  restSec?: number;
  
  // For circuit timer
  stations?: { name: string; durationSec: number }[];
  transitionSec?: number;
  
  // For tabata timer
  highIntensitySec?: number;
  lowIntensitySec?: number;
  
  // Common fields
  rounds?: number;
  totalDuration?: number;
}

export interface Block {
  type: BlockType;
  timerType: TimerType;
  timerConfig?: TimerConfig;
  notes?: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: string;
  restSec?: number;
  substitutes?: string[];
  videoUrls?: string[];
  cues?: string;
}

export interface Session {
  sessionId?: number;
  dayId: string;
  startedAt: Date;
  completedAt?: Date;
  activeExerciseId?: string;
  settingsSnapshot?: Settings;
  entries: Entry[];
}

export interface Entry {
  exerciseId: string;
  setNumber: number;
  weight?: number;
  reps?: number;
  rpe?: number;
  note?: string;
  timerRound?: number;
  timestamp?: Date;
}

export interface Settings {
  unit: 'kg' | 'lb';
  sound: boolean;
  haptics: boolean;
  theme: 'light' | 'dark' | 'system';
  confirmExit: boolean;
}

export interface SeedData {
  programId: string;
  title: string;
  days: Day[];
}