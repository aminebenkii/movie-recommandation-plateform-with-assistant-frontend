// src/components/MovieElements/MovieButtons.jsx

import { useLanguage } from "../../context/LanguageContext";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import api from "../../utils/api";

function MovieButtons({ tmdb_id, onStatusChange }) {
  const { language } = useLanguage();
  const location = useLocation();

  const path = location.pathname;
  const context = (() => {
    if (path.startsWith("/seen")) return "seen";
    if (path.startsWith("/watchlist")) return "watchlist";
    if (path.startsWith("/not-interested")) return "hidden";
    return "browse";
  })();

  const labels = {
    en: {
      add_seen: "Add to Seen",
      add_later: "Add to Watchlist",
      hide: "Hide",
      remove_seen: "Remove from Seen",
      remove_later: "Remove from Watchlist",
      remove_hidden: "Remove from Hidden",
      mark_seen: "Add to Seen",
    },
    fr: {
      add_seen: "Ajouter à vus",
      add_later: "Ajouter à la watchlist",
      hide: "Masquer",
      remove_seen: "Retirer des vus",
      remove_later: "Retirer de la watchlist",
      remove_hidden: "Démasquer",
      mark_seen: "Ajouter à vus",
    }
  };

  const t = (key) => labels[language][key];

  const handleClick = async (newStatus) => {
    try {
      await api.post("/user-movies", {
        tmdb_id,
        status: newStatus,
      });

      toast.success(language === "fr" ? "Mis à jour" : "Updated");
      if (onStatusChange) onStatusChange(newStatus, tmdb_id);
    } catch (err) {
      console.error("Error updating movie status", err);
      toast.error(language === "fr" ? "Erreur" : "Error");
    }
  };

  const buttons = (() => {
    switch (context) {
      case "browse":
        return [
          { key: "add_seen", status: "seen" },
          { key: "add_later", status: "later" },
          { key: "hide", status: "not_interested" },
        ];
      case "seen":
        return [
          { key: "remove_seen", status: "none" },
          { key: "hide", status: "not_interested" },
        ];
      case "watchlist":
        return [
          { key: "remove_later", status: "none" },
          { key: "mark_seen", status: "seen" },
        ];
      case "hidden":
        return [
          { key: "remove_hidden", status: "none" },
        ];
      default:
        return [];
    }
  })();

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-2">
      {buttons.map(({ key, status }) => (
        <button
          key={key}
          onClick={() => handleClick(status)}
          className="px-3 py-1.5 text-sm rounded-full font-semibold transition shadow-sm bg-white/10 text-white hover:bg-yellow-500 hover:text-black"
        >
          {t(key)}
        </button>
      ))}
    </div>
  );
}

export default MovieButtons;
