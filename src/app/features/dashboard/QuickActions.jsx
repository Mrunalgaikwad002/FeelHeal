"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuickActions({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("feelheal_user");
    localStorage.removeItem("feelheal_seen_onboarding");
    localStorage.removeItem("feelheal_seen_dashboard");
    router.push("/");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2 p-2 rounded-xl bg-white/50 hover:bg-white/70 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <span className="text-sm font-medium text-gray-700">{user.name}</span>
        <span className="text-gray-500">▼</span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-white/20 backdrop-blur-sm z-50">
          <div className="py-2">
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
              <span className="mr-3">⚙️</span>
              Settings
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
              <span className="mr-3">👤</span>
              Profile
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
              <span className="mr-3">📊</span>
              Analytics
            </button>
            <hr className="my-2 border-gray-200" />
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
            >
              <span className="mr-3">🔓</span>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

