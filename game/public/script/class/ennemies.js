import { game } from "../game.js";
import { findCell } from "../gridManager.js";
import { Assets, Sprite } from "https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.min.mjs";

export class Rat{
    constructor(hp, type, assets, money, position) {
        this.hp = hp;
        this.type = type;

        this.money = money;
        this.position = position;
        this.cell_position = `cell-${this.position[0]}-${this.position[1]}`

        this.assets = assets
        // console.log(assets);
        
        
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

    render(canva, texture) {
        const rat = new Sprite(texture)
        canva.stage.addChild(rat)
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