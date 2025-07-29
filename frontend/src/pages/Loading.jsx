import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { isTokenExpired } from "@/utils/isTokenExpired";

import bgImage from "../assets/bg.png";
import logonobg from "../assets/logonobg.png";

function Loading() {

  const [visible, setVisible] = useState(true);

  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      
      const  expired = token ? isTokenExpired(token) : true;

      (token && !expired) ? navigate("/movies") : navigate("/Hero");
    }, 1500);

    return () => clearTimeout(timer);
  }, [token, navigate]);

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
      <div className="flex items-center justify-center h-full w-full relative z-10">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.img
              key="intro"
              src={logonobg}
              alt="Intro Logo"
              className="w-72 h-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1.8,
                transition: { duration: 1.2, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                scale: 2.4,
                transition: { duration: 0.8, ease: "easeInOut" },
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Loading;
