import { mountPage } from "../layouts/pageLayout.js";

export function renderBooksPage() {
  mountPage({
    id: "books",
    title: "Books",
    content: `<p>This is the books page.</p>`,
  });
}
