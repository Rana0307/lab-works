// Hash router: URL-ийн #/... хэсгээр page функцийг сонгож ажиллуулна
const DEFAULT_ROUTE = "#/home";

export function initRouter(routes) {
  function renderRoute() {
    const hash = window.location.hash || DEFAULT_ROUTE;
    const page = routes[hash] ?? routes["#/404"];
    if (page) page();
    // navbar-д идэвхтэй цэсийг тэмдэглэх
    document.querySelectorAll(".app-menu a[href^='#/']").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === hash);
    });
  }
  window.addEventListener("DOMContentLoaded", renderRoute);
  window.addEventListener("hashchange", renderRoute);
  return renderRoute; // хэл солих үед дахин зурахад хэрэгтэй
}
