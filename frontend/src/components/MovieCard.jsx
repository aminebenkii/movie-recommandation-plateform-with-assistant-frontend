import { useLanguage } from "../context/LanguageContext";
import { formatVotes } from "../utils/format";

function MovieCard({ movie, onPosterClick, onAction }) {
  const { language } = useLanguage();

  const t = (key) => {
    const map = {
      seen: { en: "Seen", fr: "Vu" },
      later: { en: "Watch Later", fr: "À voir" },
      skip: { en: "Not Interested", fr: "Rejeté" },
    };
    return map[key][language] || key;
  };

  return (
    <div className="bg-gray-800 rounded-md overflow-hidden shadow hover:shadow-lg transition">
      {/* Poster (clickable) */}
      <div onClick={onPosterClick} className="cursor-pointer">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Content */}
      <div className="px-3 py-2 text-sm text-white space-y-1">
        {/* Top: Rating + Votes + Year */}
        <div className="flex justify-between items-center text-xs text-yellow-400">
          <span>⭐ {movie.imdb_rating}</span>
          <span>{formatVotes(movie.vote_count)}</span>
          <span>{movie.release_year}</span>
        </div>

        {/* Title */}
        <div className="font-semibold truncate">{movie.title}</div>

        {/* Genres */}
        <div className="text-xs text-gray-400 truncate">
          {movie.genres?.join(", ")}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-2 text-xs font-semibold text-white">
          <button
            className="hover:text-yellow-400"
            onClick={() => onAction("seen")}
          >
            👁 {t("seen")}
          </button>
          <button
            className="hover:text-yellow-400"
            onClick={() => onAction("later")}
          >
            ⏱ {t("later")}
          </button>
          <button
            className="hover:text-yellow-400"
            onClick={() => onAction("not_interested")}
          >
            ❌ {t("skip")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
