import { game } from "./game.js";
import { findCell, createGrid } from "./gridManager.js";


function createPath(pathList) {
    const path = new PIXI.Graphics();
<<<<<<< HEAD
    path.lineStyle(50, 0xffff00, 1);

    console.log(game.path)
    path.moveTo(game.path[0].x * TILEWIDTH, game.path[0].y * TILEHEIGHT);
    game.path.forEach((cell) => {
        path.lineTo(cell.col * TILEWIDTH, cell.lig * TILEHEIGHT);
=======
    pathList.forEach((cell) => {
        cell.highlight(0xffd900);
>>>>>>> 3ea652bfb8eb08b6729d62dd5ffecad67677bc7e
    });

<<<<<<< HEAD
    // const path = new PIXI.Graphics();
    // path.moveTo(50, 350);
    // path.lineTo(250, 350);
    // path.fill(0xff3300);
    // path.stroke({ width: 4, color: 0xffd900 });

    game.app.stage.addChild(path);

}
createPath()

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


createGrid();

const texture = await PIXI.Assets.load('assets/normalRat.png');
const tower = new PIXI.Sprite(texture);
tower.width = 30
tower.height = 30
tower.x = 16;
tower.y = 3;

game.app.stage.addChild(tower);

const test = new Tower("neutral",[16,3],15,tower.sprite )
=======
    return path
}

export { createPath };

createGrid();

// const test = new Tower("neutral",[8,2],15,"https://placehold.co/25" )
// const test2 = new Rat(15,"neutre", "https://placehold.co/25",15,[7,0])
// test.TilesSeen()
// test.EnnemieSeen(test2)
>>>>>>> 3ea652bfb8eb08b6729d62dd5ffecad67677bc7e
