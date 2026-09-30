import { t, toggleLanguage } from "../i18n/i18n.js";

const LINKS = [
  { href: "#/home", key: "nav.home" },
  { href: "#/search", key: "nav.search" },
  { href: "#/calculator", key: "nav.calculator" },
  { href: "#/books", key: "nav.books" },
  { href: "#/contact", key: "nav.contact" },
];

export function renderNavbar() {
  const items = LINKS.map((l) => `<a href="${l.href}">${t(l.key)}</a>`).join("");
  return `
    <header class="app-navbar">
      <div class="container">
        <a class="app-brand" href="#/home">
          <span class="dot"></span>
          <p style="margin:0"><span class="accent">${t("nav.brandAccent")}</span>${t("nav.brand")}</p>
        </a>
        <button class="app-burger" id="burger" aria-label="menu" aria-expanded="false">&#9776;</button>
        <nav class="app-menu" id="menu">
          ${items}
          <button class="app-lang" id="langToggle">${t("nav.language")}</button>
        </nav>
      </div>
    </header>
  `;
}

// onLanguageChange: хэл солигдоход router-ийг дахин ажиллуулах callback
export function mountNavbar(root, onLanguageChange) {
  if (!root) return;
  root.innerHTML = renderNavbar();
  const burger = root.querySelector("#burger");
  const menu = root.querySelector("#menu");

  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => menu.classList.remove("open"))
  );
  root.querySelector("#langToggle").addEventListener("click", () => {
    toggleLanguage();
    mountNavbar(root, onLanguageChange); // navbar-г шинэ хэлээр дахин зурна (reload хийхгүй)
    onLanguageChange?.();
  });
}
