import { game, TILEHEIGHT, TILEWIDTH } from "./game.js";
import { Cell } from "./class/cell.js";

console.log(game)

function createPath() {
    const path = new PIXI.Graphics();
    path.lineStyle(50, 0xffff00, 1);

    console.log(game.path)
    path.moveTo(game.path[0].x * TILEWIDTH, game.path[0].y * TILEHEIGHT);
    game.path.forEach((cell) => {
        console.log(cell)
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
function highlightPath() {
    game.path.forEach((cell) => {
        const gridCell = findCell(cell.x, cell.y);
        gridCell.highlight();
    });
}

// highlightPath();