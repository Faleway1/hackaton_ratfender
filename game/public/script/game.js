import { Game } from "./class/gameClass.js";
import { Rat } from "./class/ennemies.js";
import { Cell } from "./class/cell.js";


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

const game = new Game(20, 10, 800, 400, pdrPerRound)
game.initCanva()
game.initGrid()
game.initPath()
console.log(game.tilesPerRow)

const new_rat = new Rat()
await new_rat.loadAsset()
new_rat.render()

document.querySelector(".moveEntity").addEventListener("click", () => {
    new_rat.moveEntity()
})



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
