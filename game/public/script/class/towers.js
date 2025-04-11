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
        };
        this.type = TOWER_INFOS.TOWER_TOME.TYPE;
        this.image = TOWER_INFOS.TOWER_TOME.IMAGE;
        this.imgUrl = TOWER_INFOS.TOWER_TOME.IMAGEURL;
        this.price = TOWER_INFOS.TOWER_TOME.BASE_PRICE;

        this.is_placed = false;
        this.asset = "";
        this.position = null;
        this.sprite = null;
        this.range_circle = null;

        this.paths_in_range = [];
        this.enemies_in_range = [];

        this.level = {
            path1: 0,
            path2: 0,
            path3: 0,
        };
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
    }

    towerSelect() {
        console.log("tower select");
        towerManager.showUpgrades(this);

        this.showRange();
    }

    towerUnselect() {
        console.log("tower unselect");
        this.hideRange();
        towerManager.hideUpgrades(this);
    }

    initTowerSelect() {
        console.log("init tower select");
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
                if (!enemies_nearby.includes(enemy)) {
                    enemies_nearby.push(enemy);
                }
            });
        });
        this.enemies_in_range = enemies_nearby;
        console.log("enemies_in_range", this.enemies_in_range);
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

    attackSquash(duration = 100, scaleFactor = 0.7) {
        const originalScaleY = this.sprite.scale.y;
        console.log(originalScaleY)
    
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
            console.log("no rat in range")
            return;
        } else { 
            for (let i = 0; i < this.stats.nb_shots; i++) {
                console.log("trying to shoot")
                if (
                    this.enemies_in_range[i] === undefined ||
                    this.enemies_in_range[i].hp <= 0
                ) {
                    console.log("enemy already dead")
                    this.enemies_in_range.pop(this.enemies_in_range[i]);
                    continue;
                }
                console.log("attacking enemy")
                this.enemies_in_range[i].takeDamage(this.stats.attack);
                this.attackSquash(100,0.8);
            }
            console.log(this.enemies_in_range);
        }
    }

    towerAttackInterval() {
        this.attackInterval = setInterval(() => {
            this.towerAttack();
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
        };
        this.type = TOWER_INFOS.TOWER_COMTE.TYPE;
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
        };
        this.type = TOWER_INFOS.TOWER_CHEVRE.TYPE;
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
        };
        this.type = TOWER_INFOS.TOWER_ROQUEFORT.TYPE;
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
