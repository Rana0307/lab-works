export function renderContactPage() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="card">
          <h2>Contact</h2>
          <p>This is the contact page.</p>
        </div>
      </div>
    </section>
  `;
}
