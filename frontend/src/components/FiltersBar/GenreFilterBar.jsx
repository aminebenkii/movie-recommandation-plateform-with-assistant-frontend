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

export function GenreFilterBar({ selectedGenres = [], onChange }) {
  const { language } = useLanguage();

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      onChange(selectedGenres.filter((g) => g !== genre));
    } else {
      onChange([...selectedGenres, genre]);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {genres.map((genre) => {
          const isActive = selectedGenres.includes(genre);
          return (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-4 py-2 rounded-full border text-sm md:text-base font-medium transition-all
                ${isActive
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "bg-black/30 text-white border-white/20 hover:bg-yellow-500 hover:text-black"
                }`}
            >
              {genreLabels[genre][language]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default GenreFilterBar;
