import { useLanguage } from "../../context/LanguageContext";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import api from "../../utils/api";

const STATUS = {
  SEEN: "seen",
  TO_WATCH: "towatchlater",
  HIDDEN: "hidden",
  NONE: "none",
};

const LABELS = {
  en: {
    add_seen: "Add to Seen",
    add_later: "Add to Watchlist",
    hide: "Hide",
    remove_seen: "Remove from Seen",
    remove_later: "Remove from Watchlist",
    remove_hidden: "Unhide",
    mark_seen: "Add to Seen",
  },
  fr: {
    add_seen: "Ajouter à vus",
    add_later: "Regarder plus tard",
    hide: "Masquer",
    remove_seen: "Retirer des vus",
    remove_later: "Retirer de la watchlist",
    remove_hidden: "Démasquer",
    mark_seen: "Ajouter à vus",
  },
};

const CONTEXT_BUTTONS = {
  browse: [
    { key: "add_seen", status: STATUS.SEEN },
    { key: "add_later", status: STATUS.TO_WATCH },
    { key: "hide", status: STATUS.HIDDEN },
  ],
  seen: [
    { key: "remove_seen", status: STATUS.NONE },
    { key: "hide", status: STATUS.HIDDEN },
  ],
  watchlist: [
    { key: "remove_later", status: STATUS.NONE },
    { key: "mark_seen", status: STATUS.SEEN },
  ],
  hidden: [
    { key: "remove_hidden", status: STATUS.NONE },
  ],
};

function MediaButtons({ tmdb_id, onStatusChange }) {
  const { language } = useLanguage();
  const location = useLocation();
  const path = location.pathname;

  // Detect context for button rendering
  const context = path.includes("/seen")
    ? "seen"
    : path.includes("/watchlist")
    ? "watchlist"
    : path.includes("/not-interested")
    ? "hidden"
    : "browse";

  // Detect media type from path
  const media_type = path.includes("/tv") || path.includes("/tvshows")
    ? "tv"
    : "movie";

  const t = (key) => LABELS[language][key] || key;

  const handleClick = async (newStatus) => {
    try {
      const basePath = media_type === "tv" ? "tvshows" : "movies";
      await api.post(`users/me/${basePath}/update_status`, { tmdb_id, status: newStatus });

      toast.success(language === "fr" ? "Mis à jour" : "Updated");
      if (onStatusChange) onStatusChange(tmdb_id);
    } catch (err) {
      console.error("Error updating media status", err);
      toast.error(language === "fr" ? "Erreur" : "Error");
    }
  };

  const buttons = CONTEXT_BUTTONS[context] || [];

  return (
    <div className="w-full mt-4 rounded-lg shadow-inner bg-[#121212] border border-neutral-800">
      <div className="flex divide-x divide-neutral-700">
        {buttons.map(({ key, status }) => (
          <button
            key={key}
            onClick={() => handleClick(status)}
            className="flex-1 py-3 text-xs text-white font-semibold text-center transition hover:bg-yellow-500 hover:text-black"
          >
            {t(key)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MediaButtons;
