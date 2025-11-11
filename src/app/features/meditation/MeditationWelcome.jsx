"use client";

import { useState, useEffect, useRef } from "react";
import AIGuide from "./AIGuide";
import { SESSION_LIBRARY } from "./sessionLibrary";

const MOOD_SUGGESTIONS = {
  stressed: {
    message: "You've had a long day. Let's unwind with a soft calm reset.",
    duration: 5,
    sessionKey: "calm_reset"
  },
  sad: {
    message: "Take a moment to breathe and find your center.",
    duration: 5,
    sessionKey: "deep_breathe"
  },
  calm: {
    message: "You're in a peaceful flow today. Let's deepen that calm with a focus count.",
    duration: 4,
    sessionKey: "focus_count"
  },
  happy: {
    message: "Your joy is beautiful. Keep the energy flowing with mindful movement.",
    duration: 5,
    sessionKey: "energizing_flow"
  },
  tired: {
    message: "You deserve to rest. A calm reset will feel lovely right now.",
    duration: 5,
    sessionKey: "calm_reset"
  },
  numb: {
    message: "Let's gently reconnect with your breath and find presence.",
    duration: 5,
    sessionKey: "deep_breathe"
  }
};

const SESSION_OPTIONS = Object.values(SESSION_LIBRARY);

export default function MeditationWelcome({ userMood, onStart }) {
  const [showGuide, setShowGuide] = useState(true);
  const [ripples, setRipples] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const ambientStartedRef = useRef(false);
  const ambientNodesRef = useRef({ sources: [], stop: () => {} });
  const FULL_VOLUME = 1; // always play at full app volume (system volume still applies)
  const suggestion = userMood ? MOOD_SUGGESTIONS[userMood] : null;
  const recommendedKey = suggestion?.sessionKey;
  const recommendedSession = recommendedKey ? SESSION_LIBRARY[recommendedKey] : null;
  const quickMode = recommendedKey || "deep_breathe";
  const quickDuration = suggestion?.duration ?? SESSION_LIBRARY[quickMode].duration;
  const quickLabel = recommendedSession
    ? `✨ Start ${recommendedSession.title}`
    : "✨ Start My 5-Minute Calm";

  useEffect(() => {
    // Show AI guide message after a moment
    const timer = setTimeout(() => {
      setShowGuide(true);
    }, 1000);

    // Autoplay policies require a user gesture. Arm a one-time listener.
    const startOnGesture = () => {
      if (!ambientStartedRef.current) {
        ambientStartedRef.current = true;
        playAmbientSound();
      }
    };
    window.addEventListener("pointerdown", startOnGesture, { once: true });
    window.addEventListener("keydown", startOnGesture, { once: true });
    window.addEventListener("mousemove", startOnGesture, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointerdown", startOnGesture);
      window.removeEventListener("keydown", startOnGesture);
      window.removeEventListener("mousemove", startOnGesture);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create ripple effect
      const newRipple = {
        id: Date.now(),
        x,
        y,
        size: 0
      };
      
      setRipples(prev => [...prev.slice(-4), newRipple]);
      
      // Animate ripple
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    }
  };

  const handleClick = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Ensure ambient starts on any click inside the area
      if (!ambientStartedRef.current) {
        ambientStartedRef.current = true;
        playAmbientSound();
      }
      
      // Create sparkle effect
      const emojis = ['✨', '💫', '⭐', '🌟', '🌸'];
      const newSparkle = {
        id: Date.now(),
        x,
        y,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      };
      
      setSparkles(prev => [...prev, newSparkle]);
      
      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 2000);
    }
  };

  const setAmbientVolume = (v) => {
    try {
      const node = ambientNodesRef.current?.masterGain;
      if (node) {
        const target = (v ?? FULL_VOLUME) * 0.35; // scale to pleasant level
        node.gain.cancelScheduledValues(node.context.currentTime);
        node.gain.linearRampToValueAtTime(target, node.context.currentTime + 0.2);
      }
    } catch {}
  };

  const playAmbientSound = () => {
    try {
      // Reuse a single AudioContext instance
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new Ctx();
      }
      const audioContext = audioCtxRef.current;
      if (audioContext.state === "suspended") {
        audioContext.resume().catch(() => {});
      }

      // STOP any previous ambient
      if (ambientNodesRef.current.stop) {
        try { ambientNodesRef.current.stop(); } catch {}
      }
      ambientNodesRef.current = { sources: [], stop: () => {} };

      // New preset: soft breeze (pink/brown noise + lowpass + slow sway + distant chime)
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(0, audioContext.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.6);
      masterGain.connect(audioContext.destination);

      // Noise buffer (brownian-like)
      const bufferSize = 2 * audioContext.sampleRate;
      const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise
        lastOut = (lastOut + (0.02 * white)) / 1.02;
        output[i] = lastOut * 3.5; // gain compensation
      }
      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Filter chain
      const lowpass = audioContext.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(900, audioContext.currentTime);
      lowpass.Q.value = 0.0001;

      // Slow sway LFO (modulates filter frequency)
      const lfo = audioContext.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.08, audioContext.currentTime); // very slow
      const lfoGain = audioContext.createGain();
      lfoGain.gain.setValueAtTime(250, audioContext.currentTime); // modulation depth
      lfo.connect(lfoGain);
      lfoGain.connect(lowpass.frequency);
      lfo.start();

      const noiseGain = audioContext.createGain();
      noiseGain.gain.setValueAtTime(0.2, audioContext.currentTime);

      noiseSource.connect(lowpass);
      lowpass.connect(noiseGain);
      noiseGain.connect(masterGain);

      // Distant chime every ~7s
      const chimeGain = audioContext.createGain();
      chimeGain.gain.value = 0;
      chimeGain.connect(masterGain);
      const chimeOsc = audioContext.createOscillator();
      chimeOsc.type = "sine";
      chimeOsc.frequency.value = 660;
      chimeOsc.connect(chimeGain);
      chimeOsc.start();

      const chime = () => {
        const t = audioContext.currentTime;
        chimeGain.gain.cancelScheduledValues(t);
        chimeGain.gain.setValueAtTime(0, t);
        chimeGain.gain.linearRampToValueAtTime(0.3, t + 0.02);
        chimeGain.gain.exponentialRampToValueAtTime(0.02, t + 1.1);
      };
      const chimeInterval = setInterval(chime, 7000);
      // first gentle chime shortly after start
      setTimeout(chime, 600);

      noiseSource.start();

      // store stop handler
      ambientNodesRef.current.masterGain = masterGain;
      ambientNodesRef.current.stop = () => {
        clearInterval(chimeInterval);
        try { noiseSource.stop(); } catch {}
        try { lfo.stop(); } catch {}
        try { chimeOsc.stop(); } catch {}
        masterGain.gain.cancelScheduledValues(audioContext.currentTime);
        masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);
      };

      // Apply full volume immediately
      setAmbientVolume(FULL_VOLUME);
    } catch (error) {
      console.log("Sound not available");
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center relative"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '0px',
            height: '0px',
            border: '2px solid rgba(123, 44, 191, 0.3)',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 1s ease-out forwards'
          }}
        />
      ))}

      {/* Sparkle effects */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none text-2xl"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            transform: 'translate(-50%, -50%)',
            animation: 'sparkle 2s ease-out forwards'
          }}
        >
          {sparkle.emoji}
        </div>
      ))}

      {/* AI Guide Message */}
      {showGuide && (
        <AIGuide 
          message={suggestion?.message || "Hey there, welcome back 💫 Let's just take a few deep breaths together."}
          onDismiss={() => setShowGuide(false)}
        />
      )}

      {/* Main Welcome */}
      <div className="mt-8 w-full">
        {/* Sound is always on at full app volume (system/device volume applies). */}
        <h1 className="text-5xl font-bold mb-4" style={{color: "var(--feelheal-purple)"}}>
          🧘‍♀️ Meditation Space
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Your peaceful moment awaits
        </p>

        {/* Session Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 w-full">
          {SESSION_OPTIONS.map(option => {
            const isRecommended = option.key === recommendedKey;
            const cardDuration = isRecommended && suggestion?.duration ? suggestion.duration : option.duration;
            const meta = {
              deep_breathe: { emoji: "💨", tags: ["Calm", "Breath"], ring: "from-sky-300 to-cyan-200" },
              energizing_flow: { emoji: "🏃‍♀️", tags: ["Movement", "Energy"], ring: "from-blue-300 to-indigo-200" },
              calm_reset: { emoji: "🌼", tags: ["Warm", "Relax"], ring: "from-amber-300 to-orange-200" },
              focus_count: { emoji: "🔆", tags: ["Focus", "Mindful"], ring: "from-violet-300 to-purple-200" }
            }[option.key] || { emoji: "✨", tags: ["Mindful"], ring: "from-purple-300 to-pink-200" };

            return (
            <div
              key={option.key}
              className={`relative rounded-[26px] p-[2px] bg-gradient-to-br ${meta.ring} cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 w-full`}
              style={{ boxShadow: `0 10px 24px ${option.accent}22` }}
              onClick={() => onStart(option.key, cardDuration)}
            >
              <div
                className="relative rounded-[24px] p-6 md:p-7 bg-white/70 backdrop-blur-md overflow-hidden w-full min-h-[340px]"
                style={{ background: option.gradient }}
              >
                {/* Decorative floating emojis */}
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <div className="absolute -left-2 top-6 text-4xl animate-floatSoft">{meta.emoji}</div>
                  <div className="absolute right-6 bottom-6 text-3xl animate-floatSoft" style={{animationDelay: ".6s"}}>{meta.emoji}</div>
                </div>

                {/* Badges */}
                <div className="absolute right-4 top-4 text-sm font-semibold text-gray-700 bg-white/85 px-3 py-1 rounded-full shadow">
                  ⏳ {cardDuration} min
                </div>
                {isRecommended && (
                  <div className="absolute left-4 top-4 bg-white/85 text-xs md:text-sm font-semibold text-purple-700 px-3 py-1 rounded-full shadow">
                    ⭐ Recommended
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col items-center text-center space-y-4 relative z-10 w-full">
                  <img
                    src={option.gif}
                    alt={option.title}
                    className="w-52 h-52 md:w-60 md:h-60 object-contain drop-shadow-md rounded-2xl"
                  />
                  <h3 className="text-2xl font-bold" style={{ color: option.accent }}>
                    {option.title}
                  </h3>
                  <p className="text-base text-gray-700">
                    {option.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {meta.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-gray-700 border border-white/60">
                        {t}
                      </span>
                    ))}
                  </div>

                <button
                    className="px-6 py-3 rounded-xl text-base font-semibold text-white transition-all hover:brightness-110"
                    style={{
                      background: option.accent,
                      boxShadow: `0 4px 10px ${option.accent}40`
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    // Ensure ambient is started when user explicitly starts a session
                    if (!ambientStartedRef.current) {
                      ambientStartedRef.current = true;
                      playAmbientSound();
                    }
                    onStart(option.key, cardDuration);
                    }}
                  >
                    {option.buttonText}
                  </button>
                </div>
              </div>
            </div>
          );
          })}
        </div>

        {/* Quick Start Button */}
        <div className="flex justify-center">
          <button
            onClick={() => onStart(quickMode, quickDuration)}
            className="px-8 py-4 rounded-2xl text-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, var(--feelheal-purple), var(--feelheal-blue))",
              boxShadow: "0 10px 30px rgba(123, 44, 191, 0.4)"
            }}
          >
            {quickLabel}
          </button>
        </div>

        {suggestion && (
          <div className="mt-8 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200 max-w-md mx-auto">
            <p className="text-base text-gray-700 italic">
              💡 {suggestion.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

