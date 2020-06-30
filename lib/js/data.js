const GAME_WIDTH = 450;
const GAME_HEIGHT = window.innerHeight;
const GAME_PADDING = 20;
const GAME_PADDING_Y = 10;
const X_CENTER = GAME_WIDTH / 2;
const Y_CENTER = GAME_WIDTH / 2;

const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 130;
const ENEMY_SPEED_OFFSET = 0.25;
const ENEMY_SPEED_MAX = 25;
const ENEMY_SPEED_MIN = 20;
const ENEMY_SPEED_1 = 1.5;
const ENEMY_SPEED_2 = 0.05;
const MAX_ENEMIES = 3;
let enemy_speed_max = ENEMY_SPEED_MAX;
let enemy_speed_min = ENEMY_SPEED_MIN;
let max_enemies = MAX_ENEMIES;
const ENEMY_CHANCE = 20;
const ENEMY_BULLET_OFFSET = ENEMY_WIDTH - 40;
const ENEMY_KILL_SCORE = 100;
let enemy_kill_score = 100;

const ENEMY_BOSS_WIDTH = 230;
const ENEMY_BOSS_HEIGHT = 270;
const ENEMY_BOSS_LANE = 0.5;
const ENEMY_BOSS_BULLET_OFFSET_X = ENEMY_BOSS_WIDTH + 110;
const ENEMY_BOSS_BULLET_OFFSET_Y = 30;
const ENEMY_SHOOT_SPEED = 1000
let enemy_shoot_speed = ENEMY_SHOOT_SPEED;
const BOSS_MINIONS = 2;
let boss_minions = BOSS_MINIONS;

const EXPLOSION_HEIGHT = 120;
const EXPLOSION_WIDTH = 100;
const EXPLOSION_DURATION = 200;

const LANES = GAME_WIDTH / ENEMY_WIDTH;
const BOSS_APPEARENCE = 60;
const BOSS_Y_POS = 50;
const BOSS_LIVES = 20;
let boss_lives = BOSS_LIVES;
const BOSS_KILL_SCORE = 1000000;
let boss_kill_score = BOSS_KILL_SCORE;

const DIFFICULTY = 5;
const MAX_DIFFICULTY_ENEMIES = 4;
const MAX_MINIONS = 3;
const SHOOT_SPEED_INCREMENT = 1.2;
const SCORE_MULTIPLIER = 10;
const KILL_SCORE_INCREMENT = 2;

const PLAYER_WIDTH = 75;
const PLAYER_HEIGHT = 54;
const PLAYER_DEFAULT_LIVES = 3;
const PLAYER_MOVEMENT = 8;
const PLAYER_SHOOT_SPEED = 400;

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
let bonus_score = BONUS_SCORE;

const HEART_WIDTH = 50;
const HEART_HEIGHT = 50;
const HEART_CHANCE = 15;

const MAX_WIDTH = GAME_WIDTH - PLAYER_WIDTH;
const MAX_HEIGHT = GAME_HEIGHT - PLAYER_HEIGHT - GAME_PADDING;

const INVINCIBLE_DURATION = 1000;
const SCORE_INCREMENT = 100;
let score_increment = SCORE_INCREMENT;
const NEW_GAME_TIMEOUT = 300;

const IMAGE_ROOT = './assets/images';
const BACKGROUND_IMAGE = `${IMAGE_ROOT}/cloud.png`;
const PLAYER_DEFAULT_IMAGE = `${IMAGE_ROOT}/player.png`;
const PLAYER_LIVES_IMAGE = `${IMAGE_ROOT}/playeroutline.png`;
const PLAYER_BULLET_IMAGE = `${IMAGE_ROOT}/playerbullet.png`;
const ENEMY_DEFAULT_IMAGE = `${IMAGE_ROOT}/enemy.png`;
const ENEMY_SECOND_IMAGE = `${IMAGE_ROOT}/enemygold.png`;
const ENEMY_THIRD_IMAGE = `${IMAGE_ROOT}/enemyblack.png`;
const ENEMY_BULLET_IMAGE = `${IMAGE_ROOT}/enemybullet.png`;
const ENEMY_BOSS_IMAGE = `${IMAGE_ROOT}/enemyboss.png`;

let background_image = BACKGROUND_IMAGE;
let player_default_image = PLAYER_DEFAULT_IMAGE;
let player_lives_image = PLAYER_LIVES_IMAGE;
let player_bullet_image = PLAYER_BULLET_IMAGE;
let enemy_default_image = ENEMY_DEFAULT_IMAGE;
let enemy_second_image = ENEMY_SECOND_IMAGE;
let enemy_third_image = ENEMY_THIRD_IMAGE;
let enemy_bullet_image = ENEMY_BULLET_IMAGE;
let enemy_boss_image = ENEMY_BOSS_IMAGE;

let BONUS_DEFAULT_IMAGE = `${IMAGE_ROOT}/bacon.png`;
const HEART = `${IMAGE_ROOT}/heart.png`;
const EXPLOSION = `${IMAGE_ROOT}/explosion.png`;

const LIBRARY = `${IMAGE_ROOT}/library.png`;
const PLAYER_SCOTT = `${IMAGE_ROOT}/scott.png`;
const ENEMY_RICHARD = `${IMAGE_ROOT}/richard.png`;
const ENEMY_DAN = `${IMAGE_ROOT}/dan.png`;
const ENEMY_SADNAN = `${IMAGE_ROOT}/sadnan.png`;
const SCOTT_BOSS = `${IMAGE_ROOT}/scott_boss.png`;

const SOUND_ROOT = './assets/sounds';
const BACKGROUND_SOUND = new Audio(`${SOUND_ROOT}/background.ogg`);
const BOSS_SOUND = new Audio(`${SOUND_ROOT}/boss.ogg`);
const ENEMY_1_SOUND = new Audio(`${SOUND_ROOT}/enemy1sound.mp3`);
const EXPLOSION_SOUND = new Audio(`${SOUND_ROOT}/explosion.mp3`);
const SHOOT_SOUND = new Audio(`${SOUND_ROOT}/shoot.mp3`);
const CHOMP_SOUND = new Audio(`${SOUND_ROOT}/chomp.mp3`);
const HIT_SOUND = new Audio(`${SOUND_ROOT}/hit.mp3`);
const FINAL_HIT = new Audio(`${SOUND_ROOT}/finalhit.mp3`);

BACKGROUND_SOUND.volume = 0.5;
BOSS_SOUND.volume = 0.5;
EXPLOSION_SOUND.volume = 0.6;
SHOOT_SOUND.volume = 0.5;
CHOMP_SOUND.volume = 0.5;
HIT_SOUND.volume = 0.5;
FINAL_HIT.volume = 0.3;
