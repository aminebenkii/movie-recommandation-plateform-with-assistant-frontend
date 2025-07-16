// src/components/SiteHeader.jsx
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const SiteHeader = ({ onChatToggle }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background relative">
      {/* Logo (left) */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold cursor-pointer tracking-tight"
      >
        🎬 MoviesYouDidntWatch.com
      </h1>

      {/* Chat trigger (center) */}
      {isAuthenticated && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Button
            variant="ghost"
            onClick={onChatToggle}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronDown className="w-4 h-4" />
            Ask assistant for movie preferences
          </Button>
        </div>
      )}

      {/* User + Logout (right) */}
      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Hi, {user?.first_name}
          </span>
          <Button size="sm" variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
