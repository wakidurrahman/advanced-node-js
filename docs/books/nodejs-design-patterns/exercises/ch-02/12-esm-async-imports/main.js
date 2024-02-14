// (1) Define a list of supported languages.
const SUPPORTED_LANGUAGES = ['el', 'en', 'es', 'it', 'pl'];

// (2) Read the selected language from the first argument passed in the command line.
const selectedLanguage = process.argv[2];

// (3) we handle the case where the selected language is not supported.
if (!SUPPORTED_LANGUAGES.includes(selectedLanguage)) {
  console.error('This specified language is not supported');
  process.exit(1);
}

// (4) We want to import based on the selected language.
const translationModule = `./strings-${selectedLanguage}.js`; // ①

// (5) The import() operator to trigger the dynamic import of the module.
import(translationModule) // ②
  .then((strings) => {
    // ③
    // (6) The dynamic import happens asynchronously, so we can use the .then() hook on the returned promise to get notified when the module is ready to be used.
    console.log(strings.HELLO);
  })
  .catch((err) => {
    console.error(err);
  });
