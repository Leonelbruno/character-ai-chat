import { describe, it, expect } from "vitest";
import { normalizeText, isValidMessage, createMessage, getRandomItem } from "../src/utils.js";

describe("normalizeText", () => {
    it("debería quitar espacios al inicio y al final", () => {
        expect(normalizeText("  hola  ")).toBe("hola");
    });

    it("debería retornar string vacío si recibe algo que no es texto", () => {
        expect(normalizeText(null)).toBe("");
    });
});

describe("isValidMessage", () => {
    it("debería retornar true para un mensaje válido", () => {
        expect(isValidMessage("hola")).toBe(true);
    });

    it("debería retornar false para un mensaje vacío", () => {
        expect(isValidMessage("   ")).toBe(false);
    });
});

describe("createMessage", () => {
    it("debería crear un mensaje con role y content", () => {
        const message = createMessage("user", " hola ");

        expect(message).toEqual({
            role: "user",
            content: "hola"
        });
    });
});

describe("getRandomItem", () => {
    it("debería retornar null si el array está vacío", () => {
        expect(getRandomItem([])).toBe(null);
    });

    it("debería retornar un elemento usando una función random controlada", () => {
        const items = ["a", "b", "c"];

        const result = getRandomItem(items, () => 0.5);

        expect(result).toBe("b");
    });
});