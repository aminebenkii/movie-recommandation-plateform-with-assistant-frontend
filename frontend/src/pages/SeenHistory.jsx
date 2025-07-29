import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import api from "../utils/api";
import { toast } from "sonner";

import SiteHeader from "../components/SiteElements/SiteHeader";
import GenreFilterBar from "../components/FiltersBar/GenreFilterBar";
import MovieGrid from "../components/MediaElements/MediaGrid";
import SiteFooter from "../components/SiteElements/SiteFooter";
import bgImage from "../assets/bg.png";

function SeenHistory() {
  const { language } = useLanguage();
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSeenMovies();
  }, [language]);

  useEffect(() => {
    if (!selectedGenre) {
      setFilteredMovies(allMovies);
    } else {
      setFilteredMovies(
        allMovies.filter((movie) => {
          const firstTwoGenres = movie.genre_names?.slice(0, 2).map(g => g.toLowerCase()) || [];
          return firstTwoGenres.includes(selectedGenre);
        })
      );
    }
  }, [selectedGenre, allMovies]);

  const fetchSeenMovies = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/me/movies/seen");
      setAllMovies(res.data);  // If genre_names already included
    } catch (err) {
      console.error("Error loading seen movies", err);
      toast.error(language === "fr" ? "Échec du chargement" : "Could not load seen movies");
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
          <GenreFilterBar
            selectedGenre={selectedGenre}
            onChange={setSelectedGenre}
          />

          {loading ? (
            <div className="text-center text-gray-400 mt-10">
              {language === "fr" ? "Chargement..." : "Loading..."}
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              {language === "fr" ? "Aucun film vu pour le moment" : "No seen movies yet"}
            </div>
          ) : (
            <MovieGrid
              movies={filteredMovies}
              onAction={(status, tmdb_id) => handleMovieStatus(tmdb_id, status)}
            />
          )}
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

export default SeenHistory;
