// import i18n from 'i18next';
// import Backend from 'i18next-xhr-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import { initReactI18next } from 'react-i18next';

// i18n
//   // load translation using xhr -> see /public/locales
//   // learn more: https://github.com/i18next/i18next-xhr-backend
//   .use(Backend)
//   // detect user language
//   // learn more: https://github.com/i18next/i18next-browser-languageDetector
//   .use(LanguageDetector)
//   // pass the i18n instance to react-i18next.
//   .use(initReactI18next)
//   // init i18next
//   // for all options read: https://www.i18next.com/overview/configuration-options
//   .init({
//     fallbackLng: 'pt-BR',
//     debug: true,

//     interpolation: {
//       escapeValue: false, // not needed for react as it escapes by default
//     },
//   });

// export default i18n;
// import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-locize-backend';
// import Editor from 'locize-editor';
// import LastUsed from 'locize-lastused';
// import { initReactI18next } from 'react-i18next';

// const locizeOptions = {
//   projectId: process.env.REACT_APP_LOCIZE_PROJECT_ID,
//   apiKey: process.env.REACT_APP_LOCIZE_API_KEY, // YOU should not expose your apps API key to production!!!
//   referenceLng: 'pt-BR',
// };

// i18n
//   // i18next-locize-backend
//   // loads translations from your project, saves new keys to it (saveMissing: true)
//   // https://github.com/locize/i18next-locize-backend
//   .use(Backend)
//   // locize-lastused
//   // sets a timestamp of last access on every translation segment on locize
//   // -> safely remove the ones not being touched for weeks/months
//   // https://github.com/locize/locize-lastused
//   .use(LastUsed)
//   // locize-editor
//   // InContext Editor of locize ?locize=true to show it
//   // https://github.com/locize/locize-editor
//   .use(Editor)
//   // detect user language
//   // learn more: https://github.com/i18next/i18next-browser-languageDetector
//   .use(LanguageDetector)
//   // pass the i18n instance to react-i18next.
//   .use(initReactI18next)
//   // init i18next
//   // for all options read: https://www.i18next.com/overview/configuration-options
//   .init({
//     fallbackLng: 'pt-BR',
//     debug: true,
//     saveMissing: true,

//     interpolation: {
//       escapeValue: false, // not needed for react as it escapes by default
//     },
//     backend: locizeOptions,
//     locizeLastUsed: locizeOptions,
//     editor: {
//       ...locizeOptions,
//       onEditorSaved: async (lng, ns) => {
//         // reload that namespace in given language
//         await i18n.reloadResources(lng, ns);
//         // trigger an event on i18n which triggers a rerender
//         // based on bindI18n below in react options
//         i18n.emit('editorSaved');
//       },
//     },
//     react: {
//       bindI18n: 'languageChanged editorSaved',
//     },
//   });
const i18n = {};
export default i18n;
