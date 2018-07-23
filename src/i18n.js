import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    saveMissing: 'true',

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    react: {
      wait: true
    },
  }, (err, t) => {
        if (err) {
            console.error('error while initialising i18next ::: ' + JSON.stringify(err));
        }
})

export default i18n;
