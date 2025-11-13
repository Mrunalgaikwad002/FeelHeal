"use client";

export default function QuickActions({ user }) {
  return (
    <div className="flex items-center">
      <span className="text-base font-medium" style={{color: "var(--feelheal-purple)"}}>
        {user.email || "User"}
      </span>
    </div>
  );
}

