// Emotion detection and theme utilities

export const EMOTION_THEMES = {
  calm: { bg: "linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 100%)", bubbleAI: "#E0EAFF", bubbleUser: "#C7F7E7" },
  sad: { bg: "linear-gradient(135deg, #E8D9FF 0%, #F3E8FF 100%)", bubbleAI: "#EDE2FF", bubbleUser: "#E9F0FF" },
  happy: { bg: "linear-gradient(135deg, #FFF7B2 0%, #FFEAB6 100%)", bubbleAI: "#FFF3C2", bubbleUser: "#F8FFD1" },
  tired: { bg: "linear-gradient(135deg, #E7F7EF 0%, #E8FFE8 100%)", bubbleAI: "#EAFBF0", bubbleUser: "#DAF7E3" },
  default: { bg: "linear-gradient(135deg, #f8f4ff 0%, #e8f4fd 100%)", bubbleAI: "#F1F5FF", bubbleUser: "#E7FFF6" }
};

/**
 * Detect emotion from text
 * @param {string} text - Text to analyze
 * @returns {string} - Emotion key ('calm', 'sad', 'happy', 'tired', 'default')
 */
export function detectEmotion(text) {
  const t = (text || "").toLowerCase();
  if (/(calm|peace|soft|breathe|grounded)/.test(t)) return "calm";
  if (/(sad|down|blue|cry|lonely|hurt)/.test(t)) return "sad";
  if (/(happy|joy|excited|grateful|smile)/.test(t)) return "happy";
  if (/(tired|exhausted|sleepy|fatigue|low energy)/.test(t)) return "tired";
  return "default";
}

