// Chat message bubble component

export default function ChatMessage({ role, text, theme }) {
  const isAI = role === "ai";
  return (
    <div className={`w-full flex ${isAI ? "justify-start" : "justify-end"} py-1`}>
      <div
        className={`max-w-[78%] md:max-w-[70%] rounded-2xl px-4 py-3 leading-relaxed shadow`}
        style={{
          background: isAI ? theme.bubbleAI : theme.bubbleUser,
          color: "#2b2150",
          border: "1px solid rgba(255,255,255,.6)"
        }}
      >
        <div className="text-sm opacity-70 mb-1">{isAI ? "MyBuddy" : "You"}</div>
        <div className="whitespace-pre-wrap">{text}</div>
      </div>
    </div>
  );
}

