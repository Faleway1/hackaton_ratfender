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

