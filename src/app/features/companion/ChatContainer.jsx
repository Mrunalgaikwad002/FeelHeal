// Chat messages container

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatContainer({ messages, theme, typing }) {
  const viewRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollTop = viewRef.current.scrollHeight;
    }
  }, [messages, typing]);

  return (
    <div ref={viewRef} className="h-[58vh] md:h-[62vh] overflow-y-auto px-4 md:px-6 py-5 space-y-2">
      {messages.map((m, i) => (
        <ChatMessage key={i} role={m.role} text={m.text} theme={theme} />
      ))}
      {typing && (
        <div className="w-full flex justify-start py-1">
          <div className="rounded-2xl px-4 py-3 bg-white/90 border border-white/70 shadow text-gray-600 text-sm">
            MyBuddy is typing...
          </div>
        </div>
      )}
    </div>
  );
}

