import { Game } from "./class/gameClass.js";
import {
  Tower,
  comteTower,
  chevreTower,
  roquefortTower,
} from "./class/towers.js";
import { gridManager } from "./gridManager.js";
import { camoRat, rainbowRat, Rat, steelRat } from "./class/ennemies.js";
import { GAME_SETTINGS } from "./config.js";

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

const new_rat = new rainbowRat();
await new_rat.loadAsset();
new_rat.render();

document.querySelector(".moveEntity").addEventListener("click", () => {
  new_rat.moveEntity();
});

// const texture = await PIXI.Assets.load('normalRat');
// const rat = new PIXI.Sprite(texture);
// rat.anchor.set(0.5);
// rat.x = 100;
// rat.y = 100;
// rat.width = 50;
// rat.height = 50;
// console.log(texture, rat)
// game.app.stage.addChild(rat);

console.log(game.app);

async function createTower(towerType) {
  // Changer la classe utilisée selon le type de la tour
  const new_tower = new roquefortTower();
  await new_tower.init();
  return new_tower;
}

game.app.view.addEventListener("click", (event) => {
  const rect = game.app.view.getBoundingClientRect(); // position du canvas dans la page
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  console.log(gridManager.findOnGrid(mouseX, mouseY));
});

// game.app.view.addEventListener("mousemove", (event) => {
//     if (new_tower.isPlaced) {
//         return
//     }
//     const rect = game.app.view.getBoundingClientRect(); // position du canvas dans la page
//     const mouseX = event.clientX - rect.left;
//     const mouseY = event.clientY - rect.top;
//     new_tower.render(mouseX, mouseY, false)
// })
// game.app.view.addEventListener("click", (event) => {
//     const rect = game.app.view.getBoundingClientRect(); // position du canvas dans la page
//     const mouseX = event.clientX - rect.left;
//     const mouseY = event.clientY - rect.top;
//     new_tower.render(mouseX, mouseY, true)
// })

export { game };
const new_tower = await createTower("tower1");
game.app.view.addEventListener("mousemove", (event) => {
  if (new_tower.is_placed) {
    return;
  }
  const rect = game.app.view.getBoundingClientRect(); // position du canvas dans la page
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  new_tower.render(mouseX, mouseY, false);
});
game.app.view.addEventListener("click", (event) => {
  const rect = game.app.view.getBoundingClientRect(); // position du canvas dans la page
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  new_tower.render(mouseX, mouseY, true);
});
