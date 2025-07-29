import { useLanguage } from "../../context/LanguageContext";

function TitleSearchBar({ value, onChange }) {
  const { language } = useLanguage();

  const label = language === "fr" ? "Recherche par titre" : "Search by title";
  const placeholder =
    language === "fr"
      ? "  Laisser vide pour filtres..."
      : "  Leave empty to use filters...";

  return (
    <div className="flex flex-col min-w-[200px] w-full">
      <label className="uppercase text-xs tracking-wide text-gray-400 font-bold mb-4">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-zinc-900 border border-white/10 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-white/40 placeholder:text-sm"
      />
    </div>
  );
}

export default TitleSearchBar;
