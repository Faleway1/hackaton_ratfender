import { game } from "../game.js";
import { uuidv4 } from '../idManager.js';

//A METTRE DANS UN FICHIER CONFIG
const NORMAL_RAT = {
    BASE_HP : 20,
    BASE_MONEY : 3,
    TYPE : "Normal"
}
const CAMO_RAT = {
    BASE_HP : 12,
    BASE_MONEY : 5,
    TYPE : "Camo"
}
const STEEL_RAT = {
    BASE_HP : 20,
    BASE_MONEY : 8,
    TYPE : "Steel"
}
const RAINBOW_RAT = {
    BASE_HP : 50,
    BASE_MONEY : 10,
    TYPE : "Rainbow"
}

export class Rat{
    constructor() {
        this.id = uuidv4();
        this.type = NORMAL_RAT.TYPE;
        this.hp = NORMAL_RAT.BASE_HP;
        this.money = NORMAL_RAT.BASE_MONEY;

        this.asset = "";
        this.position = 0;
        this.sprite = null;
        this.cell_position = null;

        this.updateCellPosition()
    }

    updateCellPosition() {
        this.cell_position = game.path[this.position];
    }

    async loadAsset() {
        this.asset = await PIXI.Assets.load(this.type);
    }

    render() {
        if (!this.sprite) {
            this.sprite = new PIXI.Sprite(this.asset);
            this.sprite.anchor.set(0.5);
            this.sprite.name = this.id;
            this.sprite.width = game.tilewidth;
            this.sprite.height = game.tileheight;
        } else {
            this.updateCellPosition()
        }
        const middleOfTile = {
            x: this.cell_position.xmin + (game.tilewidth / 2),
            y: this.cell_position.ymin + (game.tileheight / 2),
        };
        this.sprite.x = middleOfTile.x; 
        this.sprite.y = middleOfTile.y;
        game.app.stage.addChild(this.sprite);
    }
    
    kill() {
        if (this.sprite) {
            game.app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;
        }
        //DONNER LES SOUS AU JOUEUR
    }

    finishPath() {
        if (this.sprite) {
            game.app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;
        }
        //ENLEVER DE LA VIE AU JOUEUR
    }

    moveEntity() {
        this.cell_position.ennemies.pop(this)
        this.position += 1

        if (this.position >= game.path.length - 1) {
            console.log("End of path reached.");
            this.finishPath();
            return;
        }
        this.render();
        this.cell_position.ennemies.push(this)
    }

    takeDamage(damage) {
        this.hp -= damage;
        this.checkHealth();
    }
    
    checkHealth() {
        if (this.hp <= 0) {
            this.kill();
        }
    }
    
}

export class camoRat extends Rat{
    constructor() {
        super()
        this.type = CAMO_RAT.TYPE;
        this.hp = CAMO_RAT.BASE_HP;
        this.money = CAMO_RAT.BASE_MONEY;

        this.asset = "";
        this.position = 0;
        this.sprite = null;
        this.updateCellPosition()
    }

    async loadAsset() {
        this.asset = await PIXI.Assets.load('camoRat');
    }
}
export class steelRat extends Rat{
    constructor() {
        super()
        this.type = STEEL_RAT.TYPE;
        this.hp = STEEL_RAT.BASE_HP;
        this.money = STEEL_RAT.BASE_MONEY;

        this.asset = "";
        this.position = 0;
        this.sprite = null;
        this.updateCellPosition()
    }

    async loadAsset() {
        this.asset = await PIXI.Assets.load('steelRat');
    }
}
export class rainbowRat extends Rat{
    constructor() {
        super()
        this.type = RAINBOW_RAT.TYPE;
        this.hp = RAINBOW_RAT.BASE_HP;
        this.money = RAINBOW_RAT.BASE_MONEY;

        this.asset = "";
        this.position = 0;
        this.sprite = null;
        this.updateCellPosition()
    }

    async loadAsset() {
        this.asset = await PIXI.Assets.load('rainbowRat');
    }
}