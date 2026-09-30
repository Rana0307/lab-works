function renderPage(title, text) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="card">
          <h2>${title}</h2>
          <p>${text}</p>
        </div>
      </div>
    </section>
  `;
}

export const routes = {
  "#/home": () => renderPage("Home", "Welcome to the home page."),
  "#/search": () => renderPage("Search", "This is the search page."),
  "#/calculator": () => renderPage("Calculator", "This is the calculator page."),
  "#/books": () => renderPage("Books", "This is the books page."),
  "#/contact": () => renderPage("Contact", "This is the contact page."),
  "#/404": () => renderPage("404", "Page not found."),
};
