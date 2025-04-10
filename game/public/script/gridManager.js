import { Cell } from "./class/cell.js";
import { game } from "./game.js";

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

<<<<<<< HEAD
function moveEntity(entity) {
    const entityPosition = game.path[entity.position];
=======
// A BOUGER DANS ENNEMIES.JS
function moveEntity(entity, path) {
    const entityPosition = path[entity.position];
>>>>>>> 3ea652bfb8eb08b6729d62dd5ffecad67677bc7e
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

<<<<<<< HEAD
const entity = {
    position: -1, // Starting position of the entity
};


createGrid();
=======
>>>>>>> 3ea652bfb8eb08b6729d62dd5ffecad67677bc7e

export { findCell, createGrid, moveEntity };