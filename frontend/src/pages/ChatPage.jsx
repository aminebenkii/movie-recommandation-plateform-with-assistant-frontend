// src/pages/ChatPage.jsx
import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const ChatPage = () => {
  const { token } = useAuth();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch thriller movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await api.post(
          "/movies/search",
          {
            genre_name: "thriller",
            "sort_by": "vote_average.desc"
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovies(res.data.movies || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [token]);

  return (
    <div className="relative min-h-screen flex flex-col bg-muted">
      <SiteHeader />
      <main className="flex-grow">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default ChatPage;
