import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLanguage } from "../../context/LanguageContext";
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";
import AssistantTyping from "./AssistantTyping";
import { postChatQuery } from "./chatApi";

function ChatWindow({ visible, onClose, onFiltersUpdate, onMoviesUpdate }) {
  const { language } = useLanguage();
  const sessionIdRef = useRef(uuidv4()); // Only generated once per mount
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const t = (key) => {
    const map = {
      title: { en: "Ask Assistant", fr: "Demander à l'assistant" },
      placeholder: { en: "Ask me anything...", fr: "Posez-moi une question..." },
      close: { en: "Close", fr: "Fermer" },
    };
    return map[key]?.[language] || key;
  };

  const handleSend = async (query) => {
    const userMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await postChatQuery(sessionIdRef.current, query);

      const assistantMsg = { role: "assistant", content: res.message };
      setMessages((prev) => [...prev, assistantMsg]);

      if (res.filters) onFiltersUpdate(res.filters);
      if (res.movies) onMoviesUpdate(res.movies);

    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Error occurred." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-lg flex flex-col h-[80vh]">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-300 bg-yellow-400 text-black flex justify-between items-center">
          <h2 className="font-bold text-lg">{t("title")}</h2>
          <button onClick={onClose} className="font-bold hover:underline">{t("close")}</button>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900 text-white">
          <ChatHistory messages={messages} />
          {loading && <AssistantTyping />}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-700 bg-gray-800">
          <ChatInput onSend={handleSend} placeholder={t("placeholder")} disabled={loading} />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;

