"use client";

import { useState } from "react";

export default function GoalDetails({ goal, onClose, onUpdateProgress, onDelete }) {
  const [progress, setProgress] = useState(goal.progress);

  const handleSave = () => {
    onUpdateProgress(goal.id, progress);
    onClose();
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this goal?")) {
      onDelete(goal.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>
            {goal.completed ? "⭐ " : "🌠 "}{goal.title}
          </h3>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-600"
          >
            ✖
          </button>
        </div>

        {goal.description && (
          <p className="text-base text-gray-700 mb-4">{goal.description}</p>
        )}

        <div className="mb-6">
          <label className="block text-base font-medium mb-2" style={{color: "var(--feelheal-purple)"}}>
            Progress: {progress}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-3 rounded-lg appearance-none"
            style={{
              background: `linear-gradient(to right, var(--feelheal-purple) 0%, var(--feelheal-purple) ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {goal.completed && (
          <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200">
            <p className="text-base text-center font-medium" style={{color: "var(--feelheal-purple)"}}>
              ✨ This star is part of your constellation!
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 px-5 py-2.5 rounded-lg text-base font-medium text-white transition-colors"
            style={{background: "var(--feelheal-purple)"}}
          >
            Save Progress
          </button>
          <button
            onClick={handleDelete}
            className="px-5 py-2.5 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

