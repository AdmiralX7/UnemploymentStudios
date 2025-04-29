```javascript
window.addEventListener('load', function () {
    const assets = {
        images: ['visual_assets/image1.png', 'visual_assets/image2.png'],
        audio: ['audio/sound1.mp3', 'audio/sound2.mp3']
    };

    const totalAssets = assets.images.length + assets.audio.length;
    let loadedAssets = 0;

    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');

    const updateProgress = () => {
        loadedAssets++;
        const percentage = (loadedAssets / totalAssets) * 100;
        progressBar.style.width = `${percentage}%`;

        if (loadedAssets === totalAssets) {
            completionCallback();
        }
    };

    const loadImage = (src) => {
        const img = new Image();
        img.onload = updateProgress;
        img.onerror = (e) => errorCallback(e, src);
        img.src = src;
    };

    const loadAudio = (src) => {
        const audio = new Audio();
        audio.oncanplaythrough = updateProgress;
        audio.onerror = (e) => errorCallback(e, src);
        audio.src = src;
        audio.load();
    };

    assets.images.forEach(src => loadImage(src));
    assets.audio.forEach(src => loadAudio(src));

    const completionCallback = () => {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            startGame();
        }, 500);
    };

    const errorCallback = (e, src) => {
        console.error(`Asset failed to load: ${src}`, e);
    };

    const startGame = () => {
        console.log("All assets loaded. Starting the game...");
    };
});
```