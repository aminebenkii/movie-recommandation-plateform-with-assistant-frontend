import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const genres = [
  "action", "adventure", "animation", "comedy", "crime", "documentary",
  "drama", "family", "fantasy", "history", "horror", "music", "mystery",
  "romance", "science fiction", "tv movie", "thriller", "war", "western",
];

const sortOptions = ["popularity.desc", "vote_average.desc", "vote_count.desc"];

function FiltersBar({ initialFilters = {}, onSearch, onAskAssistant }) {
  const { language } = useLanguage();

  const [filters, setFilters] = useState({
    genre_name: null,
    min_imdb_rating: 6,
    min_imdb_votes_count: 1000,
    min_release_year: 1990,
    max_release_year: new Date().getFullYear(),
    sort_by: "popularity.desc",
    ...initialFilters,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, ...initialFilters }));
  }, [initialFilters]);

  const t = (key) => {
    const map = {
      genre: { en: "Genre", fr: "Genre" },
      rating: { en: "Min Rating", fr: "Note min" },
      votes: { en: "Min Votes", fr: "Votes min" },
      year: { en: "Year Range", fr: "Années" },
      sortBy: { en: "Sort By", fr: "Trier par" },
      search: { en: "Search", fr: "Rechercher" },
      ask: { en: "💬 Ask Assistant", fr: "💬 Demander à l'assistant" },
    };
    return map[key][language] || key;
  };

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    if (onSearch) onSearch(filters);
  };

  return (
    <div className="bg-black bg-opacity-80 p-6 rounded-xl mb-8 text-white text-base md:text-lg">
      <div className="flex flex-wrap md:flex-nowrap items-end justify-between gap-6">

        {/* Genre */}
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className="font-semibold mb-1">{t("genre")}</label>
          <select
            className="bg-white/10 px-3 py-2 rounded text-white"
            value={filters.genre_name || ""}
            onChange={(e) =>
              handleChange("genre_name", e.target.value || null)
            }
          >
            <option value="">{language === "en" ? "All" : "Tous"}</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className="font-semibold mb-1">
            {t("rating")}: {filters.min_imdb_rating}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={filters.min_imdb_rating}
            onChange={(e) =>
              handleChange("min_imdb_rating", parseFloat(e.target.value))
            }
            className="accent-yellow-500"
          />
        </div>

        {/* Votes */}
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className="font-semibold mb-1">
            {t("votes")}: {filters.min_imdb_votes_count.toLocaleString()}
          </label>
          <input
            type="range"
            min="0"
            max="1000000"
            step="1000"
            value={filters.min_imdb_votes_count}
            onChange={(e) =>
              handleChange("min_imdb_votes_count", parseInt(e.target.value))
            }
            className="accent-yellow-500"
          />
        </div>

        {/* Year Range */}
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label className="font-semibold mb-1">
            {t("year")}: {filters.min_release_year} – {filters.max_release_year}
          </label>
          <div className="flex gap-2">
            <input
              type="range"
              min="1950"
              max={new Date().getFullYear()}
              value={filters.min_release_year}
              onChange={(e) =>
                handleChange("min_release_year", parseInt(e.target.value))
              }
              className="accent-yellow-500 flex-1"
            />
            <input
              type="range"
              min="1950"
              max={new Date().getFullYear()}
              value={filters.max_release_year}
              onChange={(e) =>
                handleChange("max_release_year", parseInt(e.target.value))
              }
              className="accent-yellow-500 flex-1"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="flex flex-col flex-1 min-w-[150px]">
          <label className="font-semibold mb-1">{t("sortBy")}</label>
          <select
            className="bg-white/10 px-3 py-2 rounded text-white"
            value={filters.sort_by}
            onChange={(e) => handleChange("sort_by", e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option.replace("_", " ").replace(".desc", "")}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 flex-1 min-w-[220px] justify-end mt-6 md:mt-0">
          <button
            onClick={onAskAssistant}
            className="border border-yellow-500 text-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition font-semibold w-fit"
          >
            💬 {language === "en" ? "Ask Assistant" : "Demander l’assistant"}
          </button>
          <button
            onClick={handleSearch}
            className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-400 font-semibold w-fit"
          >
            {t("search")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FiltersBar;
