import { renderHomePage } from "./pages/homePage.js";
import { renderSearchPage } from "./pages/searchPage.js";
import { renderCalculatorPage } from "./pages/calculatorPage.js";
import { renderBooksPage } from "./pages/booksPage.js";
import { renderContactPage } from "./pages/contactPage.js";
import { renderNotFoundPage } from "./pages/notFoundPage.js";

export const routes = {
  "#/home": renderHomePage,
  "#/search": renderSearchPage,
  "#/calculator": renderCalculatorPage,
  "#/books": renderBooksPage,
  "#/contact": renderContactPage,
  "#/404": renderNotFoundPage,
};
