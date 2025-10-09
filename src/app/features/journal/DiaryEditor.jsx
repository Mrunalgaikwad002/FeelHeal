"use client";

import { useRef, useState } from "react";

export default function DiaryEditor({ accent, icon, onSave }) {
  const [value, setValue] = useState("");
  const [attachment, setAttachment] = useState(null);
  const fileRef = useRef(null);

  const handleAttach = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAttachment(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-2xl p-0 mb-6 shadow-lg overflow-hidden" style={{background: `linear-gradient(135deg, ${accent}22, #ffffff)`}}>
      <div className="bg-white/70 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2" style={{color: "var(--feelheal-purple)"}}>
          <span>{icon}</span>
          <span className="font-semibold">New Entry</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 rounded-lg bg-white shadow hover:shadow-md text-sm"
            style={{color: "var(--feelheal-purple)"}}
            onClick={() => fileRef.current?.click()}
          >
            Add Image
          </button>
          <input type="file" accept="image/*" ref={fileRef} onChange={handleAttach} className="hidden" />
          <button
            className="px-4 py-2 rounded-lg text-sm text-white"
            style={{background: "var(--feelheal-purple)"}}
            onClick={() => value.trim() && onSave(value, attachment)}
          >
            Save Entry →
          </button>
        </div>
      </div>
      <div className="px-6 pb-6">
        {attachment && (
          <div className="my-3">
            <img src={attachment} alt="attachment" className="max-h-48 rounded-xl object-cover" />
          </div>
        )}
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write freely... your thoughts are safe here."
          className="w-full min-h[180px] p-4 rounded-xl bg-white/80 focus:outline-none"
          style={{color: "var(--feelheal-purple)"}}
        />
      </div>
    </div>
  );
}


