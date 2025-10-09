"use client";

import { useState } from "react";

function EntryCard({ entry, onOpen }) {
  const date = new Date(entry.date);
  const snippet = entry.text.slice(0, 60);
  const icon = { happy: "🌻", calm: "🍃", sad: "🌧️", stressed: "🌪️", reflective: "🌙", tired: "😴" }[entry.mood] || "📝";
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 hover:shadow cursor-pointer" onClick={() => onOpen(entry)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-xs text-gray-500">{date.toDateString()}</span>
      </div>
      <p className="text-sm" style={{color: "var(--feelheal-purple)"}}>{snippet}{entry.text.length > 60 ? "…" : ""}</p>
    </div>
  );
}

export default function Timeline({ entries }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3" style={{color: "var(--feelheal-purple)"}}>Memory Lane</h3>
      {entries.length === 0 ? (
        <p className="text-sm text-gray-600">No entries yet. Start with your first reflection above ✍️</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {entries.map(e => <EntryCard key={e.id} entry={e} onOpen={setOpen} />)}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold" style={{color: "var(--feelheal-purple)"}}>Full Entry</h4>
              <button onClick={() => setOpen(null)} className="text-sm">✖</button>
            </div>
            {open.attachment && (
              <img src={open.attachment} alt="attachment" className="rounded-xl mb-3 max-h-60 object-cover w-full" />
            )}
            <p className="text-sm" style={{color: "var(--feelheal-purple)"}}>{open.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}


