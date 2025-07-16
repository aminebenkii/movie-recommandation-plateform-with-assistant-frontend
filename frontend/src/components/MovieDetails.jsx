import { useLanguage } from "../context/LanguageContext";
import { formatVotes } from "../utils/format";

function MovieDetails({ movie, onClose, onAction }) {
  const { language } = useLanguage();

  const t = (key) => {
    const map = {
      close: { en: "Close", fr: "Fermer" },
      seen: { en: "Seen", fr: "Vu" },
      later: { en: "Watch Later", fr: "À voir" },
      skip: { en: "Not Interested", fr: "Rejeté" },
    };
    return map[key][language] || key;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center overflow-y-auto px-4 py-6">
      <div className="bg-gray-900 rounded-lg max-w-5xl w-full p-6 text-white relative shadow-lg flex flex-col md:flex-row gap-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl"
        >
          ×
        </button>

        {/* Poster */}
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full max-w-xs rounded-md object-cover"
        />

        {/* Right Side Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <div className="text-sm text-yellow-400 flex gap-4 mt-1">
              <span>⭐ {movie.imdb_rating}</span>
              <span>{formatVotes(movie.vote_count)}</span>
              <span>{movie.release_year}</span>
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {movie.genres?.join(", ")}
            </div>
          </div>

          {/* Overview */}
          <p className="text-sm text-white leading-relaxed">
            {movie.overview}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-4 text-sm font-semibold">
            <button
              onClick={() => onAction("seen")}
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
            >
              👁 {t("seen")}
            </button>
            <button
              onClick={() => onAction("later")}
              className="border border-yellow-500 text-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black"
            >
              ⏱ {t("later")}
            </button>
            <button
              onClick={() => onAction("not_interested")}
              className="border border-red-500 text-red-400 px-4 py-2 rounded hover:bg-red-500 hover:text-white"
            >
              ❌ {t("skip")}
            </button>
          </div>

          {/* Trailer (YouTube embed if available) */}
          {movie.trailer_url && (
            <div className="mt-6">
              <iframe
                width="100%"
                height="300"
                src={movie.trailer_url}
                title="Trailer"
                allowFullScreen
                className="rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
