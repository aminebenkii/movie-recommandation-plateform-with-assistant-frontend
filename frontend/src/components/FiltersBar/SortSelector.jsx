import { useLanguage } from "../../context/LanguageContext";

const sortOptions = [
  { key: "popularity.desc", en: "Popularity", fr: "Popularité" },
  { key: "vote_average.desc", en: "IMDb Rating", fr: "Note IMDb" },
  { key: "vote_count.desc", en: "Most Voted", fr: "Nombre de votes" },
];

function SortSelector({ value, onChange }) {

  const { language } = useLanguage();
  const label = language === "fr" ? "Trier par" : "Sort By";

  return (
    <div className="flex flex-col min-w-[100px] w-full">
      <label className="uppercase text-[10px] tracking-wide text-gray-400 font-bold mb-4">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-zinc-900 border border-white/10 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
      >
        {sortOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option[language]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortSelector;
