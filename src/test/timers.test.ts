/**
 * Tests for timer engines
 * Critical timing logic that must be reliable
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BaseTimer } from '../timers/timer-engine';
import { EMOMTimer } from '../timers/emom';
import { N90Timer } from '../timers/n90';
import { FixedRestTimer } from '../timers/fixed-rest';

// Helper functions for timer testing
function mockPerformanceNow(time: number) {
  vi.spyOn(performance, 'now').mockReturnValue(time);
}

function advanceTime(ms: number) {
  const currentTime = performance.now() as number;
  vi.spyOn(performance, 'now').mockReturnValue(currentTime + ms);
}

describe('BaseTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockPerformanceNow(0);
  });

  it('should format time correctly', () => {
    expect(BaseTimer.formatTime(0)).toBe('00:00');
    expect(BaseTimer.formatTime(1000)).toBe('00:01');
    expect(BaseTimer.formatTime(60000)).toBe('01:00');
    expect(BaseTimer.formatTime(61000)).toBe('01:01');
    expect(BaseTimer.formatTime(3661000)).toBe('61:01');
  });

  it.skip('should start and stop correctly', () => {
    const timer = new FixedRestTimer(30000); // 30 seconds
    const callback = vi.fn();
    
    timer.addCallback(callback);
    timer.start();
    
    expect(timer.getState()).toBe('running');
    expect(timer.getElapsedTime()).toBe(0);
    
    // Advance time by 15 seconds
    advanceTime(15000);
    vi.advanceTimersByTime(100); // Trigger tick
    
    expect(timer.getElapsedTime()).toBe(15000);
    
    timer.stop();
    expect(timer.getState()).toBe('idle');
  });

  it.skip('should handle pause and resume', () => {
    const timer = new FixedRestTimer(30000);
    timer.start();
    
    // Run for 10 seconds
    advanceTime(10000);
    expect(timer.getElapsedTime()).toBe(10000);
    
    // Pause
    timer.pause();
    expect(timer.getState()).toBe('paused');
    
    // Advance time while paused (shouldn't count)
    advanceTime(5000);
    expect(timer.getElapsedTime()).toBe(10000);
    
    // Resume
    timer.start(); // start() resumes from pause
    expect(timer.getState()).toBe('running');
    
    // Continue for 5 more seconds
    advanceTime(5000);
    expect(timer.getElapsedTime()).toBe(15000);
  });
});

describe('EMOMTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockPerformanceNow(0);
  });

  it.skip('should complete round on minute mark', () => {
    const timer = new EMOMTimer(60000, 3); // 1 minute EMOM, 3 rounds
    const callback = vi.fn();
    
    timer.addCallback(callback);
    timer.start();
    
    expect(timer.getCurrentRound()).toBe(1);
    
    // Advance to 1 minute - should complete first round
    advanceTime(60000);
    vi.advanceTimersByTime(100); // Trigger tick
    
    // Check if roundComplete event was called
    const roundCompleteEvents = callback.mock.calls.filter(
      call => call[0].type === 'roundComplete'
    );
    expect(roundCompleteEvents.length).toBeGreaterThan(0);
    expect(timer.getCurrentRound()).toBe(2);
  });

  it.skip('should complete entire EMOM after all rounds', () => {
    const timer = new EMOMTimer(60000, 2); // 1 minute EMOM, 2 rounds
    const callback = vi.fn();
    
    timer.addCallback(callback);
    timer.start();
    
    // Complete all rounds (2 * 60 seconds = 120 seconds)
    advanceTime(120000);
    vi.advanceTimersByTime(100);
    
    // Check if complete event was called
    const completeEvents = callback.mock.calls.filter(
      call => call[0].type === 'complete'
    );
    expect(completeEvents.length).toBe(1);
    expect(timer.getState()).toBe('completed');
  });
});

describe('N90Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockPerformanceNow(0);
  });

  it.skip('should complete round every 90 seconds', () => {
    const timer = new N90Timer(3); // 3 rounds of N90
    const callback = vi.fn();
    
    timer.addCallback(callback);
    timer.start();
    
    expect(timer.getCurrentRound()).toBe(1);
    
    // First round at 90 seconds
    advanceTime(90000);
    vi.advanceTimersByTime(100);
    
    const roundCompleteEvents = callback.mock.calls.filter(
      call => call[0].type === 'roundComplete'
    );
    expect(roundCompleteEvents.length).toBeGreaterThan(0);
    expect(timer.getCurrentRound()).toBe(2);
  });
});

describe('FixedRestTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockPerformanceNow(0);
  });

  it.skip('should complete after specified duration', () => {
    const timer = new FixedRestTimer(30000); // 30 second rest
    const callback = vi.fn();
    
    timer.addCallback(callback);
    timer.start();
    
    // Should not be complete before 30 seconds
    advanceTime(29000);
    vi.advanceTimersByTime(100);
    
    let completeEvents = callback.mock.calls.filter(
      call => call[0].type === 'complete'
    );
    expect(completeEvents.length).toBe(0);
    
    // Should complete at 30 seconds
    advanceTime(1000);
    vi.advanceTimersByTime(100);
    
    completeEvents = callback.mock.calls.filter(
      call => call[0].type === 'complete'
    );
    expect(completeEvents.length).toBe(1);
    expect(timer.getState()).toBe('completed');
  });

  it.skip('should calculate remaining time correctly', () => {
    const timer = new FixedRestTimer(60000); // 1 minute rest
    timer.start();
    
    // At start, should have full duration remaining
    expect(timer.getRemainingInCurrentPeriod()).toBe(60000);
    
    advanceTime(20000);
    expect(timer.getRemainingInCurrentPeriod()).toBe(40000);
    
    advanceTime(40000);
    expect(timer.getRemainingInCurrentPeriod()).toBe(0);
  });
});