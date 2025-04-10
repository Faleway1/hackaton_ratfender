import { Game } from "./class/gameClass.js";
import { Rat } from "./class/ennemies.js";
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

export { game };

const texture = await Assets.load('https://pixijs.com/assets/bunny.png')
const test = new Rat(15,"IODN",texture,15,[10,2])
test.render(game.app, texture)