import { useLanguage } from "../../context/LanguageContext";
import { toast } from "sonner";
import api from "../../utils/api";
import { useState, useEffect } from "react";

function ToWatchListButton({ tmdb_id, onSuccess, initialStatus }) {
  const { language } = useLanguage();
  const [active, setActive] = useState(initialStatus === "later");

  useEffect(() => {
    if (initialStatus === "later") setActive(true);
  }, [initialStatus]);

  const handleClick = async () => {
    const newStatus = active ? "none" : "later";

    try {
      await api.post("/user-movies", {
        tmdb_id,
        status: newStatus,
      });

      if (newStatus === "later") {
        toast.success(language === "fr" ? "Ajouté à la watchlist" : "Added to watchlist");
      } else {
        toast.success(language === "fr" ? "Retiré de la watchlist" : "Removed from watchlist");
      }

      setActive(!active);
      if (onSuccess) onSuccess(newStatus);
    } catch (err) {
      console.error("Failed to update watchlist status", err);
      toast.error(language === "fr" ? "Erreur" : "Error");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition text-sm font-semibold shadow-sm
        ${active
          ? "bg-yellow-500 text-black hover:bg-yellow-400"
          : "bg-white/10 text-white hover:bg-yellow-500 hover:text-black"}`}
    >
      {language === "fr"
        ? active ? "Ajouté à la watchlist" : "À voir"
        : active ? "Added to Watchlist" : "Add to Watchlist"}
    </button>
  );
}

export default ToWatchListButton;
