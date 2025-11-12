// Custom hook for companion chat logic

import { useEffect, useState } from "react";
import { sendToAI } from "@/lib/api/ai-companion";

const TYPING_DELAY_MS = 900;
const STORAGE_KEY = "feelheal_chat_history";

export function useCompanionChat(userName) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  // Load chat history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        // Warm, first-line greeting
        setMessages([
          { role: "ai", text: "Hey there 🌼 I'm MyBuddy. How's your heart today? I'm here to listen." }
        ]);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
      setMessages([
        { role: "ai", text: "Hey there 🌼 I'm MyBuddy. How's your heart today? I'm here to listen." }
      ]);
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Save current conversation history BEFORE adding new message
    const currentHistory = [...messages];
    
    // Add user message immediately
    setMessages(prev => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    // Simulate typing delay
    await new Promise(r => setTimeout(r, TYPING_DELAY_MS));
    
    // Get AI response - pass history WITHOUT the current message
    const aiReply = await sendToAI(trimmed, currentHistory, userName || "friend");
    
    setTyping(false);
    setMessages(prev => [...prev, { role: "ai", text: aiReply }]);
  };

  return {
    messages,
    input,
    setInput,
    typing,
    handleSend
  };
}

