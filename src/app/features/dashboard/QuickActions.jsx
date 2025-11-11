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
        className="flex items-center space-x-2 p-2.5 rounded-xl bg-white/50 hover:bg-white/70 transition-colors"
      >
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-base font-medium">
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <span className="text-base font-medium text-gray-700">{user.name}</span>
        <span className="text-gray-500 text-lg">▼</span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-white/20 backdrop-blur-sm z-50">
          <div className="py-2">
            <button className="w-full px-4 py-2.5 text-left text-base text-gray-700 hover:bg-gray-50 transition-colors flex items-center font-medium">
              <span className="mr-3 text-lg">⚙️</span>
              Settings
            </button>
            <button className="w-full px-4 py-2.5 text-left text-base text-gray-700 hover:bg-gray-50 transition-colors flex items-center font-medium">
              <span className="mr-3 text-lg">👤</span>
              Profile
            </button>
            <button className="w-full px-4 py-2.5 text-left text-base text-gray-700 hover:bg-gray-50 transition-colors flex items-center font-medium">
              <span className="mr-3 text-lg">📊</span>
              Analytics
            </button>
            <hr className="my-2 border-gray-200" />
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-2.5 text-left text-base text-red-600 hover:bg-red-50 transition-colors flex items-center font-medium"
            >
              <span className="mr-3 text-lg">🔓</span>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

