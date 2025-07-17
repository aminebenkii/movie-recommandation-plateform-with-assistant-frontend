import { useLanguage } from "../context/LanguageContext";
import { toast } from "sonner";
import api from "../utils/api";
import { useState, useEffect } from "react";

function ToSeenButton({ tmdb_id, onSuccess, initialStatus }) {
  const { language } = useLanguage();
  const [active, setActive] = useState(initialStatus === "seen");

  useEffect(() => {
    if (initialStatus === "seen") setActive(true);
  }, [initialStatus]);

  const handleClick = async () => {
    const newStatus = active ? "none" : "seen";

    try {
      await api.post("/user-movies", {
        tmdb_id,
        status: newStatus,
      });

      if (newStatus === "seen") {
        toast.success(language === "fr" ? "Ajouté à vus" : "Marked as seen");
      } else {
        toast.success(language === "fr" ? "Retiré des vus" : "Removed from seen");
      }

      setActive(!active);
      if (onSuccess) onSuccess(newStatus);
    } catch (err) {
      console.error("Failed to update seen status", err);
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
      {active ? "" : ""}
      {language === "fr" ? (active ? "Ajouté à vus" : "Voir") : (active ? "Added to Seen" : "Add to Seen")}
    </button>
  );
}

export default ToSeenButton;
