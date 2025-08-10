/**
 * Haptic and audio feedback utilities for workout timers
 */
export class FeedbackManager {
  private audioContext: AudioContext | null = null;
  private enableHaptic = true;
  private enableAudio = true;

  constructor() {
    // Initialize audio context on first user interaction
    document.addEventListener('touchstart', this.initAudioContext.bind(this), { once: true });
    document.addEventListener('click', this.initAudioContext.bind(this), { once: true });
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      console.log('Audio context initialized');
    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }

  /**
   * Enable or disable haptic feedback
   */
  setHapticEnabled(enabled: boolean) {
    this.enableHaptic = enabled;
  }

  /**
   * Enable or disable audio feedback  
   */
  setAudioEnabled(enabled: boolean) {
    this.enableAudio = enabled;
  }

  /**
   * Check if haptic feedback is supported
   */
  isHapticSupported(): boolean {
    return 'vibrate' in navigator;
  }

  /**
   * Check if audio feedback is supported
   */
  isAudioSupported(): boolean {
    return this.audioContext !== null;
  }

  /**
   * Provide haptic feedback
   */
  vibrate(pattern: number | number[]) {
    if (!this.enableHaptic || !this.isHapticSupported()) {
      return;
    }

    try {
      navigator.vibrate(pattern);
    } catch (error) {
      console.warn('Vibration failed:', error);
    }
  }

  /**
   * Play a beep sound
   */
  beep(frequency: number = 800, duration: number = 200, volume: number = 0.1) {
    if (!this.enableAudio || !this.audioContext) {
      return;
    }

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  /**
   * Timer start feedback
   */
  timerStart() {
    this.vibrate(100);
    this.beep(600, 150);
  }

  /**
   * Timer pause feedback
   */
  timerPause() {
    this.vibrate([50, 50, 50]);
    this.beep(400, 100);
  }

  /**
   * Round complete feedback
   */
  roundComplete() {
    this.vibrate([100, 50, 100]);
    this.beep(800, 200);
  }

  /**
   * Exercise complete feedback
   */
  exerciseComplete() {
    this.vibrate([150, 100, 150, 100, 150]);
    this.playSuccess();
  }

  /**
   * Session complete feedback
   */
  sessionComplete() {
    this.vibrate([200, 100, 200, 100, 200, 100, 300]);
    this.playSuccessChord();
  }

  /**
   * Set complete feedback
   */
  setComplete() {
    this.vibrate([100, 50, 100]);
    this.beep(700, 150);
  }

  /**
   * Rest start feedback (between sets)
   */
  restStart() {
    this.vibrate(80);
    this.beep(500, 150);
  }

  /**
   * Rest complete feedback
   */
  restComplete() {
    this.vibrate([50, 30, 50]);
    this.beep(800, 100);
  }

  /**
   * Work period start feedback (for circuits/N90)
   */
  workPeriodStart() {
    this.vibrate([50, 30, 50]);
    this.beep(1000, 100);
  }

  /**
   * Rest period start feedback
   */
  restPeriodStart() {
    this.vibrate(80);
    this.beep(500, 150);
  }

  /**
   * Countdown warning (last 3 seconds)
   */
  countdownWarning() {
    this.vibrate(50);
    this.beep(700, 100);
  }

  /**
   * Play success sound (ascending notes)
   */
  private playSuccess() {
    if (!this.audioContext) return;
    
    const notes = [523, 659, 784]; // C, E, G
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.beep(freq, 200, 0.08);
      }, index * 100);
    });
  }

  /**
   * Play success chord for session completion
   */
  private playSuccessChord() {
    if (!this.audioContext) return;
    
    // Play a major chord
    const chord = [523, 659, 784]; // C, E, G
    chord.forEach(freq => {
      this.beep(freq, 500, 0.05);
    });
  }

  /**
   * Test all feedback types
   */
  testFeedback() {
    console.log('Testing feedback...');
    
    setTimeout(() => this.timerStart(), 0);
    setTimeout(() => this.workPeriodStart(), 1000);
    setTimeout(() => this.countdownWarning(), 2000);
    setTimeout(() => this.restPeriodStart(), 3000);
    setTimeout(() => this.roundComplete(), 4000);
    setTimeout(() => this.exerciseComplete(), 5000);
  }
}

export const feedbackManager = new FeedbackManager();