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
export type TimerMode = 'none' | 'emom' | 'e2mom' | 'e4mom' | 'n90' | 'fixed_rest' | 'timed_circuit';

export interface Block {
  type: BlockType;
  timerMode: TimerMode;
  durationSec?: number;
  rounds?: number;
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