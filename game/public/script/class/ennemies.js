import { game } from "../game.js";
import { uuidv4 } from '../idManager.js';
import { GAME_SETTINGS, ENEMY_INFOS } from "../config.js";

class Rat {
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
        } else if (!this.isKilled) {
            this.updateCellPosition()
        }

        if (!this.isKilled) {
            const middleOfTile = {
                x: this.cell_position.xmin + (GAME_SETTINGS.TILE_WIDTH / 2),
                y: this.cell_position.ymin + (GAME_SETTINGS.TILE_HEIGHT / 2),
            };

            gsap.to(this.sprite, {
                duration: 1,
                x: middleOfTile.x,
                y: middleOfTile.y,
                onUpdate: () => {
                    if (!this.sprite) {
                        gsap.killTweensOf(this.sprite);
                    }
                },
            });
            game.app.stage.addChild(this.sprite);
        }
    }

    kill() {
        if (this.sprite) {
            game.app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;
        }
        this.cell_position.ennemies.pop(this)
        clearInterval(this.moveInterval)
        this.isKilled = true
        game.pdr += this.money
        game.totalEnnemies.pop(this)



    }

    finishPath() {
        if (this.sprite) {
            game.app.stage.removeChild(this.sprite);
            this.sprite.destroy();
            this.sprite = null;
        }
        this.cell_position.ennemies.pop(this)
        clearInterval(this.moveInterval)
        game.life -= this.damage

    }

    moveEntity() {
        this.cell_position.ennemies.pop(this)
        this.position += 1

        if (this.position >= game.path.length - 1) {
            this.finishPath();
            return;
        }
        this.render();

        this.cell_position.ennemies.push(this)
    }

    moveEntityInterval() {
        this.moveInterval = setInterval(() => {
            this.moveEntity();
        }, 1000);
    }

    takeDamage(damage) {
        this.hp -= damage;
        this.checkHealth();
        this.sprite.tint = 0xff0000; // Change color to red when taking damage
        setTimeout(() => {
            if (this.sprite) {
                this.sprite.tint = 0xffffff; // Reset color to white after a short delay
            }
        }, 300);
    }

    checkHealth() {
        if (this.hp <= 0) {
            this.kill();
        }
    }

}

class CamoRat extends Rat {
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
class SteelRat extends Rat {
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
class RainbowRat extends Rat {
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