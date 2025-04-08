import { game } from "./game.js"
import { Tower } from "./towers.js";

function createGrid() {
    for (let y = 0; y < game.gridHeight; y++) {
        const row = document.createElement("div");
        row.style.height = `${100 / game.gridHeight}%`;
        row.classList.add("grid-row");
        for (let x = 0; x < game.gridWidth; x++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            cell.id = `cell-${x}-${y}`;
            cell.style.width = `${100 / game.gridWidth}%`;
            cell.style.height = "100%";
            row.appendChild(cell);
        }
        game.grid.appendChild(row);
    }
}

function highlightPath() {
    game.path.forEach((cell) => {
        const gridCell = document.querySelector(`#cell-${cell.x}-${cell.y}`);
        gridCell.style.backgroundColor = game.pathColor;
        //GERER IMAGE AU LIEU DE COULEUR
    });
}

function moveEntity(entity) {
    const entityPosition = game.path[entity.position];
    if (entityPosition) {
        const currentCell = document.querySelector(`#cell-${entityPosition.x}-${entityPosition.y}`);
        currentCell.style.backgroundColor = game.pathColor; 
        //GERER IMAGE AU LIEU DE COULEUR
    }

    entity.position += 1
    const nextPosition = game.path[entity.position];

    if (nextPosition) {
        const newCell = document.querySelector(`#cell-${nextPosition.x}-${nextPosition.y}`);
        newCell.style.backgroundColor = "blue";
        //GERER IMAGE AU LIEU DE COULEUR
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
highlightPath();

const test = new Tower("normal",[2,8],15)
test.TilesSeen()