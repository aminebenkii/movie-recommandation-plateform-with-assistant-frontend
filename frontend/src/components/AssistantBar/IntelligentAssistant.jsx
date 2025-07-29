import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "../../context/LanguageContext";
import api from "../../utils/api";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";

function IntelligentAssistant({ onMedia, onFilters }) {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const currentMediaType = path.includes("/tv") || path.includes("/tvshows") ? "tv" : "movie";

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState("");

  const sessionIdRef = useRef(crypto.randomUUID());

  const mediaTypeToPath = {
    movie: "/movies",
    tv: "/tv",
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await api.post("/chat", {
        session_id: sessionIdRef.current,
        query,
        media_type: currentMediaType,
      });

      const message = typeof res.data.message === "string" ? res.data.message : "";
      setAssistantMessage(message);

      const results = res.data.results || [];
      const resultType = res.data.media_type;

      if (results.length && resultType && resultType !== currentMediaType) {
        const redirectPath = mediaTypeToPath[resultType] || "/";

        navigate(redirectPath, {
          state: {
            assistantResults: results,
            assistantFilters: res.data.filters || null,
            fromAssistant: true,
          },
        });

        return;
      }

      onMedia(results);
      if (res.data.filters) onFilters(res.data.filters);
    } catch (err) {
      console.error("Assistant failed", err);
      toast.error(
        language === "fr"
          ? "Le chatbot n'a pas compris votre demande."
          : "The assistant couldn't understand your request."
      );
    } finally {
      setLoading(false);
    }
  };

  const placeholderText =
    language === "fr"
      ? "Par ex : des films comme Inception"
      : "e.g. movies like Inception";

  const defaultMessage =
    language === "fr"
      ? "Salut ! Que veux-tu regarder aujourd'hui ?"
      : "Hey! What do you feel like watching today?";

  return (
    <div className="w-full px-4 flex justify-center mt-8 mb-4">
      <div className="w-full max-w-sm bg-zinc-900/80 backdrop-blur-lg border border-zinc-700/40 rounded-2xl shadow-xl p-5 space-y-5">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-md border border-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-black">
              <path d="M12 2C6.5 2 2 6.1 2 11c0 2.5 1.1 4.8 3 6.5V22l4.5-2c.8.2 1.6.3 2.5.3 5.5 0 10-4.1 10-9S17.5 2 12 2z"/>
              <circle cx="9" cy="11" r="1.2" fill="white" />
              <circle cx="15" cy="11" r="1.2" fill="white" />
            </svg>
          </div>
        </div>

        {/* Assistant Message */}
        <div className="text-sm text-white bg-zinc-800/60 border border-white/10 p-3 rounded-xl text-center min-h-[40px] shadow-sm">
          <TypingText text={assistantMessage || defaultMessage} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            placeholder={placeholderText}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            className="w-full h-11 px-4 text-15px rounded-md bg-zinc-800/50 text-white placeholder-gray-400 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-10 w-10 flex items-center justify-center rounded-md bg-yellow-400 text-black hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <PaperPlaneIcon className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function TypingText({ text }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      return;
    }

    indexRef.current = 0;
    setDisplayed("");

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));

      if (indexRef.current >= text.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 25);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text]);

  return <span>{displayed}</span>;
}

export default IntelligentAssistant;
