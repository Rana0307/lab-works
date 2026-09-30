import { mountPage } from "../layouts/pageLayout.js";

export function renderContactPage() {
  mountPage({
    id: "contact",
    title: "Contact",
    content: `<p>This is the contact page.</p>`,
  });
}
