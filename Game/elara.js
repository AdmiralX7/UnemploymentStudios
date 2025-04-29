```javascript
import { loadAssets } from './elara-assets/assetLoader.js';
import { LightConstruct } from './elara-assets/lightConstruct.js';
import { CelestialMechanics } from './elara-assets/celestialMechanics.js';

let elara;
let isLightWeavingActive = false;
let isCelestialStepping = false;

function initializeElara() {
    elara = {
        position: { x: 0, y: 0 },
        abilities: {
            lightweaving: [],
            celestialStepActive: false
        }
    };
    loadAssets().then(() => {
        setupEventHandlers();
    });
}

initializeElara();

function activateLightweaving(targetX, targetY) {
    if (!isLightWeavingActive) {
        isLightWeavingActive = true;
        const construct = new LightConstruct(targetX, targetY);
        elara.abilities.lightweaving.push(construct);
        construct.create().then(() => {
            isLightWeavingActive = false;
        });
    }
}

function performCelestialStep(targetX, targetY) {
    if (!isCelestialStepping) {
        isCelestialStepping = true;
        elara.abilities.celestialStepActive = true;
        const stepMechanics = new CelestialMechanics(elara.position, { x: targetX, y: targetY });
        stepMechanics.executeStep().then(() => {
            elara.position = { x: targetX, y: targetY };
            elara.abilities.celestialStepActive = false;
            isCelestialStepping = false;
        });
    }
}

function setupEventHandlers() {
    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'KeyL':
                activateLightweaving(100, 100);
                break;
            case 'KeyC':
                performCelestialStep(200, 200);
                break;
        }
    });
}
```