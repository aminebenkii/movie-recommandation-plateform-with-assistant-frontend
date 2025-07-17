import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

function GreetingMessage() {
  const { user } = useAuth();
  const { language } = useLanguage();

  if (!user) return null;

  const hello = language === "fr" ? "Salut" : "Hello";

  return (
    <span className="hidden sm:inline text-base font-medium text-white">
      {hello}, <strong>{user.first_name}</strong>
    </span>
  );
}

export default GreetingMessage;
