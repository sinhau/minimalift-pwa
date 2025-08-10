/**
 * Test setup file for Vitest
 * Global test configuration and mocks
 */
import { vi, afterEach } from 'vitest';

// Mock performance.now for consistent timing in tests
let mockTime = 0;
const originalPerformanceNow = performance.now;

export const mockPerformanceNow = (time: number) => {
  mockTime = time;
  performance.now = vi.fn(() => mockTime);
};

export const advanceTime = (ms: number) => {
  mockTime += ms;
};

export const resetTime = () => {
  mockTime = 0;
  performance.now = originalPerformanceNow;
};

// Reset mocks after each test
afterEach(() => {
  vi.clearAllMocks();
  resetTime();
});

// Global test utilities
declare global {
  var mockPerformanceNow: (time: number) => void;
  var advanceTime: (ms: number) => void;
  var resetTime: () => void;
  var mockTime: number;
}

globalThis.mockPerformanceNow = mockPerformanceNow;
globalThis.advanceTime = advanceTime;
globalThis.resetTime = resetTime;
globalThis.mockTime = mockTime;