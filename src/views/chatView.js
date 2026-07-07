import { getSelectedCharacter } from "../state.js";
import { setupChat } from "../chat.js";

export function renderChat() {
    const app = document.querySelector("#app");
    const character = getSelectedCharacter();

    app.innerHTML = `
    <section class="view chat-layout">
        <header class="chat-header">
        <div class="character-avatar">
                    <img src="${character.avatar}" alt="${character.name}" class="character-img" /></div>

        <div>
            <h1 class="chat-title">Chat con ${character.name}</h1>
            <p class="chat-subtitle">${character.franchise} · Conectado con Gemini AI</p>
        </div>
        </header>

        <div id="messages" class="messages">
        <div class="message message-character">
            Soy ${character.name}. Todavía no estoy conectado a Gemini, pero ya puedo ayudarte a probar la interfaz.
        </div>
        </div>

        <form id="chat-form" class="chat-form">
        <input
            id="chat-input"
            class="chat-input"
            type="text"
            placeholder="Escribí tu mensaje..."
            autocomplete="off"
        />

        <button id="send-btn" class="btn btn-primary" type="submit">
        Enviar
        </button>
        </form>
    </section>
    `;

    setupChat(character);
}  