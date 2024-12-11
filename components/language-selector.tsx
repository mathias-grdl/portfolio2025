'use client';
import { useTranslation } from 'react-i18next';
import { FR, US } from 'country-flag-icons/react/3x2';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-8 h-8"
    >
      {i18n.language === 'en' ? (
        <FR className="w-6 h-6" />
      ) : (
        <US className="w-6 h-6" />
      )}
    </button>
  );
}
