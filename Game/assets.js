```javascript
/**
 * assets.js
 *
 * This file serves as a central registry for asset management and metadata for the game.
 * Its purpose is to maintain organization and provide a single source of truth for all asset-related data.
 *
 * Usage Instructions:
 * - Use this file to retrieve, update, or interact with game assets through defined utility functions.
 * - Ensure to update this file when adding new assets or changing existing asset metadata.
 */

// Asset Types Section
const AssetTypes = {
    IMAGES: 'images',
    AUDIO: 'audio',
    VIDEO: 'video',
    ANIMATIONS: 'animations',
    // Add more types as necessary
};

// Asset Constants Declaration
const ImageAssets = {
    PLAYER: {
        key: 'player',
        path: 'assets/images/player.png',
        metadata: {
            width: 64,
            height: 64,
        },
    },
    ENEMY: {
        key: 'enemy',
        path: 'assets/images/enemy.png',
        metadata: {
            width: 64,
            height: 64,
        },
    },
    // Add more image assets here
};

const AudioAssets = {
    BACKGROUND_MUSIC: {
        key: 'backgroundMusic',
        path: 'assets/audio/background.mp3',
        metadata: {
            duration: 120, // in seconds
        },
    },
    EXPLOSION: {
        key: 'explosion',
        path: 'assets/audio/explosion.wav',
        metadata: {
            duration: 3,
        },
    },
    // Add more audio assets here
};

// Asset Metadata Section
/**
 * Image Metadata: { width: number, height: number }
 * Audio Metadata: { duration: number }
 * Video Metadata: { resolution: string, duration: number }
 * Animation Metadata: { frameRate: number, frames: number }
 */

// Utility Functions Section
function getAssetByKey(type, key) {
    const assetCollections = {
        [AssetTypes.IMAGES]: ImageAssets,
        [AssetTypes.AUDIO]: AudioAssets,
        // Add other asset types here
    };

    const assetCollection = assetCollections[type];
    if (!assetCollection) {
        throw new Error(`Unsupported asset type: ${type}`);
    }

    const asset = assetCollection[key];
    if (!asset) {
        throw new Error(`Asset not found with key: ${key}`);
    }
    return asset;
}

function updateAssetPath(type, key, newPath) {
    const asset = getAssetByKey(type, key);
    asset.path = newPath;
}

function updateAssetMetadata(type, key, newMetadata) {
    const asset = getAssetByKey(type, key);
    asset.metadata = { ...asset.metadata, ...newMetadata };
}

// Integration Instructions
/**
 * To use assets.js, import it into your game scripts as needed:
 *
 * import { getAssetByKey, updateAssetPath, updateAssetMetadata } from './assets';
 *
 * Example:
 * const playerImage = getAssetByKey(AssetTypes.IMAGES, 'player');
 * console.log(playerImage.path);
 */
```