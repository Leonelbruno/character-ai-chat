export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { characterId, messages } = req.body;

        if (!characterId) {
            return res.status(400).json({
                error: "Falta el personaje seleccionado"
            });
        }

        if (!Array.isArray(messages)) {
            return res.status(400).json({
                error: "El historial de mensajes no es válido"
            });
        }

        await new Promise((resolve) => setTimeout(resolve, 700));

        const mockReplies = {
            deadpool:
                "Ok, esto ya viajó hasta una serverless function. El desarrollador acaba de desbloquear un logro, más o menos.",
            rick:
                "*burp* Bien, ahora la request pasa por el backend. No es ciencia interdimensional, pero sirve.",
            naruto:
                "¡Bien hecho! Ahora el mensaje viaja hasta el backend y vuelve, ¡de veras!"
        };

        return res.status(200).json({
            reply: mockReplies[characterId] || "Respuesta simulada desde la serverless function."
        });
    } catch (error) {
        console.error("Error in mock function:", error);

        return res.status(500).json({
            error: "Error generating response"
        });
    }
}