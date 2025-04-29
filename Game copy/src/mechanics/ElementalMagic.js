```javascript
const Elements = {
    FIRE: 'Fire',
    WATER: 'Water',
    EARTH: 'Earth',
    AIR: 'Air',
};

class ElementalMagic {
    constructor(type, strength, duration, effectRadius) {
        if (!Object.values(Elements).includes(type)) {
            throw new Error(`Invalid element type: ${type}`);
        }
        this.type = type;
        this.strength = strength;
        this.duration = duration;
        this.effectRadius = effectRadius;
    }

    initiate() {
        console.log(`Initiating ${this.type} magic with strength ${this.strength}.`);
    }

    amplify(factor) {
        this.strength *= factor;
        console.log(`Amplified ${this.type} magic to strength ${this.strength}.`);
    }

    diminish(factor) {
        this.strength /= factor;
        console.log(`Diminished ${this.type} magic to strength ${this.strength}.`);
    }

    synergize(otherElementalMagic) {
        if (otherElementalMagic.type !== this.type) {
            console.log(`Synergizing ${this.type} with ${otherElementalMagic.type}.`);
        }
    }
}

class FireMagic extends ElementalMagic {
    constructor(strength, duration, effectRadius) {
        super(Elements.FIRE, strength, duration, effectRadius);
    }
}

class WaterMagic extends ElementalMagic {
    constructor(strength, duration, effectRadius) {
        super(Elements.WATER, strength, duration, effectRadius);
    }
}

function combineElements(element1, element2) {
    console.log(`Combining ${element1.type} with ${element2.type}`);
}

function calculateIntensity(strength, duration) {
    return strength * duration;
}

export { Elements, ElementalMagic, FireMagic, WaterMagic, combineElements };
```