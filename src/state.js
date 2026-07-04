import { characters } from "./characters.js";

const SELECTED_CHARACTER_KEY = "selectedCharacterId";

export function getSelectedCharacter() {
    const selectedId = sessionStorage.getItem(SELECTED_CHARACTER_KEY);

    return (
        characters.find((character) => character.id === selectedId) ||
        characters[0]
    );
}

export function setSelectedCharacter(characterId) {
    sessionStorage.setItem(SELECTED_CHARACTER_KEY, characterId);
}