import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Initialize i18next
i18n
  .use(HttpApi) // Load translations via HTTP
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Use React bindings
  .init({
    fallbackLng: 'en', // Default language
    debug: true, // Enable debugging during development

    // Backend settings
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },

    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
