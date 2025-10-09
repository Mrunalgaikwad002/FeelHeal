"use client";

import { useState, useEffect } from "react";

const MOOD_PLANTS = {
  happy: { emoji: "🌻", name: "Sunflower", color: "#FFD700", message: "Your happiness bloomed a sunflower 🌻" },
  calm: { emoji: "🍃", name: "Leaf", color: "#90EE90", message: "Your calm added a new leaf 🍃" },
  sad: { emoji: "🌧️", name: "Rain", color: "#87CEEB", message: "Your sadness brought gentle rain to help everything grow 🌧️" },
  stressed: { emoji: "💨", name: "Wind", color: "#DDA0DD", message: "The wind cleared your stress and made the garden dance 💨" },
  numb: { emoji: "🪨", name: "Stone", color: "#A9A9A9", message: "Your quiet moment added a peaceful stone 🪨" },
  tired: { emoji: "🌙", name: "Moonflower", color: "#E6E6FA", message: "Your rest grew a gentle moonflower 🌙" }
};

const MOOD_OPTIONS = [
  { value: "happy", emoji: "😊", label: "Happy", color: "#FFD700" },
  { value: "calm", emoji: "😌", label: "Calm", color: "#90EE90" },
  { value: "sad", emoji: "😢", label: "Sad", color: "#87CEEB" },
  { value: "stressed", emoji: "😤", label: "Stressed", color: "#DDA0DD" },
  { value: "numb", emoji: "😐", label: "Numb", color: "#A9A9A9" },
  { value: "tired", emoji: "😴", label: "Tired", color: "#E6E6FA" }
];

export default function MoodGarden() {
  const [garden, setGarden] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [showMessage, setShowMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [backgroundGradient, setBackgroundGradient] = useState("linear-gradient(135deg, #FFE4E1 0%, #E6E6FA 50%, #F0FFF0 100%)");
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Load user data
    try {
      const userData = localStorage.getItem("feelheal_user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }

    // Load garden from localStorage (disabled for testing)
    // const savedGarden = localStorage.getItem("feelheal_mood_garden");
    // if (savedGarden) {
    //   setGarden(JSON.parse(savedGarden));
    // }
    
    // Calculate background based on recent moods
    updateBackgroundGradient();
  }, []);

  const updateBackgroundGradient = () => {
    const recentMoods = garden.slice(-7); // Last 7 entries
    if (recentMoods.length === 0) return;

    const moodCounts = recentMoods.reduce((acc, plant) => {
      acc[plant.mood] = (acc[plant.mood] || 0) + 1;
      return acc;
    }, {});

    const dominantMood = Object.keys(moodCounts).reduce((a, b) => 
      moodCounts[a] > moodCounts[b] ? a : b
    );

    const gradients = {
      happy: "linear-gradient(135deg, #FFE4E1 0%, #FFD700 50%, #FFA500 100%)",
      calm: "linear-gradient(135deg, #E6F3FF 0%, #90EE90 50%, #98FB98 100%)",
      sad: "linear-gradient(135deg, #E6E6FA 0%, #87CEEB 50%, #B0C4DE 100%)",
      stressed: "linear-gradient(135deg, #F0E6FF 0%, #DDA0DD 50%, #D8BFD8 100%)",
      numb: "linear-gradient(135deg, #F5F5F5 0%, #A9A9A9 50%, #D3D3D3 100%)",
      tired: "linear-gradient(135deg, #F0F8FF 0%, #E6E6FA 50%, #F5F5DC 100%)"
    };

    setBackgroundGradient(gradients[dominantMood] || gradients.happy);
  };

  const handleMoodSelect = (mood) => {
    const plant = MOOD_PLANTS[mood.value];
    
    // Special positioning for rain (cloud) - always at the top
    let position;
    if (mood.value === 'sad') {
      position = {
        x: Math.random() * 80 + 10, // 10% to 90% of container width
        y: 5 // Always at the top (5% from top)
      };
    } else {
      position = {
        x: Math.random() * 80 + 10, // 10% to 90% of container width
        y: Math.random() * 60 + 20  // 20% to 80% of container height
      };
    }
    
    const newPlant = {
      id: Date.now(),
      mood: mood.value,
      emoji: plant.emoji,
      name: plant.name,
      color: plant.color,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      position: position,
      size: 1 + Math.random() * 0.5 // Random size variation
    };

    const updatedGarden = [...garden, newPlant];
    setGarden(updatedGarden);
    // localStorage.setItem("feelheal_mood_garden", JSON.stringify(updatedGarden)); // Disabled for testing

    // Show positive feedback
    setShowMessage(plant.message);
    setShowConfetti(true);
    
    // Play gentle sound
    playPlantSound();

    // Update background
    updateBackgroundGradient();

    // Hide message after 3 seconds
    setTimeout(() => {
      setShowMessage("");
      setShowConfetti(false);
    }, 3000);
  };

  const playPlantSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log("Sound not available");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: "var(--feelheal-purple)"}}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: backgroundGradient }}>
      {/* Floating petals background */}
      <div className="floating-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className={`petal ${i % 3 === 0 ? 'small' : i % 3 === 1 ? 'medium' : 'large'}`}
            style={{
              left: `${(i * 5) % 100}%`,
              animationDelay: `${(i % 10) * 0.8}s`,
              top: `-${(i % 5) * 15}%`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                aria-label="Toggle sidebar"
                onClick={() => setIsSidebarOpen(v => !v)}
                className="p-2 rounded-lg hover:bg-gray-100"
                style={{color: "var(--feelheal-purple)"}}
              >
                {isSidebarOpen ? "☰" : "☷"}
              </button>
              <span className="text-2xl">🌸</span>
              <h1 className="text-xl font-bold" style={{color: "var(--feelheal-purple)"}}>
                FeelHeal
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Hi, {user.name} 👋</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-white/70 backdrop-blur-sm border-r border-white/20 min-h-[calc(100vh-64px)] sticky top-16 hidden md:block`}
        >
          <nav className="p-3 space-y-1 text-sm">
            {[
              { icon: "🏠", label: "Dashboard", href: "/dashboard" },
              { icon: "🌦️", label: "Mood Garden", href: "/features/mood" },
              { icon: "✍️", label: "Journal", href: "/journal" },
              { icon: "🎯", label: "Goals", href: "/goals" },
              { icon: "🧘‍♀️", label: "Meditation", href: "/meditation" },
              { icon: "💬", label: "AI Companion", href: "/chatbot" },
              { icon: "🕹️", label: "Games", href: "/games" },
              { icon: "😂", label: "Humor", href: "/humor" },
              { icon: "⚙️", label: "Settings" },
              { icon: "🔓", label: "Logout" }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
                  item.href === "/features/mood" ? "bg-gray-100" : ""
                }`}
                style={{color: "var(--feelheal-purple)"}}
                onClick={() => { 
                  if (item.href) { window.location.href = item.href; }
                }}
              >
                <span className="text-lg w-5 text-center">{item.icon}</span>
                {isSidebarOpen && <span className="truncate">{item.label}</span>}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 relative z-10">
          <div className="container mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2" style={{color: "var(--feelheal-purple)"}}>
                🌸 Mood Garden
              </h1>
              <p className="text-gray-600">Nurture your emotional journey with nature</p>
            </div>

            {/* How to Use Instructions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-center" style={{color: "var(--feelheal-purple)"}}>
                🌱 How to Grow Your Garden
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-3xl mb-2">1️⃣</div>
                  <h3 className="font-semibold mb-2" style={{color: "var(--feelheal-purple)"}}>Select Your Mood</h3>
                  <p className="text-gray-600">Choose how you're feeling from the mood buttons below</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">2️⃣</div>
                  <h3 className="font-semibold mb-2" style={{color: "var(--feelheal-purple)"}}>Watch It Grow</h3>
                  <p className="text-gray-600">Each mood creates a unique plant in your garden</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">3️⃣</div>
                  <h3 className="font-semibold mb-2" style={{color: "var(--feelheal-purple)"}}>Nurture & Explore</h3>
                  <p className="text-gray-600">Hover over plants to see when they were planted</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
                <p className="text-center text-sm text-gray-700">
                  
                </p>
              </div>
            </div>

            {/* Mood Selection */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-center" style={{color: "var(--feelheal-purple)"}}>
                How are you feeling today?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {MOOD_OPTIONS.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => handleMoodSelect(mood)}
                    className="flex flex-col items-center p-4 rounded-xl hover:scale-105 transition-all duration-200 bg-white/50 hover:bg-white/80"
                    style={{ borderColor: mood.color }}
                  >
                    <span className="text-3xl mb-2">{mood.emoji}</span>
                    <span className="text-sm font-medium" style={{color: "var(--feelheal-purple)"}}>
                      {mood.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Garden Display */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 min-h-[400px] relative overflow-hidden">
              <h3 className="text-lg font-semibold mb-4 text-center" style={{color: "var(--feelheal-purple)"}}>
                Your Garden ({garden.length} plants)
              </h3>
              
              {garden.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <span className="text-6xl mb-4">🌱</span>
                  <p className="text-lg">Your garden is waiting for its first plant!</p>
                  <p className="text-sm">Select a mood above to start growing 🌸</p>
                </div>
              ) : (
                <div className="relative h-64">
                  {garden.map((plant) => (
                    <div
                      key={plant.id}
                      className="absolute cursor-pointer hover:scale-110 transition-transform duration-200"
                      style={{
                        left: `${plant.position.x}%`,
                        top: `${plant.position.y}%`,
                        fontSize: `${1.5 * plant.size}rem`
                      }}
                      title={`${plant.name} - ${plant.date}`}
                    >
                      {plant.emoji}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Garden Stats */}
            {garden.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>
                    {garden.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Plants</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>
                    {new Set(garden.map(p => p.mood)).size}
                  </div>
                  <div className="text-sm text-gray-600">Mood Types</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>
                    {garden.filter(p => p.date === new Date().toISOString().split('T')[0]).length}
                  </div>
                  <div className="text-sm text-gray-600">Today's Plants</div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Positive Feedback Message */}
      {showMessage && (
        <div className="fixed top-32 right-8 z-40 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg animate-pulse">
          <p className="text-lg font-medium text-center" style={{color: "var(--feelheal-purple)"}}>
            {showMessage}
          </p>
        </div>
      )}

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: '1.5rem',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
