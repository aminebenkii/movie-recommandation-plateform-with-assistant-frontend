import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const genres = [
  "action", "adventure", "animation", "comedy", "crime", "documentary",
  "drama", "family", "fantasy", "history", "horror", "music", "mystery",
  "romance", "science fiction", "tv movie", "thriller", "war", "western",
];

const genreLabels = {
  "action": { en: "Action", fr: "Action" },
  "adventure": { en: "Adventure", fr: "Aventure" },
  "animation": { en: "Animation", fr: "Animation" },
  "comedy": { en: "Comedy", fr: "Comédie" },
  "crime": { en: "Crime", fr: "Crime" },
  "documentary": { en: "Documentary", fr: "Documentaire" },
  "drama": { en: "Drama", fr: "Drame" },
  "family": { en: "Family", fr: "Famille" },
  "fantasy": { en: "Fantasy", fr: "Fantastique" },
  "history": { en: "History", fr: "Histoire" },
  "horror": { en: "Horror", fr: "Horreur" },
  "music": { en: "Music", fr: "Musique" },
  "mystery": { en: "Mystery", fr: "Mystère" },
  "romance": { en: "Romance", fr: "Romance" },
  "science fiction": { en: "Science Fiction", fr: "Science-fiction" },
  "tv movie": { en: "TV Movie", fr: "Téléfilm" },
  "thriller": { en: "Thriller", fr: "Thriller" },
  "war": { en: "War", fr: "Guerre" },
  "western": { en: "Western", fr: "Western" },
};

function GenreSelector({ value, onChange }) {

  const { language } = useLanguage();
  const label = language === "fr" ? "Genre" : "Genre";
  const allLabel = language === "fr" ? "Tous" : "All";

  return (
    <div className="flex flex-col min-w-[100px] w-full">
      <label className="uppercase text-[10px] tracking-wide text-gray-400 font-bold mb-4">
        {label}
      </label>
      <select
        className="bg-zinc-900 border border-white/10 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
      >
        <option value="">{allLabel}</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {genreLabels[g][language]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreSelector;
