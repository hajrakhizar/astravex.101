/**
 * Procedural Web Audio API sound generator for NASA Mission Ops.
 * 100% zero external audio files. Generates high-tech telemetry chirps,
 * rocket thruster bursts, radar sonar sweeps, laser pings, and achievement chimes.
 */

class MissionAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private isDroneActive: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isDroneActive) {
      this.stopAmbientDrone();
    } else if (!this.isMuted) {
      this.playTelemetryChirp();
    }
    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  // --- Sci-Fi Terminal Interface Click ---
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }

  // --- Apollo Telemetry Datalink Chirp ---
  public playTelemetryChirp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2475, now);
      osc.frequency.setValueAtTime(2520, now + 0.02);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // ignore
    }
  }

  // --- Laser Retroreflector Beam Ping ---
  public playLaserPing() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(3200, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.14);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // ignore
    }
  }

  // --- Rocket Thruster Engine Burst ---
  public playThruster() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.45;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.5));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.45);
    } catch {
      // ignore
    }
  }

  // --- Radar Sonar Ping Sweep ---
  public playRadarSweep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1480, now);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // ignore
    }
  }

  // --- Mission Accomplished / Level Up Fanfare ---
  public playSuccessFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const chords = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
    chords.forEach((freq, idx) => {
      window.setTimeout(() => {
        try {
          if (!this.ctx || this.isMuted) return;
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.38);
        } catch {
          // ignore
        }
      }, idx * 75);
    });
  }

  // --- Alert / Overweight Warning Buzzer ---
  public playWarningBuzzer() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.setValueAtTime(140, now + 0.1);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // ignore
    }
  }

  // --- Cosmic Deep-Space Ambient Drone ---
  public toggleAmbientDrone(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isDroneActive) {
      this.stopAmbientDrone();
      return false;
    } else {
      this.startAmbientDrone();
      return true;
    }
  }

  public getIsDroneActive(): boolean {
    return this.isDroneActive;
  }

  public startAmbientDrone() {
    if (this.isDroneActive) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();

      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(55, now); // A1 note
      this.droneOsc2.type = 'sine';
      this.droneOsc2.frequency.setValueAtTime(82.4, now); // E2 fifth

      this.droneGain.gain.setValueAtTime(0.001, now);
      this.droneGain.gain.linearRampToValueAtTime(0.025, now + 2.0);

      this.droneOsc1.connect(this.droneGain);
      this.droneOsc2.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc1.start(now);
      this.droneOsc2.start(now);
      this.isDroneActive = true;
    } catch {
      // ignore
    }
  }

  public stopAmbientDrone() {
    if (!this.isDroneActive) return;
    try {
      if (this.droneGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      }
      setTimeout(() => {
        try {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.droneGain?.disconnect();
        } catch {
          // ignore
        }
        this.droneOsc1 = null;
        this.droneOsc2 = null;
        this.droneGain = null;
        this.isDroneActive = false;
      }, 850);
    } catch {
      this.isDroneActive = false;
    }
  }

  // Compatibility aliases
  public playBeep(freq?: number) { this.playClick(); }
  public playCuteBoing() { this.playClick(); }
  public playSqueakyToy() { this.playLaserPing(); }
  public playRattle() { this.playTelemetryChirp(); }
  public playBubblePop() { this.playClick(); }
  public playTwinkleChime() { this.playLaserPing(); }
  public playBabyGiggle() { this.playSuccessFanfare(); }
  public toggleLullaby() { return this.toggleAmbientDrone(); }
  public getIsLullabyPlaying() { return this.getIsDroneActive(); }
}

export const spaceAudio = new MissionAudioEngine();
