'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../../locales/en/translation.json';
import frTranslation from '../../locales/fr/translation.json';

i18next
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'fr',
    debug: process.env.NODE_ENV === 'development',
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation }
    }
});

export default i18next;