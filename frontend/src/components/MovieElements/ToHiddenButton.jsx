import { useLanguage } from "../../context/LanguageContext";
import { toast } from "sonner";
import api from "../../utils/api";
import { useState, useEffect } from "react";

function ToHiddenButton({ tmdb_id, onSuccess, initialStatus }) {
  const { language } = useLanguage();
  const [active, setActive] = useState(initialStatus === "not_interested");

  useEffect(() => {
    if (initialStatus === "not_interested") setActive(true);
  }, [initialStatus]);

  const handleClick = async () => {
    const newStatus = active ? "none" : "not_interested";

    try {
      await api.post("/user-movies", {
        tmdb_id,
        status: newStatus,
      });

      if (newStatus === "not_interested") {
        toast.success(language === "fr" ? "Masqué avec succès" : "Hidden successfully");
      } else {
        toast.success(language === "fr" ? "Démasqué" : "Unhidden");
      }

      setActive(!active);
      if (onSuccess) onSuccess(newStatus);
    } catch (err) {
      console.error("Failed to update hidden status", err);
      toast.error(language === "fr" ? "Erreur" : "Error");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition text-sm font-semibold shadow-sm
        ${active
          ? "bg-red-600 text-white hover:bg-red-500"
          : "bg-white/10 text-red-400 hover:bg-red-600 hover:text-white"}`}
    >
      {language === "fr"
        ? active ? "Masqué" : "Pas intéressé"
        : active ? "Hidden" : "Not Interested"}
    </button>
  );
}

export default ToHiddenButton;
