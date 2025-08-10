import { idb } from './idb';
import { Program, Day, SeedData } from './types';

export class ProgramManager {
  private static instance: ProgramManager;
  
  private constructor() {}
  
  static getInstance(): ProgramManager {
    if (!ProgramManager.instance) {
      ProgramManager.instance = new ProgramManager();
    }
    return ProgramManager.instance;
  }

  async initialize(): Promise<void> {
    // Load seed data dynamically
    const seedDataModule = await import('./data/seed-data.json');
    const seedData = seedDataModule.default as SeedData;
    
    // Check if data already exists
    const existingProgram = await idb.get<Program>('programs', seedData.programId);
    
    if (!existingProgram) {
      await this.loadSeedData(seedData);
    }
  }

  private async loadSeedData(seedData: SeedData): Promise<void> {
    // Load program
    const program: Program = {
      programId: seedData.programId,
      title: seedData.title
    };
    await idb.put('programs', program);

    // Load days
    for (const day of seedData.days) {
      await idb.put('days', day);
    }
    
    console.log('Seed data loaded successfully');
  }

  async getProgram(programId: string): Promise<Program | undefined> {
    return await idb.get<Program>('programs', programId);
  }

  async getDaysForProgram(programId: string): Promise<Day[]> {
    return await idb.indexGetAll<Day>('days', 'programId', programId);
  }

  async getDay(dayId: string): Promise<Day | undefined> {
    return await idb.get<Day>('days', dayId);
  }

  async getAllDays(): Promise<Day[]> {
    const days = await idb.getAll<Day>('days');
    return days.sort((a, b) => a.order - b.order);
  }
}

export const programManager = ProgramManager.getInstance();