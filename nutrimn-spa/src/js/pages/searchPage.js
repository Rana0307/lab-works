import { t, getCurrentLanguage } from "../i18n/i18n.js";
import { mountPage } from "../layouts/pageLayout.js";
import { loadData, searchFoods, sortFoods, foodName, NUTRIENTS, CATEGORIES } from "../services/nutritionService.js";
import { esc, fmt } from "../utils.js";

// Төлөв module-д хадгалагдана: хэл солиход хайлт устахгүй
const state = { query: "", category: "all", sortKey: "name", dir: "asc" };

export async function renderSearchPage() {
  mountPage({ id: "search", title: t("search.title"), content: `<p>${t("common.loading")}</p>` });
  let data;
  try {
    data = await loadData();
  } catch (err) {
    console.error(err);
    mountPage({ id: "search", title: t("search.title"), content: `<p class="error">${t("common.error")}</p>` });
    return;
  }
  if (window.location.hash !== "#/search") return;

  const lang = getCurrentLanguage();
  const options = ["all", ...CATEGORIES]
    .map((c) => `<option value="${c}" ${c === state.category ? "selected" : ""}>${t("category." + c)}</option>`)
    .join("");

  mountPage({
    id: "search",
    title: t("search.title"),
    content: `
      <div class="toolbar">
        <input id="q" type="search" placeholder="${esc(t("search.placeholder"))}" value="${esc(state.query)}" />
        <select id="cat">${options}</select>
      </div>
      <p id="count" class="count"></p>
      <div id="results" class="table-wrap"></div>
      <p class="note">${esc(data.note[lang] ?? data.note.en)}</p>`,
  });

  function draw() {
    const list = sortFoods(searchFoods(data.foods, state), state.sortKey, state.dir, lang);
    document.getElementById("count").textContent = `${list.length} ${t("search.results")} · ${t("common.per100")}`;
    const arrow = (k) => (state.sortKey === k ? (state.dir === "asc" ? " ▲" : " ▼") : "");
    const head = [`<th data-sort="name">${t("search.name")}${arrow("name")}</th>`]
      .concat(NUTRIENTS.map((n) => `<th data-sort="${n}" class="num">${t("nutrientShort." + n)}${arrow(n)}</th>`))
      .join("");
    const rows = list.map((f) => `
      <tr>
        <td><strong>${esc(foodName(f, lang))}</strong><br /><small>${t("category." + f.category)}</small></td>
        ${NUTRIENTS.map((n) => `<td class="num">${fmt(f[n])}</td>`).join("")}
      </tr>`).join("");
    document.getElementById("results").innerHTML = list.length
      ? `<table class="data"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`
      : `<p>${t("search.none")}</p>`;
    document.querySelectorAll("#results th[data-sort]").forEach((th) =>
      th.addEventListener("click", () => {
        const key = th.dataset.sort;
        state.dir = state.sortKey === key && state.dir === "asc" ? "desc" : "asc";
        state.sortKey = key;
        draw();
      })
    );
  }

  document.getElementById("q").addEventListener("input", (e) => { state.query = e.target.value; draw(); });
  document.getElementById("cat").addEventListener("change", (e) => { state.category = e.target.value; draw(); });
  draw();
}
