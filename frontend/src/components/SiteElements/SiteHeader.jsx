import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import NavigationBar from "./NavigationBar";
import LanguageToggle from "./LanguageToggle";
import GreetingMessage from "./GreetingMessage";
import LogOutButton from "./LogOutButton";
import logo from "../../assets/logo.png"; // Adjust as needed

function Header() {
  const navigate = useNavigate();


return (
  <header className="w-full bg-black bg-opacity-90 text-white shadow-md z-50 mb-2">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">

      {/* LEFT: Logo */}
      <div
        onClick={() => navigate("/movies")}
        className="flex items-center gap-2 cursor-pointer shrink-0"
      >
        <img src={logo} alt="Logo" className="h-10 sm:h-12 lg:h-14 w-auto" />
      </div>

      {/* CENTER: Navigation (hidden on small screens) */}
      <nav className="hidden md:flex flex-1 justify-center">
        <NavigationBar />
      </nav>

      {/* RIGHT: Controls (stacked on mobile) */}
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
        <LanguageToggle />
        <GreetingMessage />
        <LogOutButton />
      </div>
    </div>

    {/* MOBILE NAV UNDER HEADER */}
    <div className="block md:hidden border-t border-white/10 px-4 pt-2 pb-3">
      <NavigationBar />
    </div>
  </header>
);


}

export default Header;
