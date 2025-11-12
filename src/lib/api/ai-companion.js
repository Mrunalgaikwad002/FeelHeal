// AI Companion API - Supports multiple providers
// Configure which provider to use in .env.local

/**
 * Send message to AI companion using configured provider
 * @param {string} userText - User's message
 * @param {Array} conversationHistory - Previous messages
 * @param {string} userName - User's name
 * @returns {Promise<string>} - AI response
 */
export async function sendToAI(userText, conversationHistory = [], userName = "friend") {
  const provider = process.env.NEXT_PUBLIC_AI_PROVIDER || 'simple'; // 'openai', 'claude', 'huggingface', 'gemini', 'simple'
  
  switch (provider) {
    case 'openai':
      return sendToOpenAI(userText, conversationHistory, userName);
    case 'claude':
      return sendToClaude(userText, conversationHistory, userName);
    case 'huggingface':
      return sendToHuggingFace(userText, conversationHistory, userName);
    case 'gemini':
      return sendToGemini(userText, conversationHistory, userName);
    case 'simple':
    default:
      return sendSimpleResponse(userText, conversationHistory, userName);
  }
}

/**
 * OpenAI (ChatGPT) API
 */
async function sendToOpenAI(userText, conversationHistory, userName) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    return "I'm ready to chat, but the OpenAI API key isn't set. Please add NEXT_PUBLIC_OPENAI_API_KEY in .env.local. 💜";
  }

  const systemPrompt = `You are FeelHeal's empathetic companion. 
- Tone: gentle, warm, human, hopeful. 
- Keep replies concise (2–5 sentences). 
- Where helpful, suggest a micro action (deep breath, short stretch, 10s pause).
- IMPORTANT: Pay attention to the user's emotional state. If they express sadness, anxiety, or negative feelings, respond with empathy and support, NOT with positive affirmations.
- If user name is provided, greet them softly by name once.
Name (if present): ${userName}.`;

  try {
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-8).map(msg => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.text
      })),
      { role: 'user', content: userText }
    ];

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // or 'gpt-4' for better quality
        messages: messages,
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error?.message || `API error: ${res.status}`);
    }

    const data = await res.json();
    return data.choices[0]?.message?.content || "I'm here with you. Let's take one soft breath together 🌿";
  } catch (error) {
    console.error('OpenAI API error:', error);
    return `I'm having trouble connecting right now. ${error.message} 💜`;
  }
}

/**
 * Anthropic Claude API
 */
async function sendToClaude(userText, conversationHistory, userName) {
  const apiKey = process.env.NEXT_PUBLIC_CLAUDE_API_KEY;
  if (!apiKey) {
    return "I'm ready to chat, but the Claude API key isn't set. Please add NEXT_PUBLIC_CLAUDE_API_KEY in .env.local. 💜";
  }

  const systemPrompt = `You are FeelHeal's empathetic companion. 
- Tone: gentle, warm, human, hopeful. 
- Keep replies concise (2–5 sentences). 
- Where helpful, suggest a micro action (deep breath, short stretch, 10s pause).
- IMPORTANT: Pay attention to the user's emotional state. If they express sadness, anxiety, or negative feelings, respond with empathy and support, NOT with positive affirmations.
Name (if present): ${userName}.`;

  try {
    const messages = [
      ...conversationHistory.slice(-8).map(msg => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.text
      })),
      { role: 'user', content: userText }
    ];

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', // Fast and affordable
        max_tokens: 200,
        system: systemPrompt,
        messages: messages
      })
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error?.message || `API error: ${res.status}`);
    }

    const data = await res.json();
    return data.content[0]?.text || "I'm here with you. Let's take one soft breath together 🌿";
  } catch (error) {
    console.error('Claude API error:', error);
    return `I'm having trouble connecting right now. ${error.message} 💜`;
  }
}

/**
 * Hugging Face Inference API (Free tier available)
 */
async function sendToHuggingFace(userText, conversationHistory, userName) {
  const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || ''; // Optional for some models
  
  const systemPrompt = `You are FeelHeal's empathetic companion. 
- Tone: gentle, warm, human, hopeful. 
- Keep replies concise (2–5 sentences). 
Name: ${userName}.`;

  try {
    const prompt = `${systemPrompt}\n\nConversation:\n${conversationHistory.slice(-4).map(m => `${m.role === 'ai' ? 'Assistant' : 'User'}: ${m.text}`).join('\n')}\nUser: ${userText}\nAssistant:`;

    const headers = {
      'Content-Type': 'application/json'
    };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    // Using a free model - you can change this
    const res = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ inputs: prompt })
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    return data[0]?.generated_text?.split('Assistant:').pop()?.trim() || 
           "I'm here with you. Let's take one soft breath together 🌿";
  } catch (error) {
    console.error('Hugging Face API error:', error);
    return `I'm having trouble connecting right now. ${error.message} 💜`;
  }
}

/**
 * Gemini API
 */
async function sendToGemini(userText, conversationHistory, userName) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return "I'm ready to chat, but the Gemini API key isn't set. Please add NEXT_PUBLIC_GEMINI_API_KEY in .env.local. 💜";
  }

  const systemPrompt = `You are FeelHeal's empathetic companion. 
- Tone: gentle, warm, human, hopeful. 
- Keep replies concise (2–5 sentences). 
- Where helpful, suggest a micro action (deep breath, short stretch, 10s pause).
- IMPORTANT: Pay attention to the user's emotional state. If they express sadness, anxiety, or negative feelings, respond with empathy and support, NOT with positive affirmations.
Name (if present): ${userName}.`;

  try {
    const messages = [
      ...conversationHistory.slice(-8).map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      })),
      {
        role: 'user',
        parts: [{ text: `${systemPrompt}\n\nUser: ${userText}` }]
      }
    ];

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200
        }
      })
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.error?.message || `API error: ${res.status}`);
    }

    const data = await res.json();
    return data.candidates[0]?.content?.parts[0]?.text || 
           "I'm here with you. Let's take one soft breath together 🌿";
  } catch (error) {
    console.error('Gemini API error:', error);
    return `I'm having trouble connecting to Gemini. ${error.message} 💜`;
  }
}

/**
 * Simple rule-based responses (No API needed - Privacy focused)
 */
function sendSimpleResponse(userText, conversationHistory, userName) {
  const text = userText.toLowerCase();
  
  // Check for negative contexts FIRST (before positive keywords)
  const hasNegativeContext = /(not|no|don't|doesn't|isn't|aren't|can't|cannot|never|nothing|nobody|nowhere)\s+(good|well|great|fine|okay|happy|better|alright)/.test(text) ||
                            /(not|no)\s+feeling\s+(good|well|great|fine|okay|happy|better)/.test(text) ||
                            /feeling\s+(bad|sick|terrible|awful|horrible|down|low|sad|unwell)/.test(text);
  
  // Empathetic responses based on keywords - check negative emotions FIRST
  if (hasNegativeContext || /(sad|down|depressed|unhappy|cry|tears|upset|hurt|lonely|empty|hopeless)/.test(text)) {
    return `I hear you, ${userName}. It's okay to feel this way. Would you like to take a moment to breathe with me? Sometimes a few deep breaths can help. 🌸`;
  }
  
  if (/(anxious|worried|stress|nervous|panic|overwhelmed|scared|fear)/.test(text)) {
    return `I understand that feeling, ${userName}. Let's try something together: take three slow breaths. In through your nose, out through your mouth. I'm here with you. 💜`;
  }
  
  // Only match positive keywords if there's NO negative context
  if (!hasNegativeContext && /(happy|joy|excited|great|wonderful|amazing|fantastic|delighted|thrilled)/.test(text)) {
    // Also check that "good" is not preceded by "not"
    if (/(not|no)\s+good/.test(text)) {
      return `I hear you, ${userName}. It's okay to feel this way. Would you like to take a moment to breathe with me? Sometimes a few deep breaths can help. 🌸`;
    }
    return `That's beautiful to hear, ${userName}! I'm so glad you're feeling this way. What's bringing you joy today? 🌟`;
  }
  
  // Check for "good" separately, making sure it's not negative
  if (!hasNegativeContext && /\bgood\b/.test(text) && !/(not|no)\s+good/.test(text)) {
    return `That's beautiful to hear, ${userName}! I'm so glad you're feeling this way. What's bringing you joy today? 🌟`;
  }
  
  if (/(tired|exhausted|sleepy|fatigue|drained|worn out)/.test(text)) {
    return `I see you're feeling tired, ${userName}. Rest is important. Maybe try a short meditation or just sit quietly for a few minutes? Your body might be asking for a pause. 🌙`;
  }
  
  if (/(thank|thanks|grateful|appreciate)/.test(text)) {
    return `You're so welcome, ${userName}. I'm here whenever you need me. Remember, you're doing great. 💖`;
  }
  
  // Default empathetic response
  const responses = [
    `I'm listening, ${userName}. Tell me more about what's on your mind. 💜`,
    `Thank you for sharing that with me, ${userName}. How does that make you feel? 🌸`,
    `I'm here with you, ${userName}. You're not alone in this. 🌿`,
    `That sounds important, ${userName}. Would you like to explore that feeling a bit more? 💫`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

