import { Cell } from "./class/cell.js";
import { game } from "./game.js";


function createGrid() {
    for (let x = 0; x < game.gridWidth; x++) {
        for (let y = 0; y < game.gridHeight; y++) {
            const cell = new Cell(x, y);
        }
    }
}

function findCell(x, y) {
    return game.cellsList.find((cell) => cell.getPosition().x === x && cell.getPosition().y === y);
}

function moveEntity(entity) {
    const entityPosition = game.path[entity.position];
    if (entityPosition) {
        const currentCell = findCell(entityPosition.x, entityPosition.y);
        currentCell.unhighlightPath();
    }

    entity.position += 1
    const nextPosition = game.path[entity.position];

    if (nextPosition) {
        const nextCell = findCell(nextPosition.x, nextPosition.y);
        nextCell.highlightPath();
    } else {
        console.log("End of path reached.");
        //FAIRE DISPARAITRE L'ENTITE
    }
}

const entity = {
    position: -1, // Starting position of the entity
};

document.querySelector(".moveEntity").addEventListener("click", () => {
    moveEntity(entity);
});

createGrid();
game.cellsList[0].highlight(0x00ff00); // Example of highlighting the first cell with green color
// game.cellsList[0].unhighlight()
export { findCell, createGrid, moveEntity };