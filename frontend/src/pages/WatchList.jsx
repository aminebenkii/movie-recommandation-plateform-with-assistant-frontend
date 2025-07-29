import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import api from "../utils/api";
import { toast } from "sonner";

import SiteHeader from "../components/SiteElements/SiteHeader";
import GenreFilterBar from "../components/FiltersBar/GenreFilterBar";
import MovieGrid from "../components/MediaElements/MediaGrid";
import SiteFooter from "../components/SiteElements/SiteFooter";

import bgImage from "../assets/bg.png";

function WatchList() {
  const { language } = useLanguage();
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWatchlistMovies();
  }, [language]);

  useEffect(() => {
    if (selectedGenres.length === 0) {
      setFilteredMovies(allMovies);
    } else {
      setFilteredMovies(
        allMovies.filter((movie) =>
          movie.genre_ids.some((genre) => selectedGenres.includes(genre))
        )
      );
    }
  }, [selectedGenres, allMovies]);

  const fetchWatchlistMovies = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/me/movies/towatchlater");
      setAllMovies(res.data);
    } catch (err) {
      console.error("Error loading watchlist", err);
      toast.error(language === "fr" ? "Échec du chargement" : "Could not load watchlist");
    } finally {
      setLoading(false);
    }
  };

  const handleMovieStatus = async (tmdb_id, status) => {
    try {
      await api.post("/user-movies", { tmdb_id, status });
      toast.success(language === "fr" ? "Statut mis à jour" : "Updated movie status");
      fetchWatchlistMovies(); // refresh list
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
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <SiteHeader />

        <main className="flex-1 px-4 py-2">
          <GenreFilterBar
            selectedGenres={selectedGenres}
            onChange={setSelectedGenres}
          />

          {loading ? (
            <div className="text-center text-gray-400 mt-10">
              {language === "fr" ? "Chargement..." : "Loading..."}
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              {language === "fr" ? "Aucun film à voir pour le moment" : "No movies in your watchlist"}
            </div>
          ) : (
            <MovieGrid
              movies={filteredMovies}
              onAction={(status, movie) => handleMovieStatus(movie.id, status)}
            />
          )}
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

export default WatchList;
