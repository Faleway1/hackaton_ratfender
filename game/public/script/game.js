import { Game } from "./class/gameClass.js";
import { Tower, comteTower, chevreTower, roquefortTower } from "./class/towers.js";
import { findOnGrid } from "./gridManager.js";
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



// const texture = await PIXI.Assets.load('normalRat');
// const rat = new PIXI.Sprite(texture);
// rat.anchor.set(0.5);
// rat.x = 100;
// rat.y = 100;
// rat.width = 50;
// rat.height = 50;
// console.log(texture, rat)
// game.app.stage.addChild(rat);


console.log(game.app)

async function createTower(towerType) {
    // Changer la classe utilisée selon le type de la tour
    const new_tower = new roquefortTower()
    await new_tower.init()
    return new_tower
}

game.app.view.addEventListener("click", (event) => {
    const rect = game.app.view.getBoundingClientRect(); // position du canvas dans la page
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    console.log(findOnGrid(mouseX, mouseY))
})

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
const new_tower = await createTower("tower1")
game.app.view.addEventListener("mousemove", (event) => {
    if (new_tower.isPlaced) {
        return
    }
    const rect = game.app.view.getBoundingClientRect(); // position du canvas dans la page
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    new_tower.render(mouseX, mouseY, false)
})
game.app.view.addEventListener("click", (event) => {
    const rect = game.app.view.getBoundingClientRect(); // position du canvas dans la page
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    new_tower.render(mouseX, mouseY, true)
})
