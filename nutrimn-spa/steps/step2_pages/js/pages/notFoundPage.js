export function renderNotFoundPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="card">
          <h2>404</h2>
          <p>Page not found.</p>
        </div>
      </div>
    </section>
  `;
}
