import { game } from "../game.js"
import { findCell, findOnGrid } from "../gridManager.js";
import { uuidv4 } from "../idManager.js";

const TOWER_TOME = {
    BASE_ATK: 10,
    BASE_SHOT_SPEED: 3000,
    BASE_RANGE: 2,
    BASE_NB_SHOTS: 1,
    BASE_PRICE: 100,
}


export class Tower{
    constructor() {
        this.id = uuidv4()
        this.stats = {
            attack: TOWER_TOME.BASE_ATK,
            shot_speed: TOWER_TOME.BASE_SHOT_SPEED,
            range: TOWER_TOME.BASE_RANGE,
            nb_shots: TOWER_TOME.BASE_NB_SHOTS,
        }
        this.type = "normalRat";
        this.price = TOWER_TOME.BASE_PRICE;

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

    async init() {
        await this.loadAsset()
        this.initRange()
    }

    updatePosition(x, y) {
        this.position = {
            x : x,
            y : y,
        };
    }

    async loadAsset() {
        this.asset = await PIXI.Assets.load(this.type);
    }

    ableToPlace(x, y) {
        const cell_position = findOnGrid(x, y);
        const cell = findCell(cell_position.x, cell_position.y, game.cellsList); 
        if (game.path.includes(cell) || game.towerTilesOccupied.includes(cell)) {
            return false
        }
        return true
    }  

    render(x, y, placeIt) {
        if (this.isPlaced) {
            return
        }
        this.position = {
            x : x,
            y : y,
        };
        if (!this.sprite) {
            this.sprite = new PIXI.Sprite(this.asset);
            this.sprite.anchor.set(0.5);
            this.sprite.name = this.id;
            this.sprite.width = game.tilewidth;
            this.sprite.height = game.tileheight;
        }
        this.sprite.x = this.position.x; 
        this.sprite.y = this.position.y;
        game.app.stage.addChild(this.sprite);

        this.showRange()
        if (this.ableToPlace(this.position.x, this.position.y)) {
            this.sprite.tint = 0x00FF00; // Vert
            this.isPlaced = placeIt;
            if (placeIt) {
                this.sprite.tint = 0xFFFFFF; // Blanc
                this.hideRange()
            }
        } else {
            this.sprite.tint = 0xFF0000; // Rouge
            this.isPlaced = false;
        }
    }

    increaseLevel(id_upgrade) {
        if (id_upgrade === 1) {
            if (this.level.path1 === 3) {
                console.log("deja niv max");
            } else {
                this.level.path1 += 1;
                this.stats.attack +=5;
            }
        }
        if (id_upgrade === 2) {
            if (this.level.path2 === 3) {
                console.log("deja niv max");
            } else {
                this.level.path2 += 1;
                this.stats.shot_speed -=500;
            }
        }
        if (id_upgrade === 3) {
            if (this.level.path3 === 3) {
                console.log("deja niv max");
            } else {
                this.level.path3 += 1;
                this.stats.range +=1;
            }
        }
    }

    initRange() {
        this.rangeGraphic = new PIXI.Graphics();
        this.rangeGraphic.circle(0, 0, this.stats.range * game.tilewidth);
        this.rangeGraphic.beginFill(0x00FF00, 0.5); // Vert avec opacité
        game.app.stage.addChild(this.rangeGraphic)
        this.rangeGraphic.stroke({ width: 2, color: 0xfeeb77 });
        this.rangeGraphic.visible = false;

    }
    
    showRange() {
        console.log(this.rangeGraphic.getBounds())
        this.rangeGraphic.x = this.position.x;
        this.rangeGraphic.y = this.position.y;
        this.rangeGraphic.visible = true;
    }

    hideRange() {
        this.rangeGraphic.visible = false;
    }

    EnnemieSeen(entity) {
        this.tiles_seen.forEach(element => {
            console.log(entity.cell_position);
            
            if (entity.cell_position === element) {
                this.ennemieseen.push(entity)
            }
        });
        console.log(this.ennemieseen);
        
    }

    EnnemiesUnseen(entity) {
        this.tiles_seen.forEach(e => {
            this.ennemieseen.forEach(element => {
                if (element != e) {
                    this.ennemieseen.pop(element)
                }
            })
        })
    }

    TowerAttack() {
        if (!this.ennemieseen) {
            console.log("liste vide pas d'attaque");
        } else {
            for (let i = 0; i < this.stats.nb_shots; i++) {
                this.ennemieseen[i].hp - this.stats.attack
            }
        }
    }
}

