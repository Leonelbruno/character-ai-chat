import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { characterId, systemPrompt, temperature, messages } = req.body;

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

        console.log("USE_MOCK_AI:", process.env.USE_MOCK_AI);

        if (process.env.USE_MOCK_AI === "true") {
            return res.status(200).json({
                reply: `[MOCK] Respuesta simulada de ${characterId}. No estoy usando Gemini.`
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                error: "La API key de Gemini no está configurada"
            });
        }

        if (!systemPrompt) {
            return res.status(400).json({
                error: "Falta el system prompt del personaje"
            });
        }

        const conversationText = messages
            .map((message) => {
                const speaker = message.role === "user" ? "Usuario" : "Personaje";
                return `${speaker}: ${message.content}`;
            })
            .join("\n");

        const prompt = `
${systemPrompt}

Estás participando en un chat con un usuario.
Respondé únicamente como el personaje indicado.
Usá respuestas breves, naturales y apropiadas para una conversación de chat.
Respondé en máximo 2 o 3 frases.
No cortes oraciones por la mitad.

Historial reciente:
${conversationText}

Respuesta del personaje:
`;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                temperature: Number(temperature) || 0.7,
                maxOutputTokens: 400,
                thinkingConfig: {
                    thinkingBudget: 0
                }
            }
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        return res.status(200).json({
            reply: text
        });
    } catch (error) {
        console.error("Error calling Gemini:", error);

        if (error.status === 429) {
            return res.status(429).json({
                error: "Se alcanzó el límite gratuito de Gemini. Probá de nuevo más tarde."
            });
        }

        return res.status(500).json({
            error: "Error generating response"
        });
    }
}

