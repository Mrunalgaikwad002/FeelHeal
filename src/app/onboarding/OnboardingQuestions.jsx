"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingQuestions() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);

  const questions = [
    {
      id: 1,
      emoji: "😊",
      question: "How have you been feeling lately?",
      type: "single",
      options: [
        { value: "happy", label: "😊 Happy" },
        { value: "sad", label: "😔 Sad" },
        { value: "stressed", label: "😤 Stressed" },
        { value: "calm", label: "😌 Calm" },
        { value: "numb", label: "😶 Numb" }
      ]
    },
    {
      id: 2,
      emoji: "🌸",
      question: "How often do you feel overwhelmed by your thoughts or emotions?",
      type: "single",
      options: [
        { value: "rarely", label: "Rarely" },
        { value: "sometimes", label: "Sometimes" },
        { value: "often", label: "Often" },
        { value: "almost_every_day", label: "Almost every day" }
      ]
    },
    {
      id: 3,
      emoji: "🌼",
      question: "How well do you sleep at night?",
      type: "single",
      options: [
        { value: "very_well", label: "😴 Very well" },
        { value: "okay", label: "😐 Okay" },
        { value: "poorly", label: "😫 Poorly" },
        { value: "hardly_sleep", label: "😩 I hardly sleep" }
      ]
    },
    {
      id: 4,
      emoji: "🌿",
      question: "What has been affecting your mental peace lately?",
      type: "single",
      options: [
        { value: "academic_work", label: "Academic or work pressure" },
        { value: "relationships", label: "Relationships or loneliness" },
        { value: "overthinking", label: "Overthinking or self-doubt" },
        { value: "family_stress", label: "Family stress" },
        { value: "other", label: "Other" }
      ],
      hasTextInput: true
    },
    {
      id: 5,
      emoji: "💭",
      question: "How do you usually cope when you feel low?",
      type: "single",
      options: [
        { value: "talk_to_someone", label: "I talk to someone" },
        { value: "keep_to_myself", label: "I keep it to myself" },
        { value: "distract_myself", label: "I distract myself" },
        { value: "write_create", label: "I write or create something" },
        { value: "not_sure", label: "I'm not sure" }
      ]
    },
    {
      id: 6,
      emoji: "🌈",
      question: "How often do you find it hard to focus or stay motivated?",
      type: "single",
      options: [
        { value: "never", label: "Never" },
        { value: "sometimes", label: "Sometimes" },
        { value: "often", label: "Often" },
        { value: "almost_always", label: "Almost always" }
      ]
    },
    {
      id: 7,
      emoji: "🌼",
      question: "How connected do you feel to people around you?",
      type: "single",
      options: [
        { value: "very_connected", label: "Very connected 💞" },
        { value: "somewhat_connected", label: "Somewhat connected 🤝" },
        { value: "isolated", label: "Isolated 😔" }
      ]
    },
    {
      id: 8,
      emoji: "🌸",
      question: "How would you describe your self-esteem lately?",
      type: "single",
      options: [
        { value: "high", label: "High 💪" },
        { value: "moderate", label: "Moderate 🙂" },
        { value: "low", label: "Low 😞" },
        { value: "not_sure", label: "I'm not sure" }
      ]
    },
    {
      id: 9,
      emoji: "🌷",
      question: "Which of these would you like FeelHeal to support you with?",
      type: "multiple",
      options: [
        { value: "stress_anxiety", label: "Managing stress or anxiety" },
        { value: "mood_positivity", label: "Improving mood and positivity" },
        { value: "self_confidence", label: "Building self-confidence" },
        { value: "sleep_relaxation", label: "Sleep and relaxation" },
        { value: "overthinking", label: "Reducing overthinking" },
        { value: "personal_goals", label: "Setting personal goals" }
      ]
    },
    {
      id: 10,
      emoji: "💖",
      question: "What's one thing you want to improve about your mental health?",
      type: "text",
      placeholder: "e.g., 'I want to stop overthinking' or 'I want to feel calmer and happier'"
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleMultipleSelect = (questionId, value) => {
    setSelectedGoals(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Save responses and show thank you page
      const finalResponses = {
        ...responses,
        goals: selectedGoals
      };
      localStorage.setItem("feelheal_onboarding_responses", JSON.stringify(finalResponses));
      localStorage.setItem("feelheal_seen_onboarding", "true");
      setShowThankYou(true);
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = currentQ.type === "multiple" 
    ? selectedGoals.length > 0 
    : currentQ.type === "text" 
    ? responses[currentQ.id]?.trim() 
    : responses[currentQ.id];

  // Thank you page
  if (showThankYou) {
    return (
      <div 
        className="h-screen flex items-center justify-center px-6 py-4 overflow-hidden"
        style={{
          backgroundImage: "url('/pink bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center">
          <div className="mb-8">
            <img 
              src="/redirecting heart.png" 
              alt="Thank you heart" 
              className="mx-auto animate-pulse"
              style={{maxWidth: '200px', height: 'auto'}}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{color: "var(--feelheal-purple)"}}>
            Thank you for sharing a bit about yourself 💖
          </h1>
          <p className="text-lg md:text-xl mb-6" style={{color: "var(--feelheal-purple)"}}>
            We're setting up your personalized wellness journey...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{borderColor: "var(--feelheal-purple)"}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-screen flex items-center justify-center px-6 py-4 overflow-hidden"
      style={{
        backgroundImage: "url('/pink bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-4xl w-full h-full flex flex-col">
        {/* Progress Bar */}
        <div className="mb-4 flex-shrink-0">
          <div className="flex justify-between text-sm mb-2" style={{color: "var(--feelheal-purple)"}}>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                background: "var(--feelheal-purple)"
              }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div 
          className="rounded-3xl p-6 md:p-8 mb-4 flex-1 flex flex-col"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
          }}
        >
          {/* Header */}
          <div className="text-center mb-4 flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{color: "var(--feelheal-purple)"}}>
              Let's take a moment to understand you better 💖
            </h1>
          </div>

          {/* Question */}
          <div className="text-center mb-4 flex-1 flex flex-col">
            <div className="text-3xl mb-2">{currentQ.emoji}</div>
            <h2 className="text-lg md:text-xl font-semibold mb-4" style={{color: "var(--feelheal-purple)"}}>
              {currentQ.question}
            </h2>

            {/* Options */}
            {currentQ.type === "single" && (
              <div className="space-y-3 flex-1 flex flex-col justify-center">
                {currentQ.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQ.id, option.value)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 text-base ${
                      responses[currentQ.id] === option.value
                        ? "text-white shadow-lg"
                        : "bg-white/20 hover:bg-white/30 text-gray-700 backdrop-blur-sm"
                    }`}
                    style={{
                      background: responses[currentQ.id] === option.value 
                        ? "var(--feelheal-purple)" 
                        : undefined
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {currentQ.type === "multiple" && (
              <div className="space-y-3 flex-1 flex flex-col justify-center">
                {currentQ.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleMultipleSelect(currentQ.id, option.value)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 text-base ${
                      selectedGoals.includes(option.value)
                        ? "text-white shadow-lg"
                        : "bg-white/20 hover:bg-white/30 text-gray-700 backdrop-blur-sm"
                    }`}
                    style={{
                      background: selectedGoals.includes(option.value) 
                        ? "var(--feelheal-purple)" 
                        : undefined
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {currentQ.type === "text" && (
              <div className="flex-1 flex flex-col justify-center">
                <textarea
                  value={responses[currentQ.id] || ""}
                  onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                  placeholder={currentQ.placeholder}
                  className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur-sm focus:outline-none focus:border-purple-300 resize-none"
                  rows={3}
                  style={{color: "var(--feelheal-purple)"}}
                />
              </div>
            )}

            {/* Other text input for question 4 */}
            {currentQ.id === 4 && responses[currentQ.id] === "other" && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Please specify..."
                  value={responses[`${currentQ.id}_other`] || ""}
                  onChange={(e) => handleAnswer(`${currentQ.id}_other`, e.target.value)}
                  className="w-full p-3 rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur-sm focus:outline-none focus:border-purple-300"
                  style={{color: "var(--feelheal-purple)"}}
                />
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between flex-shrink-0">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentQuestion === 0 
                ? "bg-white/20 text-gray-400 cursor-not-allowed backdrop-blur-sm" 
                : "bg-white/30 hover:bg-white/40 text-gray-700 backdrop-blur-sm"
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
              isAnswered 
                ? "text-white shadow-lg hover:shadow-xl" 
                : "bg-white/20 text-gray-400 cursor-not-allowed backdrop-blur-sm"
            }`}
            style={{
              background: isAnswered ? "var(--feelheal-purple)" : undefined
            }}
          >
            {currentQuestion === questions.length - 1 ? "Complete →" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
