import * as Localization from "expo-localization";
import { STORE_LANGUAGE_KEY } from "../constants/Variables";
import { getItem, setItem } from "./asyncStorage";

const languageDetectorPlugin = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      //get stored language from Async storage
      await getItem(STORE_LANGUAGE_KEY).then((language) => {
        if (language) {
          //if language was stored before, use this language in the app
          return callback(language);
        } else {
          //if language was not stored yet, use device's locale
          const deviceLanguage = Localization.getLocales();
          return callback(deviceLanguage?.[0].languageCode ?? "en");
        }
      });
    } catch (error) {
      console.log("Error reading language", error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      //save a user's language choice in Async storage
      await setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  },
};

module.exports = { languageDetectorPlugin };