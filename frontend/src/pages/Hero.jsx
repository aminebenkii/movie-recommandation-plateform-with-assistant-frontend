import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import bgImage from "../assets/bg.png";
import logonobg from "../assets/logonobg.png";
import logo from "../assets/logo.png";

import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import LanguageToggle from "../components/SiteElements/LanguageToggle";

const translations = {
  en: {
    heading: "Find Your Next Favorite Movie",
    signup: "Sign Up",
    login: "Login",
  },
  fr: {
    heading: "Trouvez votre prochain film préféré",
    signup: "S'inscrire",
    login: "Connexion",
  },
};

function Hero() {
  const { language } = useLanguage();
  const { token, loading } = useAuth();
  const navigate = useNavigate();
  const t = translations[language];

  const [showIntro, setShowIntro] = useState(true);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000);
    const nextTimer = setTimeout(() => {
      setShowMain(true);

      // Check auth only after intro animation
      if (token && !loading) {
        navigate("/movies");
      }
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(nextTimer);
    };
  }, [token, loading, navigate]);

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

      {showMain && (
        <div className="absolute top-6 right-6 z-30">
          <LanguageToggle />
        </div>
      )}

      {showMain && (
        <motion.div
          key="logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-6 left-0 w-full flex justify-center z-20"
        >
          <img src={logo} alt="Logo" className="w-48 h-auto" />
        </motion.div>
      )}

      <div className="flex items-center justify-center h-full w-full relative z-10">
        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.img
              key="intro"
              src={logonobg}
              alt="Intro Logo"
              className="w-72 h-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1.8, transition: { duration: 1.2, ease: "easeOut" } }}
              exit={{ opacity: 0, scale: 2.4, transition: { duration: 0.8, ease: "easeInOut" } }}
            />
          ) : (
            showMain && (
              <motion.div
                key="main"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="flex flex-col items-center text-white gap-8 text-center"
              >
                <h1 className="text-3xl md:text-5xl font-extrabold max-w-3xl leading-snug drop-shadow-lg">
                  {t.heading}
                </h1>
                <div className="flex gap-6">
                  <Link
                    to="/signup"
                    className="text-lg bg-yellow-500 text-black px-8 py-3 rounded font-semibold hover:bg-yellow-400 transition"
                  >
                    {t.signup}
                  </Link>
                  <Link
                    to="/login"
                    className="text-lg bg-black border border-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-black transition"
                  >
                    {t.login}
                  </Link>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Hero;
