import { useNavigate } from "react-router-dom";
import axios from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageToggle from "../components/SiteElements/LanguageToggle";
import bgImage from "../assets/bg.png";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { language } = useLanguage();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const t = {
    title: {
      en: "Create Your Account",
      fr: "Créer votre compte",
    },
    button: {
      en: "Sign Up",
      fr: "S'inscrire",
    },
    placeholders: {
      firstName: {
        en: "First Name",
        fr: "Prénom",
      },
      lastName: {
        en: "Last Name",
        fr: "Nom",
      },
      email: {
        en: "Email",
        fr: "E-mail",
      },
      password: {
        en: "Password",
        fr: "Mot de passe",
      },
    },
    alreadyHaveAccount: {
      en: "Already have an account?",
      fr: "Vous avez déjà un compte ?",
    },
    loginInstead: {
      en: "Log in instead",
      fr: "Connectez-vous",
    },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/signup", form);
      const token = response.data.access_token;
      const user = response.data.user;
      login(token, user);
      navigate("/movies");
    } catch (err) {
      console.error("Signup failed", err);
      // TODO: Add toast
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay for darkening background */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Language toggle */}
      <div className="absolute top-6 right-6 z-30">
        <LanguageToggle />
      </div>

      {/* Form Card */}
      <div className="bg-black/80 backdrop-blur-md p-10 rounded-xl shadow-2xl max-w-lg w-full z-20 text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
          {t.title[language]}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="first_name"
            placeholder={t.placeholders.firstName[language]}
            value={form.first_name}
            onChange={handleChange}
            required
            className="bg-white/10 text-white px-4 py-3 rounded border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="last_name"
            placeholder={t.placeholders.lastName[language]}
            value={form.last_name}
            onChange={handleChange}
            required
            className="bg-white/10 text-white px-4 py-3 rounded border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="email"
            name="email"
            placeholder={t.placeholders.email[language]}
            value={form.email}
            onChange={handleChange}
            required
            className="bg-white/10 text-white px-4 py-3 rounded border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password"
            name="password"
            placeholder={t.placeholders.password[language]}
            value={form.password}
            onChange={handleChange}
            required
            className="bg-white/10 text-white px-4 py-3 rounded border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded transition"
          >
            {t.button[language]}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-300">
          {t.alreadyHaveAccount[language]}{" "}
          <span
            className="text-yellow-400 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            {t.loginInstead[language]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
