import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageToggle from "../components/LanguageToggle";
import bgImage from "../assets/bg.png";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { language } = useLanguage();

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const t = {
    title: {
      en: "Welcome Back!",
      fr: "Content de vous revoir !",
    },
    button: {
      en: "Log In",
      fr: "Connexion",
    },
    placeholders: {
      email: {
        en: "Email",
        fr: "E-mail",
      },
      password: {
        en: "Password",
        fr: "Mot de passe",
      },
    },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post("/auth/login", form);
      const token = res.data.access_token;
      const user = res.data.user;
      login(token, user);
      navigate("/movies");
    } catch (err) {
      console.error("Login failed:", err);
      // TODO: toast error here
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      <div className="absolute top-6 right-6 z-30">
        <LanguageToggle />
      </div>

      <div className="bg-black/80 backdrop-blur-md p-10 rounded-xl shadow-2xl max-w-md w-full z-20 text-white">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
          {t.title[language]}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            disabled={submitting}
            className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded transition disabled:opacity-50"
          >
            {submitting ? "..." : t.button[language]}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
