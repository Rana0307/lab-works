// Data layer: JSON өгөгдлийг ачаалах, хайх, тооцоолох. UI-ийн код энд байхгүй.
export const NUTRIENTS = ["kcal", "protein", "fat", "carbs", "fiber", "calcium", "iron"];
export const CATEGORIES = ["meat", "dairy", "grains", "vegetables", "fruits", "other"];

let cache = null;

export async function loadData() {
  if (cache) return cache;
  const res = await fetch("./data/nutritions.json");
  if (!res.ok) throw new Error(`nutritions.json ачаалж чадсангүй (${res.status})`);
  cache = await res.json();
  return cache;
}

export function foodName(food, lang) {
  return food.name[lang] ?? food.name.en;
}

// Нэрээр (МН, EN аль ч хэлээр) болон ангилалаар шүүнэ
export function searchFoods(foods, { query = "", category = "all" } = {}) {
  const q = query.trim().toLowerCase();
  return foods.filter((f) => {
    const okCategory = category === "all" || f.category === category;
    const okQuery = !q || Object.values(f.name).some((n) => n.toLowerCase().includes(q));
    return okCategory && okQuery;
  });
}

export function sortFoods(foods, key, dir, lang) {
  const sign = dir === "desc" ? -1 : 1;
  return [...foods].sort((a, b) =>
    key === "name"
      ? sign * foodName(a, lang).localeCompare(foodName(b, lang), lang)
      : sign * (a[key] - b[key])
  );
}

// items: [{ food, grams }] -> нийт тэжээллэг бодис (100 г-д ноогдох утгыг граммаар үржүүлнэ)
export function calculateTotals(items) {
  const totals = Object.fromEntries(NUTRIENTS.map((n) => [n, 0]));
  for (const { food, grams } of items) {
    for (const n of NUTRIENTS) totals[n] += (food[n] * grams) / 100;
  }
  return totals;
}

// Илчлэгийн хуваарилалт (уураг, нүүрс ус 4 ккал/г; өөх 9 ккал/г)
export function energyShare(totals) {
  const p = totals.protein * 4, c = totals.carbs * 4, f = totals.fat * 9;
  const sum = p + c + f;
  if (sum === 0) return { protein: 0, carbs: 0, fat: 0 };
  return { protein: (p / sum) * 100, carbs: (c / sum) * 100, fat: (f / sum) * 100 };
}
