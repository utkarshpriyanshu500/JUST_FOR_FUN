// =========================================================
// SOUND SYNTHESIZER (Web Audio API)
// 100% self-contained, no external audio files needed!
// =========================================================

class BirthdayAudioController {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.musicStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a single note tone
  playTone(freq, type = 'sine', duration = 0.3, volume = 0.2, attack = 0.02, decay = 0.1) {
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  // Western Bounty Stinger (Wanted Poster theme!)
  playWesternStinger() {
    this.init();
    const notes = [
      { f: 220, t: 0.0, d: 0.3 }, // A3
      { f: 261.63, t: 0.18, d: 0.3 }, // C4
      { f: 293.66, t: 0.35, d: 0.4 }, // D4
      { f: 329.63, t: 0.55, d: 0.6 } // E4
    ];
    notes.forEach(n => {
      setTimeout(() => {
        this.playTone(n.f, 'sawtooth', n.d, 0.15, 0.05, 0.2);
      }, n.t * 1000);
    });
  }

  // Party Popper / Confetti Sound Effect
  playConfettiPop() {
    this.init();
    try {
      const bufferSize = this.ctx.sampleRate * 0.2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      filter.Q.value = 3;

      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      // Pitch drop effect
      this.playTone(400, 'triangle', 0.15, 0.3);
    } catch (e) {
      this.playTone(300, 'square', 0.1, 0.2);
    }
  }

  // Candle Extinguish Sound (Whoosh / puff)
  playBlowCandle() {
    this.init();
    try {
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.1));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 600;

      const gain = this.ctx.createGain();
      gain.gain.value = 0.5;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {
      this.playTone(150, 'sine', 0.2, 0.2);
    }
  }

  // Cake Slicing Sound
  playKnifeCut() {
    this.init();
    this.playTone(600, 'triangle', 0.08, 0.2);
    setTimeout(() => this.playTone(450, 'sine', 0.12, 0.2), 50);
  }

  // Cheering / Fanfare for Celebration
  playCheer() {
    this.init();
    const melody = [
      { f: 523.25, d: 0.15, delay: 0 },    // C5
      { f: 659.25, d: 0.15, delay: 120 },  // E5
      { f: 783.99, d: 0.2, delay: 240 },   // G5
      { f: 1046.50, d: 0.5, delay: 400 }   // C6
    ];
    melody.forEach(m => {
      setTimeout(() => this.playTone(m.f, 'triangle', m.d, 0.25), m.delay);
    });
  }

  // Quiz Success Sound
  playSuccess() {
    this.init();
    this.playTone(587.33, 'sine', 0.15, 0.25);
    setTimeout(() => this.playTone(880, 'sine', 0.35, 0.3), 120);
  }

  // Quiz Fail Sound
  playOops() {
    this.init();
    this.playTone(300, 'sawtooth', 0.2, 0.2);
    setTimeout(() => this.playTone(250, 'sawtooth', 0.3, 0.2), 150);
  }

  // Toggle Background Happy Birthday Melody
  toggleBirthdayMusic(buttonEl) {
    this.init();
    if (this.isPlayingMusic) {
      this.stopBirthdayMusic(buttonEl);
    } else {
      this.startBirthdayMusic(buttonEl);
    }
  }

  startBirthdayMusic(buttonEl) {
    this.isPlayingMusic = true;
    if (buttonEl) {
      buttonEl.innerHTML = `🎵 Pause Music`;
      buttonEl.classList.add('bg-amber-500', 'text-stone-900', 'ring-2', 'ring-amber-300');
    }

    // Happy Birthday melody in notes and durations
    // C4, C4, D4, C4, F4, E4 ...
    const notes = [
      { f: 261.63, d: 0.25, p: 350 }, // Hap-
      { f: 261.63, d: 0.25, p: 350 }, // py
      { f: 293.66, d: 0.5,  p: 700 }, // birth-
      { f: 261.63, d: 0.5,  p: 700 }, // day
      { f: 349.23, d: 0.5,  p: 700 }, // to
      { f: 329.63, d: 0.8,  p: 1100}, // you
      
      { f: 261.63, d: 0.25, p: 350 }, // Hap-
      { f: 261.63, d: 0.25, p: 350 }, // py
      { f: 293.66, d: 0.5,  p: 700 }, // birth-
      { f: 261.63, d: 0.5,  p: 700 }, // day
      { f: 392.00, d: 0.5,  p: 700 }, // to
      { f: 349.23, d: 0.8,  p: 1100}, // you
      
      { f: 261.63, d: 0.25, p: 350 }, // Hap-
      { f: 261.63, d: 0.25, p: 350 }, // py
      { f: 523.25, d: 0.5,  p: 700 }, // dear
      { f: 440.00, d: 0.5,  p: 700 }, // A-
      { f: 349.23, d: 0.5,  p: 700 }, // di-
      { f: 329.63, d: 0.5,  p: 700 }, // tya
      { f: 293.66, d: 0.8,  p: 1100}, // Ray
      
      { f: 466.16, d: 0.25, p: 350 }, // Hap-
      { f: 466.16, d: 0.25, p: 350 }, // py
      { f: 440.00, d: 0.5,  p: 700 }, // birth-
      { f: 349.23, d: 0.5,  p: 700 }, // day
      { f: 392.00, d: 0.5,  p: 700 }, // to
      { f: 349.23, d: 1.0,  p: 1400}  // you!
    ];

    let idx = 0;
    const playNext = () => {
      if (!this.isPlayingMusic) return;
      const note = notes[idx];
      this.playTone(note.f, 'triangle', note.d, 0.15, 0.03, 0.1);
      // add a light harmonic
      this.playTone(note.f * 2, 'sine', note.d * 0.6, 0.05, 0.02, 0.08);

      idx = (idx + 1) % notes.length;
      this.musicTimer = setTimeout(playNext, note.p);
    };

    playNext();
  }

  stopBirthdayMusic(buttonEl) {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    if (buttonEl) {
      buttonEl.innerHTML = `▶ Play Bday Tune`;
      buttonEl.classList.remove('bg-amber-500', 'text-stone-900', 'ring-2', 'ring-amber-300');
    }
  }
}

window.birthdayAudio = new BirthdayAudioController();
