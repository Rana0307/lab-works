import { t } from "../i18n/i18n.js";
import { mountPage } from "../layouts/pageLayout.js";

export function renderBooksPage() {
  mountPage({
    id: "books",
    title: t("books.title"),
    content: `<p>${t("books.text")}</p>`,
  });
}
