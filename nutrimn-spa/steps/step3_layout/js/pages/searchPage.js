import { mountPage } from "../layouts/pageLayout.js";

export function renderSearchPage() {
  mountPage({
    id: "search",
    title: "Search",
    content: `<p>This is the search page.</p>`,
  });
}
