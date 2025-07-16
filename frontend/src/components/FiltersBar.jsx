import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const genres = [
  { id: 28, en: "Action", fr: "Action" },
  { id: 35, en: "Comedy", fr: "Comédie" },
  { id: 18, en: "Drama", fr: "Drame" },
  { id: 27, en: "Horror", fr: "Horreur" },
  { id: 10749, en: "Romance", fr: "Romance" },
  // Add more if needed...
];

const sortOptions = ["popularity", "vote_average", "vote_count"];

function FiltersBar({ initialFilters = {}, onSearch, onAskAssistant }) {
  const { language } = useLanguage();

  const [filters, setFilters] = useState({
    genre_id: null,
    min_rating: 6,
    min_votes: 1000,
    start_year: 1990,
    end_year: new Date().getFullYear(),
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
      ask: { en: "Ask Assistant", fr: "Demander à l'assistant" },
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
    <div className="bg-gray-800 p-4 rounded-md mb-6 space-y-4 text-white text-sm">
      <div className="flex flex-wrap gap-4 items-center">

        {/* Genre */}
        <div>
          <label>{t("genre")}</label><br />
          <select
            className="bg-gray-700 p-2 rounded"
            value={filters.genre_id || ""}
            onChange={(e) =>
              handleChange("genre_id", e.target.value ? parseInt(e.target.value) : null)
            }
          >
            <option value="">{language === "en" ? "All" : "Tous"}</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g[language]}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label>{t("rating")}: {filters.min_rating}</label><br />
          <input
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={filters.min_rating}
            onChange={(e) => handleChange("min_rating", parseFloat(e.target.value))}
          />
        </div>

        {/* Votes */}
        <div>
          <label>{t("votes")}: {filters.min_votes.toLocaleString()}</label><br />
          <input
            type="range"
            min="0"
            max="1000000"
            step="1000"
            value={filters.min_votes}
            onChange={(e) => handleChange("min_votes", parseInt(e.target.value))}
          />
        </div>

        {/* Year Range */}
        <div>
          <label>{t("year")}: {filters.start_year} - {filters.end_year}</label><br />
          <input
            type="number"
            value={filters.start_year}
            onChange={(e) => handleChange("start_year", parseInt(e.target.value))}
            className="bg-gray-700 p-1 rounded w-20 mr-2"
          />
          <input
            type="number"
            value={filters.end_year}
            onChange={(e) => handleChange("end_year", parseInt(e.target.value))}
            className="bg-gray-700 p-1 rounded w-20"
          />
        </div>

        {/* Sort By */}
        <div>
          <label>{t("sortBy")}</label><br />
          <select
            className="bg-gray-700 p-2 rounded"
            value={filters.sort_by}
            onChange={(e) => handleChange("sort_by", e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option} value={`${option}.desc`}>
                {option.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={handleSearch}
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 font-semibold"
        >
          {t("search")}
        </button>
        <button
          onClick={onAskAssistant}
          className="border border-yellow-500 text-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition font-semibold"
        >
          {t("ask")}
        </button>
      </div>
    </div>
  );
}

export default FiltersBar;
