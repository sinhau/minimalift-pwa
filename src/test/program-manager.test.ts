/**
 * Tests for program manager and data layer
 * Critical data operations for workout management
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProgramManager } from '../program';

// Mock IndexedDB operations
vi.mock('../idb', () => ({
  idb: {
    get: vi.fn(),
    put: vi.fn(),
    getAll: vi.fn(),
    indexGetAll: vi.fn(),
  },
}));

// Import the mocked idb to get access to the mock functions
import { idb } from '../idb';

// Mock seed data
vi.mock('../data/seed-data', () => ({
  seedData: {
    programId: 'test-program',
    title: 'Test Program',
    days: [
      {
        dayId: 'test-day-1',
        programId: 'test-program',
        title: 'Day 1',
        order: 1,
        blocks: [
          {
            type: 'warmup',
            timerMode: 'none',
            exercises: [
              {
                id: 'test-exercise-1',
                name: 'Test Exercise',
                sets: 3,
                reps: '10',
                restSec: 60,
              },
            ],
          },
        ],
      },
    ],
  },
}));

describe('ProgramManager', () => {
  let programManager: ProgramManager;

  beforeEach(() => {
    vi.clearAllMocks();
    // Create a new instance for each test to avoid singleton issues
    programManager = (ProgramManager as any).getInstance();
  });

  describe('initialize', () => {
    it('should load seed data when no existing program', async () => {
      // Mock that no existing program is found
      (idb.get as any).mockResolvedValue(undefined);
      (idb.put as any).mockResolvedValue(undefined);

      await programManager.initialize();

      // Should check for existing program
      expect(idb.get).toHaveBeenCalledWith('programs', 'test-program');
      
      // Should save program and days
      expect(idb.put).toHaveBeenCalledWith('programs', {
        programId: 'test-program',
        title: 'Test Program',
      });
      expect(idb.put).toHaveBeenCalledWith('days', expect.objectContaining({
        dayId: 'test-day-1',
        programId: 'test-program',
      }));
    });

    it('should not load seed data when program already exists', async () => {
      // Mock that program already exists
      (idb.get as any).mockResolvedValue({
        programId: 'test-program',
        title: 'Test Program',
      });

      await programManager.initialize();

      // Should check for existing program
      expect(idb.get).toHaveBeenCalledWith('programs', 'test-program');
      
      // Should NOT save data again
      expect(idb.put).not.toHaveBeenCalled();
    });
  });

  describe('getProgram', () => {
    it('should return program by ID', async () => {
      const expectedProgram = {
        programId: 'test-program',
        title: 'Test Program',
      };
      (idb.get as any).mockResolvedValue(expectedProgram);

      const result = await programManager.getProgram('test-program');

      expect(idb.get).toHaveBeenCalledWith('programs', 'test-program');
      expect(result).toEqual(expectedProgram);
    });
  });

  describe('getDay', () => {
    it('should return day by ID', async () => {
      const expectedDay = {
        dayId: 'test-day-1',
        title: 'Day 1',
        blocks: [],
      };
      (idb.get as any).mockResolvedValue(expectedDay);

      const result = await programManager.getDay('test-day-1');

      expect(idb.get).toHaveBeenCalledWith('days', 'test-day-1');
      expect(result).toEqual(expectedDay);
    });
  });

  describe('getAllDays', () => {
    it('should return all days sorted by order', async () => {
      const mockDays = [
        { dayId: 'day-2', order: 2, title: 'Day 2' },
        { dayId: 'day-1', order: 1, title: 'Day 1' },
        { dayId: 'day-3', order: 3, title: 'Day 3' },
      ];
      (idb.getAll as any).mockResolvedValue(mockDays);

      const result = await programManager.getAllDays();

      expect(idb.getAll).toHaveBeenCalledWith('days');
      expect(result).toEqual([
        { dayId: 'day-1', order: 1, title: 'Day 1' },
        { dayId: 'day-2', order: 2, title: 'Day 2' },
        { dayId: 'day-3', order: 3, title: 'Day 3' },
      ]);
    });
  });

  describe('getDaysForProgram', () => {
    it('should return days for specific program', async () => {
      const expectedDays = [
        { dayId: 'day-1', programId: 'test-program', title: 'Day 1' },
      ];
      (idb.indexGetAll as any).mockResolvedValue(expectedDays);

      const result = await programManager.getDaysForProgram('test-program');

      expect(idb.indexGetAll).toHaveBeenCalledWith('days', 'programId', 'test-program');
      expect(result).toEqual(expectedDays);
    });
  });
});