import { game } from "../game.js"
import { findCell } from "../gridManager.js";
import { uuidv4 } from "../idManager.js";

const TOWER_TOME = {
    BASE_ATK: 10,
    BASE_SHOT_SPEED: 3000,
    BASE_RANGE: 2,
    BASE_NB_SHOTS: 1,
    BASE_PRICE: 50,
    TYPE: "Normal",
    IMAGE: "tomeFromage"
}
const TOWER_COMTE = {
    BASE_ATK: 10,
    BASE_SHOT_SPEED: 3000,
    BASE_RANGE: 2,
    BASE_NB_SHOTS: 1,
    BASE_PRICE: 100,
    TYPE: "Camo",
    IMAGE: "comteFromage"
}
const TOWER_CHEVRE = {
    BASE_ATK: 10,
    BASE_SHOT_SPEED: 3000,
    BASE_RANGE: 2,
    BASE_NB_SHOTS: 1,
    BASE_PRICE: 100,
    TYPE: "Rainbow",
    IMAGE: "chevreFromage"
}
const TOWER_ROQUEFORT = {
    BASE_ATK: 10,
    BASE_SHOT_SPEED: 4000,
    BASE_RANGE: 3,
    BASE_NB_SHOTS: 2,
    BASE_PRICE: 100,
    TYPE: "Steel",
    IMAGE: "chevreFromage"
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
        this.type = TOWER_TOME.TYPE
        this.image = TOWER_TOME.IMAGE
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
        const distance = Math.sqrt(
          Math.pow(entity.cell_position[0] - this.position[0], 2) +
          Math.pow(entity.cell_position[1] - this.position[1], 2)
        );
    
        if (distance <= this.stats.range) { // Si l'ennemi est dans le rayon de la tour
          this.ennemieseen.push(entity);
        }
    
        console.log(this.ennemieseen);
      }
    
      // Mise à jour des ennemis à portée
      EnnemiesUnseen(entity) {
        this.tiles_seen.forEach(e => {
          this.ennemieseen.forEach((element, index) => {
            if (element != e) {
              this.ennemieseen.splice(index, 1); // Retirer l'ennemi qui n'est plus à portée
            }
          });
        });
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

export class comteTower {
    constructor() {
        this.stats = {
            attack: TOWER_COMTE.BASE_ATK,
            shot_speed: TOWER_COMTE.BASE_SHOT_SPEED,
            range: TOWER_COMTE.BASE_RANGE,
            nb_shots: TOWER_COMTE.BASE_NB_SHOTS,
        }
        this.type = TOWER_COMTE.TYPE
        this.image = TOWER_COMTE.IMAGE
        this.price = TOWER_COMTE.BASE_PRICE;

    }
}
export class chevreTower {
    constructor() {
        this.stats = {
            attack: TOWER_CHEVRE.BASE_ATK,
            shot_speed: TOWER_CHEVRE.BASE_SHOT_SPEED,
            range: TOWER_CHEVRE.BASE_RANGE,
            nb_shots: TOWER_CHEVRE.BASE_NB_SHOTS,
        }
        this.type = TOWER_CHEVRE.TYPE
        this.image = TOWER_CHEVRE.IMAGE
        this.price = TOWER_CHEVRE.BASE_PRICE;

    }
}
export class roquefortTower {
    constructor() {
        this.stats = {
            attack: TOWER_ROQUEFORT.BASE_ATK,
            shot_speed: TOWER_ROQUEFORT.BASE_SHOT_SPEED,
            range: TOWER_ROQUEFORT.BASE_RANGE,
            nb_shots: TOWER_ROQUEFORT.BASE_NB_SHOTS,
        }
        this.type = TOWER_ROQUEFORT.TYPE
        this.image = TOWER_ROQUEFORT.IMAGE
        this.price = TOWER_ROQUEFORT.BASE_PRICE;

    }
}

