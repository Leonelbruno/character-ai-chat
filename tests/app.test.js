import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendChatMessage } from "../src/apiClient.js";

describe("sendChatMessage", () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn();
    });

    it("debería enviar los datos correctos a la serverless function", async () => {
        const mockResponse = {
            reply: "Respuesta simulada"
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        const character = {
            id: "deadpool",
            systemPrompt: "Actúa como Deadpool",
            temperature: 0.8
        };

        const messages = [
            {
                role: "user",
                content: "Hola"
            }
        ];

        const result = await sendChatMessage({
            character,
            messages
        });

        expect(fetch).toHaveBeenCalledWith("/api/functions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                characterId: "deadpool",
                systemPrompt: "Actúa como Deadpool",
                temperature: 0.8,
                messages
            })
        });

        expect(result).toEqual(mockResponse);
    });

    it("debería lanzar un error si el backend responde con error", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({
                error: "Error del servidor"
            })
        });

        const character = {
            id: "rick",
            systemPrompt: "Actúa como Rick",
            temperature: 0.7
        };

        const messages = [
            {
                role: "user",
                content: "Hola"
            }
        ];

        await expect(
            sendChatMessage({
                character,
                messages
            })
        ).rejects.toThrow("Error del servidor");
    });
});