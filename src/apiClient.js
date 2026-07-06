export async function sendChatMessage({ character, messages }) {
    const response = await fetch("/api/functions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            characterId: character.id,
            systemPrompt: character.systemPrompt,
            temperature: character.temperature,
            messages
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error al obtener respuesta del personaje");
    }

    return data;
}