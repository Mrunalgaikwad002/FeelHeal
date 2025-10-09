"use client";

export default function FeedbackToast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed top-32 right-8 z-40 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg animate-pulse">
      <p className="text-lg font-medium text-center" style={{color: "var(--feelheal-purple)"}}>
        {message}
      </p>
    </div>
  );
}
