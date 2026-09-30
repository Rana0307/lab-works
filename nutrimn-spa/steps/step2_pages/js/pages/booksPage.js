export function renderBooksPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="card">
          <h2>Books</h2>
          <p>This is the books page.</p>
        </div>
      </div>
    </section>
  `;
}
