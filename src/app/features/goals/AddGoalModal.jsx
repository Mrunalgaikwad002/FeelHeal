"use client";

import { useState } from "react";

export default function AddGoalModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({ title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
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
            🌠 Add New Goal
          </h3>
          <button
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-600"
          >
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-base font-medium mb-2" style={{color: "var(--feelheal-purple)"}}>
              Goal Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Learn meditation, Read 10 books..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-purple-500 text-base"
              style={{color: "#000000"}}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-base font-medium mb-2" style={{color: "var(--feelheal-purple)"}}>
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about your goal..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-purple-500 resize-none text-base"
              style={{color: "#000000"}}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-2.5 rounded-lg text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-5 py-2.5 rounded-lg text-base font-medium text-white transition-colors"
              style={{background: "var(--feelheal-purple)"}}
            >
              Create Star
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

