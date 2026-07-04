export function renderAbout() {
    const app = document.querySelector("#app");

    app.innerHTML = `
    <section class="view section-card">
        <span class="eyebrow">Sobre el proyecto</span>

        <h1 class="page-title">ComicSansCon AI Chat</h1>

        <p class="page-description">
        Esta aplicación es una Single Page Application responsive que permite
        chatear con personajes ficticios usando inteligencia artificial.
        El objetivo es practicar routing con History API, manejo de estado,
        consumo de APIs, Vercel Functions, variables de entorno y testing.
        </p>

        <div class="info-grid">
        <article class="info-card">
            <h3>SPA</h3>
            <p>
            La navegación entre Home, Chat y About ocurre sin recargar la página.
            </p>
        </article>

        <article class="info-card">
            <h3>AI segura</h3>
            <p>
            La API key no estará en el frontend. Gemini será llamado desde una
            serverless function en Vercel.
            </p>
        </article>

        <article class="info-card">
            <h3>Personajes</h3>
            <p>
            La app tendrá personajes con personalidades distintas:
            Deadpool, Rick Sanchez y Naruto Uzumaki.
            </p>
        </article>
        </div>
    </section>
    `;
}