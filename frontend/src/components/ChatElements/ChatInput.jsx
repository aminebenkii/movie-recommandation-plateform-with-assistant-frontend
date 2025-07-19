import { useState } from "react";
import { SendHorizonal } from "lucide-react"; // Optional: install lucide icons if not already

function ChatInput({ onSend, placeholder = "Ask something...", disabled = false }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled) return;

    onSend(trimmed);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        className={`px-3 py-2 rounded-md bg-yellow-400 text-black font-semibold ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-300"
        }`}
        disabled={disabled}
      >
        <SendHorizonal className="w-4 h-4" />
      </button>
    </form>
  );
}

export default ChatInput;
