import { mountPage } from "../layouts/pageLayout.js";

export function renderHomePage() {
  mountPage({
    id: "home",
    title: "Home",
    content: `<p>Welcome to the home page.</p>`,
  });
}
