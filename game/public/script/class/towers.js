import { game } from "../game.js"
import { findCell } from "../gridManager.js";
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

        this.tiles_in_range = []
        this.enemies_in_range = []

        this.level = {
            path1: 0,
            path2: 0,
            path3: 0
        }
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
        this.isPlaced = placeIt;
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

    TilesSeen() {
        
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

