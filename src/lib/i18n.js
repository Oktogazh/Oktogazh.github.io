import { addMessages, init, getLocaleFromNavigator, locale } from 'svelte-i18n';

// Import translation files
import en from '../locales/en.json';
import fr from '../locales/fr.json'; // Add other languages as needed

// Add messages for each locale
addMessages('en', en);
addMessages('fr', fr);

// Initialize i18n
init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
});

// Export locale store for language switching
export { locale };