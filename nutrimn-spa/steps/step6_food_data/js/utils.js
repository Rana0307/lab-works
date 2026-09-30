// innerHTML-д оруулах текстийг escape хийж XSS-ээс сэргийлнэ
export function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// 154.00 -> "154", 12.345 -> "12.3"
export function fmt(n) {
  return String(Math.round(n * 10) / 10);
}
