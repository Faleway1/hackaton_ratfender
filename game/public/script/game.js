import { Game } from "./class/gameClass.js";
import { camoRat, rainbowRat, Rat, steelRat } from "./class/ennemies.js";
import { Cell } from "./class/cell.js";
import { Assets, Sprite } from "https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.min.mjs";


const pdrPerRound = {
  0: 50,
  10: 100,
  20: 150,
  30: 200,
  40: 300,
  50: 400,
  75: 500,
  100: 1000,
};

const game = new Game(20, 10, 800, 400, pdrPerRound);
game.initCanva();
game.initGrid();
game.initPath();

const new_rat = new rainbowRat()
await new_rat.loadAsset()
new_rat.render()

document.querySelector(".moveEntity").addEventListener("click", () => {
    new_rat.moveEntity()
})

export { game };