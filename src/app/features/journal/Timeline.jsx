"use client";

import { useState } from "react";

function EntryCard({ entry, onOpen }) {
  const date = new Date(entry.date);
  const snippet = entry.text.slice(0, 60);
  const icon = { happy: "🌻", calm: "🍃", sad: "🌧️", stressed: "🌪️", reflective: "🌙", tired: "😴" }[entry.mood] || "📝";
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 hover:shadow cursor-pointer" onClick={() => onOpen(entry)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm text-gray-500">{date.toDateString()}</span>
      </div>
      <p className="text-base" style={{color: "var(--feelheal-purple)"}}>{snippet}{entry.text.length > 60 ? "…" : ""}</p>
    </div>
  );
}

export default function Timeline({ entries, onDelete }) {
  const [open, setOpen] = useState(null);

  const handleDelete = (e, entryId) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this entry?")) {
      onDelete?.(entryId);
      if (open?.id === entryId) {
        setOpen(null);
      }
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold mb-4" style={{color: "var(--feelheal-purple)"}}>Memory Lane</h3>
      {entries.length === 0 ? (
        <p className="text-base text-gray-600">No entries yet. Start with your first reflection above ✍️</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {entries.map(e => (
            <div key={e.id} className="relative">
              <EntryCard entry={e} onOpen={setOpen} />
              {onDelete && (
                <button
                  onClick={(ev) => handleDelete(ev, e.id)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 text-sm"
                  title="Delete entry"
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xl font-semibold" style={{color: "var(--feelheal-purple)"}}>Full Entry</h4>
              <div className="flex items-center gap-2">
                {onDelete && (
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this entry?")) {
                        onDelete(open.id);
                        setOpen(null);
                      }
                    }}
                    className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 text-sm"
                    title="Delete entry"
                  >
                    🗑️
                  </button>
                )}
                <button onClick={() => setOpen(null)} className="text-xl">✖</button>
              </div>
            </div>
            {open.attachment && (
              <img src={open.attachment} alt="attachment" className="rounded-xl mb-3 max-h-60 object-cover w-full" />
            )}
            <p className="text-base leading-relaxed" style={{color: "var(--feelheal-purple)"}}>{open.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}


