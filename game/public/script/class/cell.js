import { game, TILEHEIGHT, TILEWIDTH } from "../game.js";

export class Cell {
    constructor(ligne, colonne, isOccupied = false) {
        this.x = ligne;
        this.y = colonne;
        this.xmin = ligne * TILEWIDTH;
        this.ymin = colonne * TILEHEIGHT;
        this.xmax = ligne * TILEWIDTH + TILEWIDTH;
        this.ymax = colonne * TILEHEIGHT + TILEHEIGHT;

        this.isOccupied = isOccupied;
        this.ennemies = [];
        this.towers = [];
        
        game.cellsList.push(this);
    }

    getPosition() {
        return { x: this.x, y: this.y, xmax: this.xmax, ymax: this.ymax };
    }

    highlight(color) {
        const cell = new PIXI.Graphics();
        cell.rect(this.xmin, this.ymin, TILEWIDTH, TILEHEIGHT);
        cell.fill(color);
        cell.stroke({ width: 2, color: 0xfeeb77 });
        cell.name = `cell-${this.x}-${this.y}`;
        game.app.stage.addChild(cell);
    }

    unhighlight() {
        const graphicsList = game.app.stage.children.filter(child => child instanceof PIXI.Graphics);
        const monGraphics = game.app.stage.children.find(c => c.name === `cell-${this.x}-${this.y}`);
        monGraphics.clear();
    }
}