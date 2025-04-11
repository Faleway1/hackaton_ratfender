import { GAME_SETTINGS, TOWER_INFOS, INGREDIENT_INFOS } from "./config.js";
import { Game } from "./class/gameClass.js";
import { TOWERS } from "./class/towers.js";
import { towerManager } from "./towerManager.js";
import { INGREDIENTS } from "./class/ingredients.js";
import { ingredientManager } from "./ingredientManager.js";
import { ENEMIES } from "./class/ennemies.js";
import { gridManager } from "./gridManager.js";

const game = new Game(
  GAME_SETTINGS.TILES_PER_ROW,
  GAME_SETTINGS.TILES_PER_COL,
  GAME_SETTINGS.APP_WIDTH,
  GAME_SETTINGS.APP_HEIGHT,
  GAME_SETTINGS.TILE_WIDTH,
  GAME_SETTINGS.TILE_HEIGHT,
  GAME_SETTINGS.PDR_PER_ROUND
);
game.initCanva();
game.initGrid();
game.initPath();
await game.startRound()


// const new_tower = await towerManager.placeTower(TOWER_INFOS.TOWER_CHEVRE.TYPE)
const new_ingredient = await ingredientManager.placeIngredient(INGREDIENT_INFOS.INGREDIENT_JALAPENOS.TYPE)

// const texture = await PIXI.Assets.load('normalRat');
// const rat = new PIXI.Sprite(texture);
// rat.anchor.set(0.5);
// rat.x = 100;
// rat.y = 100;
// rat.width = 50;
// rat.height = 50;
// console.log(texture, rat)
// game.app.stage.addChild(rat);



export { game };
