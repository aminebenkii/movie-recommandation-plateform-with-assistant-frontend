import { useLanguage } from "../../context/LanguageContext";
import { cn } from "@/lib/utils"; // or define it manually if needed

function SearchButton({ onClick, fullWidth = false, className = "" }) {
  const { language } = useLanguage();
  const label = language === "fr" ? "Rechercher" : "Search";

  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-yellow-500 text-black font-semibold text-sm",
        "px-5 py-2 rounded-lg transition-all duration-200 ease-out",
        "hover:bg-yellow-400 hover:shadow-md active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2",
        fullWidth ? "w-full" : "w-fit",
        className
      )}
    >
      {label}
    </button>
  );
}

export default SearchButton;
