import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "sonner";
import SiteHeader from "../components/SiteHeader";
import FiltersBar from "../components/FiltersBar";
import MovieGrid from "../components/MovieGrid";
import SiteFooter from "../components/SiteFooter";
import bgImage from "../assets/bg.png";

function MoviesBrowse() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assistantFilters, setAssistantFilters] = useState(null);

  useEffect(() => {
    fetchDefaultMovies();
  }, []);

  const fetchDefaultMovies = async () => {
    setLoading(true);
    try {
      const res = await api.post("/movies/search", {
        sort_by: "popularity.desc",
      });
      setMovies(res.data);
    } catch (err) {
      console.error("Failed to load movies", err);
      toast.error("Could not load movies");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filtersToUse) => {
    setLoading(true);
    try {
      const res = await api.post("/movies/search", filtersToUse);
      setMovies(res.data);
      setFilters(filtersToUse);
    } catch (err) {
      console.error("Search failed", err);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleMovieStatus = async (tmdb_id, status) => {
    try {
      await api.post("/user-movies", { tmdb_id, status });
      toast.success("Updated movie status");
    } catch (err) {
      console.error("Failed to update status", err);
      toast.error("Action failed");
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
              toast("Chat assistant not implemented yet");
            }}
          />

          {loading ? (
            <div className="text-center text-gray-400 mt-10">Loading...</div>
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
