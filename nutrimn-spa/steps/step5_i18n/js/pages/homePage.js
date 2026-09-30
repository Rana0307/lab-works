import { t } from "../i18n/i18n.js";
import { mountPage } from "../layouts/pageLayout.js";

export function renderHomePage() {
  mountPage({
    id: "home",
    title: t("home.title"),
    content: `<p>${t("home.text")}</p>`,
  });
}
