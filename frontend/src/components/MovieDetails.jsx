// src/components/MovieDetails.jsx
import { X } from "lucide-react";
import SeenButton from "./SeenButton";
import TrailerButton from "./TrailerButton";
import GenreBadge from "./GenreBadge";
import { formatVotes } from "../utils/format";

const MovieDetails = ({ movie, onClose }) => {
  if (!movie) return null;

  // Convert YouTube URL to embeddable form if needed
  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    return url;
  };

  const embedUrl = getEmbedUrl(movie.trailer_url);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full overflow-hidden flex flex-col md:flex-row">
        {/* Left: Poster */}
        <div className="w-full md:w-1/2 max-h-[90vh] overflow-hidden">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 p-6 relative overflow-y-auto max-h-[90vh]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold mb-1">{movie.title}</h2>
          <p className="text-sm text-muted-foreground mb-4 italic">
            {movie.release_year} • ⭐ {movie.imdb_rating} (
            {formatVotes(movie.imdb_votes_count)} votes)
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre_names.map((genre) => (
              <GenreBadge key={genre} genre={genre} />
            ))}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground mb-6 whitespace-pre-wrap">
            {movie.overview}
          </p>

          <div className="flex gap-4 mb-6">
            <SeenButton movieId={movie.id} />
            <TrailerButton url={movie.trailer_url} />
          </div>

          {/* Centered, full-width embedded trailer */}
          {embedUrl && (
            <div className="w-full aspect-video rounded overflow-hidden border border-gray-300 shadow-lg">
              <iframe
                src={embedUrl}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
