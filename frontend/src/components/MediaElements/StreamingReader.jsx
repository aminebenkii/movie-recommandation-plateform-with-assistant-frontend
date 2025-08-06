import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getEmbedUrl } from "@/utils/getEmbedUrl";

function StreamingReader({ tmdbId, imdbId, type = "movie", season = 1, episode = 1 }) {
  const { language } = useLanguage();

  // Define all available sources
  const sourceOptions = {
    en: [
      { value: "vidsrc", label: "VidSrc" },
      { value: "superembed", label: "SuperEmbed" },
      { value: "2embed", label: "2Embed" },
      { value: "mostream", label: "Mostream" },
      { value: "embed-api", label: "Embed-API" },
      { value: "moviesapi", label: "MoviesAPI" },
    ],
    fr: [
      { value: "frembed", label: "Frembed (VF)" },
      { value: "frwatch", label: "FrWatch" },
      { value: "vidsrc", label: "VidSrc" },
      { value: "superembed", label: "SuperEmbed" },
    ],
  };

  // Set default source when component mounts or language changes
  const [selectedSource, setSelectedSource] = useState(() => {
    return sourceOptions[language]?.[0]?.value || "";
  });

  useEffect(() => {
    const first = sourceOptions[language]?.[0]?.value || "";
    setSelectedSource(first);
  }, [language]);

  const streamUrl = getEmbedUrl(selectedSource, tmdbId, imdbId, language, type, season, episode);

  return (
    <div className="mt-6 space-y-3">
      <label htmlFor="source" className="block text-white text-sm">
        {language === "fr" ? "Choisissez une source :" : "Stream from:"}
      </label>

      <select
        id="source"
        className="bg-black border border-white/10 text-white px-4 py-2 rounded-md w-full"
        value={selectedSource}
        onChange={(e) => setSelectedSource(e.target.value)}
      >
        {sourceOptions[language].map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {!streamUrl && (
        <div className="w-full aspect-video rounded-lg border border-white/10 flex items-center justify-center bg-gray-900 text-white text-sm text-center">
          <div>
            <p>{language === "fr" ? "Espace réservé à la publicité." : "This space is for ads."}</p>
            <p>
              {language === "fr"
                ? "Veuillez choisir une source de streaming."
                : "Choose a streaming provider to continue."}
            </p>
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
