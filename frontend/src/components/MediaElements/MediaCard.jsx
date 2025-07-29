import { useLanguage } from "../../context/LanguageContext";
import ImdbBadge from "./ImdbBadge";
import YearBadge from "./YearBadge";
import MediaButtons from "./MediaButtons";

function MediaCard({ media, onPosterClick, onAction }) {
  const { language } = useLanguage();

  return (
    <div className="bg-black bg-opacity-80 rounded-lg overflow-hidden shadow-lg border border-white/10">
      {/* Poster with overlays */}
      <div className="relative cursor-pointer" onClick={onPosterClick}>
        {/* Top left: IMDb badge */}
        <div className="absolute top-3 left-3 z-10">
          <ImdbBadge rating={media.imdb_rating} votes={media.imdb_votes_count} />
        </div>

        {/* Top right: Year badge */}
        <div className="absolute top-3 right-3 z-10">
          <YearBadge year={media.release_year} />
        </div>

        {/* Poster image */}
        <img
          src={media.poster_url}
          alt={media.title}
          className="w-full h-full object-cover aspect-[2/3]"
        />
      </div>

      {/* Action Buttons */}
      <div className="px-3 pb-3 flex flex-wrap gap-2 justify-center mt-2">
        <MediaButtons
          tmdb_id={media.tmdb_id}
          onStatusChange={(status) => onAction?.(media.tmdb_id)}
        />
      </div>
    </div>
  );
}

export default MediaCard;
