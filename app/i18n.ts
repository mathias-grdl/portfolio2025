import i18next from 'i18next';
import enTranslation from '../locales/en/translation.json';
import frTranslation from '../locales/fr/translation.json';

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  resources: {
    en: { translation: enTranslation },
    fr: { translation: frTranslation }
  }
});

export default i18next;