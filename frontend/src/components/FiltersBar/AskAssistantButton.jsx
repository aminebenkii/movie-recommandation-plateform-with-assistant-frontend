import { useLanguage } from "../../context/LanguageContext";
import { cn } from "@/lib/utils"; // OR use fallback below if needed

function AskAssistantButton({ onClick, fullWidth = false, className = "" }) {
  const { language } = useLanguage();
  const label = language === "fr"
    ? "Demander à l’assistant"
    : "Ask Assistant";

  return (
    <button
      onClick={onClick}
      className={cn(
        "border border-yellow-500 text-yellow-400 font-semibold text-sm",
        "px-5 py-2 rounded-lg transition-all duration-200 ease-out",
        "hover:bg-yellow-500 hover:text-black hover:shadow-md active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2",
        fullWidth ? "w-full" : "w-fit",
        className
      )}
    >
      {label}
    </button>
  );
}

export default AskAssistantButton;
