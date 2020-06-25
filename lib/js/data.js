const GAME_WIDTH = 375;
const GAME_HEIGHT = window.innerHeight;

const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 156;
const MAX_ENEMIES = 3;

const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;

const MAX_WIDTH = GAME_WIDTH - PLAYER_WIDTH;
const MAX_HEIGHT = GAME_HEIGHT - PLAYER_HEIGHT - 20;

const INVINCIBLE_DURATION = 1000;

const IMAGE_ROOT = './assets/images';
const BACKGROUND_IMAGE = `${IMAGE_ROOT}/stars.png`;
const PLAYER_IMAGE_RIGHT = `${IMAGE_ROOT}/player_right.png`;
const PLAYER_IMAGE_LEFT = `${IMAGE_ROOT}/player.png`;
const PLAYER_IMAGE_DIED = `${IMAGE_ROOT}/playerdied.png`;
const ENEMY_SPRITES = `${IMAGE_ROOT}/enemy_sprite`;
