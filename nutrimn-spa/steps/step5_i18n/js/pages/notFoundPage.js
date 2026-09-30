import { t } from "../i18n/i18n.js";
import { mountPage } from "../layouts/pageLayout.js";

export function renderNotFoundPage() {
  mountPage({
    id: "notFound",
    title: t("notFound.title"),
    content: `<p>${t("notFound.text")}</p>`,
  });
}
