```javascript
const GRAVITY = 0.5;
const JUMP_FORCE = 10;
const MOVE_SPEED = 5;
const AIR_CONTROL = 0.3;

let state = {
    grounded: false,
    jumping: false,
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0},
};

function handleMovement(input) {
    if (input.left) {
        state.velocity.x = Math.max(state.velocity.x - AIR_CONTROL, -MOVE_SPEED);
    } else if (input.right) {
        state.velocity.x = Math.min(state.velocity.x + AIR_CONTROL, MOVE_SPEED);
    } else {
        state.velocity.x *= state.grounded ? 0.8 : 0.9;
    }

    if (input.jump && state.grounded) {
        state.jumping = true;
        state.velocity.y = -JUMP_FORCE;
        state.grounded = false;
    }

    state.velocity.y += GRAVITY;
    updatePosition();
}

function checkCollisions(groundLevel) {
    if (state.position.y >= groundLevel) {
        state.grounded = true;
        state.velocity.y = 0;
        state.position.y = groundLevel;
    }
}

function updatePosition(groundLevel) {
    state.position.x += state.velocity.x;
    state.position.y += state.velocity.y;
    checkCollisions(groundLevel);
}

function debugLog() {
    console.log(`Position: (${state.position.x}, ${state.position.y}) Velocity: (${state.velocity.x}, ${state.velocity.y})`);
}

module.exports = {
    handleMovement,
    updatePosition,
    debugLog,
};
```