import { game } from "../game.js";
import { uuidv4 } from '../idManager.js';
import { GAME_SETTINGS, ENEMY_INFOS } from "../config.js";

class Rat{
    constructor() {
        this.id = uuidv4();
        this.type = ENEMY_INFOS.NORMAL_RAT.TYPE;
        this.hp = ENEMY_INFOS.NORMAL_RAT.BASE_HP;
        this.money = ENEMY_INFOS.NORMAL_RAT.BASE_MONEY;
        this.damage = ENEMY_INFOS.NORMAL_RAT.DAMAGE
        this.image = ENEMY_INFOS.NORMAL_RAT.IMAGE
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
        this.asset = await PIXI.Assets.load(this.image);
    }

    render() {
        if (!this.sprite) {
            this.sprite = new PIXI.Sprite(this.asset);
            this.sprite.anchor.set(0.5);
            this.sprite.name = this.id;
            this.sprite.width = GAME_SETTINGS.TILE_WIDTH;
            this.sprite.height = GAME_SETTINGS.TILE_HEIGHT;
        } else {
            this.updateCellPosition()
        }
        const middleOfTile = {
            x: this.cell_position.xmin + (GAME_SETTINGS.TILE_WIDTH / 2),
            y: this.cell_position.ymin + (GAME_SETTINGS.TILE_HEIGHT / 2),
        };
        this.sprite.x = middleOfTile.x; 
        this.sprite.y = middleOfTile.y;
        game.app.stage.addChild(this.sprite);
        game.totalEnnemies.push(this)
        
        
    }
    
    kill() {
        if (this.sprite) {
            game.app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;
        }
        
        
        game.pdr += this.money
        game.totalEnnemies.pop(this)
        
        
        
    }

    finishPath() {
        if (this.sprite) {
            game.app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;
        }
        game.life -= this.damage
        console.log(game.life);
        
    }

    moveEntity() {
        this.cell_position.ennemies.pop(this)
        this.position += 1

        if (this.position >= game.path.length - 1) {
            console.log("End of path reached.");
            game.totalEnnemies.pop(this)
            this.finishPath();
            if (game.totalEnnemies.length === 0) {
                return
            }
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

class CamoRat extends Rat{
    constructor() {
        super()
        this.type = ENEMY_INFOS.CAMO_RAT.TYPE;
        this.hp = ENEMY_INFOS.CAMO_RAT.BASE_HP;
        this.money = ENEMY_INFOS.CAMO_RAT.BASE_MONEY;
        this.damage = ENEMY_INFOS.CAMO_RAT.DAMAGE
        this.image = ENEMY_INFOS.CAMO_RAT.IMAGE
        this.asset = "";
        this.position = 0;
        this.sprite = null;
        this.updateCellPosition()
    }

    async loadAsset() {
        this.asset = await PIXI.Assets.load(this.image);
    }
}
class SteelRat extends Rat{
    constructor() {
        super()
        this.type = ENEMY_INFOS.STEEL_RAT.TYPE;
        this.hp = ENEMY_INFOS.STEEL_RAT.BASE_HP;
        this.money = ENEMY_INFOS.STEEL_RAT.BASE_MONEY;
        this.damage = ENEMY_INFOS.STEEL_RAT.DAMAGE
        this.image = ENEMY_INFOS.STEEL_RAT.IMAGE
        this.asset = "";
        this.position = 0;
        this.sprite = null;
        this.updateCellPosition()
    }

    async loadAsset() {
        this.asset = await PIXI.Assets.load(this.image);
    }
}
class RainbowRat extends Rat{
    constructor() {
        super()
        this.type = ENEMY_INFOS.RAINBOW_RAT.TYPE;
        this.hp = ENEMY_INFOS.RAINBOW_RAT.BASE_HP;
        this.money = ENEMY_INFOS.RAINBOW_RAT.BASE_MONEY;
        this.damage = ENEMY_INFOS.RAINBOW_RAT.DAMAGE
        this.image = ENEMY_INFOS.RAINBOW_RAT.IMAGE
        this.asset = "";
        this.position = 0;
        this.sprite = null;
        this.updateCellPosition()
    }

    async loadAsset() {
        this.asset = await PIXI.Assets.load(this.image);
    }
}

const ENEMIES = {
    Rat,
    CamoRat,
    SteelRat,
    RainbowRat
}
export { ENEMIES };