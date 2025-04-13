import { GAME_SETTINGS, TOWER_INFOS, INGREDIENT_INFOS } from "./config.js";
import { Game } from "./class/gameClass.js";
import { TOWERS } from "./class/towers.js";
import { towerManager } from "./towerManager.js";
import { INGREDIENTS } from "./class/ingredients.js";
import { ingredientManager } from "./ingredientManager.js";
import { ENEMIES } from "./class/ennemies.js";
import { gridManager } from "./gridManager.js";

towerManager.activateButtons()
ingredientManager.activateButtons()

const game = new Game(
  GAME_SETTINGS.TILES_PER_ROW,
  GAME_SETTINGS.TILES_PER_COL,
  GAME_SETTINGS.APP_WIDTH,
  GAME_SETTINGS.APP_HEIGHT,
  GAME_SETTINGS.TILE_WIDTH,
  GAME_SETTINGS.TILE_HEIGHT,
  GAME_SETTINGS.PDR_PER_ROUND
);
await game.initGame()
await game.startRound()


const paused = document.querySelector(".pausePlayButton")

paused.addEventListener("click", async () => {
    if (game.isPaused) {
        await game.startRound()
        game.isPaused = false
        paused.textContent = "⏸"
    } else {
        game.isPaused = true
        paused.textContent = "▶"
    }
})



export { game };
