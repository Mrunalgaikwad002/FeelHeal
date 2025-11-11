"use client";

export default function ConstellationView({ goals }) {
  if (goals.length === 0) {
    return (
      <div className="relative min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-2xl font-semibold text-white mb-2">No constellations yet</h3>
          <p className="text-lg text-white/70">Complete your goals to see them form beautiful constellations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[60vh] w-full">
      {/* Magical background particles for constellation view */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`const-particle-${i}`}
            className="absolute rounded-full bg-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `sparkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center mb-6 relative z-10">
        <p className="text-2xl text-white font-bold mb-2 animate-pulse">
          Your progress lights up your universe ✨
        </p>
        <p className="text-lg text-white/80">
          {goals.length} {goals.length === 1 ? 'star' : 'stars'} forming {goals.length === 1 ? 'a constellation' : 'constellations'}
        </p>
        <p className="text-base text-white/60 mt-2">
          Each completed goal connects to create something beautiful 🌌
        </p>
      </div>

      {/* Constellation Display */}
      <div className="relative w-full" style={{ minHeight: "500px" }}>
        {goals.map((goal, index) => {
          // Arrange completed goals in a constellation pattern
          const angle = (index / goals.length) * 2 * Math.PI;
          const radius = 30 + (index % 3) * 10;
          const centerX = 50;
          const centerY = 50;

          return (
            <div
              key={goal.id}
              className="absolute"
              style={{
                left: `${centerX + radius * Math.cos(angle)}%`,
                top: `${centerY + radius * Math.sin(angle)}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Glowing constellation line (connect to next star) */}
              {index < goals.length - 1 && (
                <svg
                  className="absolute"
                  style={{
                    width: `${radius * 2}%`,
                    height: '3px',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${angle * (180 / Math.PI)}deg)`,
                    zIndex: 1,
                    filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.6))',
                    animation: 'glow 3s ease-in-out infinite',
                    animationDelay: `${index * 0.3}s`
                  }}
                >
                  <defs>
                    <linearGradient id={`constellation-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                      <stop offset="50%" stopColor="rgba(255, 215, 0, 0.6)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.8)" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke={`url(#constellation-gradient-${index})`}
                    strokeWidth="3"
                  />
                </svg>
              )}

              {/* Star Emoji with enhanced glow */}
              <div
                className="relative cursor-pointer flex items-center justify-center"
                style={{
                  width: '40px',
                  height: '40px',
                  fontSize: '40px',
                  zIndex: 10,
                  filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 1)) drop-shadow(0 0 25px rgba(255, 215, 0, 0.6))',
                  animation: 'glow 2s ease-in-out infinite, float 5s ease-in-out infinite',
                  animationDelay: `${index * 0.2}s`,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.3) rotate(15deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                ⭐
              </div>

              {/* Goal label */}
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 rounded bg-white/90 backdrop-blur-sm text-xs font-medium whitespace-nowrap"
                style={{color: "var(--feelheal-purple)"}}
              >
                {goal.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

