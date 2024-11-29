import en from "../locales/en.json";
import ar from "../locales/ar.json";

const lang = (value) => {

  const lang = (localStorage.getItem("languageSet")) ? (localStorage.getItem("languageSet")) : "en";

  switch (lang) {
    case "en":
      return (en[value] || value);
    case "ar":
      return (ar[value] || value);
    default:
      return (en[value] || value);
  }
};

export function Capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default lang;
