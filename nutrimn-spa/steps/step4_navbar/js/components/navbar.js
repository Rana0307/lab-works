const LINKS = [
  { href: "#/home", label: "Home" },
  { href: "#/search", label: "Search" },
  { href: "#/calculator", label: "Calculator" },
  { href: "#/books", label: "Books" },
  { href: "#/contact", label: "Contact" },
];

export function renderNavbar() {
  const items = LINKS.map((l) => `<a href="${l.href}">${l.label}</a>`).join("");
  return `
    <header class="app-navbar">
      <div class="container">
        <a class="app-brand" href="#/home">
          <span class="dot"></span>
          <p style="margin:0"><span class="accent">Nutri</span>MN Food Database</p>
        </a>
        <button class="app-burger" id="burger" aria-label="menu" aria-expanded="false">&#9776;</button>
        <nav class="app-menu" id="menu">${items}</nav>
      </div>
    </header>
  `;
}

export function mountNavbar(root) {
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
}
