import { useLanguage } from "../context/LanguageContext";

function SiteFooter() {
  const { language } = useLanguage();

  const t = (key) => {
    const map = {
      madeBy: {
        en: "Made by 🍿 cinephiles with ❤️",
        fr: "Créé par des 🍿 cinéphiles avec ❤️",
      },
    };
    return map[key][language] || key;
  };

  return (
    <footer className="w-full text-center text-sm py-4 bg-gray-900 text-white mt-10">
      <p>{t("madeBy")}</p>
    </footer>
  );
}

export default SiteFooter;
