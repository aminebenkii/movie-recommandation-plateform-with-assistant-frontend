import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

function NavigationBar() {
  const { language } = useLanguage();
  const location = useLocation();

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
    { to: "/", label: t.home },
    { to: "/movies", label: t.movies },
    { to: "/tv", label: t.shows },
    { to: "/seen", label: t.seen },
    { to: "/watchlist", label: t.watchlist },
    { to: "/not-interested", label: t.notInterested },
    { to: "/stats", label: t.stats },
  ];

  return (
    <nav className="flex justify-center text-lg md:text-xl font-semibold">
      {links.map((link, index) => {
        const isActive =
          location.pathname === link.to ||
          (link.to !== "/" && location.pathname.startsWith(link.to));

        return (
          <div
            key={link.to}
            className={`flex items-center px-4 ${
              index !== 0 ? "border-l border-white/20" : ""
            }`}
          >
            <Link
              to={link.to}
              className={`relative hover:text-yellow-400 transition ${
                isActive ? "text-yellow-400" : ""
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 rounded transition-all"></span>
              )}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

export default NavigationBar;
