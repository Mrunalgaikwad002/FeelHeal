"use client";

import { useState } from "react";
import GoalStar from "./GoalStar";
import GoalDetails from "./GoalDetails";

export default function StarField({ goals, onUpdateProgress, onSelectGoal, selectedGoal, onDeleteGoal }) {
  const [hoveredGoal, setHoveredGoal] = useState(null);

  if (goals.length === 0) {
    return (
      <div className="relative min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌌</div>
          <h3 className="text-2xl font-semibold text-white mb-2">Your universe awaits</h3>
          <p className="text-lg text-white/70">Add your first goal to see a star appear in the sky</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[60vh] w-full">
      {/* Magical background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Stars Container */}
      <div className="relative w-full h-full" style={{ minHeight: "500px" }}>
        {goals.map((goal, index) => (
          <GoalStar
            key={goal.id}
            goal={goal}
            onHover={() => setHoveredGoal(goal.id)}
            onLeave={() => setHoveredGoal(null)}
            onClick={() => onSelectGoal(goal)}
            isHovered={hoveredGoal === goal.id}
            isSelected={selectedGoal?.id === goal.id}
          />
        ))}
        
        {/* Connection lines between nearby stars (for visual magic) */}
        {goals.length > 1 && goals.filter(g => !g.completed).map((goal, index) => {
          const nearbyGoals = goals.filter((g, i) => 
            i !== index && 
            !g.completed && 
            Math.abs((g.position?.x || 50) - (goal.position?.x || 50)) < 15 &&
            Math.abs((g.position?.y || 50) - (goal.position?.y || 50)) < 15
          );
          
          return nearbyGoals.slice(0, 1).map(nearby => {
            const x1 = goal.position?.x || 50;
            const y1 = goal.position?.y || 50;
            const x2 = nearby.position?.x || 50;
            const y2 = nearby.position?.y || 50;
            const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
            const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            
            return (
              <svg
                key={`line-${goal.id}-${nearby.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${Math.min(x1, x2)}%`,
                  top: `${Math.min(y1, y2)}%`,
                  width: `${distance}%`,
                  height: '2px',
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: '0 0',
                  zIndex: 1,
                  opacity: 0.1
                }}
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
              </svg>
            );
          });
        })}
      </div>

      {/* Goal Details Modal */}
      {selectedGoal && (
        <GoalDetails
          goal={selectedGoal}
          onClose={() => onSelectGoal(null)}
          onUpdateProgress={onUpdateProgress}
          onDelete={onDeleteGoal}
        />
      )}
    </div>
  );
}

