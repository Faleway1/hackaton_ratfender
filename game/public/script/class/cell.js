import { game } from "../game.js";
import { GAME_SETTINGS } from "../config.js";



export class Cell {
    constructor(ligne, colonne, isOccupied = false) {
        this.x = ligne;
        this.y = colonne;
        this.xmin = ligne * GAME_SETTINGS.TILE_WIDTH;
        this.ymin = colonne * GAME_SETTINGS.TILE_HEIGHT;
        this.xmax = ligne * GAME_SETTINGS.TILE_WIDTH + GAME_SETTINGS.TILE_WIDTH;
        this.ymax = colonne * GAME_SETTINGS.TILE_HEIGHT + GAME_SETTINGS.TILE_HEIGHT;

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
        cell.rect(this.xmin, this.ymin, GAME_SETTINGS.TILE_WIDTH, GAME_SETTINGS.TILE_HEIGHT);
        cell.fill(color);
        cell.stroke({ width: 2, color: 0xfeeb77 });
        cell.name = `cell-${this.x}-${this.y}`;
        game.app.stage.addChild(cell);
    }

    unhighlight() {
        const monGraphics = game.app.stage.children.find(c => c.name === `cell-${this.x}-${this.y}`);
        monGraphics.clear();
    }
}