import { t, getCurrentLanguage } from "../i18n/i18n.js";
import { mountPage } from "../layouts/pageLayout.js";
import { loadData, foodName, CATEGORIES, NUTRIENTS } from "../services/nutritionService.js";
import { esc, fmt } from "../utils.js";

const FEATURED = ["goat", "horse", "aaruul", "airag", "yogurt", "seabuck"];

export async function renderHomePage() {
  mountPage({ id: "home", title: t("home.title"), content: `<p>${t("common.loading")}</p>` });
  try {
    const data = await loadData();
    if (window.location.hash && window.location.hash !== "#/home") return; // хэрэглэгч өөр хуудас руу шилжсэн
    const lang = getCurrentLanguage();
    const cards = FEATURED.map((id) => data.foods.find((f) => f.id === id)).filter(Boolean).map((f) => `
      <div class="food-card">
        <h3>${esc(foodName(f, lang))}</h3>
        <p class="kcal">${fmt(f.kcal)} <small>${t("nutrientShort.kcal")} / 100 г</small></p>
        <p>${t("nutrientShort.protein")}: ${fmt(f.protein)} г · ${t("nutrientShort.fat")}: ${fmt(f.fat)} г · ${t("nutrientShort.carbs")}: ${fmt(f.carbs)} г</p>
      </div>`).join("");
    mountPage({
      id: "home",
      title: t("home.title"),
      content: `
        <p class="lead">${t("home.intro")}</p>
        <div class="stats">
          <div class="stat"><strong>${data.foods.length}</strong><span>${t("home.foods")}</span></div>
          <div class="stat"><strong>${CATEGORIES.length}</strong><span>${t("home.categories")}</span></div>
          <div class="stat"><strong>${NUTRIENTS.length}</strong><span>${t("home.nutrients")}</span></div>
        </div>
        <h2 class="sub-title">${t("home.featured")}</h2>
        <div class="food-grid">${cards}</div>
        <p class="actions">
          <a class="btn primary" href="#/search">${t("home.goSearch")}</a>
          <a class="btn" href="#/calculator">${t("home.goCalc")}</a>
        </p>
        <p class="note">${esc(data.note[lang] ?? data.note.en)}</p>`,
    });
  } catch (err) {
    console.error(err);
    mountPage({ id: "home", title: t("home.title"), content: `<p class="error">${t("common.error")}</p>` });
  }
}
