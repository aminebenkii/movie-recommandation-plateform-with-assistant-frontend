import { useEffect, useState } from "react";

import { useLanguage } from "../../context/LanguageContext";

import GenreSelector from "./GenreSelector";
import RatingSlider from "./RatingSlider";
import VotesSlider from "./VotesSlider";
import YearRangeSlider from "./YearRangeSlider";
import SortSelector from "./SortSelector";
import OriginalLanguageSelector from "./OriginalLanguageSelector";
import TitleSearchBar from "./TitleSearchBar";
import SearchButton from "./SearchButton";




function FiltersBar({ DisplayedFilters = {}, onSearch }) {
  
  const { language } = useLanguage();

  const [filters, setFilters] = useState({
    genre_name: null,
    min_imdb_rating: 6,
    min_imdb_votes_count: 1000,
    min_release_year: 1990,
    max_release_year: new Date().getFullYear(),
    original_language: null,
    sort_by: "popularity.desc",
    ...DisplayedFilters,
  });

  const [titleQuery, setTitleQuery] = useState("");


  useEffect(() => {
    setFilters((prev) => ({ ...prev, ...DisplayedFilters }));
  }, [DisplayedFilters]);


  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    if (onSearch) onSearch(filters, titleQuery.trim());
  };

return (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 px-3 pt-3 pb-5 rounded-2xl mb-10 shadow-xl text-white text-base md:text-lg">
    <div className="flex flex-col sm:flex-wrap md:flex-row xl:flex-nowrap gap-6 items-end justify-between">

      <div className="w-full sm:w-[48%] md:flex-1 min-w-[100px]">
        <GenreSelector
          value={filters.genre_name}
          onChange={(val) => handleChange("genre_name", val)}
        />
      </div>

      <div className="w-full sm:w-[48%] md:flex-1 min-w-[100px]">
        <RatingSlider
          value={filters.min_imdb_rating}
          onChange={(val) => handleChange("min_imdb_rating", val)}
        />
      </div>

      <div className="w-full sm:w-[48%] md:flex-1 min-w-[100px]">
        <VotesSlider
          value={filters.min_imdb_votes_count}
          onChange={(val) => handleChange("min_imdb_votes_count", val)}
        />
      </div>

      <div className="w-full sm:w-[48%] md:flex-1 min-w-[100px]">
        <YearRangeSlider
          minYear={filters.min_release_year}
          maxYear={filters.max_release_year}
          onChange={({ min, max }) => {
            handleChange("min_release_year", min);
            handleChange("max_release_year", max);
          }}
        />
      </div>

      <div className="w-full sm:w-[48%] md:flex-1 min-w-[100px]">
        <SortSelector
          value={filters.sort_by}
          onChange={(val) => handleChange("sort_by", val)}
        />
      </div>

      <div className="w-full sm:w-[48%] md:flex-1 min-w-[100px]">
        <OriginalLanguageSelector
          value={filters.original_language}
          onChange={(val) => handleChange("original_language", val)}
        />
      </div>

      <div className="w-full md:w-[200px]">
        <TitleSearchBar value={titleQuery} onChange={setTitleQuery} />
      </div>

      <div className="w-full sm:w-auto flex justify-end md:justify-start">
        <SearchButton onClick={handleSearch} />
      </div>

    </div>
  </div>
);


}

export default FiltersBar;
