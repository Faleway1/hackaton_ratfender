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

    highlight(texture, tint = 0xFFFFFF) {
        const cell = new PIXI.Sprite(texture);
        cell.anchor.set(0.5);
        cell.width = GAME_SETTINGS.TILE_WIDTH;
        cell.height = GAME_SETTINGS.TILE_HEIGHT;
        cell.x = this.xmin + (GAME_SETTINGS.TILE_WIDTH / 2);
        cell.y = this.ymin + (GAME_SETTINGS.TILE_HEIGHT / 2);
        cell.tint = tint;
        // cell.rect(this.xmin, this.ymin, GAME_SETTINGS.TILE_WIDTH, GAME_SETTINGS.TILE_HEIGHT);
        // cell.fill(color);
        cell.name = `cell-${this.x}-${this.y}`;
        game.app.stage.addChild(cell);
    }

    unhighlight() {
        const monGraphics = game.app.stage.children.find(c => c.name === `cell-${this.x}-${this.y}`);
        monGraphics.clear();
    }
}