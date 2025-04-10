import { game } from "../game.js"
import { gridManager } from "../gridManager.js";
import { uuidv4 } from "../idManager.js";
import { GAME_SETTINGS } from "./config.js";
import { TOWER_INFOS } from "../config.js";



class Tower {
    constructor() {
        this.id = uuidv4()
        this.stats = {
            attack: TOWER_INFOS.TOWER_TOME.BASE_ATK,
            shot_speed: TOWER_INFOS.TOWER_TOME.BASE_SHOT_SPEED,
            range: TOWER_INFOS.TOWER_TOME.BASE_RANGE,
            nb_shots: TOWER_INFOS.TOWER_TOME.BASE_NB_SHOTS,
        }
        this.type = TOWER_INFOS.TOWER_TOME.TYPE
        this.image = TOWER_INFOS.TOWER_TOME.IMAGE
        this.price = TOWER_INFOS.TOWER_TOME.BASE_PRICE;

        this.is_placed = false;
        this.asset = ""
        this.position = null;
        this.sprite = null;
        this.range_circle = null;

        this.paths_in_range = []
        this.enemies_in_range = []

        this.level = {
            path1: 0,
            path2: 0,
            path3: 0
        }
    }

    async loadAsset() {
        this.asset = await PIXI.Assets.load(this.image);
    }


    async initBeforePlacement() {
        await this.loadAsset()
        this.initRangeVisual()
    }

    initAfterPlacement() {
        this.pathsInRange()
        this.sprite.tint = 0xFFFFFF; // Blanc
        this.hideRange()
        this.detectEnemisInterval()
        this.towerAttackInterval()
    }

    initRangeVisual() {
        this.rangeGraphic = new PIXI.Graphics();
        this.rangeGraphic.circle(0, 0, this.stats.range * GAME_SETTINGS.TILE_WIDTH);
        this.rangeGraphic.beginFill(0x00FF00, 0.5); // Vert avec opacité
        game.app.stage.addChild(this.rangeGraphic)
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
        const entitiesInRange = []
        const cell = gridManager.findOnGrid(this.position.x, this.position.y, game.cellsList);
        const startCol = Math.floor((cell.x - this.stats.range));
        const endCol = Math.floor((cell.x + this.stats.range));
        const startRow = Math.floor((cell.y - this.stats.range));
        const endRow = Math.floor((cell.y + this.stats.range));

        for (let col = startCol; col <= endCol; col++) {
            for (let row = startRow; row <= endRow; row++) {
                const cell = gridManager.findCell(col, row, game.cellsList);
                if (!cell) continue;
                if (game.path.includes(cell) && !this.enemies_in_range.includes(cell)) {
                    entitiesInRange.push(cell)
                }
            }
        }
        this.paths_in_range = entitiesInRange;
    }

    detectNearbyEnemies() {
        const enemies_nearby = []
        this.paths_in_range.forEach(cell => {
            cell.ennemies.forEach(enemy => {
                if (!enemies_nearby.includes(enemy)) {
                    enemies_nearby.push(enemy)
                }
            })
        })
        this.enemies_in_range = enemies_nearby
    }
    detectEnemisInterval() {
        this.detectingEnemies = setInterval(() => {
            this.detectNearbyEnemies()
        }, 200);
    }



    ableToPlace(x, y) {
        const cell_position = gridManager.findOnGrid(x, y);
        const cell = gridManager.findCell(cell_position.x, cell_position.y, game.cellsList);
        if (game.path.includes(cell) || game.towerTilesOccupied.includes(cell)) {
            return false
        }
        return true
    }

    updatePosition(x, y) {
        this.position = {
            x: x,
            y: y,
        };
    }

    render(x, y, placeIt) {
        if (this.is_placed) {
            return
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

        this.showRange()
        if (this.ableToPlace(this.position.x, this.position.y)) {
            this.sprite.tint = 0x00FF00; // Vert
            this.is_placed = placeIt;
            if (placeIt) {
                this.initAfterPlacement()
            }
        } else {
            this.sprite.tint = 0xFF0000; // Rouge
            this.is_placed = false;
        }
    }

    

    increaseLevel(id_upgrade) {
        if (id_upgrade === 1) {
            if (this.level.path1 === 3) {
                console.log("deja niv max");
            } else {
                this.level.path1 += 1;
                this.stats.attack += 5;
            }
        }
        if (id_upgrade === 2) {
            if (this.level.path2 === 3) {
                console.log("deja niv max");
            } else {
                this.level.path2 += 1;
                this.stats.shot_speed -= 500;
            }
        }
        if (id_upgrade === 3) {
            if (this.level.path3 === 3) {
                console.log("deja niv max");
            } else {
                this.level.path3 += 1;
                this.stats.range += 1;
            }
        }
    }

    towerAttack() {
        if (!this.enemies_in_range.length) {
            return
        } else {
            for (let i = 0; i < this.stats.nb_shots; i++) {
                if (this.enemies_in_range[i] == undefined || this.enemies_in_range[i].hp <= 0) {
                    this.enemies_in_range.splice(i, 1)
                    continue
                }
                this.enemies_in_range[i].takeDamage(this.stats.attack)
            }
            console.log(this.enemies_in_range)
        }
    }

    towerAttackInterval() {
        this.attackInterval = setInterval(() => {
            this.towerAttack()
        }, this.stats.shot_speed);
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
        }
        this.type = TOWER_INFOS.TOWER_COMTE.TYPE
        this.image = TOWER_INFOS.TOWER_COMTE.IMAGE
        this.price = TOWER_INFOS.TOWER_COMTE.BASE_PRICE;

    }
}
class ChevreTower extends Tower{
    constructor() {
        super();

        this.stats = {
            attack: TOWER_INFOS.TOWER_CHEVRE.BASE_ATK,
            shot_speed: TOWER_INFOS.TOWER_CHEVRE.BASE_SHOT_SPEED,
            range: TOWER_INFOS.TOWER_CHEVRE.BASE_RANGE,
            nb_shots: TOWER_INFOS.TOWER_CHEVRE.BASE_NB_SHOTS,
        }
        this.type = TOWER_INFOS.TOWER_CHEVRE.TYPE
        this.image = TOWER_INFOS.TOWER_CHEVRE.IMAGE
        this.price = TOWER_INFOS.TOWER_CHEVRE.BASE_PRICE;
        
        this.isPlaced = false;
        this.asset = ""
        this.position = null;
        this.sprite = null;
        this.rangeCircle = null;

        this.tiles_in_range = []
        this.enemies_in_range = []

        this.level = {
            path1: 0,
            path2: 0,
            path3: 0
        }
    }

}
class RoquefortTower extends Tower {
    constructor() {
        super()

        this.stats = {
            attack: TOWER_INFOS.TOWER_ROQUEFORT.BASE_ATK,
            shot_speed: TOWER_INFOS.TOWER_ROQUEFORT.BASE_SHOT_SPEED,
            range: TOWER_INFOS.TOWER_ROQUEFORT.BASE_RANGE,
            nb_shots: TOWER_INFOS.TOWER_ROQUEFORT.BASE_NB_SHOTS,
        }
        this.type = TOWER_INFOS.TOWER_ROQUEFORT.TYPE
        this.image = TOWER_INFOS.TOWER_ROQUEFORT.IMAGE
        this.price = TOWER_INFOS.TOWER_ROQUEFORT.BASE_PRICE;

    }
}

const TOWERS = {
    Tower,
    ComteTower,
    ChevreTower,
    RoquefortTower
}
export { TOWERS };

