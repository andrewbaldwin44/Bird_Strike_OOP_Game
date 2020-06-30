const GAME_WIDTH = 450;
const GAME_HEIGHT = window.innerHeight;
const GAME_PADDING = 20;

const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 130;
const ENEMY_SPEED_OFFSET = 0.25;
const ENEMY_SPEED_MAX = 25;
const ENEMY_SPEED_MIN = 20;
const MAX_ENEMIES = 3;
let enemy_speed_max = ENEMY_SPEED_MAX;
let enemy_speed_min = ENEMY_SPEED_MIN;
let max_enemies = MAX_ENEMIES;
const ENEMY_CHANCE = 20;
const ENEMY_BULLET_OFFSET = ENEMY_WIDTH - 40;
const ENEMY_BOSS_WIDTH = 230;
const ENEMY_BOSS_HEIGHT = 270;
const ENEMY_BOSS_LANE = 0.5;
const ENEMY_BOSS_BULLET_OFFSET_X = ENEMY_BOSS_WIDTH + 110;
const ENEMY_BOSS_BULLET_OFFSET_Y = 30;
const ENEMY_SHOOT_SPEED = 1000
let enemy_shoot_speed = ENEMY_SHOOT_SPEED;

const LANES = GAME_WIDTH / ENEMY_WIDTH;
const BOSS_APPEARENCE = 60;
const BOSS_Y_POS = 50;
const BOSS_LIVES = 20;
let boss_lives = BOSS_LIVES;
const DIFFICULTY = 5;

const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;
const PLAYER_DEFAULT_LIVES = 3;
const PLAYER_MOVEMENT = 8;

const BULLET_WIDTH = 50;
const BULLET_HEIGHT = 40;
const BULLET_OFFSET = 30;

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
let background_image = `${IMAGE_ROOT}/cloud.png`;
let player_default_image = `${IMAGE_ROOT}/player.png`;
let player_bullet_image = `${IMAGE_ROOT}/playerbullet.png`;
let enemy_default_image = `${IMAGE_ROOT}/enemy.png`;
let enemy_second_image = `${IMAGE_ROOT}/enemygold.png`;
let enemy_third_image = `${IMAGE_ROOT}/enemyblack.png`;
let enemy_bullet_image = `${IMAGE_ROOT}/enemybullet.png`;
let enemy_boss_image = `${IMAGE_ROOT}/enemyboss.png`;
let bonus_default_image = `${IMAGE_ROOT}/bacon.png`;
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
