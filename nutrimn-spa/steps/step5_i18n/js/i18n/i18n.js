import { translations } from "./translations.js";

const DEFAULT_LANGUAGE = "mn";
const STORAGE_KEY = "nutrimn-lang";

export function getCurrentLanguage() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
}

export function setLanguage(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
}

// t("nav.home") -> одоогийн хэлний орчуулга. Олдохгүй бол түлхүүрийг буцаана
export function t(path) {
  let value = translations[getCurrentLanguage()];
  for (const key of path.split(".")) value = value?.[key];
  return value ?? path;
}

export function toggleLanguage() {
  const next = getCurrentLanguage() === "mn" ? "en" : "mn";
  setLanguage(next);
  return next;
}
