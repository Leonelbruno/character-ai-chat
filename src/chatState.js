//  Guardamos el historial del mensaje 

const chatHistories = {};

export function ensureCharacterHistory(character) {
    if (chatHistories[character.id]) return;

    chatHistories[character.id] = [
        {
            role: "character",
            content: `Soy ${character.name}. Todavía no estoy conectado a Gemini, pero ya puedo ayudarte a probar la interfaz.`
        }
    ];
}

export function getMessages(characterId) {
    return chatHistories[characterId] || [];
}

export function addMessage(characterId, message) {
    if (!chatHistories[characterId]) {
        chatHistories[characterId] = [];
    }

    chatHistories[characterId].push(message);
}

export function clearMessages(characterId) {
    chatHistories[characterId] = [];
}