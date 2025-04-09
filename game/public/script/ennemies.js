import { game } from "./game.js";
import { findCell } from "./pathMaker.js";

export class Rat{
    constructor(hp, type, image, money, position) {
        this.hp = hp;
        this.type = type;

        this.image = image;
        this.money = money;
        this.position = position;
        this.cell_position = `cell-${this.position[0]}-${this.position[1]}`
    
        this.element = document.createElement("img");
        this.element.src = this.image;
        this.element.classList.add("enemy");
        this.render();
    }

    setHp(hp) {
        this.hp = hp
    }

    getHp() {
        return this.getHp;
    }

    getType() {
        return this.type;
    }

    getImage() {
        return this.image;
    }

    getMoney() {
        return this.money
    }

    render() {
        const cell = findCell(this.position[0], this.position[1])
        console.log(cell);
        
        game.path.forEach(element => {
            if (element.x === cell.x && element.y === cell.y) {
                cell.element.appendChild(this.element);
            }
        });
    }
    
    remove() {
        if (this.element && this.element.parentNode) {
            this.element.remove();
        }
    }

    moveEntity() {
        const entityPosition = game.path[this.position];
        if (entityPosition) {
            const currentCell = findCell(entityPosition.x, entityPosition.y);
            currentCell.unhighlightPath();
        }
    
        this.position += 1
        const nextPosition = game.path[this.position];
    
        if (nextPosition) {
            const nextCell = findCell(nextPosition.x, nextPosition.y);
            nextCell.highlightPath();
        } else {
            console.log("End of path reached.");
            //FAIRE DISPARAITRE L'ENTITE
        }
    }
}