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
      className="fixed inset-0 bg-black bg-opacity-[0.98] z-50 flex items-center justify-center px-6 py-10"
      onClick={handleBackdropClick}
    >
      <div
        ref={panelRef}
        className="bg-black text-white rounded-xl max-w-6xl w-full max-h-[95vh] p-8 relative shadow-2xl flex flex-col md:flex-row gap-10 border border-white/10 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow-500 text-3xl font-light"
        >
          ×
        </button>

        {/* Poster */}
        <div className="flex-shrink-0">
          <img
            src={media.poster_url}
            alt={media.title}
            className="h-[81vh] w-auto rounded-lg object-cover shadow-lg"
          />
        </div>

        {/* Right Side: Scrollable Content */}
        <div className="relative flex-1 overflow-y-auto max-h-[80vh] pr-6 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent space-y-6">
          {/* Title and Meta */}
          <div>
            <h2 className="text-4xl font-bold mb-4">{media.title}</h2>
            <div className="flex flex-wrap items-center gap-4">
              <ImdbBadge rating={media.imdb_rating} votes={media.imdb_votes_count} />
              <YearBadge year={media.release_year} />
            </div>
          </div>

          {/* Genres */}
          {media.genre_names && (
            <div className="flex flex-wrap gap-2">
              {media.genre_names.map((genre) => (
                <GenreBadge key={genre} name={genre} />
              ))}
            </div>
          )}

          {/* Overview */}
          <p className="text-sm text-white leading-relaxed">{media.overview}</p>

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
          <StreamingReader tmdbId={media.tmdb_id} />
        </div>
      </div>
    </div>
  );
}

export default MediaDetails;
