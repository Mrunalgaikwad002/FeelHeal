"use client";

import { useState, useEffect } from "react";

export default function DailyCheckIn({ goals, onComplete, onClose }) {
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const activeGoals = goals.filter(g => !g.completed);

  useEffect(() => {
    // Check which goals haven't been checked in today
    const today = new Date().toISOString().split('T')[0];
    const uncheckedGoals = activeGoals.filter(goal => {
      const completions = goal.dailyCompletions || [];
      return !completions.some(c => c.date === today);
    });
    
    if (uncheckedGoals.length === 0) {
      onClose();
      return;
    }
  }, [goals, activeGoals, onClose]);

  const generateQuestion = (goalTitle) => {
    // Convert goal title to a question
    const title = goalTitle.toLowerCase().trim();
    
    // Common patterns with time extraction
    if (title.includes('wake up') || title.includes('wake')) {
      const timeMatch = title.match(/\d+\s*(am|pm)/i);
      if (timeMatch) {
        return `Did you wake up at ${timeMatch[0]} today?`;
      }
      const timeMatch2 = title.match(/\d+:\d+\s*(am|pm)/i);
      if (timeMatch2) {
        return `Did you wake up at ${timeMatch2[0]} today?`;
      }
      return "Did you wake up on time today?";
    }
    
    // Extract time patterns for any goal
    const timePattern = title.match(/(\d+)\s*(am|pm)/i) || title.match(/(\d+:\d+)\s*(am|pm)/i);
    if (timePattern) {
      const time = timePattern[1] + (timePattern[2] || timePattern[3] || '');
      // Remove time from title for question
      const action = title.replace(/\d+.*?(am|pm)/i, '').trim();
      if (action) {
        return `Did you ${action} at ${time} today?`;
      }
    }
    
    if (title.includes('read') || title.includes('book')) {
      return "Did you read today?";
    }
    
    if (title.includes('exercise') || title.includes('workout') || title.includes('gym')) {
      return "Did you exercise today?";
    }
    
    if (title.includes('meditate') || title.includes('meditation')) {
      return "Did you meditate today?";
    }
    
    if (title.includes('water') || title.includes('drink')) {
      return "Did you drink enough water today?";
    }
    
    if (title.includes('study') || title.includes('learn')) {
      return "Did you study/learn today?";
    }
    
    if (title.includes('journal') || title.includes('write')) {
      return "Did you journal today?";
    }
    
    if (title.includes('walk') || title.includes('steps')) {
      return "Did you take a walk today?";
    }
    
    // Default: convert to question format
    // Remove common prefixes and make it a question
    let question = goalTitle.trim();
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.startsWith('to ')) {
      question = question.substring(3);
    } else if (lowerQuestion.startsWith('learn ')) {
      question = question.substring(6);
    } else if (lowerQuestion.startsWith('practice ')) {
      question = question.substring(9);
    } else if (lowerQuestion.startsWith('do ')) {
      question = question.substring(3);
    }
    
    return `Did you ${question.toLowerCase()} today?`;
  };

  const today = new Date().toISOString().split('T')[0];
  const uncheckedGoals = activeGoals.filter(goal => {
    const completions = goal.dailyCompletions || [];
    return !completions.some(c => c.date === today);
  });

  if (uncheckedGoals.length === 0) {
    return null;
  }

  const currentGoal = uncheckedGoals[currentGoalIndex];
  const question = generateQuestion(currentGoal.title);

  const handleAnswer = (completed) => {
    const newAnswers = {
      ...answers,
      [currentGoal.id]: completed
    };
    setAnswers(newAnswers);

    // Move to next goal or finish
    if (currentGoalIndex < uncheckedGoals.length - 1) {
      setCurrentGoalIndex(currentGoalIndex + 1);
    } else {
      // All goals answered, save and close
      onComplete(newAnswers);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div 
        className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🌠</div>
          <h3 className="text-2xl font-bold mb-2" style={{color: "var(--feelheal-purple)"}}>
            Daily Check-In
          </h3>
          <p className="text-base text-gray-600">
            {currentGoalIndex + 1} of {uncheckedGoals.length}
          </p>
        </div>

        <div className="mb-6">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-4">
            <p className="text-lg font-medium mb-2" style={{color: "var(--feelheal-purple)"}}>
              {currentGoal.title}
            </p>
            {currentGoal.description && (
              <p className="text-sm text-gray-600">{currentGoal.description}</p>
            )}
          </div>

          <p className="text-xl font-semibold text-center mb-6" style={{color: "var(--feelheal-purple)"}}>
            {question}
          </p>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 px-6 py-3 rounded-xl text-base font-medium text-white transition-all hover:scale-105"
            style={{background: "var(--feelheal-purple)"}}
          >
            ✅ Yes
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 px-6 py-3 rounded-xl text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
          >
            ❌ No
          </button>
        </div>

        <button
          onClick={handleSkip}
          className="w-full px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

