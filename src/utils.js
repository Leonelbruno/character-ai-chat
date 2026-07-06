// Funciones puras y testeables 

const mockReplies = {
    deadpool: [
        "Wow, gran mensaje. Casi llamo a Rick y Naruto para que opinen, pero seguro arruinaban mi escena.",
        "Eso suena como algo que diría un protagonista con exceso de trauma y poco presupuesto.",
        "Te respondería con una explosión, pero el desarrollador todavía está aprendiendo a conectar Gemini."
    ],
    rick: [
        "*burp* Mirá, eso es más simple de lo que parece, pero claro, la escuela nunca enseña lo útil.",
        "Morty probablemente entraría en pánico con esa pregunta, pero intentemos resolverlo sin destruir una dimensión.",
        "La respuesta corta es sí. La larga implica ciencia, caos y posiblemente una mala decisión."
    ],
    naruto: [
        "¡Claro! Lo importante es no rendirse y seguir avanzando paso a paso, ¡de veras!",
        "Antes yo era como tú, también dudaba mucho, pero aprendí que seguir intentando hace la diferencia.",
        "¡Esa es la actitud! Si querés lograr algo, tenés que darlo todo hasta el final."
    ]
};

export function normalizeText(text) {
    if (typeof text !== "string") return "";
    return text.trim();
}

export function isValidMessage(text) {
    return normalizeText(text).length > 0;
}

export function createMessage(role, content) {
    return {
        role,
        content: normalizeText(content)
    };
}

export function getRandomItem(items, randomFn = Math.random) {
    if (!Array.isArray(items) || items.length === 0) return null;

    const randomIndex = Math.floor(randomFn() * items.length);
    return items[randomIndex];
}

export function getMockReply(characterId) {
    const replies = mockReplies[characterId] || mockReplies.naruto;
    return getRandomItem(replies);
}