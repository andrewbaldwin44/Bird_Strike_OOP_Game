const GAME_WIDTH = 375;
const GAME_HEIGHT = window.innerHeight;

const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 156;
const MAX_ENEMIES = 3;

const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;

const BONUS_WIDTH = 60;
const BONUS_HEIGHT = 100;

const MAX_WIDTH = GAME_WIDTH - PLAYER_WIDTH;
const MAX_HEIGHT = GAME_HEIGHT - PLAYER_HEIGHT - 20;

const INVINCIBLE_DURATION = 1000;

const IMAGE_ROOT = './assets/images';
const BACKGROUND_IMAGE = `${IMAGE_ROOT}/stars.png`;
const PLAYER_IMAGE_DEFAULT = `${IMAGE_ROOT}/player.png`;
const PLAYER_IMAGE_HAPPY = `${IMAGE_ROOT}/player_happy.png`;
const PLAYER_IMAGE_SAD = `${IMAGE_ROOT}/player_sad.png`;
const PLAYER_IMAGE_DIED = `${IMAGE_ROOT}/playerdied.png`;
const ENEMY_SPRITES = `${IMAGE_ROOT}/enemy_sprite`;
const BACON_BONUS = `${IMAGE_ROOT}/bacon.png`;

const SOUND_ROOT = './assets/sounds';
const BACKGROUND_SOUND = new Audio(`${SOUND_ROOT}/nyan.mp3`);
const CHOMP_SOUND = new Audio(`${SOUND_ROOT}/chomp.mp3`);

BACKGROUND_SOUND.volume = 0.03;
CHOMP_SOUND.volume = 0.2;
