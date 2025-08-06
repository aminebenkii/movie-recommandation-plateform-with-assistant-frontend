import { useLanguage } from "../../context/LanguageContext";

const languageOptions = [
  { key: "en", labels: { en: "English", fr: "Anglais" } },
  { key: "fr", labels: { en: "French", fr: "Français" } },
  { key: "es", labels: { en: "Spanish", fr: "Espagnol" } },
  { key: "ko", labels: { en: "Korean", fr: "Coréen" } },
  { key: "zh", labels: { en: "Chinese", fr: "Chinois" } },
  { key: "ar", labels: { en: "Arabic", fr: "Arabe" } },
  // Add more as needed
];

function OriginalLanguageSelector({ value, onChange }) {
    
  const { language } = useLanguage();
  const label = language === "fr" ? "Langue d'origine" : "Original Language";

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
        <option value="">{language === "fr" ? "Toutes les langues" : "All Languages"}</option>
        {languageOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.labels[language] || option.key}
          </option>
        ))}
      </select>
    </div>
  );
}

export default OriginalLanguageSelector;
