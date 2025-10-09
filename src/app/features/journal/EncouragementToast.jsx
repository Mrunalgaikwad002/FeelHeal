"use client";

export default function EncouragementToast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-40 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
      <p className="text-sm font-medium" style={{color: "var(--feelheal-purple)"}}>
        {message}
      </p>
    </div>
  );
}


