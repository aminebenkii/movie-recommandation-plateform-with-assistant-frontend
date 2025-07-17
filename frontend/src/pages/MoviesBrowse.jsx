import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import api from "../utils/api";
import { toast } from "sonner";

import SiteHeader from "../components/SiteHeader";
import FiltersBar from "../components/FiltersBar";
import MovieGrid from "../components/MovieGrid";
import SiteFooter from "../components/SiteFooter";

import bgImage from "../assets/bg.png";

function MoviesBrowse() {
  const { language } = useLanguage();
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assistantFilters, setAssistantFilters] = useState(null);

  useEffect(() => {
    fetchDefaultMovies();
  }, [language]); // reload if language changes

  const fetchDefaultMovies = async () => {
    setLoading(true);
    try {
    const res = await api.post("/movies/search", {
      sort_by: "popularity.desc",
    });
      console.log("📥 Got movies:", res.data);
      setMovies(res.data);
    } catch (err) {
      console.error("Failed to load movies", err);
      toast.error(language === "fr" ? "Échec du chargement" : "Could not load movies");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filtersToUse) => {
    setLoading(true);
    try {
      const res = await api.post(
        "/movies/search",
        filtersToUse
      );
      setMovies(res.data);
      setFilters(filtersToUse);
    } catch (err) {
      console.error("Search failed", err);
      toast.error(language === "fr" ? "Échec de la recherche" : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleMovieStatus = async (tmdb_id, status) => {
    try {
      await api.post("/user-movies", { tmdb_id, status });
      toast.success(language === "fr" ? "Statut mis à jour" : "Updated movie status");
    } catch (err) {
      console.error("Failed to update status", err);
      toast.error(language === "fr" ? "Erreur" : "Action failed");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0" />

      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <SiteHeader />

        <main className="flex-1 px-4 py-6">
          <FiltersBar
            initialFilters={assistantFilters}
            onSearch={handleSearch}
            onAskAssistant={() => {
              toast(language === "fr" ? "Assistant non encore implémenté" : "Chat assistant not implemented yet");
            }}
          />

          {loading ? (
            <div className="text-center text-gray-400 mt-10">
              {language === "fr" ? "Chargement..." : "Loading..."}
            </div>
          ) : (
            <MovieGrid
              movies={movies}
              onAction={(status, movie) => handleMovieStatus(movie.id, status)}
            />
          )}
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

export default MoviesBrowse;
