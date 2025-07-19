import { useLanguage } from "../../context/LanguageContext";
import ImdbBadge from "./ImdbBadge";
import YearBadge from "./YearBadge";
import MovieButtons from "./MovieButtons";


function MovieCard({ movie, onPosterClick, onAction }) {
  const { language } = useLanguage();

  return (
    <div className="bg-black bg-opacity-80 rounded-lg overflow-hidden shadow-lg border border-white/10">
      {/* Poster with overlays */}
      <div className="relative cursor-pointer" onClick={onPosterClick}>
        {/* Top left: IMDb badge */}
        <div className="absolute top-3 left-3 z-10">
          <ImdbBadge rating={movie.imdb_rating} votes={movie.imdb_votes_count} />
        </div>

        {/* Top right: Year badge */}
        <div className="absolute top-3 right-3 z-10">
          <YearBadge year={movie.release_year} />
        </div>

        {/* Poster image */}
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-full object-cover aspect-[2/3]"
        />
      </div>


      {/* Action Buttons */}
      <div className="px-3 pb-3 flex flex-wrap gap-2 justify-center mt-2">
        <MovieButtons
          tmdb_id={movie.tmdb_id}
          onStatusChange={(status) => onAction?.(status, movie.tmdb_id)} // ✅ Pass both
        />
      </div>
    </div>
  );
}

export default MovieCard;
