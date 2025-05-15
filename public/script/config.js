//GAME SETTINGS

const TILES_PER_ROW = 20;
const TILES_PER_COL = 10;
const APP_WIDTH = 800;
const APP_HEIGHT = 400;
const PDR_PER_ROUND = {
  0: 50,
  10: 100,
  20: 150,
  30: 200,
  40: 300,
  50: 400,
  75: 500,
  100: 1000,
};
const TILE_HEIGHT = APP_HEIGHT / TILES_PER_COL;
const TILE_WIDTH = APP_WIDTH / TILES_PER_ROW;

const GAME_SETTINGS = {
  TILES_PER_ROW,
  TILES_PER_COL,
  APP_WIDTH,
  APP_HEIGHT,
  PDR_PER_ROUND,
  TILE_HEIGHT,
  TILE_WIDTH,
};

// ENEMIES INFOS
const NORMAL_RAT = {
  BASE_HP: 15,
  BASE_MONEY: 5,
  TYPE: "normal",
  DAMAGE: 1,
  IMAGE: "normalRat",
  DEATH_IMAGE: "sfx",
};
const CAMO_RAT = {
  BASE_HP: 10,
  BASE_MONEY: 5,
  TYPE: "camo",
  DAMAGE: 1,
  IMAGE: "camoRat",
};
const STEEL_RAT = {
  BASE_HP: 40,
  BASE_MONEY: 10,
  TYPE: "steel",
  DAMAGE: 3,
  IMAGE: "steelRat",
};
const RAINBOW_RAT = {
  BASE_HP: 25,
  BASE_MONEY: 10,
  TYPE: "rainbow",
  DAMAGE: 2,
  IMAGE: "rainbowRat",
};

const ENEMY_INFOS = {
  NORMAL_RAT,
  CAMO_RAT,
  STEEL_RAT,
  RAINBOW_RAT,
};

// TOWER INFOS
const TOWER_TOME = {
  TYPE: "TOWER_TOME",
  BASE_ATK: 10,
  BASE_SHOT_SPEED: 1000,
  BASE_RANGE: 1.5,
  BASE_NB_SHOTS: 1,
  BASE_PRICE: 50,
  RAT_TYPE: ["normal"],
  IMAGE: "tomeFromage",
  IMAGEURL: "../public/assets/tomeFromage.png",
};
const TOWER_COMTE = {
  TYPE: "TOWER_COMTE",
  BASE_ATK: 10,
  BASE_SHOT_SPEED: 1000,
  BASE_RANGE: 2,
  BASE_NB_SHOTS: 1,
  BASE_PRICE: 100,
  RAT_TYPE: ["normal", "camo"],
  IMAGE: "comteFromage",
  IMAGEURL: "../public/assets/comteFromage.png",
};
const TOWER_CHEVRE = {
  TYPE: "TOWER_CHEVRE",
  BASE_ATK: 25,
  BASE_SHOT_SPEED: 1500,
  BASE_RANGE: 1.5,
  BASE_NB_SHOTS: 1,
  BASE_PRICE: 175,
  RAT_TYPE: ["normal", "rainbow"],
  IMAGE: "chevreFromage",
  IMAGEURL: "../public/assets/chevreFromage.png",
};
const TOWER_ROQUEFORT = {
  TYPE: "TOWER_ROQUEFORT",
  BASE_ATK: 40,
  BASE_SHOT_SPEED: 4000,
  BASE_RANGE: 3,
  BASE_NB_SHOTS: 1,
  BASE_PRICE: 350,
  RAT_TYPE: ["normal", "steel"],
  IMAGE: "roquefortFromage",
  IMAGEURL: "../public/assets/roquefortFromage.png",
};

const TOWER_INFOS = {
  TOWER_TOME,
  TOWER_COMTE,
  TOWER_CHEVRE,
  TOWER_ROQUEFORT,
};

// INGREDIENT INFOS
const INGREDIENT_MILK = {
  TYPE: "INGREDIENT_MILK",
  TYPE_BUFF: "attack",
  CURRENT_BUFF: 1.1,
  BASE_BUFF: 1.1,
  BASE_RANGE: 2,
  BASE_PRICE: 150,
  BASE_LEVEL: 0,
  LEVEL_TWO_STATS: {
    CURRENT_BUFF: 1.15,
    BASE_PRICE: 250,
    BASE_LEVEL: 1,
  },
  LEVEL_THREE_STATS: {
    CURRENT_BUFF: 1.2,
    BASE_PRICE: 400,
    BASE_LEVEL: 2,
  },
  IMAGE: "milkIngredient",
  IMAGEURL: "../public/assets/milkIngredient.png",
};
const INGREDIENT_PEPPER = {
  TYPE: "INGREDIENT_PEPPER",
  TYPE_BUFF: "rainbow",
  CURRENT_BUFF: 10,
  BASE_BUFF: 10,
  BASE_RANGE: 2,
  BASE_PRICE: 100,
  BASE_LEVEL: 0,
  IMAGE: "pepperIngredient",
  IMAGEURL: "../public/assets/pepperIngredient.png",
};
const INGREDIENT_FIGUE = {
  TYPE: "INGREDIENT_FIGUE",
  TYPE_BUFF: "range",
  CURRENT_BUFF: 0.5,
  BASE_BUFF: 0.25,
  BASE_RANGE: 2,
  BASE_PRICE: 75,
  BASE_LEVEL: 0,
  LEVEL_TWO_STATS: {
    CURRENT_BUFF: 0.5,
    BASE_PRICE: 125,
    BASE_LEVEL: 1,
  },
  LEVEL_THREE_STATS: {
    CURRENT_BUFF: 0.75,
    BASE_PRICE: 200,
    BASE_LEVEL: 2,
  },
  IMAGE: "figueIngredient",
  IMAGEURL: "../public/assets/figueIngredient.png",
};
const INGREDIENT_HERBE = {
  TYPE: "INGREDIENT_HERBE",
  TYPE_BUFF: "shot_speed",
  CURRENT_BUFF: 150,
  BASE_BUFF: 150,
  BASE_RANGE: 2,
  BASE_PRICE: 150,
  BASE_LEVEL: 0,
  LEVEL_TWO_STATS: {
    CURRENT_BUFF: 350,
    BASE_PRICE: 250,
    BASE_LEVEL: 1,
  },
  LEVEL_THREE_STATS: {
    CURRENT_BUFF: 500,
    BASE_PRICE: 400,
    BASE_LEVEL: 2,
  },
  IMAGE: "herbeIngredient",
  IMAGEURL: "../public/assets/herbeIngredient.png",
};
const INGREDIENT_JALAPENOS = {
  TYPE: "INGREDIENT_JALAPENOS",
  TYPE_BUFF: "steel",
  CURRENT_BUFF: 10,
  BASE_BUFF: 10,
  BASE_RANGE: 2,
  BASE_PRICE: 100,
  BASE_LEVEL: 0,
  IMAGE: "jalapenosIngredient",
  IMAGEURL: "../public/assets/jalapenosIngredient.png",
};
const INGREDIENT_ONION = {
  TYPE: "INGREDIENT_ONION",
  TYPE_BUFF: "camo",
  CURRENT_BUFF: 10,
  BASE_BUFF: 10,
  BASE_RANGE: 2,
  BASE_PRICE: 150,
  BASE_LEVEL: 0,
  IMAGE: "onionIngredient",
  IMAGEURL: "../public/assets/onionIngredient.png",
};

const INGREDIENT_INFOS = {
  INGREDIENT_MILK,
  INGREDIENT_PEPPER,
  INGREDIENT_FIGUE,
  INGREDIENT_HERBE,
  INGREDIENT_JALAPENOS,
  INGREDIENT_ONION,
};

export { GAME_SETTINGS, ENEMY_INFOS, TOWER_INFOS, INGREDIENT_INFOS };
