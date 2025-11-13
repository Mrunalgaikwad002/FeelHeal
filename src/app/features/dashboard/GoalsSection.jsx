"use client";

import { useState, useEffect } from "react";

export default function GoalsSection({ isFirstTime }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Load goals from localStorage (same as Goal Universe)
    const loadGoals = () => {
      try {
        const saved = localStorage.getItem("feelheal_goals");
        if (saved) {
          const loadedGoals = JSON.parse(saved);
          setGoals(loadedGoals);
        }
      } catch (error) {
        console.error("Error loading goals:", error);
      }
    };

    loadGoals();
    
    // Listen for storage changes to update when goals are modified in Goal Universe
    const handleStorageChange = (e) => {
      if (e.key === "feelheal_goals") {
        loadGoals();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // Also check periodically for changes (for same-tab updates)
    // Check every 2 seconds to avoid too frequent updates
    const interval = setInterval(loadGoals, 2000);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Get first 3 active (non-completed) goals from Goal Universe
  const getActiveGoals = () => {
    const activeGoals = goals.filter(goal => !goal.completed);
    return activeGoals.slice(0, 3);
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg h-full flex flex-col card-hover">
      <div className="flex items-center justify-between mb-4">
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            const el = document.querySelector("#card-goals");
            if (el) {
              const headerOffset = 80;
              const elementPosition = el.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }}
        >
          <span className="text-3xl mr-3">🎯</span>
          <h3 className="text-2xl font-semibold" style={{color: "var(--feelheal-purple)"}}>
            Goals & Habits
          </h3>
        </div>
        <button
          onClick={() => window.location.href = "/features/goals"}
          className="px-4 py-2 text-base font-medium rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
          style={{color: "var(--feelheal-purple)"}}
        >
          New Goal?
        </button>
      </div>

      {isFirstTime ? (
        <div className="text-center flex-1 flex flex-col justify-center">
          <div className="mb-4">
            <div className="text-5xl mb-2">🎯</div>
            <p className="text-lg text-gray-600 mb-4">Track your personal goals and habits</p>
            <p className="text-base text-gray-500">
              Set meaningful goals and celebrate your progress.
            </p>
          </div>
          <button 
            onClick={() => window.location.href = "/features/goals"}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-base font-medium hover:from-orange-600 hover:to-red-600 transition-all"
          >
            Set Your First Goal
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {(() => {
            const activeGoals = getActiveGoals();
            const totalActiveGoals = goals.filter(g => !g.completed).length;
            
            if (activeGoals.length > 0) {
              return (
                <div className="flex-1 flex flex-col">
                  <h4 className="text-base font-medium text-gray-700 mb-3">Active Goals</h4>
                  <div className="space-y-2">
                    {activeGoals.map((goal) => (
                      <div 
                        key={goal.id} 
                        className="p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-colors cursor-pointer"
                        onClick={() => window.location.href = "/features/goals"}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-base font-medium text-gray-700 flex-1">
                            {goal.title || goal.text || "Untitled Goal"}
                          </span>
                        </div>
                        {goal.progress !== undefined && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all"
                                style={{ width: `${Math.min(100, Math.max(0, goal.progress))}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{Math.round(goal.progress)}% complete</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {totalActiveGoals > 3 && (
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      +{totalActiveGoals - 3} more goals
                    </p>
                  )}
                </div>
              );
            } else {
              return (
                <div className="text-center py-4 mt-auto">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-gray-600 text-base">No goals set yet</p>
                  <p className="text-sm text-gray-500">Add your first goal to get started</p>
                </div>
              );
            }
          })()}
        </div>
      )}
    </div>
  );
}

