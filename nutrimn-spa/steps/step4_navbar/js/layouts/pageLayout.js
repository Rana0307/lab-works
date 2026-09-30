// Бүх page-д дахин ашиглагдах ерөнхий бүтэц:
// <section><div.container><h1>title</h1>content</div></section>
export function renderPageLayout({ id = "", title = "", content = "" }) {
  return `
    <section ${id ? `id="${id}"` : ""} class="section">
      <div class="container">
        ${title ? `<h1 class="page-title">${title}</h1>` : ""}
        <div class="card">${content}</div>
      </div>
    </section>
  `;
}

// Page бүрийн давтагдах кодыг нэг дор цуглуулсан туслах функц
export function mountPage(layoutOptions) {
  document.getElementById("app").innerHTML = renderPageLayout(layoutOptions);
}
