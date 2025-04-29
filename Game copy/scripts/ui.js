```javascript
let playerHealth = 100;
let playerMagic = 50;

function initializeUI() {
    const healthElement = document.createElement('div');
    healthElement.id = 'health-bar';
    healthElement.textContent = `Health: ${playerHealth}`;
    document.body.appendChild(healthElement);

    const magicElement = document.createElement('div');
    magicElement.id = 'magic-bar';
    magicElement.textContent = `Magic: ${playerMagic}`;
    document.body.appendChild(magicElement);
}

function updateHealth(newHealth) {
    playerHealth = newHealth;
    const healthElement = document.getElementById('health-bar');
    if (healthElement) {
        healthElement.textContent = `Health: ${playerHealth}`;
    }
}

function updateMagic(newMagic) {
    playerMagic = newMagic;
    const magicElement = document.getElementById('magic-bar');
    if (magicElement) {
        magicElement.textContent = `Magic: ${playerMagic}`;
    }
}

function provideFeedback(type, change) {
    const feedbackElement = document.createElement('div');
    feedbackElement.className = `feedback ${type}`;
    feedbackElement.textContent = `${type} ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change)}`;
    document.body.appendChild(feedbackElement);

    setTimeout(() => {
        if (feedbackElement.parentElement) {
            document.body.removeChild(feedbackElement);
        }
    }, 2000);
}

function updateUI(type, value) {
    if (type === 'health') {
        const change = value - playerHealth;
        updateHealth(value);
        provideFeedback('Health', change);
    } else if (type === 'magic') {
        const change = value - playerMagic;
        updateMagic(value);
        provideFeedback('Magic', change);
    }
}

function handleError(message) {
    console.error(`UI Error: ${message}`);
}

try {
    initializeUI();
} catch (error) {
    handleError('Failed to initialize UI elements');
}
```