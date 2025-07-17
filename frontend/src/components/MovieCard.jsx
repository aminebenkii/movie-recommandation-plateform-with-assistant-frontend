import { useLanguage } from "../context/LanguageContext";
import ImdbBadge from "./ImdbBadge";
import YearBadge from "./YearBadge";
import GenreNameBadge from "./GenreNameBadge";
import ToSeenButton from "./ToSeenButton";
import ToWatchListButton from "./ToWatchListButton";
import ToHiddenButton from "./ToHiddenButton";

function MovieCard({ movie, onPosterClick, onAction }) {
  const { language } = useLanguage();

  return (
    <div className="bg-black bg-opacity-80 rounded-lg overflow-hidden shadow-lg border border-white/10">
      {/* Poster with overlays */}
      <div className="relative cursor-pointer" onClick={onPosterClick}>
        {/* Top left: IMDb badge */}
        <div className="absolute top-2 left-2 z-10">
          <ImdbBadge rating={movie.imdb_rating} votes={movie.imdb_votes_count} />
        </div>

        {/* Top right: Year badge */}
        <div className="absolute top-2 right-2 z-10">
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
        <ToSeenButton tmdb_id={movie.tmdb_id} />
        <ToWatchListButton tmdb_id={movie.tmdb_id} />
        <ToHiddenButton tmdb_id={movie.tmdb_id} />
      </div>
    </div>
  );
}

export default MovieCard;
