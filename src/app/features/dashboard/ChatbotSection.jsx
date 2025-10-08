"use client";

export default function ChatbotSection({ isFirstTime }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">💬</span>
        <h3 className="text-xl font-semibold" style={{color: "var(--feelheal-purple)"}}>
          AI Companion
        </h3>
      </div>

      {isFirstTime ? (
        <div className="text-center">
          <div className="mb-4">
            <div className="text-4xl mb-2">🤖</div>
            <p className="text-gray-600 mb-4">Chat with your AI companion for support and guidance</p>
            <p className="text-sm text-gray-500">
              Get personalized tips, emotional support, and helpful resources.
            </p>
          </div>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
            Start Chatting
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
                AI
              </div>
              <div className="text-sm font-medium text-gray-700">Your AI Companion</div>
            </div>
            <p className="text-sm text-gray-600">
              "How can I support you today? I'm here to listen and help."
            </p>
          </div>
          <button className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
            Open Chat
          </button>
        </div>
      )}
    </div>
  );
}
