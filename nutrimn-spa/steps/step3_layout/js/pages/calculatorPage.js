import { mountPage } from "../layouts/pageLayout.js";

export function renderCalculatorPage() {
  mountPage({
    id: "calculator",
    title: "Calculator",
    content: `<p>This is the calculator page.</p>`,
  });
}
