import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

function LogOutButton() {
  const { logout } = useAuth();
  const { language } = useLanguage();

  const label = language === "fr" ? "Déconnexion" : "Logout";

  return (
    <button
      onClick={logout}
      className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded font-bold text-sm transition"
    >
      {label}
    </button>
  );
}

export default LogOutButton;
