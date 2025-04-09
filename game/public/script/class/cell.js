import { game, TILEHEIGHT, TILEWIDTH } from "../game.js";

export class Cell {
    constructor(ligne, colonne, isOccupied = false) {
        this.x = ligne;
        this.y = colonne;
        this.isOccupied = isOccupied;
        this.ennemies = [];
        this.towers = [];
        
        game.cellsList.push(this);
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    render(parent) {
        parent.appendChild(this.element);
    }

    highlight() {
        this.element.style.backgroundColor = game.pathColor;
    }

    highlightPath() {
        this.element.style.backgroundColor = "green";
    }

    unhighlight() {
        this.element.style.backgroundColor = "transparent";
    }

    unhighlightPath() {
        this.element.style.backgroundColor = "red";
    }

}