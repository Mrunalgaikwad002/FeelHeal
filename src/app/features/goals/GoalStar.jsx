"use client";

export default function GoalStar({ goal, onHover, onLeave, onClick, isHovered, isSelected }) {
  const size = goal.completed ? 32 : 20 + (goal.progress / 100) * 12;
  const opacity = goal.brightness || (0.4 + (goal.progress / 100) * 0.6);
  const glowSize = goal.completed ? 40 : 20 + (goal.progress / 100) * 20;
  
  // Choose star emoji based on completion and progress
  const starEmoji = goal.completed ? "⭐" : (goal.progress > 50 ? "🌟" : "✨");

  return (
    <div
      className="absolute cursor-pointer transition-all duration-300"
      style={{
        left: `${goal.position?.x || 50}%`,
        top: `${goal.position?.y || 50}%`,
        transform: `translate(-50%, -50%) ${isHovered || isSelected ? 'scale(1.5)' : 'scale(1)'}`,
        zIndex: isSelected ? 50 : isHovered ? 40 : 10
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div
        className="absolute rounded-full"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: goal.completed 
            ? `radial-gradient(circle, rgba(255, 255, 255, ${opacity * 0.6}) 0%, transparent 70%)`
            : `radial-gradient(circle, rgba(255, 255, 255, ${opacity * 0.4}) 0%, transparent 70%)`,
          animation: goal.completed ? 'pulse 2s ease-in-out infinite' : 'twinkle 3s ease-in-out infinite',
          animationDelay: `${(goal.id % 5) * 0.2}s`
        }}
      />
      
      {/* Star Emoji */}
      <div
        className="relative flex items-center justify-center cursor-pointer"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size}px`,
          opacity: opacity,
          filter: goal.completed 
            ? `drop-shadow(0 0 ${glowSize * 0.3}px rgba(255, 255, 255, ${opacity})) drop-shadow(0 0 ${glowSize * 0.5}px rgba(255, 215, 0, 0.5))`
            : `drop-shadow(0 0 ${glowSize * 0.2}px rgba(255, 255, 255, ${opacity * 0.7}))`,
          animation: goal.completed 
            ? 'glow 2s ease-in-out infinite, float 6s ease-in-out infinite' 
            : 'twinkle 3s ease-in-out infinite, float 8s ease-in-out infinite',
          animationDelay: `${(goal.id % 5) * 0.2}s`,
          transition: 'all 0.3s ease',
          transform: isHovered || isSelected ? 'scale(1.3) rotate(15deg)' : 'scale(1) rotate(0deg)'
        }}
      >
        {starEmoji}
      </div>
      
      {/* Sparkle effect on hover */}
      {(isHovered || isSelected) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-lg"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-${size * 0.8}px)`,
                animation: `sparkle 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0.8
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      {/* Tooltip on hover */}
      {isHovered && !isSelected && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-white/90 backdrop-blur-sm text-sm font-medium whitespace-nowrap"
          style={{color: "var(--feelheal-purple)"}}
        >
          {goal.title}
          <div className="text-xs text-gray-600 mt-1">{goal.progress}%</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/90"></div>
        </div>
      )}
    </div>
  );
}

