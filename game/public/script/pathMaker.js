import { game, TILEHEIGHT, TILEWIDTH } from "./game.js";
import { Cell } from "./class/cell.js";
import { Tower } from "./class/towers.js";
import { Rat } from "./class/ennemies.js";
import { findCell, createGrid } from "./gridManager.js";

console.log(game)

function createPath() {
    const path = new PIXI.Graphics();
    path.lineStyle(50, 0xffff00, 1);

    console.log(game.path)
    path.moveTo(game.path[0].x * TILEWIDTH, game.path[0].y * TILEHEIGHT);
    game.path.forEach((cell) => {
        path.lineTo(cell.col * TILEWIDTH, cell.lig * TILEHEIGHT);
    });
    path.stroke({ width: TILEWIDTH, color: 0xffd900 });
    console.log(path)
    game.app.stage.addChild(path);

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
