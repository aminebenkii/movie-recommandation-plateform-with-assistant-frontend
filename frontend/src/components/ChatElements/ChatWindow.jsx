// src/components/ChatWindow.jsx
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";
import { X } from "lucide-react";

const ChatWindow = ({ messages, onSend, onClose, isLoading }) => {
  return (
    <div className="absolute top-[4.5rem] left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-30 bg-white border shadow-lg rounded-b-lg overflow-hidden transition-all duration-300 ease-out animate-fade-slide-down">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-100">
        <span className="font-semibold text-sm">🎬 Movie Assistant</span>
        <button onClick={onClose}>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="h-[300px] overflow-y-auto">
        <ChatBox messages={messages} isLoading={isLoading} />
      </div>

      {/* Input */}
      <div className="border-t p-2">
        <ChatInput onSend={onSend} />
      </div>
    </div>
  );
};

export default ChatWindow;
