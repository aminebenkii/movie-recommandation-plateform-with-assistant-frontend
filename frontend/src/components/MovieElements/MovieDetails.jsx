import { useLanguage } from "../../context/LanguageContext";
import { formatVotes } from "../../utils/format";
import ToSeenButton from "./ToSeenButton";
import ToWatchListButton from "./ToWatchListButton";
import ToHiddenButton from "./ToHiddenButton";
import ImdbBadge from "./ImdbBadge";
import YearBadge from "./YearBadge";
import GenreNameBadge from "./GenreNameBadge";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function MovieDetails({ movie, onClose }) {
  const { language } = useLanguage();
  const embedUrl = getYouTubeEmbedUrl(movie.trailer_url);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-[0.95] z-50 flex items-center justify-center overflow-y-auto px-6 py-10">
      <div className="bg-black text-white rounded-xl max-w-6xl w-full p-8 relative shadow-2xl flex flex-col md:flex-row gap-8 border border-white/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow-500 text-3xl font-light"
        >
          ×
        </button>

        {/* Poster */}
        <div className="flex-shrink-0 h-full">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="h-full max-h-[80vh] w-auto rounded-lg object-cover shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5">
          <div>
            <h2 className="text-3xl font-bold">{movie.title}</h2>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <ImdbBadge rating={movie.imdb_rating} votes={movie.imdb_votes_count} />
              <YearBadge year={movie.release_year} />
            </div>
          </div>

          {/* Genres */}
          {movie.genre_names && (
            <div className="flex flex-wrap gap-2">
              {movie.genre_names.map((genre) => (
                <GenreNameBadge key={genre} genre={genre} />
              ))}
            </div>
          )}

          {/* Overview */}
          <p className="text-sm text-white leading-relaxed">{movie.overview}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <ToSeenButton tmdb_id={movie.tmdb_id} />
            <ToWatchListButton tmdb_id={movie.tmdb_id} />
            <ToHiddenButton tmdb_id={movie.tmdb_id} />
          </div>

          {/* Trailer */}
          {embedUrl && (
            <div className="mt-6">
              <iframe
                src={embedUrl}
                title="YouTube Trailer"
                className="w-full aspect-video rounded-lg border border-white/10"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
