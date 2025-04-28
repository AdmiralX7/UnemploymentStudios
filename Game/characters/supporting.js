```javascript
// characters/supporting.js

/**
 * This file manages supporting characters within the game, overseeing their interactions and role within the narrative framework.
 */

// Imports and Dependencies
import { gameState, updateGameState } from './main.js'; // Ensure to have main.js functions accessible

// Data Structures
class SupportingCharacter {
    constructor(name, role, abilities) {
        this.name = name;
        this.role = role;
        this.abilities = abilities;
        this.state = {};
    }
}

// Character Initialization
const supportingCharacters = [
    new SupportingCharacter('Ally', 'Guide', ['advise', 'navigate']),
    new SupportingCharacter('Merchant', 'Trader', ['sell', 'buy'])
];

// Interaction Logic
function interactWithCharacter(characterName, interactionType) {
    const character = supportingCharacters.find(char => char.name === characterName);
    if (!character) {
        console.warn(`Character ${characterName} not found!`);
        return;
    }

    switch(interactionType) {
        case 'greet':
            console.log(`${characterName} says hello!`);
            break;
        case 'assist':
            if (character.abilities.includes('advise')) {
                console.log(`${characterName} offers some advice.`);
            }
            break;
        default:
            console.log(`${characterName} doesn't understand the interaction.`);
    }

    updateGameState(characterName, interactionType); // Assume updateGameState is available from main.js
}

// Event Handlers
function onCharacterEvent(event) {
    console.log(`Event received for character: ${event.characterName}`);
    // Event handling logic goes here
}

// Integration Points with main.js
function syncWithMain(characterName) {
    console.log(`Synchronizing ${characterName}'s state with main game state.`);
    // Logic to sync character with main.js
}

// Testing and Debugging Aids
function logCharacterStates() {
    supportingCharacters.forEach(char => {
        console.log(`Character: ${char.name}, State: ${JSON.stringify(char.state)}`);
    });
}

// Exports
export { interactWithCharacter, onCharacterEvent, logCharacterStates };
```