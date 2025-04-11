import { Cell } from "./class/cell.js";
import { game } from "./game.js";
import { GAME_SETTINGS } from "./config.js";

async function createGrid(width, height) {
    let cellsList = [];
    const texture = await PIXI.Assets.load('tileBg')
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const cell = new Cell(x, y);
            cellsList.push(cell);
            cell.highlight(texture)
        }
    }
    return cellsList
}

function findCell(x, y, cellsList) {
    return cellsList.find((cell) => cell.getPosition().x === x && cell.getPosition().y === y) || null;
}

function findOnGrid(x, y) {
    const xgrid = Math.floor(x / GAME_SETTINGS.TILE_WIDTH);
    const ygrid = Math.floor(y / GAME_SETTINGS.TILE_HEIGHT);
    const cell = findCell(xgrid, ygrid, game.cellsList);
    if (cell) {
        return cell;
    } else {
        return null;
    }
}

function distanceBetweenTwoPoints(p1, p2) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}

const gridManager = {
    createGrid,
    findCell,
    findOnGrid,
    distanceBetweenTwoPoints,
};


export { gridManager };