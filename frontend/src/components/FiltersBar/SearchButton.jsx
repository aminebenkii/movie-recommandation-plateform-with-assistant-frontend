import { useLanguage } from "../../context/LanguageContext";

function SearchButton({ onClick }) {
  const { language } = useLanguage();
  const label = language === "fr" ? "Rechercher" : "Search";

  return (
    <button
      onClick={onClick}
      className="bg-yellow-500 text-black font-semibold text-s
                 px-8 py-2 rounded-lg transition-all duration-200 ease-out
                 hover:bg-yellow-400 hover:shadow-md active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
                 w-fit"
    >
      {label}
    </button>
  );
}

export default SearchButton;
