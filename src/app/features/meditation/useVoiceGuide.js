// Simple voice guidance hook using Web Speech API
// Speaks: title + subtitle, each instruction, then affirmation
// Usage: useVoiceGuide(session, enabled)
export function useVoiceGuide(session, enabled) {
  // Lazy import of React to avoid extra bundle if unused
  const { useEffect, useRef } = require("react");

  const speakingRef = useRef(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !window.speechSynthesis) {
      try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch {}
      return;
    }

    const synth = window.speechSynthesis;
    // Ensure engine is in a good state
    try { synth.cancel(); } catch {}
    try { synth.resume(); } catch {}

    const selectVoice = () => {
      const voices = synth.getVoices();
      if (!voices || voices.length === 0) return null;
      const preferredNames = [
        "Google UK English Female",
        "Microsoft Sonia Online (Natural) - English (United Kingdom)",
        "Microsoft Aria Online (Natural) - English (United States)",
        "Microsoft Heera - English (India)",
        "Microsoft Zira Desktop - English (United States)"
      ];
      for (const name of preferredNames) {
        const v = voices.find(voice => voice.name === name);
        if (v) return v;
      }
      return voices.find(v => v.lang?.toLowerCase().startsWith("en")) || voices[0];
    };

    const speakText = (text, opts = {}) => {
      if (!text) return Promise.resolve();
      return new Promise(resolve => {
        const utter = new SpeechSynthesisUtterance(text);
        const voice = selectVoice();
        if (voice) utter.voice = voice;
        utter.rate = opts.rate ?? 0.95;
        utter.pitch = opts.pitch ?? 1.0;
        utter.volume = opts.volume ?? 1.0;
        // Safety: some engines occasionally miss onend. Add a max timeout.
        const expectedMs = Math.min(6000, Math.max(1500, (text.length || 20) * 45));
        const fallback = setTimeout(() => resolve(), expectedMs);
        utter.onend = () => { clearTimeout(fallback); resolve(); };
        utter.onerror = () => { clearTimeout(fallback); resolve(); };
        synth.speak(utter);
      });
    };

    const queueText = (text, opts = {}) => {
      if (!text) return;
      const utter = new SpeechSynthesisUtterance(text);
      const voice = selectVoice();
      if (voice) utter.voice = voice;
      utter.rate = opts.rate ?? 0.95;
      utter.pitch = opts.pitch ?? 1.0;
      utter.volume = opts.volume ?? 1.0;
      synth.speak(utter);
    };

    let cancelled = false;
    speakingRef.current = true;
    startedRef.current = false;

    const runScript = async () => {
      // Prevent double start (voiceschanged + fallback timeout)
      if (startedRef.current) return;
      startedRef.current = true;

      // Queue mode: avoids relying on onend events which can be flaky on some devices
      if (session.title) queueText(`${session.title}.`, { rate: 1.05 });
      if (session.subtitle) queueText(session.subtitle, { rate: 1.0, volume: 0.95 });
      const steps = session.instructions || [];
      steps.forEach((s) => queueText(s, { rate: 0.95 }));
      if (session.affirmation) queueText(session.affirmation, { rate: 0.98, volume: 0.95 });
    };

    const haveVoices = synth.getVoices && synth.getVoices().length > 0;
    if (!haveVoices) {
      const onVoices = () => {
        synth.removeEventListener("voiceschanged", onVoices);
        runScript();
      };
      synth.addEventListener("voiceschanged", onVoices);
      setTimeout(() => {
        if (speakingRef.current) runScript();
      }, 800);
    } else {
      runScript();
    }

    return () => {
      cancelled = true;
      speakingRef.current = false;
      try { synth.cancel(); } catch {}
    };
  }, [enabled, session]);
}


