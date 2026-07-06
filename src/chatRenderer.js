// Renderizamos las vistas

export function renderMessages(container, messages) {
    container.innerHTML = "";

    messages.forEach((message) => {
        const messageElement = document.createElement("div");

        messageElement.classList.add("message");

        if (message.role === "user") {
            messageElement.classList.add("message-user");
        } else {
            messageElement.classList.add("message-character");
        }

        messageElement.textContent = message.content;

        container.appendChild(messageElement);
    });

    scrollToBottom(container);
}

export function showTyping(container) {
    const typing = document.createElement("div");
    typing.className = "typing";
    typing.textContent = "Escribiendo...";

    container.appendChild(typing);
    scrollToBottom(container);

    return typing;
}

export function setChatLoading(input, button, isLoading) {
    input.disabled = isLoading;
    button.disabled = isLoading;
}

export function showChatError(container, message) {
    const errorElement = document.createElement("div");
    errorElement.className = "message message-error";
    errorElement.textContent = message;

    container.appendChild(errorElement);
    scrollToBottom(container);
}

function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
}