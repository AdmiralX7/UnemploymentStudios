```javascript
class SupportCharacter {
    constructor(name, type, skills) {
        this.name = name;
        this.type = type;
        this.skills = skills;
        this.status = 'active';
    }
}

function decideInteraction(character, aeloriaState) {
    if (aeloriaState.inDanger) {
        return character.skills.includes('heal') ? 'heal' : 'defend';
    }
    return 'support';
}

function executeTeamwork(character, aeloria) {
    if (character.status === 'active') {
        const action = decideInteraction(character, aeloria.state);

        switch (action) {
            case 'heal':
                console.log(`${character.name} is healing Aeloria.`);
                break;
            case 'defend':
                console.log(`${character.name} is defending Aeloria.`);
                break;
            case 'support':
                console.log(`${character.name} is supporting Aeloria.`);
                break;
            default:
                console.log(`${character.name} is standing by.`);
        }
    }
}

function activateSkills(character, context) {
    character.skills.forEach(skill => {
        if (context.requires(skill)) {
            console.log(`${character.name} uses ${skill}.`);
        }
    });
}

function onEnemySpotted(character) {
    console.log(`${character.name} spotted an enemy.`);
}

let healer = new SupportCharacter('Elden', 'Healer', ['heal', 'buff']);
let aeloria = { state: { inDanger: true } };

executeTeamwork(healer, aeloria);
activateSkills(healer, { requires: (skill) => skill === 'buff' });
onEnemySpotted(healer);
```