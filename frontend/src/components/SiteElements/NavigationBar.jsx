import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

function NavigationBar() {
  const { language } = useLanguage();

  const t = {
    home: language === "fr" ? "Accueil" : "Home",
    movies: language === "fr" ? "Films" : "Movies",
    shows: language === "fr" ? "Séries" : "TV Shows",
    seen: language === "fr" ? "Vus" : "Seen",
    watchlist: language === "fr" ? "À voir" : "Watchlist",
    notInterested: language === "fr" ? "Rejetés" : "Not Interested",
    stats: language === "fr" ? "Stats" : "Stats",
  };

  const links = [
    { to: "/movies", label: t.home },
    { to: "/movies", label: t.movies },
    { to: "/tv", label: t.shows },
    { to: "/seen", label: t.seen },
    { to: "/watchlist", label: t.watchlist },
    { to: "/not-interested", label: t.notInterested },
    { to: "/stats", label: t.stats },
  ];

  return (
    <nav className="flex flex-wrap justify-center text-lg md:text-xl font-semibold">
      {links.map((link, index) => (
        <div
          key={link.to + index}
          className={`flex items-center ${index !== 0 ? 'pl-4 ml-8 border-l border-white/20' : ''}`}
        >
          <Link to={link.to} className="hover:text-yellow-400 transition">
            {link.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}

export default NavigationBar;
