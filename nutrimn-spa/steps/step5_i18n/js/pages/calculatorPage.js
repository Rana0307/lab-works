import { t } from "../i18n/i18n.js";
import { mountPage } from "../layouts/pageLayout.js";

export function renderCalculatorPage() {
  mountPage({
    id: "calculator",
    title: t("calculator.title"),
    content: `<p>${t("calculator.text")}</p>`,
  });
}
