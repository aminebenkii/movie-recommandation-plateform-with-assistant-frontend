// src/components/MovieCard.jsx
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import GenreBadge from "./GenreBadge";
import SeenButton from "./SeenButton";
import TrailerButton from "./TrailerButton";
import { formatVotes } from "../utils/format";
import { cn } from "@/lib/utils";

const MovieCard = ({ movie }) => {
  return (
    <Card className="group w-full max-w-xs flex flex-col justify-between shadow-md overflow-hidden relative">
      {/* Poster */}
      <CardHeader className="relative p-0">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-auto object-contain"
        />

        {/* Rating + Votes (top-left) */}
        <div className="absolute top-2 left-2 bg-white/90 rounded px-2 py-1 text-sm font-medium shadow-sm flex items-center gap-1">
          ⭐ {movie.imdb_rating}
          <span className="text-xs text-muted-foreground">
            ({formatVotes(movie.imdb_votes)})
          </span>
        </div>

        {/* Release Year (top-right) */}
        <div className="absolute top-2 right-2 bg-muted text-muted-foreground rounded px-2 py-1 text-xs font-semibold">
          {movie.release_year}
        </div>

        {/* Hover Overview Overlay */}
        <div className="absolute inset-0 bg-black/80 text-white p-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="line-clamp-6">{movie.overview}</p>
        </div>
      </CardHeader>

      {/* Genres */}
      <CardContent className="px-4 pt-3 pb-1">
        <div className="flex flex-wrap gap-1 mb-2">
          {movie.genre_names.map((genre) => (
            <GenreBadge key={genre} genre={genre} />
          ))}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 flex justify-between items-center">
        <SeenButton movieId={movie.id} />
        <TrailerButton url={movie.trailer_url} />
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
