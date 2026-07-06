// Coordinamos el flujo del chat

import { ensureCharacterHistory, getMessages, getRecentMessages, addMessage } from "./chatState.js";
import { renderMessages, showTyping, setChatLoading, showChatError } from "./chatRenderer.js";
import { isValidMessage, createMessage } from "./utils.js";
import { sendChatMessage } from "./apiClient.js";

export function setupChat(character) {
    const form = document.querySelector("#chat-form");
    const input = document.querySelector("#chat-input");
    const sendButton = document.querySelector("#send-btn");
    const messagesContainer = document.querySelector("#messages");

    let isLoading = false;

    ensureCharacterHistory(character);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (isLoading) return;

        const userText = input.value;

        if (!isValidMessage(userText)) return;

        const userMessage = createMessage("user", userText);

        addMessage(character.id, userMessage);
        renderMessages(messagesContainer, getMessages(character.id));

        input.value = "";
        isLoading = true;
        setChatLoading(input, sendButton, true);

        const typingElement = showTyping(messagesContainer);

        setTimeout(async () => {
            try {
                typingElement.remove();

                const recentMessages = getRecentMessages(character.id, 8);

                const data = await sendChatMessage({
                    character,
                    messages: recentMessages
                });

                const characterMessage = createMessage("character", data.reply);

                addMessage(character.id, characterMessage);
                renderMessages(messagesContainer, getMessages(character.id));
            } catch (error) {
                showChatError(messagesContainer, "Ocurrió un error al generar la respuesta.");
            } finally {
                isLoading = false;
                setChatLoading(input, sendButton, false);
                input.focus();
            }
        }, 800);
    });
}