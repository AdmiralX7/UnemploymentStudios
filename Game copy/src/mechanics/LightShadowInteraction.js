```javascript
class LightSource {
  constructor(intensity = 1, direction = 0) {
    this.intensity = intensity;
    this.direction = direction;
  }

  setIntensity(newIntensity) {
    if (newIntensity >= 0) {
      this.intensity = newIntensity;
    }
  }

  setDirection(newDirection) {
    this.direction = newDirection % 360;
  }
}

class ShadowEntity {
  constructor() {
    this.currentShadow = { shape: 'undefined', size: 0 };
  }

  castShadow(lightSource) {
    if (lightSource.intensity > 0) {
      this.currentShadow = {
        shape: this.computeShadowShape(lightSource),
        size: this.computeShadowSize(lightSource)
      };
    }
  }

  computeShadowShape(lightSource) {
    return 'elongated';
  }

  computeShadowSize(lightSource) {
    return lightSource.intensity * 10; 
  }

  interactWithLight(lightSource) {
    const message = (lightSource.intensity > 0.5) ? 
      'Shadow retreats under strong light' : 
      'Shadow dominates in dim light';
    console.log(message);
  }
}

class PuzzleMechanics {
  constructor() {
    this.lightSources = [];
    this.shadowEntities = [];
    this.puzzleState = 'initial';
  }

  initialize() {
    this.addLightSource(new LightSource(1, 45));
    this.addShadowEntity(new ShadowEntity());

    this.updatePuzzleState();
  }

  addLightSource(lightSource) {
    if (lightSource instanceof LightSource) {
      this.lightSources.push(lightSource);
    }
  }

  addShadowEntity(shadowEntity) {
    if (shadowEntity instanceof ShadowEntity) {
      this.shadowEntities.push(shadowEntity);
    }
  }

  updatePuzzleState() {
    this.lightSources.forEach(source => {
      this.shadowEntities.forEach(shadow => {
        shadow.castShadow(source);
        shadow.interactWithLight(source);
      });
    });
  }

  resolveInternalConflict() {
    console.log('Resolving internal conflict by balancing light and shadow...');
  }
}

export { LightSource, ShadowEntity, PuzzleMechanics };
```