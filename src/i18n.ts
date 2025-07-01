import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  // a backend to load translations from a server
  .use(HttpBackend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    // default language
    fallbackLng: "en",
    debug: process.env.NODE_ENV === 'development', // Only show debug logs in development
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // backend options
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    }
  });

export default i18n; 