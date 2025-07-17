// components/ImdbBadge.jsx
import { formatVotes } from "../utils/format";
import imdbLogo from "../assets/imdb.png";

function ImdbBadge({ rating, votes }) {
  if (!rating) return null;

  return (
    <div className="inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-full text-sm font-bold shadow-md">
      <img src={imdbLogo} alt="IMDb" className="h-5 w-auto" />
      <span>{rating}</span>
      {votes && (
        <span className="text-xs text-gray-600 font-medium">
          ({formatVotes(votes)})
        </span>
      )}
    </div>
  );
}

export default ImdbBadge;
