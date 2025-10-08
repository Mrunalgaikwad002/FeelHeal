"use client";

import { useState, useEffect } from "react";

export default function GoalsSection({ isFirstTime }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("feelheal_goals");
    if (saved) {
      setGoals(JSON.parse(saved));
    }
  }, []);

  const addGoal = () => {
    const newGoal = {
      id: Date.now(),
      text: "New goal",
      completed: false,
      createdAt: new Date().toISOString()
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("feelheal_goals", JSON.stringify(updatedGoals));
  };

  const toggleGoal = (id) => {
    const updatedGoals = goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
    localStorage.setItem("feelheal_goals", JSON.stringify(updatedGoals));
  };

  const getActiveGoals = () => goals.filter(goal => !goal.completed).slice(0, 3);

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg h-full flex flex-col card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-3">🎯</span>
          <h3 className="text-xl font-semibold" style={{color: "var(--feelheal-purple)"}}>
            Goals & Habits
          </h3>
        </div>
        <button
          onClick={addGoal}
          className="text-2xl hover:scale-110 transition-transform"
          style={{color: "var(--feelheal-purple)"}}
        >
          +
        </button>
      </div>

      {isFirstTime ? (
        <div className="text-center flex-1 flex flex-col justify-center">
          <div className="mb-4">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-gray-600 mb-4">Track your personal goals and habits</p>
            <p className="text-sm text-gray-500">
              Set meaningful goals and celebrate your progress.
            </p>
          </div>
          <button 
            onClick={addGoal}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:from-orange-600 hover:to-red-600 transition-all"
          >
            Set Your First Goal
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {goals.length > 0 ? (
            <div className="flex-1 flex flex-col">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Active Goals</h4>
              <div className="space-y-2">
                {getActiveGoals().map((goal) => (
                  <div key={goal.id} className="flex items-center space-x-3 p-2 rounded-lg bg-white/50">
                    <button
                      onClick={() => toggleGoal(goal.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        goal.completed 
                          ? "bg-green-500 border-green-500" 
                          : "border-gray-300 hover:border-purple-400"
                      }`}
                    >
                      {goal.completed && <span className="text-white text-xs">✓</span>}
                    </button>
                    <span className={`text-sm flex-1 ${
                      goal.completed ? "line-through text-gray-500" : "text-gray-700"
                    }`}>
                      {goal.text}
                    </span>
                  </div>
                ))}
              </div>
              {goals.length > 3 && (
                <p className="text-xs text-gray-500 mt-2 text-center mt-auto">
                  +{goals.length - 3} more goals
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-4 mt-auto">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-gray-600 text-sm">No goals set yet</p>
              <p className="text-xs text-gray-500">Add your first goal to get started</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

