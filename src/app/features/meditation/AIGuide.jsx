"use client";

import { useState, useEffect } from "react";

export default function AIGuide({ message, onDismiss }) {
  const [show, setShow] = useState(true);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setTyping(true);
    // Auto-dismiss after 8 seconds
    const timer = setTimeout(() => {
      setShow(false);
      if (onDismiss) onDismiss();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!show) return null;

  return (
    <div className="mb-8 animate-fadeInSoft">
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200 shadow-lg max-w-2xl mx-auto">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💫</div>
          <div className="flex-1">
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              {typing ? message : ""}
            </p>
            {typing && (
              <span className="inline-block w-2 h-5 bg-purple-500 ml-1 animate-pulse" />
            )}
          </div>
          <button
            onClick={() => {
              setShow(false);
              if (onDismiss) onDismiss();
            }}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✖
          </button>
        </div>
      </div>
    </div>
  );
}

