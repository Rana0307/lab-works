export function renderHomePage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="card">
          <h2>Home</h2>
          <p>Welcome to the home page.</p>
        </div>
      </div>
    </section>
  `;
}
