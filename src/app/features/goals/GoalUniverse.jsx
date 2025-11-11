"use client";

import { useState, useEffect } from "react";
import UniverseHeader from "./UniverseHeader";
import StarField from "./StarField";
import AddGoalModal from "./AddGoalModal";
import ConstellationView from "./ConstellationView";
import UniverseStats from "./UniverseStats";
import FeedbackToast from "./FeedbackToast";
import DailyCheckIn from "./DailyCheckIn";
import MotivationalMessage from "./MotivationalMessage";
import ShootingStar from "./ShootingStar";
import ProgressCelebration from "./ProgressCelebration";

export default function GoalUniverse() {
  const [goals, setGoals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [viewMode, setViewMode] = useState("universe"); // "universe" or "constellation"
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [motivationalTrigger, setMotivationalTrigger] = useState(0);
  const [shootingStarTrigger, setShootingStarTrigger] = useState(0);
  const [celebratingGoal, setCelebratingGoal] = useState(null);

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

    // Load goals from localStorage
    try {
      const savedGoals = localStorage.getItem("feelheal_goals");
      if (savedGoals) {
        const loadedGoals = JSON.parse(savedGoals).map(goal => ({
          ...goal,
          dailyCompletions: goal.dailyCompletions || [] // Ensure dailyCompletions exists
        }));
        setGoals(loadedGoals);
        
        // Check if there are goals that need daily check-in
        const today = new Date().toISOString().split('T')[0];
        const activeGoals = loadedGoals.filter(g => !g.completed);
        const hasUncheckedGoals = activeGoals.some(goal => {
          const completions = goal.dailyCompletions || [];
          return !completions.some(c => c.date === today);
        });
        
        if (hasUncheckedGoals && activeGoals.length > 0) {
          setShowCheckIn(true);
        }
      }
    } catch (error) {
      console.error("Error loading goals:", error);
    }
  }, []);

  const handleAddGoal = (goalData) => {
    const newGoal = {
      id: Date.now(),
      title: goalData.title,
      description: goalData.description || "",
      progress: 0,
      completed: false,
      createdAt: new Date().toISOString(),
      position: {
        x: Math.random() * 80 + 10, // 10% to 90% of container width
        y: Math.random() * 60 + 20  // 20% to 80% of container height
      },
      brightness: 0.3, // Start dim, increases with progress
      dailyCompletions: [] // Track daily completions
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("feelheal_goals", JSON.stringify(updatedGoals));
    
    setShowMessage("A new star appeared in your universe 🌠");
    setTimeout(() => setShowMessage(""), 3000);
    setShowAddModal(false);

    // Play gentle sound and trigger animations
    playStarSound();
    setTimeout(() => {
      setShootingStarTrigger(prev => prev + 1);
    }, 500);
  };

  const handleUpdateProgress = (goalId, newProgress) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const wasCompleted = goal.completed;
        const isNowCompleted = newProgress >= 100;
        
        const updated = {
          ...goal,
          progress: Math.min(100, Math.max(0, newProgress)),
          brightness: Math.min(1, 0.3 + (newProgress / 100) * 0.7),
          completed: isNowCompleted
        };

        // Show message when goal is completed
        if (!wasCompleted && isNowCompleted) {
          setTimeout(() => {
            setShowMessage("Another dream joined your constellation 🌠");
            setTimeout(() => setShowMessage(""), 3000);
            // Trigger celebrations
            setMotivationalTrigger(prev => prev + 1);
            setShootingStarTrigger(prev => prev + 1);
            setCelebratingGoal({ ...updated, progress: 100 });
            setTimeout(() => setCelebratingGoal(null), 3000);
          }, 500);
        } else if (newProgress > 0 && (newProgress === 25 || newProgress === 50 || newProgress === 75)) {
          // Show celebration at milestones (25%, 50%, 75%)
          setCelebratingGoal({ ...updated, progress: newProgress });
          setTimeout(() => setCelebratingGoal(null), 3000);
          setMotivationalTrigger(prev => prev + 1);
        }

        return updated;
      }
      return goal;
    });

    setGoals(updatedGoals);
    localStorage.setItem("feelheal_goals", JSON.stringify(updatedGoals));
  };

  const handleDailyCheckIn = (answers) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedGoals = goals.map(goal => {
      if (answers.hasOwnProperty(goal.id)) {
        const completed = answers[goal.id];
        const dailyCompletions = goal.dailyCompletions || [];
        
        // Remove today's entry if exists and add new one
        const filtered = dailyCompletions.filter(c => c.date !== today);
        const newCompletions = [...filtered, { date: today, completed }];
        
        // Calculate progress based on last 30 days
        const last30Days = newCompletions.slice(-30);
        const completedCount = last30Days.filter(c => c.completed).length;
        const newProgress = Math.min(100, (completedCount / 30) * 100);
        
        const updated = {
          ...goal,
          dailyCompletions: newCompletions,
          progress: newProgress,
          brightness: Math.min(1, 0.3 + (newProgress / 100) * 0.7),
          completed: newProgress >= 100
        };

        return updated;
      }
      return goal;
    });

    setGoals(updatedGoals);
    localStorage.setItem("feelheal_goals", JSON.stringify(updatedGoals));
    setShowCheckIn(false);
    setShowMessage("Your progress has been recorded! ✨");
    setTimeout(() => setShowMessage(""), 3000);
    
    // Trigger motivational message and shooting star
    setMotivationalTrigger(prev => prev + 1);
    setShootingStarTrigger(prev => prev + 1);
  };

  const handleDeleteGoal = (goalId) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
    localStorage.setItem("feelheal_goals", JSON.stringify(updatedGoals));
    setSelectedGoal(null);
  };

  const playStarSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log("Sound not available");
    }
  };

  const completedGoals = goals.filter(g => g.completed);
  const activeGoals = goals.filter(g => !g.completed);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: "var(--feelheal-purple)"}}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative w-full" style={{
      background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b4e 100%)"
    }}>
      {/* Floating stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                aria-label="Toggle sidebar"
                onClick={() => setIsSidebarOpen(v => !v)}
                className="p-2.5 rounded-lg hover:bg-white/20 text-xl"
                style={{color: "#ffffff"}}
              >
                {isSidebarOpen ? "☰" : "☷"}
              </button>
              <span className="text-3xl">🌌</span>
              <h1 className="text-2xl font-bold" style={{color: "#ffffff"}}>
                FeelHeal
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-base font-medium text-white/90">Hi, {user.name} 👋</span>
            </div>
          </div>
        </div>
      </header>

      {/* Body with Sidebar */}
      <div className="flex w-full">
        {/* Sidebar */}
        <aside
          className={`${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-white/10 backdrop-blur-sm border-r border-white/20 min-h-[calc(100vh-64px)] sticky top-16 hidden md:block flex-shrink-0`}
        >
          <nav className="p-4 space-y-1.5 text-base">
            {[
              { icon: "🏠", label: "Dashboard", href: "/dashboard" },
              { icon: "🌦️", label: "Mood Garden", href: "/features/mood" },
              { icon: "✍️", label: "Journal", href: "/features/journal" },
              { icon: "🌌", label: "Goal Universe", href: "/features/goals" },
              { icon: "🧘‍♀️", label: "Meditation", href: "/features/meditation" },
              { icon: "💬", label: "MyBuddy", href: "/features/companion" },
              { icon: "🕹️", label: "Games", href: "/games" },
              { icon: "😂", label: "Humor", href: "/features/humor" },
              { icon: "⚙️", label: "Settings" },
              { icon: "🔓", label: "Logout" }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/20 cursor-pointer ${
                  item.href === "/features/goals" ? "bg-white/20" : ""
                }`}
                style={{color: "#ffffff", fontSize: "16px"}}
                onClick={() => { if (item.href) window.location.href = item.href; }}
              >
                <span className="text-xl w-6 text-center">{item.icon}</span>
                {isSidebarOpen && <span className="truncate font-medium">{item.label}</span>}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-6 py-8 relative z-10">
          <div className="w-full">
            <UniverseHeader 
              viewMode={viewMode} 
              setViewMode={setViewMode}
              completedCount={completedGoals.length}
              totalCount={goals.length}
            />
            
            {viewMode === "universe" ? (
              <StarField
                goals={goals}
                onUpdateProgress={handleUpdateProgress}
                onSelectGoal={setSelectedGoal}
                selectedGoal={selectedGoal}
                onDeleteGoal={handleDeleteGoal}
              />
            ) : (
              <ConstellationView goals={completedGoals} />
            )}

            <UniverseStats goals={goals} />
          </div>
        </main>
      </div>

      {/* Add Goal Floating Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-3xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center"
        style={{boxShadow: "0 10px 30px rgba(123, 44, 191, 0.4)"}}
      >
        +
      </button>

      {/* Add Goal Modal */}
      {showAddModal && (
        <AddGoalModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddGoal}
        />
      )}

      {/* Daily Check-In Modal */}
      {showCheckIn && (
        <DailyCheckIn
          goals={goals}
          onComplete={handleDailyCheckIn}
          onClose={() => setShowCheckIn(false)}
        />
      )}

      {/* Motivational Message */}
      <MotivationalMessage 
        goals={goals} 
        trigger={motivationalTrigger}
      />

      {/* Shooting Star Animation */}
      <ShootingStar trigger={shootingStarTrigger} />

      {/* Progress Celebration */}
      {celebratingGoal && (
        <ProgressCelebration 
          goal={celebratingGoal} 
          progress={celebratingGoal.progress} 
        />
      )}

      {/* Feedback Toast */}
      <FeedbackToast message={showMessage} />
    </div>
  );
}

