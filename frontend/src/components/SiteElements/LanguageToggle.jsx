'use client';

import { useLanguage } from '../../context/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  const handleClick = (val) => {
    if (val !== language) {
      toggleLanguage();
    }
  };

  return (
    <div className="flex items-center gap-4 text-sm font-medium bg-zinc-800 px-4 py-2 rounded-full text-yellow-400">
      <span
        onClick={() => handleClick('fr')}
        className={`cursor-pointer transition-all ${
          language === 'fr'
            ? 'underline underline-offset-4 font-bold'
            : 'opacity-60 hover:opacity-100'
        }`}
      >
        FR
      </span>
      <span>|</span>
      <span
        onClick={() => handleClick('en')}
        className={`cursor-pointer transition-all ${
          language === 'en'
            ? 'underline underline-offset-4 font-bold'
            : 'opacity-60 hover:opacity-100'
        }`}
      >
        EN
      </span>
    </div>
  );
}
