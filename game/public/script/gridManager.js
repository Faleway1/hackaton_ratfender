import { Cell } from "./class/cell.js";
import { game } from "./game.js";
import { GAME_SETTINGS } from "./config.js";

function createGrid(width, height) {
    let cellsList = [];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const cell = new Cell(x, y);
            cellsList.push(cell);
        }
    }
    return cellsList
}

function findCell(x, y, cellsList) {
    return cellsList.find((cell) => cell.getPosition().x === x && cell.getPosition().y === y) || null;
}

// A BOUGER DANS ENNEMIES.JS
function moveEntity(entity, path) {
    const entityPosition = path[entity.position];
    if (entityPosition) {
        const currentCell = findCell(entityPosition.x, entityPosition.y);
        currentCell.unhighlight();
    }

    entity.position += 1
    const nextPosition = game.path[entity.position];

    if (nextPosition) {
        const nextCell = findCell(nextPosition.x, nextPosition.y);
        nextCell.highlight();
    } else {
        console.log("End of path reached.");
        //FAIRE DISPARAITRE L'ENTITE
    }
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


export * as gridManager from "./gridManager.js";