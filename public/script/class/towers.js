import { game } from "../game.js";
import { gridManager } from "../gridManager.js";
import { uuidv4 } from "../idManager.js";
import { GAME_SETTINGS } from "../config.js";
import { TOWER_INFOS } from "../config.js";
import { towerManager } from "../towerManager.js";

class Tower {
    constructor() {
        this.id = uuidv4();
        this.stats = {
            attack: TOWER_INFOS.TOWER_TOME.BASE_ATK,
            shot_speed: TOWER_INFOS.TOWER_TOME.BASE_SHOT_SPEED,
            range: TOWER_INFOS.TOWER_TOME.BASE_RANGE,
            nb_shots: TOWER_INFOS.TOWER_TOME.BASE_NB_SHOTS,
            base_attack: TOWER_INFOS.TOWER_TOME.BASE_ATK,
            base_shot_speed: TOWER_INFOS.TOWER_TOME.BASE_SHOT_SPEED,
            base_range: TOWER_INFOS.TOWER_TOME.BASE_RANGE,
        };
        this.type = TOWER_INFOS.TOWER_TOME.TYPE;
        this.image = TOWER_INFOS.TOWER_TOME.IMAGE;
        this.imgUrl = TOWER_INFOS.TOWER_TOME.IMAGEURL;
        this.price = TOWER_INFOS.TOWER_TOME.BASE_PRICE;
        this.rat_type = TOWER_INFOS.TOWER_TOME.RAT_TYPE;

        this.is_placed = false;
        this.asset = "";
        this.position = null;
        this.sprite = null;
        this.range_circle = null;

        this.paths_in_range = [];
        this.enemies_in_range = [];

        this.buffs = []
        this.multiplier = 1;

        this.level = {
            path1: 0,
            path2: 0,
            path3: 0,
        };
        this.upgradePrice = {
            path1Upgradecost: 50,
            path2Upgradecost: 50,
            path3Upgradecost: 50,
        }
    }

    async loadAsset() {
        this.asset = await PIXI.Assets.load(this.image);
    }

    async initBeforePlacement() {
        await this.loadAsset();
        this.initRangeVisual();
    }

    initAfterPlacement() {
        this.pathsInRange();
        this.sprite.tint = 0xffffff; // Blanc
        this.hideRange();
        this.detectEnemisInterval();
        this.towerAttackInterval();
        this.initTowerSelect();
        game.towerTilesOccupied.push(this.towerCell());
        this.towerCell().towers.push(this)
        this.increaseLevel()
    }

    towerSelect() {
        towerManager.showUpgrades(this);

        this.showRange();
    }

    towerUnselect() {
        this.hideRange();
        towerManager.hideUpgrades(this);
    }

    initTowerSelect() {
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.is_selected = false;
        this.sprite.on("click", (e) => {
            if (this.is_selected) {
                return;
            }
            const handleClick = (event) => {
                if (!this.is_selected) {
                    return;
                }
                this.towerUnselect();
                this.is_selected = false;
                game.app.view.removeEventListener("click", handleClick);
            };

            game.app.view.addEventListener("click", handleClick);

            setTimeout(() => {
                this.is_selected = true;
                this.towerSelect();
            }, 10);
        });
    }

    initRangeVisual() {
        this.rangeGraphic = new PIXI.Graphics();
        this.rangeGraphic.circle(0, 0, this.stats.range * GAME_SETTINGS.TILE_WIDTH);
        this.rangeGraphic.beginFill(0x00ff00, 0.5); // Vert avec opacité
        game.app.stage.addChild(this.rangeGraphic);
        this.rangeGraphic.stroke({ width: 2, color: 0xfeeb77 });
        this.rangeGraphic.visible = false;
    }

    showRange() {
        this.rangeGraphic.x = this.position.x;
        this.rangeGraphic.y = this.position.y;
        this.rangeGraphic.visible = true;
    }

    hideRange() {
        this.rangeGraphic.visible = false;
    }

    pathsInRange() {
        const entitiesInRange = [];
        const cell = gridManager.findOnGrid(
            this.position.x,
            this.position.y,
            game.cellsList
        );
        const startCol = Math.floor(cell.x - this.stats.range);
        const endCol = Math.floor(cell.x + this.stats.range);
        const startRow = Math.floor(cell.y - this.stats.range);
        const endRow = Math.floor(cell.y + this.stats.range);

        for (let col = startCol; col <= endCol; col++) {
            for (let row = startRow; row <= endRow; row++) {
                const cell = gridManager.findCell(col, row, game.cellsList);
                if (!cell) continue;
                if (game.path.includes(cell) && !this.enemies_in_range.includes(cell)) {
                    entitiesInRange.push(cell);
                }
            }
        }
        this.paths_in_range = entitiesInRange;
    }

    detectNearbyEnemies() {
        const enemies_nearby = [];
        this.paths_in_range.forEach((cell) => {
            cell.ennemies.forEach((enemy) => {                
                if (!enemies_nearby.includes(enemy) && this.canAttackEnemy(enemy)) {
                    enemies_nearby.push(enemy);
                }
            });
        });
        enemies_nearby.sort((a, b) => a.id - b.id);

        this.enemies_in_range = enemies_nearby;
        
    }

    detectEnemisInterval() {
        this.detectingEnemies = setInterval(() => {
            this.detectNearbyEnemies();
        }, 200);
    }

    ableToPlace(x, y) {
        const cell_position = gridManager.findOnGrid(x, y);
        const cell = gridManager.findCell(
            cell_position.x,
            cell_position.y,
            game.cellsList
        );
        if (game.path.includes(cell) || game.towerTilesOccupied.includes(cell)) {
            return false;
        }
        return true;
    }

    updatePosition(x, y) {
        this.position = {
            x: x,
            y: y,
        };
    }

    towerCell() {
        const cell = gridManager.findOnGrid(
            this.position.x,
            this.position.y,
            game.cellsList
        );
        return cell;
    }

    render(x, y, placeIt) {
        if (this.is_placed) {
            return;
        }
        this.position = {
            x: x,
            y: y,
        };
        if (!this.sprite) {
            this.sprite = new PIXI.Sprite(this.asset);
            this.sprite.anchor.set(0.5);
            this.sprite.name = this.id;
            this.sprite.width = GAME_SETTINGS.TILE_WIDTH;
            this.sprite.height = GAME_SETTINGS.TILE_HEIGHT;
        }
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        game.app.stage.addChild(this.sprite);

        this.showRange();
        if (this.ableToPlace(this.position.x, this.position.y)) {
            this.sprite.tint = 0x00ff00; // Vert
            this.is_placed = placeIt;
            if (placeIt) {
                this.initAfterPlacement();
            }
        } else {
            this.sprite.tint = 0xff0000; // Rouge
            this.is_placed = false;
        }
    }

    attackSquash(duration = 100, scaleFactor = 0.7) {
        const originalScaleY = this.sprite.scale.y;

        // Applatir verticalement
        this.sprite.scale.y = originalScaleY * scaleFactor;

        // Revenir à l'état normal après un court délai
        setTimeout(() => {
            this.sprite.scale.y = originalScaleY;
        }, duration);
    }

    towerAttack() {
        this.detectNearbyEnemies();

        if (!this.enemies_in_range.length) {
            return;
        } else {
            for (let i = 0; i < this.stats.nb_shots; i++) {
                if (
                    this.enemies_in_range[i] === undefined ||
                    this.enemies_in_range[i].hp <= 0
                ) {
                    this.enemies_in_range.pop(this.enemies_in_range[i]);
                    continue;
                }
                if (this.canAttackEnemy(this.enemies_in_range[i]) === true) {
                    this.enemies_in_range[i].takeDamage(this.stats.attack * this.multiplier);
                    this.attackSquash(100, 0.8);
                } else {
                    continue
                }
            }
        }
    }

    canAttackEnemy(enemy) {
        if (enemy.type === "camo" && !this.rat_type.includes("camo")) {
            return false
        } if (enemy.type === "rainbow" && !this.rat_type.includes("rainbow")) {
            this.multiplier = 0.5;
            return true
        } if (enemy.type === "steel" && !this.rat_type.includes("steel")) {
            this.multiplier = 0
            return true
        } else {
            this.multiplier = 1;
            return true
        }
    }

    towerAttackInterval() {
        this.attackInterval = setInterval(() => {
            this.towerAttack();
        }, this.stats.shot_speed);
    }

    increaseLevel() {
        const path1 = document.querySelector(".path1")
        const path2 = document.querySelector(".path2")
        const path3 = document.querySelector(".path3")
        const path1Price = document.querySelector(".path1Price")
        const path2Price = document.querySelector(".path2Price")
        const path3Price = document.querySelector(".path3Price")

        path1.addEventListener("click", () => {
            if (this.level.path1 === 3) {
                return
            } else {

              if (this.upgradePrice.path1Upgradecost <= game.pdr) {
                this.stats.attack = this.stats.attack + 5
                this.level.path1++
                game.pdr = game.substractPdr(this.upgradePrice.path1Upgradecost)
                game.money.textContent = game.pdr
                this.upgradePrice.path1Upgradecost = this.upgradePrice.path1Upgradecost + (20 * this.level.path1)
                path1Price.textContent = this.upgradePrice.path1Upgradecost
              }
            }
        })
        path2.addEventListener("click", () => {
            if (this.level.path2 === 3) {
                return
            } else {
                if (this.upgradePrice.path2Upgradecost <= game.pdr) {
                  this.stats.shot_speed = this.stats.shot_speed * 0.8
                  this.level.path2++
                  game.pdr = game.substractPdr(this.upgradePrice.path2Upgradecost)
                  game.money.textContent = game.pdr
                  this.upgradePrice.path2Upgradecost = this.upgradePrice.path2Upgradecost + (20 * this.level.path2)
                  path2Price.textContent = this.upgradePrice.path2Upgradecost
                }
            }
        })
        path3.addEventListener("click", () => {
            if (this.level.path3 === 3) {
                return
            } else {
              if (this.upgradePrice.path3Upgradecost <= game.pdr) {
                this.stats.range = this.stats.range +0.5
                this.level.path3++
                game.pdr = game.substractPdr(this.upgradePrice.path3Upgradecost)
                game.money.textContent = game.pdr
                this.upgradePrice.path3Upgradecost = this.upgradePrice.path3Upgradecost + (20 * this.level.path3)
                path3Price.textContent = this.upgradePrice.path3Upgradecost
              }
            }
        })
    }

    updateBuffs() {
        this.buffs.forEach((buff) => {
            if (buff.typebuff === "attack") {
                this.stats.attack = this.stats.base_attack + buff.current_buff;
            } else if (buff.typebuff === "shot_speed") {
                this.stats.shot_speed = this.stats.base_shot_speed - buff.current_buff;
            } else if (buff.typebuff === "range") {
                this.stats.range += this.stats.base_range + buff.current_buff;
            } else if (buff.typebuff === "camo") {
                this.rat_type.push("camo")
            } else if (buff.typebuff === "rainbow") {
                this.rat_type.push("rainbow")
            } else if (buff.typebuff === "steel") {
                this.rat_type.push("steel")
            }
            
        });
    }



}

class ComteTower extends Tower {
    constructor() {
        super();

        this.stats = {
            attack: TOWER_INFOS.TOWER_COMTE.BASE_ATK,
            shot_speed: TOWER_INFOS.TOWER_COMTE.BASE_SHOT_SPEED,
            range: TOWER_INFOS.TOWER_COMTE.BASE_RANGE,
            nb_shots: TOWER_INFOS.TOWER_COMTE.BASE_NB_SHOTS,
            base_attack: TOWER_INFOS.TOWER_COMTE.BASE_ATK,
            base_shot_speed: TOWER_INFOS.TOWER_COMTE.BASE_SHOT_SPEED,
            base_range: TOWER_INFOS.TOWER_COMTE.BASE_RANGE,
        };
        this.type = TOWER_INFOS.TOWER_COMTE.TYPE;
        this.rat_type = TOWER_INFOS.TOWER_COMTE.RAT_TYPE;

        this.image = TOWER_INFOS.TOWER_COMTE.IMAGE;
        this.imgUrl = TOWER_INFOS.TOWER_COMTE.IMAGEURL;
        this.price = TOWER_INFOS.TOWER_COMTE.BASE_PRICE;
        
    }
}
class ChevreTower extends Tower {
    constructor() {
        super();

        this.stats = {
            attack: TOWER_INFOS.TOWER_CHEVRE.BASE_ATK,
            shot_speed: TOWER_INFOS.TOWER_CHEVRE.BASE_SHOT_SPEED,
            range: TOWER_INFOS.TOWER_CHEVRE.BASE_RANGE,
            nb_shots: TOWER_INFOS.TOWER_CHEVRE.BASE_NB_SHOTS,
            base_attack: TOWER_INFOS.TOWER_CHEVRE.BASE_ATK,
            base_shot_speed: TOWER_INFOS.TOWER_CHEVRE.BASE_SHOT_SPEED,
            base_range: TOWER_INFOS.TOWER_CHEVRE.BASE_RANGE,
        };
        this.type = TOWER_INFOS.TOWER_CHEVRE.TYPE;
        this.rat_type = TOWER_INFOS.TOWER_CHEVRE.RAT_TYPE;

        this.image = TOWER_INFOS.TOWER_CHEVRE.IMAGE;
        this.imgUrl = TOWER_INFOS.TOWER_CHEVRE.IMAGEURL;
        this.price = TOWER_INFOS.TOWER_CHEVRE.BASE_PRICE;

        this.isPlaced = false;
        this.asset = "";
        this.position = null;
        this.sprite = null;
        this.rangeCircle = null;

        this.tiles_in_range = [];
        this.enemies_in_range = [];

        this.level = {
            path1: 0,
            path2: 0,
            path3: 0,
        };
    }
}
class RoquefortTower extends Tower {
    constructor() {
        super();

        this.stats = {
            attack: TOWER_INFOS.TOWER_ROQUEFORT.BASE_ATK,
            shot_speed: TOWER_INFOS.TOWER_ROQUEFORT.BASE_SHOT_SPEED,
            range: TOWER_INFOS.TOWER_ROQUEFORT.BASE_RANGE,
            nb_shots: TOWER_INFOS.TOWER_ROQUEFORT.BASE_NB_SHOTS,
            base_attack: TOWER_INFOS.TOWER_ROQUEFORT.BASE_ATK,
            base_shot_speed: TOWER_INFOS.TOWER_ROQUEFORT.BASE_SHOT_SPEED,
            base_range: TOWER_INFOS.TOWER_ROQUEFORT.BASE_RANGE,
        };
        this.type = TOWER_INFOS.TOWER_ROQUEFORT.TYPE;
        this.rat_type = TOWER_INFOS.TOWER_ROQUEFORT.RAT_TYPE;

        this.image = TOWER_INFOS.TOWER_ROQUEFORT.IMAGE;
        this.imgUrl = TOWER_INFOS.TOWER_ROQUEFORT.IMAGEURL;
        this.price = TOWER_INFOS.TOWER_ROQUEFORT.BASE_PRICE;
    }
}

const TOWERS = {
    Tower,
    ComteTower,
    ChevreTower,
    RoquefortTower,
};
export { TOWERS };
