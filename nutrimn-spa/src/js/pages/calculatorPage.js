import { t, getCurrentLanguage } from "../i18n/i18n.js";
import { mountPage } from "../layouts/pageLayout.js";
import { loadData, foodName, calculateTotals, energyShare, NUTRIENTS } from "../services/nutritionService.js";
import { esc, fmt } from "../utils.js";

let items = []; // [{ food, grams }] - хэл солиход хадгалагдана

export async function renderCalculatorPage() {
  mountPage({ id: "calculator", title: t("calculator.title"), content: `<p>${t("common.loading")}</p>` });
  let data;
  try {
    data = await loadData();
  } catch (err) {
    console.error(err);
    mountPage({ id: "calculator", title: t("calculator.title"), content: `<p class="error">${t("common.error")}</p>` });
    return;
  }
  if (window.location.hash !== "#/calculator") return;

  const lang = getCurrentLanguage();
  const foodOptions = data.foods
    .map((f) => `<option value="${esc(f.id)}">${esc(foodName(f, lang))}</option>`).join("");

  mountPage({
    id: "calculator",
    title: t("calculator.title"),
    content: `
      <div class="toolbar">
        <select id="food" aria-label="${t("calculator.food")}">${foodOptions}</select>
        <input id="grams" type="number" min="1" step="1" value="100" aria-label="${t("calculator.grams")}" />
        <button id="add" class="btn primary">${t("calculator.add")}</button>
        <button id="clear" class="btn">${t("calculator.clear")}</button>
      </div>
      <p id="msg" class="error"></p>
      <div id="list" class="table-wrap"></div>
      <div id="share"></div>
      <p class="note">${esc(data.note[lang] ?? data.note.en)}</p>`,
  });

  function draw() {
    const list = document.getElementById("list");
    const share = document.getElementById("share");
    if (items.length === 0) {
      list.innerHTML = `<p>${t("calculator.empty")}</p>`;
      share.innerHTML = "";
      return;
    }
    const totals = calculateTotals(items);
    const head = `<th>${t("calculator.food")}</th><th class="num">${t("calculator.grams")}</th>` +
      NUTRIENTS.map((n) => `<th class="num">${t("nutrientShort." + n)}</th>`).join("") + "<th></th>";
    const rows = items.map((it, i) => `
      <tr>
        <td>${esc(foodName(it.food, lang))}</td>
        <td class="num">${fmt(it.grams)}</td>
        ${NUTRIENTS.map((n) => `<td class="num">${fmt((it.food[n] * it.grams) / 100)}</td>`).join("")}
        <td><button class="btn small" data-remove="${i}">${t("calculator.remove")}</button></td>
      </tr>`).join("");
    list.innerHTML = `
      <table class="data">
        <thead><tr>${head}</tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr>
          <th>${t("calculator.total")}</th><th class="num">${fmt(items.reduce((s, i) => s + i.grams, 0))}</th>
          ${NUTRIENTS.map((n) => `<th class="num" data-total="${n}">${fmt(totals[n])}</th>`).join("")}<th></th>
        </tr></tfoot>
      </table>`;
    const s = energyShare(totals);
    share.innerHTML = `
      <h2 class="sub-title">${t("calculator.share")}</h2>
      <div class="bar" role="img" aria-label="${t("calculator.share")}">
        <span class="seg protein" style="width:${s.protein}%">${fmt(s.protein)}%</span>
        <span class="seg carbs" style="width:${s.carbs}%">${fmt(s.carbs)}%</span>
        <span class="seg fat" style="width:${s.fat}%">${fmt(s.fat)}%</span>
      </div>
      <p class="legend"><i class="protein"></i>${t("calculator.protein")} <i class="carbs"></i>${t("calculator.carbs")} <i class="fat"></i>${t("calculator.fat")}</p>`;
    list.querySelectorAll("[data-remove]").forEach((b) =>
      b.addEventListener("click", () => { items.splice(Number(b.dataset.remove), 1); draw(); })
    );
  }

  document.getElementById("add").addEventListener("click", () => {
    const grams = Number(document.getElementById("grams").value);
    const msg = document.getElementById("msg");
    if (!Number.isFinite(grams) || grams <= 0) { msg.textContent = t("calculator.invalid"); return; }
    msg.textContent = "";
    const food = data.foods.find((f) => f.id === document.getElementById("food").value);
    items.push({ food, grams });
    draw();
  });
  document.getElementById("clear").addEventListener("click", () => { items = []; draw(); });
  draw();
}
