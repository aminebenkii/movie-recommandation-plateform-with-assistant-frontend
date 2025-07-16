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
      home: { en: "Home", fr: "Accueil" },
      movies: { en: "Movies", fr: "Films" },
      tv: { en: "TV Shows", fr: "Séries" },
      seen: { en: "Seen History", fr: "Historique" },
      watchlist: { en: "Watchlist", fr: "À voir" },
      notInterested: { en: "Not Interested", fr: "Rejetés" },
      stats: { en: "Stats", fr: "Statistiques" },
      logout: { en: "Logout", fr: "Se déconnecter" },
    };
    return map[key][language] || key;
  };

  return (
    <header className="w-full px-4 py-3 flex items-center justify-between bg-gray-900 shadow-sm">
      {/* Left: Logo + Navigation */}
      <div className="flex items-center gap-6">
        <img
          src={logo}
          alt="Logo"
          className="h-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <nav className="hidden md:flex gap-4 text-sm font-medium">
          <Link to="/" className="hover:underline">{t("home")}</Link>
          <Link to="/movies" className="hover:underline">{t("movies")}</Link>
          <Link to="/tv" className="hover:underline">{t("tv")}</Link>
          <Link to="/seen" className="hover:underline">{t("seen")}</Link>
          <Link to="/watchlist" className="hover:underline">{t("watchlist")}</Link>
          <Link to="/not-interested" className="hover:underline">{t("notInterested")}</Link>
          <Link to="/stats" className="hover:underline">{t("stats")}</Link>
        </nav>
      </div>

      {/* Right: Language + User + Logout */}
      <div className="flex items-center gap-4 text-sm">
        <LanguageToggle />
        {user && <span className="hidden md:inline">👋 {user.first_name}</span>}
        <button
          onClick={logout}
          className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400 font-semibold"
        >
          {t("logout")}
        </button>
      </div>
    </header>
  );
}

export default SiteHeader;
