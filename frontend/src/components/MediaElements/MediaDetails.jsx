import { useLanguage } from "../../context/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { formatVotes } from "../../utils/format";

import ImdbBadge from "./ImdbBadge";
import YearBadge from "./YearBadge";
import GenreBadge from "./GenreBadge";
import StreamingReader from "./StreamingReader";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function MediaDetails({ media, onClose }) {
  const { language } = useLanguage();
  const embedUrl = getYouTubeEmbedUrl(media.trailer_url);
  const panelRef = useRef();

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scroll on body
    return () => {
      document.body.style.overflow = ''; // Re-enable on unmount
    };
  }, []);

  // Close when clicking outside
  const handleBackdropClick = (e) => {
    if (panelRef.current && !panelRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
  <div
    className="fixed inset-0 bg-black bg-opacity-[0.98] z-50 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10"
    onClick={handleBackdropClick}
  >
    <div
      ref={panelRef}
      className="bg-black text-white rounded-xl w-full max-w-6xl max-h-[95vh] p-4 sm:p-6 md:p-8 relative shadow-2xl flex flex-col md:flex-row gap-6 md:gap-10 border border-white/10 overflow-hidden"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-yellow-500 text-3xl font-light z-10"
      >
        ×
      </button>

      {/* Poster */}
      <div className="flex-shrink-0">
        <img
          src={media.poster_url}
          alt={media.title}
          className="h-64 sm:h-80 md:h-[81vh] w-auto rounded-lg object-cover shadow-lg mx-auto"
        />
      </div>

      {/* Right Side: Scrollable Content */}
      <div className="relative flex-1 overflow-y-auto max-h-[80vh] pr-2 sm:pr-4 md:pr-6 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
        {/* Title and Meta */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
            {media.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <ImdbBadge rating={media.imdb_rating} votes={media.imdb_votes_count} />
            <YearBadge year={media.release_year} />
          </div>
        </div>

        {/* Genres */}
        {media.genre_names && (
          <div className="flex flex-wrap gap-2 mt-4">
            {media.genre_names.map((genre) => (
              <GenreBadge key={genre} name={genre} />
            ))}
          </div>
        )}

        {/* Overview */}
        <p className="text-sm sm:text-base text-white leading-relaxed mt-4">
          {media.overview}
        </p>

        {/* Trailer */}
        {embedUrl && (
          <div className="mt-6">
            <h3 className="text-white mb-2 text-sm">Trailer (YouTube):</h3>
            <iframe
              src={embedUrl}
              title="YouTube Trailer"
              className="w-full aspect-video rounded-lg border border-white/10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Streaming */}
        <div className="mt-6">
          <StreamingReader tmdbId={media.tmdb_id} imdbId={media.imdb_id} />
        </div>
      </div>
    </div>
  </div>
);

}

export default MediaDetails;
