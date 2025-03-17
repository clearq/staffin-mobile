import i18n from "i18next";
import { initReactI18next, Translation } from "react-i18next";
const { languageDetectorPlugin } = require("./utils/languageDetectorPlugin");
import en from "./constants/languages/en.json"
import sv from "./constants/languages/sv.json";
import jp from "./constants/languages/jp.json"
import "intl-pluralrules";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    sv: { translation: sv },
    jp: { Translation: jp }
  },
  fallbackLng: "en",
  debug: false,
  keySeparator: false,
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
});

export default i18n;