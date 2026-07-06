import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { characterId, systemPrompt, temperature, messages } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                error: "La API key de Gemini no está configurada"
            });
        }

        if (!characterId) {
            return res.status(400).json({
                error: "Falta el personaje seleccionado"
            });
        }

        if (!systemPrompt) {
            return res.status(400).json({
                error: "Falta el system prompt del personaje"
            });
        }

        if (!Array.isArray(messages)) {
            return res.status(400).json({
                error: "El historial de mensajes no es válido"
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

Historial reciente:
${conversationText}

Respuesta del personaje:
`;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                temperature: Number(temperature) || 0.7,
                maxOutputTokens: 400
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

        return res.status(500).json({
            error: "Error generating response"
        });
    }
}

