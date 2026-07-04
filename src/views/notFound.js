import { navigateTo } from "../router.js";

export function renderNotFound() {
    const app = document.querySelector("#app");

    app.innerHTML = `
    <section class="view section-card">
        <span class="eyebrow">404</span>

        <h1 class="page-title">Ruta no encontrada</h1>

        <p class="page-description">
        La página que estás buscando no existe.
        </p>

        <div class="actions">
        <button class="btn btn-primary" id="go-home-btn">
            Volver al inicio
        </button>
        </div>
    </section>
    `;

    document.querySelector("#go-home-btn").addEventListener("click", () => {
        navigateTo("/home");
    });
}  