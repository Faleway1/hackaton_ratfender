import {game} from "./game.js"
import { findCell } from "./pathMaker.js";

export class Tower{
    constructor(types, position, price, image) {
        this.stats = {
            attack: 10,
            shot_speed:3000,
            range:2,
            nb_shots: 1
        }
        this.image = image
        this.types = types;
        this.tiles_seen = []
        this.ennemieseen = []
        this.position = position;
        this.price = price;
        this.level = {
            path1: 0,
            path2: 0,
            path3: 0
        }
        this.element = document.createElement("img");
        this.element.src = this.image;
        this.element.classList.add("tower");
        this.render();
    }

    setTypes(types) {
        this.types = this.types.push(types);
    }

    getTypes() {
        return this.types;
    }

    setPosition(position) {
        this.position = position;
    }
    getPosition() {
        return this.position;
    }

    setPrice(price) {
        this.price = price;
    }
    getPrice() {
        return this.price;
    }

    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }

    render() {
        const cell = document.querySelector(`#cell-${this.position[0]}-${this.position[1]}`);
        if (cell) {
            console.log("Cell found:", cell);
            cell.appendChild(this.element);
        } else {
            console.warn(`Cell not found at: cell-${this.position[0]}-${this.position[1]}`);
        }
    }

    IncreaseLevel(id_upgrade) {
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
        for (let y = -(this.stats.range); y < this.stats.range + 1; y++) {
            for (let x = -(this.stats.range); x < this.stats.range + 1; x++) {
                const cell = findCell((this.position[0]+x), (this.position[1]+y))
                game.path.forEach(element => {
                    if (element.x === cell.x && element.y === cell.y) {
                        this.tiles_seen.push(`cell-${element.x}-${element.y}`)
                    }
                });
            }            
        }
        console.log(this.tiles_seen);
        
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

