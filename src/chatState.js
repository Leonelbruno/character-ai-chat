//  Guardamos el historial del mensaje 

const chatHistories = {};

export function ensureCharacterHistory(character) {
    if (chatHistories[character.id]) return;

    chatHistories[character.id] = [];
}   

export function getMessages(characterId) {
    return chatHistories[characterId] || [];
}

export function getRecentMessages(characterId, limit = 8) {
    const messages = getMessages(characterId);
    return messages.slice(-limit);
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