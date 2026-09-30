import { mountPage } from "../layouts/pageLayout.js";

export function renderNotFoundPage() {
  mountPage({
    id: "notFound",
    title: "404",
    content: `<p>Page not found.</p>`,
  });
}
