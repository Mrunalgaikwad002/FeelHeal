"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import FloatingEmojis from "./FloatingEmojis";
import HeaderBar from "./HeaderBar";
import SidebarNav from "./SidebarNav";
import ControlsBar from "./ControlsBar";
import JokeView from "./JokeView";
import SavedSmiles from "./SavedSmiles";
import { STORAGE_FAV, STORAGE_REACTIONS, STORAGE_LAUGH_TODAY, STORAGE_LANG, STORAGE_MODE, safeGet, safeSet } from "./StorageKeys";
import { pick, getMixedPool } from "./JokesData";

export default function LaughLounge() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [reactions, setReactions] = useState({});
  const [joke, setJoke] = useState("");
  const [mood, setMood] = useState("default");
  const [tab, setTab] = useState("jokes"); // "jokes" | "saved"
  const [anim, setAnim] = useState(false);
  const [bursts, setBursts] = useState([]);
  const [reactionMsg, setReactionMsg] = useState("");
  const [laughsToday, setLaughsToday] = useState(0);
  const [language, setLanguage] = useState("en"); // "en" | "hi"
  const [savedGlow, setSavedGlow] = useState(false);
  const [gifSrc, setGifSrc] = useState("/oggy.gif");
  const [gifIndex, setGifIndex] = useState(0); // 0: oggy, 1: jerry, 2: cat

  const theme = useMemo(() => {
    const base = {
      happy: "linear-gradient(135deg, #FFF7B2 0%, #FFEAB6 100%)",
      sad: "linear-gradient(135deg, #E8D9FF 0%, #F3E8FF 100%)",
      anxious: "linear-gradient(135deg, #FFE3E3 0%, #FFE9D6 100%)",
      calm: "linear-gradient(135deg, #E7F7EF 0%, #E8FFE8 100%)",
      default: "linear-gradient(135deg, #FFF6EA 0%, #E8F4FD 100%)"
    };
    return `${base[mood] || base.default}`;
  }, [mood]);

  useEffect(() => {
    try {
      const userData = safeGet("feelheal_user", null);
      if (userData) setUser(JSON.parse(userData));
    } catch {}
    try {
      const fav = safeGet(STORAGE_FAV, null);
      if (fav) setFavorites(JSON.parse(fav));
      const react = safeGet(STORAGE_REACTIONS, null);
      if (react) setReactions(JSON.parse(react));
      const lang = safeGet(STORAGE_LANG, null);
      if (lang) setLanguage(lang);
      // mode removed
      const today = new Date().toISOString().split("T")[0];
      const laughs = JSON.parse(safeGet(STORAGE_LAUGH_TODAY, "{}"));
      setLaughsToday(laughs[today] || 0);
    } catch {}
    try {
      const moodHistory = JSON.parse(localStorage.getItem("feelheal_mood_history") || "[]");
      const last = moodHistory[moodHistory.length - 1]?.mood;
      if (["happy","sad","stressed","numb","tired","calm"].includes(last)) {
        setMood(last === "stressed" ? "anxious" : last);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!joke) nextJoke();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood]);

  const giggle = () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const o1 = ctx.createOscillator();
      const g = ctx.createGain();
      o1.type = "triangle";
      o1.frequency.value = 520;
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      o1.connect(g); g.connect(ctx.destination);
      o1.start(); o1.stop(ctx.currentTime + 0.26);
    } catch {}
  };

  const characterPool = (basePool) => basePool;

  const nextJoke = () => {
    const base = getMixedPool(language);
    const pool = characterPool(base);
    setAnim(true);
    setTimeout(() => {
      // rotate GIF in fixed order: oggy -> jerry -> cat -> repeat
      const gifs = ["/oggy.gif","/jerry.gif","/cat laughing.gif"];
      const nextIdx = (gifIndex + 1) % gifs.length;
      setGifIndex(nextIdx);
      setGifSrc(gifs[nextIdx]);
      setJoke(pick(pool));
      setAnim(false);
      giggle();
      // bursts
      const newBursts = Array.from({ length: 10 }).map((_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 80 + 10,
        delay: i * 60,
        emoji: ["😂","🤣","🌟","😆"][i % 4]
      }));
      setBursts(newBursts);
      setTimeout(() => setBursts([]), 1200);
      // challenge counter
      const today = new Date().toISOString().split("T")[0];
      const data = JSON.parse(safeGet(STORAGE_LAUGH_TODAY, "{}"));
      const count = (data[today] || 0) + 1;
      data[today] = count;
      safeSet(STORAGE_LAUGH_TODAY, JSON.stringify(data));
      setLaughsToday(count);
    }, 220);
  };

  const toggleFavorite = () => {
    const exists = favorites.includes(joke);
    const updated = exists ? favorites.filter(j => j !== joke) : [joke, ...favorites].slice(0, 50);
    setFavorites(updated);
    try { safeSet(STORAGE_FAV, JSON.stringify(updated)); } catch {}
  };

  const react = (emoji) => {
    const updated = { ...(reactions || {}) };
    updated[joke] = emoji;
    setReactions(updated);
    try { safeSet(STORAGE_REACTIONS, JSON.stringify(updated)); } catch {}
    setReactionMsg(`You giggled again${user?.name ? ", " + user.name : ""}! ${emoji}`);
    setTimeout(() => setReactionMsg(""), 1200);
  };

  const share = async () => {
    const text = `${joke}\n— Shared from FeelHeal Laugh Lounge`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Joke copied to clipboard!");
    } catch {
      alert("Copy failed. You can select and copy the joke manually.");
    }
  };

  const isFav = favorites.includes(joke);

  return (
    <div className="min-h-screen relative" style={{ background: theme }}>
      <FloatingEmojis />
      <div className="pointer-events-none fixed inset-0 opacity-[.3]" style={{ background: "radial-gradient(60% 40% at 70% 20%, rgba(255,255,255,.55), transparent 60%)" }} />

      {/* App header and sidebar */}
      <HeaderBar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(v => !v)}
        user={user}
      />

      <div className="flex w-full">
        <SidebarNav isOpen={isSidebarOpen} />

        <main className="flex-1 min-w-0 px-6 py-8 relative z-10 text-lg md:text-xl">
          {/* Centered title for consistency with other pages */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">😂</div>
            <h1 className="text-4xl font-bold" style={{color: "var(--feelheal-purple)"}}>Laugh Lounge</h1>
          </div>
          <ControlsBar
            language={language}
            setLanguage={setLanguage}
            laughsToday={laughsToday}
            onChange={nextJoke}
          />
          {/* Tabs */}
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => setTab("jokes")}
              className={`px-5 py-3 rounded-xl text-lg font-semibold ${tab==="jokes" ? "text-white" : "text-gray-800"} transition`}
              style={{ background: tab==="jokes" ? "var(--feelheal-purple)" : "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.6)" }}
            >
              Jokes
            </button>
            <button
              onClick={() => setTab("saved")}
              className={`px-5 py-3 rounded-xl text-lg font-semibold ${tab==="saved" ? "text-white" : "text-gray-800"} transition ${savedGlow ? "ring-4 ring-yellow-300" : ""}`}
              style={{ background: tab==="saved" ? "var(--feelheal-purple)" : "rgba(255,255,255,.7)", border: "1px solid rgba(255,255,255,.6)", transition: "box-shadow 200ms" }}
            >
              Saved Smiles ({favorites.length})
            </button>
          </div>

          {tab === "jokes" ? (
            <JokeView
              anim={anim}
              bursts={bursts}
              joke={joke}
              isFav={isFav}
              gifSrc={gifSrc}
              onReact={react}
              onNext={nextJoke}
              onGiggle={() => giggle()}
              onToggleFav={() => {
                const wasFav = favorites.includes(joke);
                toggleFavorite();
                if (!wasFav) {
                  setSavedGlow(true);
                  setTimeout(() => setSavedGlow(false), 900);
                }
              }}
              onShare={share}
              onGlowSaved={() => {
                setSavedGlow(true);
                setTimeout(() => setSavedGlow(false), 900);
              }}
            />
          ) : (
            <SavedSmiles
              favorites={favorites}
              reactions={reactions}
              onRemove={(f) => {
                const updated = favorites.filter(j => j !== f);
                setFavorites(updated);
                try { safeSet(STORAGE_FAV, JSON.stringify(updated)); } catch {}
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}



