import { useState } from "react";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";

const MovieGrid = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!movies || movies.length === 0) {
    return (
      <div className="w-full text-center text-muted-foreground py-10">
        No movies to display.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-10 px-2 sm:px-4 py-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.tmdb_id}
            movie={movie}
            onPosterClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MovieGrid;
