import { useState, useEffect } from "react";
import MediaCard from "./MediaCard";
import MediaDetails from "./MediaDetails";

const MediaGrid = ({ mediaItems }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [visibleMediaItems, setVisibleMediaItems] = useState(mediaItems);

  useEffect(() => {
    setVisibleMediaItems(mediaItems);
  }, [mediaItems]);

  const handleRemoveMedia = (tmdb_id) => {
    setVisibleMediaItems((prev) =>
      prev.filter((media) => media.tmdb_id !== tmdb_id)
    );
  };

  if (!visibleMediaItems || visibleMediaItems.length === 0) {
    return (
      <div className="w-full text-center text-muted-foreground py-10">
        No media to display.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-10 px-2 sm:px-4 py-6">
        {visibleMediaItems.map((media) => (
          <MediaCard
            key={media.tmdb_id}
            media={media}
            onPosterClick={() => setSelectedMedia(media)}
            onAction={(id) => handleRemoveMedia(id)}
          />
        ))}
      </div>

      {selectedMedia && (
        <MediaDetails
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </div>
  );
};

export default MediaGrid;
