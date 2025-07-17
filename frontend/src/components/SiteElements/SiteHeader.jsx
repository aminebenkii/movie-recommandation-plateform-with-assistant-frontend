import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

// 🔽 Modular elements
import LanguageToggle from "./LanguageToggle";
import GreetingMessage from "./GreetingMessage";
import LogOutButton from "./LogOutButton";
import NavigationBar from "./NavigationBar";

function SiteHeader() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-black bg-opacity-90 text-white shadow-xl z-50">
      <div className="w-full px-6 py-4 flex items-center justify-between">

        {/* LEFT: Logo + Brand */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/movies")}
        >
          <img src={logo} alt="Logo" className="h-20 w-auto" />
        </div>

        {/* CENTER: Nav */}
        <div className="flex-1 flex justify-center">
          <NavigationBar />
        </div>

        {/* RIGHT: Language + Hello + Logout */}
        <div className="flex items-center gap-10">
          <LanguageToggle />
          <GreetingMessage />
          <LogOutButton />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
