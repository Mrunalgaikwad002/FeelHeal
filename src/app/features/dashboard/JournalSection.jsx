"use client";

import { useState, useEffect } from "react";

export default function JournalSection({ isFirstTime }) {
  const [entries, setEntries] = useState([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("feelheal_journal_entries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const handleSaveEntry = () => {
    if (newEntry.trim()) {
      const entry = {
        id: Date.now(),
        content: newEntry.trim(),
        date: new Date().toISOString(),
        mood: "neutral" // Could be enhanced to capture mood
      };
      const updatedEntries = [entry, ...entries];
      setEntries(updatedEntries);
      localStorage.setItem("feelheal_journal_entries", JSON.stringify(updatedEntries));
      setNewEntry("");
      setShowNewEntry(false);
    }
  };

  const getRecentEntries = () => {
    return entries.slice(0, 3);
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg h-full flex flex-col card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-3">✍️</span>
          <h3 className="text-xl font-semibold" style={{color: "var(--feelheal-purple)"}}>
            Journal
          </h3>
        </div>
        <button
          onClick={() => setShowNewEntry(!showNewEntry)}
          className="px-3 py-1 text-sm rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
          style={{color: "var(--feelheal-purple)"}}
        >
          {showNewEntry ? "Cancel" : "New"}
        </button>
      </div>

      {isFirstTime ? (
        <div className="text-center flex-1 flex flex-col justify-center">
          <div className="mb-4">
            <div className="text-4xl mb-2">📝</div>
            <p className="text-gray-600 mb-4">Write your first reflection ✍️</p>
            <p className="text-sm text-gray-500">
              Journaling can help you process emotions and track your mental wellness journey.
            </p>
          </div>
          <button
            onClick={() => setShowNewEntry(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Start Writing
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {showNewEntry ? (
            <div className="mb-4">
              <textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="How are you feeling today? What's on your mind?"
                className="w-full p-3 rounded-xl border border-white/30 bg-white/50 focus:outline-none focus:border-purple-300 resize-none"
                rows={4}
                style={{color: "var(--feelheal-purple)"}}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setShowNewEntry(false)}
                  className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEntry}
                  className="px-4 py-2 text-sm rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              {entries.length > 0 ? (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Entries</h4>
                  <div className="space-y-3">
                    {getRecentEntries().map((entry) => (
                      <div key={entry.id} className="p-3 bg-white/50 rounded-xl border border-white/30">
                        <p className="text-sm text-gray-700 line-clamp-2">{entry.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(entry.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 mt-auto">
                  <div className="text-3xl mb-2">📖</div>
                  <p className="text-gray-600 text-sm">No entries yet</p>
                  <p className="text-xs text-gray-500">Start writing to track your thoughts</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

