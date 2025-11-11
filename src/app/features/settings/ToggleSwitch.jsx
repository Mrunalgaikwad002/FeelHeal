"use client";

export default function ToggleSwitch({ id, checked, onChange, labels }) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer select-none">
      <div className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ${checked ? "bg-[#ff92c2]" : "bg-gray-300"}`}>
        <span
          className={`block h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
      <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      {labels ? (
        <div className="flex flex-col leading-tight">
          <span className="text-base font-semibold" style={{ color: "var(--feelheal-purple)" }}>
            {labels.title}
          </span>
          {labels.subtitle && <span className="text-sm text-gray-600">{labels.subtitle}</span>}
        </div>
      ) : null}
    </label>
  );
}

