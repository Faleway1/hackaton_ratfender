const game = {
    grid : document.querySelector(".game-grid"),
    gridWidth : 30,
    gridHeight : 16,
    path : [
        { x: 0, y: 7 },
        { x: 1, y: 7 },
        { x: 2, y: 7 },
        { x: 3, y: 7 },
        { x: 4, y: 7 },
        { x: 5, y: 7 },
        { x: 5, y: 6 },
        { x: 5, y: 5 },
        { x: 5, y: 4 },
        { x: 5, y: 3 },
        { x: 6, y: 3 },
        { x: 7, y: 3 },
        { x: 8, y: 3 },
        { x: 9, y: 3 },
        { x: 10, y: 3 },
        { x: 10, y: 4 },
        { x: 10, y: 5 },
        { x: 10, y: 6 },
        { x: 11, y: 6 },
        { x: 12, y: 6 },
        { x: 13, y: 6 },
        { x: 14, y: 6 },
        { x: 15, y: 6 },
        { x: 15, y: 7 },
        { x: 15, y: 8 },
        { x: 15, y: 9 },
        { x: 16, y: 9 },
        { x: 17, y: 9 },
        { x: 18, y: 9 },
        { x: 19, y: 9 },
        { x: 20, y: 9 },
        { x: 20, y: 8 },
        { x: 20, y: 7 },
        { x: 20, y: 6 },
        { x: 21, y: 6 },
        { x: 22, y: 6 },
        { x: 23, y: 6 },
        { x: 24, y: 6 },
        { x: 25, y: 6 },
        { x: 25, y: 7 },
        { x: 25, y: 8 },
        { x: 25, y: 9 },
        { x: 25, y: 10 },
        { x: 26, y: 10 },
        { x: 27, y: 10 },
        { x: 28, y: 10 },
        { x: 29, y: 10 },
    ],

    pathColor : "red",
};

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