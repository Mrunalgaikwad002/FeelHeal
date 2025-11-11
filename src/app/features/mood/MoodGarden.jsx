"use client";

import { useState, useEffect } from "react";
import GardenHeader from "./GardenHeader";
import HowToUse from "./HowToUse";
import MoodOptions from "./MoodOptions";
import GardenDisplay from "./GardenDisplay";
import GardenStats from "./GardenStats";
import FeedbackToast from "./FeedbackToast";
import { getCurrentUser } from "@/lib/api/auth";
import { getCurrentProfile } from "@/lib/api/profiles";
import { saveCurrentMoodInsight, getCurrentMoodInsights, anonymizeMood } from "@/lib/api/mood";

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
    async function loadData() {
      try {
        // Get current user
        const { user: authUser, error: userError } = await getCurrentUser();
        
        if (userError || !authUser) {
          window.location.href = "/login";
          return;
        }

        // Get profile
        const { profile } = await getCurrentProfile();
        
        const displayUser = {
          id: authUser.id,
          email: authUser.email,
          name: profile?.display_name || 
                authUser.user_metadata?.display_name || 
                authUser.email?.split("@")[0] || 
                "User"
        };
        setUser(displayUser);

        // Load mood insights from Supabase
        const { moods, error: moodsError } = await getCurrentMoodInsights();
        
        if (!moodsError && moods) {
          // Convert mood insights to garden plants for display
          const gardenPlants = moods.map((mood, index) => ({
            id: mood.id,
            mood: mood.mood_category,
            emoji: MOOD_PLANTS[mood.mood_category]?.emoji || "🌸",
            name: MOOD_PLANTS[mood.mood_category]?.name || "Plant",
            color: MOOD_PLANTS[mood.mood_category]?.color || "#FFB6C1",
            date: mood.date,
            timestamp: mood.created_at,
            position: {
              x: (index * 15) % 80 + 10,
              y: (index * 12) % 60 + 20
            },
            size: 1 + Math.random() * 0.5
          }));
          setGarden(gardenPlants);
        }
      } catch (error) {
        console.error("Error loading mood data:", error);
        window.location.href = "/login";
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    // Calculate background based on recent moods
    updateBackgroundGradient();
  }, [garden]);

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

  const handleMoodSelect = async (mood) => {
    const plant = MOOD_PLANTS[mood.value];
    
    // Anonymize mood before saving
    const { moodCategory, emotionalState } = anonymizeMood(mood.value);
    
    try {
      // Save mood insight to Supabase (anonymized)
      const { mood: savedMood, error: saveError } = await saveCurrentMoodInsight(
        moodCategory,
        emotionalState
      );

      if (saveError) {
        console.error("Error saving mood:", saveError);
        setShowMessage("Couldn't save mood. Please try again.");
        setTimeout(() => setShowMessage(""), 3000);
        return;
      }

      // Special positioning for rain (cloud) - always at the top
      let position;
      if (mood.value === 'sad') {
        position = {
          x: Math.random() * 80 + 10,
          y: 5
        };
      } else {
        position = {
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20
        };
      }
      
      const newPlant = {
        id: savedMood?.id || Date.now(),
        mood: mood.value,
        emoji: plant.emoji,
        name: plant.name,
        color: plant.color,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        position: position,
        size: 1 + Math.random() * 0.5
      };

      const updatedGarden = [...garden, newPlant];
      setGarden(updatedGarden);

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
    } catch (error) {
      console.error("Error in handleMoodSelect:", error);
      setShowMessage("Something went wrong. Please try again.");
      setTimeout(() => setShowMessage(""), 3000);
    }
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
                className="p-2.5 rounded-lg hover:bg-gray-100 text-xl"
                style={{color: "var(--feelheal-purple)"}}
              >
                {isSidebarOpen ? "☰" : "☷"}
              </button>
              <span className="text-3xl">🌸</span>
              <h1 className="text-2xl font-bold" style={{color: "var(--feelheal-purple)"}}>
                FeelHeal
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-base font-medium text-gray-700">Hi, {user.name} 👋</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-white/70 backdrop-blur-sm border-r border-white/20 h-[calc(100vh-64px)] sticky top-16 self-start hidden md:block flex-shrink-0`}
        >
          <nav className="p-4 space-y-1.5 text-lg">
            {[
              { icon: "🏠", label: "Dashboard", href: "/dashboard" },
              { icon: "🌦️", label: "Mood Garden", href: "/features/mood" },
              { icon: "✍️", label: "Journal", href: "/features/journal" },
              { icon: "🌌", label: "Goal Universe", href: "/features/goals" },
              { icon: "🧘‍♀️", label: "Meditation", href: "/features/meditation" },
              { icon: "💬", label: "MyBuddy", href: "/features/companion" },
              { icon: "🕹️", label: "Games", href: "/games" },
              { icon: "😂", label: "Humor", href: "/humor" },
              { icon: "⚙️", label: "Settings", href: "/features/settings" },
              { icon: "🔓", label: "Logout" }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer ${
                  item.href === "/features/mood" ? "bg-gray-100" : ""
                }`}
                style={{color: "var(--feelheal-purple)", fontSize: "18px"}}
                onClick={async () => { 
                  if (item.label === "Logout") {
                    try {
                      const { signOut } = await import("@/lib/api/auth");
                      await signOut();
                      localStorage.removeItem("feelheal_seen_onboarding");
                      localStorage.removeItem("feelheal_seen_dashboard");
                      window.location.href = "/";
                    } catch (error) {
                      console.error("Logout error:", error);
                      window.location.href = "/";
                    }
                  } else if (item.href) { 
                    window.location.href = item.href; 
                  }
                }}
              >
                <span className="text-xl w-6 text-center">{item.icon}</span>
                {isSidebarOpen && <span className="truncate font-medium">{item.label}</span>}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 relative z-10">
          <div className="container mx-auto">
            <GardenHeader />
            <HowToUse />
            <MoodOptions options={MOOD_OPTIONS} onSelect={handleMoodSelect} />
            <GardenDisplay garden={garden} />
            <GardenStats garden={garden} />
          </div>
        </main>
      </div>

      <FeedbackToast message={showMessage} />

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
