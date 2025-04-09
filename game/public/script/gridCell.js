import { game } from "./game.js";

export class Cell {
    constructor(ligne, colonne) {
        this.x = ligne;
        this.y = colonne;
        this.element = document.createElement("div");
        this.element.classList.add("grid-cell");
        this.element.id = `cell-${this.x}-${this.y}`;
        this.element.style.width = `${100 / game.gridWidth}%`;
        this.element.style.height = "100%";
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