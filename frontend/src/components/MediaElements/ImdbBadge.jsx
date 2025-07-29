// components/ImdbBadge.jsx
import { formatVotes } from "../../utils/format";
import imdbLogo from "../../assets/imdb.png";

function ImdbBadge({ rating, votes }) {
  if (!rating) return null;

  return (
    <div className="inline-flex items-center gap-1 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black px-1.5 py-0 rounded-full text-xs font-semibold shadow-md border border-yellow-600/20">
      <img src={imdbLogo} alt="IMDb" className="h-7 w-auto rounded-[2px] drop-shadow-sm" />
      <span className="leading-none font-bold text-[0.8rem]">{Number(rating).toFixed(1)}</span>
      {votes && (
        <span className="text-[0.8rem] text-black/60 font-medium leading-none">
          ({formatVotes(votes)})
        </span>
      )}
    </div>
  );
}

export default ImdbBadge;
