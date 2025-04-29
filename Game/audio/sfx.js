```javascript
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const SOUND_EFFECTS_PATH = 'assets/sfx/';
const DEFAULT_VOLUME = 0.5;
const DEFAULT_FADE_DURATION = 1.0;

const audioBuffers = {};
const activeSources = {};

async function loadSoundEffect(effectName) {
    if (!audioBuffers[effectName]) {
        const response = await fetch(`${SOUND_EFFECTS_PATH}${effectName}.mp3`);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBuffers[effectName] = audioBuffer;
    }
}

function playSoundEffect(effectName, options = {}) {
    if (!audioBuffers[effectName]) {
        console.warn(`Sound effect "${effectName}" not loaded.`);
        return;
    }

    const { volume = DEFAULT_VOLUME, loop = false, startTime = 0 } = options;
    
    const audioBuffer = audioBuffers[effectName];
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = loop;

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

    source.connect(gainNode).connect(audioContext.destination);
    source.start(audioContext.currentTime + startTime);

    activeSources[effectName] = source;

    if (!loop) {
        source.onended = () => delete activeSources[effectName];
    }
}

function stopSoundEffect(effectName) {
    if (activeSources[effectName]) {
        activeSources[effectName].stop();
        delete activeSources[effectName];
    } else {
        console.warn(`Sound effect "${effectName}" is not currently playing.`);
    }
}

function onCollision() {
    playSoundEffect('collision');
}

function fadeOutSound(effectName, duration = DEFAULT_FADE_DURATION) {
    if (activeSources[effectName]) {
        const gainNode = audioContext.createGain();
        activeSources[effectName].connect(gainNode).connect(audioContext.destination);
        gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
    } else {
        console.warn(`Cannot fade out non-playing sound effect "${effectName}".`);
    }
}

console.log('audio/sfx.js module initialized. Ready to handle game sound effects efficiently.');
```