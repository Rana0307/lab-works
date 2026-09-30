import { t } from "../i18n/i18n.js";
import { mountPage } from "../layouts/pageLayout.js";

export function renderSearchPage() {
  mountPage({
    id: "search",
    title: t("search.title"),
    content: `<p>${t("search.text")}</p>`,
  });
}
