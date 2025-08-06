import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import api from "../utils/api";
import { toast } from "sonner";

import SiteHeader from "../components/SiteElements/SiteHeader";
import SiteFooter from "../components/SiteElements/SiteFooter";
import FiltersBar from "../components/FiltersBar/FiltersBar";
import MediaGrid from "../components/MediaElements/MediaGrid";
import IntelligentAssistant from "../components/AssistantBar/IntelligentAssistant";

import bgImage from "../assets/bg.png";

function MoviesBrowse() {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState(null);
  const [assistantFilters, setAssistantFilters] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const cameFromAssistant = location.state?.fromAssistant;
  const assistantResults = location.state?.assistantResults;
  const assistantPassedFilters = location.state?.assistantFilters;

  useEffect(() => {
    if (cameFromAssistant && assistantResults) {
      setMediaItems(assistantResults);
      setAssistantFilters(assistantPassedFilters || null);
      window.history.replaceState({}, document.title); // avoid reload reuse
    } else {
      handleSearch();
    }
  }, [language]);

  const handleSearch = async (
    filtersToUse = { sort_by: "popularity.desc" },
    titleQuery = ""
  ) => {
    setLoading(true);
    try {
      let res;

      if (titleQuery.trim()) {
        res = await api.post("/movies/search-by-keywords", {
          keywords: titleQuery.trim(),
        });
      } else {
        res = await api.post("/movies/search-by-filters", filtersToUse);
        setFilters(filtersToUse);
      }

      setMediaItems(res.data);
    } catch (err) {
      console.error("Search failed", err);
      const msg = titleQuery.trim()
        ? language === "fr" ? "Film non trouvé" : "Movie not found"
        : filtersToUse?.sort_by === "popularity.desc"
        ? language === "fr" ? "Échec du chargement" : "Could not load movies"
        : language === "fr" ? "Échec de la recherche" : "Search failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <SiteHeader />

        <main className="flex-1 px-4 py-2">
          <FiltersBar
            DisplayedFilters={assistantFilters}
            onSearch={handleSearch}
          />

          <IntelligentAssistant
            onMedia={setMediaItems}
            onFilters={setAssistantFilters}
          />

          {loading ? (
            <div className="text-center text-gray-400 mt-10">
              {language === "fr" ? "Chargement..." : "Loading..."}
            </div>
          ) : (
            <MediaGrid mediaItems={mediaItems} />
          )}
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

export default MoviesBrowse;
