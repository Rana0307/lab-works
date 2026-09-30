import { t } from "../i18n/i18n.js";
import { mountPage } from "../layouts/pageLayout.js";

export function renderContactPage() {
  mountPage({
    id: "contact",
    title: t("contact.title"),
    content: `<p>${t("contact.text")}</p>`,
  });
}
