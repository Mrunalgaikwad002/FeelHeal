export const SESSION_LIBRARY = {
  deep_breathe: {
    key: "deep_breathe",
    title: "Deep Breaths",
    subtitle: "Follow the gentle guide for calm breathing",
    gif: "/deep breathe.gif",
    gradient: "linear-gradient(135deg, #E0F2FE 0%, #B3E5FC 100%)",
    accent: "#0EA5E9",
    buttonText: "Start Breathing",
    duration: 5,
    instructions: [
      "Sit comfortably with your shoulders soft and relaxed.",
      "Inhale slowly through your nose for a count of four.",
      "Hold your breath gently for a count of two.",
      "Exhale through your mouth for a count of six, letting go of tension.",
      "Notice one calming word you can repeat with each breath."
    ],
    affirmation: "Every inhale invites softness, every exhale releases what you no longer need.",
    summary: {
      title: "Gentle Breathing Complete",
      message: "You created a soft pocket of calm with intentional breaths.",
      background: "linear-gradient(135deg, #E0F2FE 0%, #B3E5FC 100%)",
      gif: "/deep breathe.gif"
    }
  },
  energizing_flow: {
    key: "energizing_flow",
    title: "Mindful Movement",
    subtitle: "Gentle stretches for body and mind",
    gif: "/exercise.gif",
    gradient: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
    accent: "#3B82F6",
    buttonText: "Start Movement",
    duration: 5,
    instructions: [
      "Stand or sit tall and roll your shoulders back three times.",
      "Reach your arms overhead and stretch toward the sky.",
      "Exhale slowly as you fold forward, letting your head soften.",
      "Sway gently side to side, noticing how your spine releases.",
      "Rise slowly and take one deep energising breath."
    ],
    affirmation: "Your body thanks you for every mindful stretch.",
    summary: {
      title: "Movement Complete",
      message: "You invited fresh energy into your body with mindful motion.",
      background: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
      gif: "/exercise.gif"
    }
  },
  calm_reset: {
    key: "calm_reset",
    title: "Calm Reset",
    subtitle: "Ease tension with a soft unwinding pause",
    gif: "/calm.gif",
    gradient: "linear-gradient(135deg, #FFE5B4 0%, #FFD89B 100%)",
    accent: "#F97316",
    buttonText: "Start Calm Reset",
    duration: 5,
    instructions: [
      "Close your eyes and imagine warm sunlight on your face.",
      "Inhale for a count of four, exhale for a count of four.",
      "Scan from your forehead to your toes, relaxing each area.",
      "Whisper a gentle phrase like “I am safe, I am soft.”",
      "Stay here for a few breaths, letting warmth fill your body."
    ],
    affirmation: "Your nervous system loves this gentle reset.",
    summary: {
      title: "Calm Reset Complete",
      message: "You gave yourself permission to soften and slow down.",
      background: "linear-gradient(135deg, #FFE5B4 0%, #FFD89B 100%)",
      gif: "/calm.gif"
    }
  },
  focus_count: {
    key: "focus_count",
    title: "Counting Calm",
    subtitle: "Follow the glowing orb to steady your focus",
    gif: "/meditation count.gif",
    gradient: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)",
    accent: "#7C3AED",
    buttonText: "Start Focus Session",
    duration: 4,
    instructions: [
      "Sit upright and rest your hands gently in your lap.",
      "Watch the glowing orb and count its slow rise and fall.",
      "Inhale as the orb expands, exhale as it softens.",
      "If your mind wanders, return to the count without judgement.",
      "Finish with one gratitude thought for your steady focus."
    ],
    affirmation: "Your attention grows kinder each time you return to the count.",
    summary: {
      title: "Focused Calm Complete",
      message: "Your mind feels clearer and more grounded after this focus practice.",
      background: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)",
      gif: "/meditation count.gif"
    }
  }
};

export const SESSION_KEYS = Object.keys(SESSION_LIBRARY);
