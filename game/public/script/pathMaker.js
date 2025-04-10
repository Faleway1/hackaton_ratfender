import { game } from "./game.js";
import { findCell, createGrid } from "./gridManager.js";


function createPath(pathList) {
    const path = new PIXI.Graphics();
    pathList.forEach((cell) => {
        cell.highlight(0xffd900);
    });

    return path
}

export { createPath };

createGrid();

// const test = new Tower("neutral",[8,2],15,"https://placehold.co/25" )
// const test2 = new Rat(15,"neutre", "https://placehold.co/25",15,[7,0])
// test.TilesSeen()
// test.EnnemieSeen(test2)
