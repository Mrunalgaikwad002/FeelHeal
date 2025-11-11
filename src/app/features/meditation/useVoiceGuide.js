// Simple voice guidance hook using Web Speech API
// Speaks: title + subtitle, each instruction, then affirmation
// Usage: useVoiceGuide(session, enabled)
export function useVoiceGuide(session, enabled) {
  // Lazy import of React to avoid extra bundle if unused
  const { useEffect, useRef } = require("react");

  const speakingRef = useRef(false);

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !window.speechSynthesis) {
      try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch {}
      return;
    }

    const synth = window.speechSynthesis;

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
        utter.onend = () => resolve();
        utter.onerror = () => resolve();
        synth.speak(utter);
      });
    };

    let cancelled = false;
    speakingRef.current = true;

    const runScript = async () => {
      await speakText(`${session.title}. ${session.subtitle}`);
      for (let i = 0; i < (session.instructions || []).length; i++) {
        if (cancelled) break;
        await speakText(session.instructions[i]);
        await new Promise(r => setTimeout(r, 700));
      }
      if (!cancelled) {
        await speakText(session.affirmation);
      }
    };

    if (synth.getVoices().length === 0) {
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


