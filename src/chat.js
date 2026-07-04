const mockReplies = {
    deadpool: [
        "Wow, gran mensaje. Casi llamo a los guionistas para que lo incluyan en la próxima escena.",
        "Te respondería con una explosión, pero el presupuesto del proyecto es de estudiante.",
        "Interesante. Muy interesante. O al menos eso diría si no estuviera atrapado en una SPA."
    ],
    rick: [
        "Mirá, técnicamente eso tiene sentido... más o menos. No lo arruinemos con demasiada emoción.",
        "Eso es básico, Morty. Bueno, no sos Morty, pero se entiende.",
        "La respuesta corta es sí. La larga implica ciencia, caos y probablemente una mala decisión."
    ],
    naruto: [
        "¡Claro! Lo importante es no rendirse y seguir intentando.",
        "Eso suena difícil, pero podés lograrlo si vas paso a paso.",
        "¡Esa es la actitud! Sigamos avanzando con energía."
    ]
};

export function setupMockChat(character) {
    const form = document.querySelector("#chat-form");
    const input = document.querySelector("#chat-input");
    const messages = document.querySelector("#messages");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const userMessage = input.value.trim();

        if (!userMessage) return;

        appendMessage(messages, userMessage, "user");
        input.value = "";

        const typing = appendTyping(messages);

        setTimeout(() => {
            typing.remove();

            const reply = getMockReply(character.id);
            appendMessage(messages, reply, "character");
        }, 700);
    });
}

function appendMessage(container, text, type) {
    const message = document.createElement("div");
    message.className = `message message-${type}`;
    message.textContent = text;

    container.appendChild(message);
    scrollToBottom(container);
}

function appendTyping(container) {
    const typing = document.createElement("div");
    typing.className = "typing";
    typing.textContent = "Escribiendo...";

    container.appendChild(typing);
    scrollToBottom(container);

    return typing;
}

function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
}

function getMockReply(characterId) {
    const replies = mockReplies[characterId] || mockReplies.naruto;
    const randomIndex = Math.floor(Math.random() * replies.length);

    return replies[randomIndex];
}