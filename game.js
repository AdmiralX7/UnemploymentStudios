// CS Student Job Quest - Main Game File
// A 2D platformer about a computer science student's journey

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Initialize game variables
let player;
let platforms;
let codeSnippets;
let bugs;
let skillPoints = 0;
let cursors;
let levelName = "Intro to Programming";
let currentLevel = 1;
let jumpButton;
let score = 0;
let collectibles;

// Create game instance
const game = new Phaser.Game(config);

// Preload game assets
function preload() {
    // Load images
    this.load.image('sky', 'assets/images/sky_background.png');
    this.load.image('ground', 'assets/images/ground_tile.png');
    this.load.image('code', 'assets/images/code_icon.png');
    this.load.image('bug', 'assets/images/bug_sprite.png');

    // AUDIO
    this.load.audio('bgm', 'assets/audio/background_loop.wav');
    this.load.audio('collect', 'assets/audio/collect_coin.wav');
    this.load.audio('jump', 'assets/audio/jump.wav');

    // Loading spritesheet for player character (CS student)
    this.load.spritesheet('student',
        'https://labs.phaser.io/assets/sprites/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

// Create game world
function create() {
    // Set background
    this.add.image(400, 300, 'sky');
    
    // Start background music
    this.sound.add('bgm', { loop: true, volume: 0.5 }).play();

    // Create a truly empty space in the middle white path - NO COLLIDERS AT ALL
    // This will ensure the player can move freely through the white area

    // Create platforms group for solid ground
    platforms = this.physics.add.staticGroup();
    
    // Create left and right ground platforms, positioned even further away
    platforms.create(120, 550, 'ground').setScale(0.4, 0.3).refreshBody();
    platforms.create(680, 550, 'ground').setScale(0.4, 0.3).refreshBody();
    
    // Create floating platforms using code symbols - these will be scattered
    codeSnippets = this.physics.add.staticGroup();
    
    // Scatter code platforms across the level in random but playable positions
    createCodePlatform(150, 450, codeSnippets, 0.15);
    createCodePlatform(300, 400, codeSnippets, 0.15);
    createCodePlatform(450, 350, codeSnippets, 0.15);
    createCodePlatform(600, 400, codeSnippets, 0.15);
    createCodePlatform(750, 450, codeSnippets, 0.15);
    
    createCodePlatform(200, 300, codeSnippets, 0.15);
    createCodePlatform(400, 250, codeSnippets, 0.15);
    createCodePlatform(600, 300, codeSnippets, 0.15);
    
    createCodePlatform(300, 150, codeSnippets, 0.15);
    createCodePlatform(500, 150, codeSnippets, 0.15);
    
    // Create collectible code snippets (separate from platforms)
    collectibles = this.physics.add.group();
    for (let i = 0; i < 6; i++) {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 300);
        const snippet = collectibles.create(x, y, 'code');
        snippet.setScale(0.08);
        snippet.setBounceY(0.8);
        snippet.setCollideWorldBounds(true);
    }

    // Create player character - spawn at the TOP of the white path
    player = this.physics.add.sprite(400, 100, 'student');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    // Player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('student', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'student', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('student', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Set up keyboard input - adding SPACE as an alternate jump key
    cursors = this.input.keyboard.createCursorKeys();
    jumpButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Create bugs (obstacles representing programming errors)
    bugs = this.physics.add.group();

    // Create bugs that bounce around
    createBug(200, 400, this);
    createBug(400, 300, this);
    createBug(600, 400, this);

    // Set up collisions
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, codeSnippets);
    this.physics.add.collider(collectibles, platforms);
    this.physics.add.collider(collectibles, codeSnippets);
    this.physics.add.collider(bugs, platforms);
    this.physics.add.collider(bugs, codeSnippets);

    // Collect code snippets when player overlaps with them
    this.physics.add.overlap(player, collectibles, collectCode, null, this);

    // Player loses skill points when hit by bugs
    this.physics.add.collider(player, bugs, hitBug, null, this);

    // Create score text
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });

    // Update the UI with initial values
    updateUI();
}

// Helper function to create a code platform (larger than collectibles)
function createCodePlatform(x, y, group, scale = 0.2) {
    const platform = group.create(x, y, 'code');
    platform.setScale(scale);
    platform.refreshBody();
    return platform;
}

// Game loop
function update() {
    // Player movement controls
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    // Improved jumping - make it work even if not precisely on a platform
    // Allow jumping if the player is on the ground OR nearly on the ground
    if ((cursors.up.isDown || jumpButton.isDown) && 
        (player.body.touching.down || player.body.y >= 550 || 
         (player.body.velocity.y >= -0.1 && player.body.velocity.y <= 0.1))) {
            player.setVelocityY(-450); // Much stronger jump
            this.sound.play('jump');
    }

    // Make bugs bounce around more actively
    bugs.children.iterate(function(bug) {
        // Randomly change horizontal direction
        if (Phaser.Math.Between(0, 100) === 0) {
            bug.setVelocityX(Phaser.Math.Between(-120, 120));
        }
        
        // Make bugs bounce more vigorously when they hit something
        if (bug.body.blocked.left || bug.body.blocked.right) {
            bug.setVelocityX(-bug.body.velocity.x * 1.1);
        }
        
        if (bug.body.blocked.up || bug.body.blocked.down) {
            bug.setVelocityY(-bug.body.velocity.y * 0.9);
        }
        
        // Make sure bugs don't get stuck
        if (bug.body.velocity.x === 0) {
            bug.setVelocityX(Phaser.Math.Between(-100, 100));
        }
        
        if (bug.body.velocity.y === 0 && !bug.body.blocked.down) {
            bug.setVelocityY(Phaser.Math.Between(-100, 100));
        }
    });

    // Level advancement logic
    if (skillPoints >= 12 && currentLevel === 1) {
        advanceLevel();
    }
}

// Helper function to create a bug
function createBug(x, y, scene) {
    const bug = bugs.create(x, y, 'bug').setScale(0.08);
    bug.setBounce(0.9); // High bounce for more active movement
    bug.setCollideWorldBounds(true);
    bug.setVelocity(Phaser.Math.Between(-120, 120), Phaser.Math.Between(-50, 50));
    bug.allowGravity = true;
    
    // Make sure bugs don't spawn in the middle white path
    if (bug.x > 300 && bug.x < 500 && bug.y > 500) {
        bug.x = Phaser.Math.Between(0, 1) ? 200 : 600;
    }
    
    return bug;
}

// Collect code snippets and increase skill points
function collectCode(player, codeSnippet) {
    codeSnippet.disableBody(true, true);
    this.sound.play('collect');

    // Increase score
    skillPoints += 1;
    score += 10;
    
    // Update score display
    if (scoreText) {
        scoreText.setText('Score: ' + score);
    }

    // Update the UI
    updateUI();

    // If all code snippets are collected, create more and a new bug
    if (collectibles.countActive(true) === 0) {
        // Spawn new collectibles in better locations
        for (let i = 0; i < 6; i++) {
            const x = Phaser.Math.Between(50, 750);
            const y = Phaser.Math.Between(50, 300);
            const collectible = collectibles.create(x, y, 'code');
            collectible.setScale(0.08);
            collectible.setBounceY(0.8);
            collectible.setCollideWorldBounds(true);
        }

        // Spawn a new bouncy bug
        createBug(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 300), this);
    }
}

// Get hit by a bug and lose skill points
function hitBug(player, bug) {
    // Flash the camera to indicate getting hit
    this.cameras.main.flash(300);

    // Reduce skill points but don't go below 0
    if (skillPoints > 0) {
        skillPoints -= 1;
        updateUI();
    }

    // Knockback the player slightly
    const knockbackDirection = player.x < bug.x ? -1 : 1;
    player.setVelocity(knockbackDirection * 150, -150);
    
    // Make the bug bounce away
    bug.setVelocity(-knockbackDirection * 150, -150);
}

// Advance to the next level
function advanceLevel() {
    currentLevel++;

    // Change level name based on current level
    switch (currentLevel) {
        case 2:
            levelName = "Advanced Algorithms";
            break;
        case 3:
            levelName = "Internship Experience";
            break;
        case 4:
            levelName = "Final Job Interview";
            break;
        default:
            levelName = "Graduate - You Won!";
    }

    // Update the UI
    updateUI();

    // Increase difficulty by making bugs faster and more bouncy
    bugs.children.iterate(function (bug) {
        bug.setBounce(1);
        bug.setVelocity(Phaser.Math.Between(-150, 150), Phaser.Math.Between(-80, 80));
    });

    // Alert the player about the level change
    alert("Congratulations! You've advanced to: " + levelName);
}

// Update the UI elements
function updateUI() {
    document.getElementById('sp-count').textContent = skillPoints;
    document.getElementById('level-name').textContent = levelName;
}