import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/logo.png";
import LanguageToggle from "./LanguageToggle";

function SiteHeader() {
  const { logout, user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const t = (key) => {
    const map = {
      movies: { en: "Movies", fr: "Films" },
      seen: { en: "Seen", fr: "Vus" },
      watchlist: { en: "Watchlist", fr: "À voir" },
      notInterested: { en: "Not Interested", fr: "Rejetés" },
      stats: { en: "Stats", fr: "Stats" },
      logout: { en: "Logout", fr: "Déconnexion" },
    };
    return map[key][language] || key;
  };

  return (
    <header className="w-full bg-black bg-opacity-90 text-white shadow-xl z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-6 py-5 gap-6">
        {/* Logo */}
        <div className="flex items-center gap-6 cursor-pointer" onClick={() => navigate("/movies")}>
          <img src={logo} alt="Logo" className="h-24 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-6 text-base md:text-lg font-semibold items-center justify-center">
          <Link to="/movies" className="hover:text-yellow-400 transition">{t("movies")}</Link>
          <div className="w-[1px] h-6 bg-white/30" />
          <Link to="/seen" className="hover:text-yellow-400 transition">{t("seen")}</Link>
          <div className="w-[1px] h-6 bg-white/30" />
          <Link to="/watchlist" className="hover:text-yellow-400 transition">{t("watchlist")}</Link>
          <div className="w-[1px] h-6 bg-white/30" />
          <Link to="/not-interested" className="hover:text-yellow-400 transition">{t("notInterested")}</Link>
          <div className="w-[1px] h-6 bg-white/30" />
          <Link to="/stats" className="hover:text-yellow-400 transition">{t("stats")}</Link>
        </nav>

        {/* Language, User & Logout */}
        <div className="flex items-center gap-4">
          <LanguageToggle />
          {user && (
            <span className="text-base font-bold text-white hidden sm:inline">
              👋 {user.first_name}
            </span>
          )}
          <button
            onClick={logout}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded font-bold text-sm transition"
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
