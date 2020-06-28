const GAME_WIDTH = 450;
const GAME_HEIGHT = window.innerHeight;
const GAME_PADDING = 20;

const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 130;
const ENEMY_SPEED_OFFSET = 0.25;
const ENEMY_SPEED_MAX = 25;
const ENEMY_SPEED_MIN = 20;
const MAX_ENEMIES = 3;
const ENEMY_SPRITES_QUANTITY = 12;
const ENEMY_SPRITE_SPEED = 200;

const LANES = GAME_WIDTH / ENEMY_WIDTH;

const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;
const PLAYER_DEFAULT_LIVES = 3;
const PLAYER_MOVEMENT = 8;
const PLAYER_SPRITES_QUANTITY = 7;
const PLAYER_SPRITE_SPEED = 200;

const BULLET_WIDTH = 50;
const BULLET_HEIGHT = 40;

const BONUS_WIDTH = 60;
const BONUS_HEIGHT = 100;
const BONUS_MAX_SPEED = 2;
const BONUS_MIN_SPEED = 1;
const BONUS_MOVEMENT = 4;
const BONUS_CHANCE = 100;
const BONUS_SCORE = 100000;

const MAX_WIDTH = GAME_WIDTH - PLAYER_WIDTH;
const MAX_HEIGHT = GAME_HEIGHT - PLAYER_HEIGHT - GAME_PADDING;

const INVINCIBLE_DURATION = 1000;
const SCORE_INCREMENT = 100;
const NEW_GAME_TIMEOUT = 300;

const IMAGE_ROOT = './assets/images';
const BACKGROUND_IMAGE = `${IMAGE_ROOT}/cloud.png`;
const PLAYER_DEFAULT = `${IMAGE_ROOT}/player.png`;
const PLAYER_BULLET = `${IMAGE_ROOT}/redbullet.png`;
const ENEMY_DEFAULT = `${IMAGE_ROOT}/enemy.png`;
const BACON_BONUS = `${IMAGE_ROOT}/bacon.png`;
const EXPLOSION = `${IMAGE_ROOT}/explosion.png`;

const SOUND_ROOT = './assets/sounds';
const BACKGROUND_SOUND = new Audio(`${SOUND_ROOT}/nyan.mp3`);
const CHOMP_SOUND = new Audio(`${SOUND_ROOT}/chomp.mp3`);
const HIT_SOUND = new Audio(`${SOUND_ROOT}/hit.mp3`);
const FINAL_HIT = new Audio(`${SOUND_ROOT}/finalhit.mp3`);

BACKGROUND_SOUND.volume = 0.03;
CHOMP_SOUND.volume = 0.2;
HIT_SOUND.volume = 0.5;
FINAL_HIT.volume = 0.3;
