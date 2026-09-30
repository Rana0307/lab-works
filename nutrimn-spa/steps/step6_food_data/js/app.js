import { mountNavbar } from "./components/navbar.js";
import { initRouter } from "./router.js";
import { routes } from "./routes.js";
import { getCurrentLanguage, setLanguage } from "./i18n/i18n.js";

setLanguage(getCurrentLanguage());
const rerender = initRouter(routes);
mountNavbar(document.getElementById("navbar"), rerender);
