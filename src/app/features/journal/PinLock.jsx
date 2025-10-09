"use client";

import { useState } from "react";

export default function PinLock({ onUnlock }) {
  const [pin, setPin] = useState("");
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-md text-center">
        <p className="mb-4" style={{color: "var(--feelheal-purple)"}}>Enter your 4-digit PIN to view your diary</p>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={4}
          className="px-4 py-2 rounded-xl bg-white text-center tracking-widest"
          style={{color: "var(--feelheal-purple)"}}
        />
        <div className="mt-4">
          <button
            className="px-4 py-2 rounded-lg text-sm text-white"
            style={{background: "var(--feelheal-purple)"}}
            onClick={() => onUnlock()}
          >
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
}


