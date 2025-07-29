import { useState } from "react";

function getEmbedUrl(source, tmdbId) {
  if (!source) return null;

  switch (source) {
    case "vidsrc":
      return `https://vidsrc.xyz/embed/movie/${tmdbId}`;
    case "superembed":
      return `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1`;
    case "2embed":
      return `https://2embed.cc/embed/movie/${tmdbId}`;
    case "moviesapi":
      return `https://moviesapi.club/embed/${tmdbId}`;
    case "embed_su":
      return `https://embed.su/embed/movie/${tmdbId}`;
    case "autoembed":
      return `https://player.autoembed.cc/embed/movie/${tmdbId}`;
    default:
      return null;
  }
}

function StreamingReader({ tmdbId }) {
  const [selectedSource, setSelectedSource] = useState("");

  const streamUrl = getEmbedUrl(selectedSource, tmdbId);

  return (
    <div className="mt-6 space-y-3">
      <label htmlFor="source" className="block text-white text-sm">
        Stream from:
      </label>

      <select
        id="source"
        className="bg-black border border-white/10 text-white px-4 py-2 rounded-md w-full"
        value={selectedSource}
        onChange={(e) => setSelectedSource(e.target.value)}
      >
        <option value="">Select a provider</option>
        <option value="vidsrc">VidSrc</option>
        <option value="superembed">SuperEmbed</option>
        <option value="2embed">2Embed</option>
        <option value="moviesapi">MoviesAPI</option>
        <option value="embed_su">Embed.su</option>
        <option value="autoembed">AutoEmbed</option>
      </select>

      {!selectedSource && (
        <div className="w-full aspect-video rounded-lg border border-white/10 flex items-center justify-center bg-gray-900 text-white text-sm">
          {/* 🔁 Replace this with your actual ad script or banner */}
          <div className="text-center">
            <p>This space is for ads.</p>
            <p>Choose a streaming provider to continue.</p>
          </div>
        </div>
      )}

      {streamUrl && (
        <iframe
          src={streamUrl}
          title="Streaming Player"
          className="w-full aspect-video rounded-lg border border-white/10"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}

export default StreamingReader;
