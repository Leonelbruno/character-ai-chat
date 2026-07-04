import { characters } from "../characters.js";
import { setSelectedCharacter } from "../state.js";
import { navigateTo } from "../router.js";

export function renderHome() {
    const app = document.querySelector("#app");

    app.innerHTML = `
    <section class="view hero">
        <div class="section-card">
        <span class="eyebrow">POC con inteligencia artificial</span>

        <h1 class="page-title">Chateá con tu personaje favorito</h1>

        <p class="page-description">
            Elegí un personaje ficticio y comenzá una conversación interactiva.
            Esta aplicación usa routing SPA, diseño responsive y luego se conectará
            a Gemini mediante Vercel Functions.
        </p>

        <div class="actions">
            <button class="btn btn-primary" id="start-chat-btn">
            Empezar chat
            </button>

            <a href="/about" class="btn btn-secondary" data-link>
            Ver información
            </a>
        </div>
        </div>

        <div>
        <span class="eyebrow">Personajes disponibles</span>

        <div class="character-grid">
            ${characters
            .map(
                (character) => `
                <button class="character-card" data-character-id="${character.id}">
                    <div class="character-avatar">${character.avatar}</div>
                    <h3>${character.name}</h3>
                    <p class="character-franchise">${character.franchise}</p>
                    <p class="character-description">${character.description}</p>
                </button>
                `
            )
            .join("")}
        </div>
        </div>
    </section>
    `;

    document.querySelectorAll("[data-character-id]").forEach((card) => {
        card.addEventListener("click", () => {
            setSelectedCharacter(card.dataset.characterId);
            navigateTo("/chat");
        });
    });

    document.querySelector("#start-chat-btn").addEventListener("click", () => {
        navigateTo("/chat");
    });
}