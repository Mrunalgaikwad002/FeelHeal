export const defaultSettings = {
  theme: "light",
  accent: "rosy",
  fontStyle: "calm",
  animations: true,
  sound: {
    ambient: true,
    click: true,
  },
  notifications: {
    moodReminder: {
      enabled: true,
      time: "20:00",
    },
    affirmation: true,
    goal: false,
  },
  motivationalTone: "gentle",
  companion: {
    personality: "friendly",
    mode: "text",
  },
  privacy: {
    saveLocally: true,
    permissions: {
      notifications: true,
      microphone: false,
      storage: true,
    },
  },
};

export const themeGradients = {
  light: "linear-gradient(135deg, #FDF2F8 0%, #E0F2FE 100%)",
  dark: "linear-gradient(135deg, #1F1C3F 0%, #47327A 100%)",
  calm: "linear-gradient(135deg, #C7E8FF 0%, #E0F2FE 100%)",
  rosy: "linear-gradient(135deg, #FFE4EC 0%, #F9D9FF 100%)",
  serene: "linear-gradient(135deg, #D4F6E6 0%, #E0FFE4 100%)",
};

export const themeOptions = [
  { id: "light", name: "Soft Pastel", emoji: "🌤️", description: "Light, airy, and hopeful." },
  { id: "dark", name: "Indigo Night", emoji: "🌙", description: "Deep purples for quiet nights." },
  { id: "calm", name: "Calm Blue", emoji: "🌊", description: "Ocean breeze calmness." },
  { id: "rosy", name: "Rosy Pink", emoji: "🌸", description: "Petal-soft glow." },
  { id: "serene", name: "Serene Green", emoji: "🍃", description: "Garden-fresh stillness." },
];

export const fontOptions = [
  { id: "playful", label: "Playful", sample: "Make it lively ✨" },
  { id: "calm", label: "Calm", sample: "Keep it soothing 🌿" },
  { id: "minimal", label: "Minimal", sample: "Stay focused 🎯" },
];

export const motivationalTones = [
  { id: "gentle", label: "Gentle", emoji: "🌙", description: "Soft, reassuring nudges." },
  { id: "cheerful", label: "Cheerful", emoji: "🌞", description: "Bright sparks of joy." },
  { id: "funny", label: "Funny", emoji: "😂", description: "Playful, witty pep talks." },
];

export const companionPersonalities = [
  { id: "friendly", label: "Friendly 💕", description: "Warm, supportive, always cheering for you." },
  { id: "witty", label: "Witty 😂", description: "Charming quips and playful banter." },
  { id: "therapist", label: "Therapist 🪷", description: "Grounded, reflective, deeply listening." },
  { id: "listener", label: "Listener 🌙", description: "Gentle space-holder for your thoughts." },
];

export const reminderQuotes = [
  "It's okay to rest today. 🌼",
  "Small steps still count. 🌱",
  "Your glow is growing. ✨",
  "You deserve peace. ☁️",
  "Breathe in calm, breathe out worry. 🌬️",
];

