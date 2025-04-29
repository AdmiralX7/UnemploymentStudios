```javascript
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioAssets = {
  calm: 'audio/calm-track.mp3',
  actionPacked: 'audio/action-track.mp3',
  mysterious: 'audio/mystery-track.mp3'
};
let audioBuffers = {};
async function loadAudioAssets() {
  const loadBuffer = async (url) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return await audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error(`Error loading audio asset from ${url}:`, error);
    }
  };
  for (const [key, url] of Object.entries(audioAssets)) {
    audioBuffers[key] = await loadBuffer(url);
  }
}
loadAudioAssets();
const states = {
  CALM: 'Calm',
  ACTION: 'Action-Packed',
  MYSTERIOUS: 'Mysterious'
};
let currentState = states.CALM;
function changeState(newState) {
  if (currentState !== newState) {
    currentState = newState;
    adaptSoundtrack();
  }
}
document.addEventListener('gameEvent', (event) => {
  if (event.detail && event.detail.newState in states) {
    changeState(event.detail.newState);
  } else {
    console.warn('Invalid state received in game event');
  }
});
let currentSource = null;
function adaptSoundtrack() {
  if (currentSource) {
    fadeOutCurrentSource();
  }
  const newBuffer = audioBuffers[currentState.toLowerCase()];
  if (newBuffer) {
    playBuffer(newBuffer);
  } else {
    console.error('Audio buffer not found for state:', currentState);
  }
}
function playBuffer(buffer) {
  currentSource = audioContext.createBufferSource();
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
  currentSource.buffer = buffer;
  currentSource.connect(gainNode).connect(audioContext.destination);
  gainNode.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + 1);
  currentSource.start(0);
}
function fadeOutCurrentSource() {
  if (!currentSource) return;
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(1, audioContext.currentTime);
  currentSource.connect(gainNode).connect(audioContext.destination);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
  currentSource.stop(audioContext.currentTime + 1);
  currentSource = null;
}
async function handleErrors() {
  if (!audioContext) {
    console.error('Web Audio API is not supported in this browser');
  }
}
handleErrors();
```