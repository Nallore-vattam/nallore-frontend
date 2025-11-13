// utils/translate.js - Optional backup utility
import { translations } from '../context/LanguageContext'; // Adjust path as needed

/**
 * Manual translation utility using pre-loaded translations
 * No API calls - uses the translations from LanguageContext
 */
export const translateText = async (text, targetLang) => {
  if (targetLang === "en") return text;
  
  // Use pre-loaded translations from your context
  const translated = translations[targetLang]?.[text];
  
  if (translated) {
    return translated;
  }
  
  console.warn(`Translation not found for: "${text}" in ${targetLang}`);
  return text; // Fallback to original text
};

/**
 * Alternative: Direct sync translation (no async needed)
 */
export const translateTextSync = (text, targetLang) => {
  if (targetLang === "en") return text;
  return translations[targetLang]?.[text] || text;
};